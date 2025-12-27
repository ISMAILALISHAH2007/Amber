// DOM Elements
const pages = document.querySelectorAll('.page');
const progressBar = document.querySelector('.progress-bar');
const dots = document.querySelectorAll('.dot');
const navBtns = document.querySelectorAll('.nav-btn');
const enterBtn = document.getElementById('enterBtn');
const restartBtn = document.getElementById('restartJourney');
const shareBtn = document.getElementById('shareBtn');
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
const loadingScreen = document.getElementById('loadingScreen');
const mainContent = document.getElementById('mainContent');
const backToTopBtn = document.getElementById('backToTop');
const countdownElements = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
};

// Current page index
let currentPageIndex = 0;
const totalPages = pages.length;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Simulate loading
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainContent.style.display = 'block';
            showPage(currentPageIndex);
            startCountdown();
            
            // Auto-play music
            bgMusic.volume = 0.5;
            bgMusic.play().catch(e => {
                console.log("Autoplay prevented. User interaction required.");
                musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            });
            
            // Initialize voice messages
            setTimeout(() => {
                setupAmberVoiceMessages();
            }, 1000);
        }, 500);
    }, 2000);
    
    // Music toggle
    musicToggle.addEventListener('click', toggleMusic);
    
    // Enter button
    enterBtn.addEventListener('click', () => {
        showPage(1);
    });
    
    // Navigation buttons
    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            goToPage(target);
        });
    });
    
    // Progress dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showPage(index);
        });
    });
    
    // Restart journey
    restartBtn.addEventListener('click', () => {
        showPage(0);
    });
    
    // Share button
    shareBtn.addEventListener('click', shareWebsite);
    
    // Back to top
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Scroll detection
    window.addEventListener('scroll', handleScroll);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            if (currentPageIndex < totalPages - 1) {
                showPage(currentPageIndex + 1);
            }
        } else if (e.key === 'ArrowLeft') {
            if (currentPageIndex > 0) {
                showPage(currentPageIndex - 1);
            }
        }
    });
});

// Show specific page
function showPage(index) {
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    pages[index].classList.add('active');
    currentPageIndex = index;
    
    // Update progress bar
    updateProgressBar(index);
    
    // Update dots
    updateDots(index);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Update progress bar
function updateProgressBar(index) {
    const width = ((index + 1) / totalPages) * 100;
    progressBar.style.width = `${width}%`;
}

// Update navigation dots
function updateDots(index) {
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Go to specific page by ID
function goToPage(pageId) {
    const pageIndex = Array.from(pages).findIndex(page => page.id === pageId);
    if (pageIndex !== -1) {
        showPage(pageIndex);
    }
}

// Toggle background music
function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play();
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        musicToggle.classList.add('active');
        document.querySelector('.music-wave').style.display = 'flex';
    } else {
        bgMusic.pause();
        musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
        musicToggle.classList.remove('active');
        document.querySelector('.music-wave').style.display = 'none';
    }
}

// Scroll handling
function handleScroll() {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}

// New Year Countdown
function startCountdown() {
    const newYearDate = new Date('January 1, 2026 00:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = newYearDate - now;
        
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            // Update display
            countdownElements.days.textContent = days.toString().padStart(2, '0');
            countdownElements.hours.textContent = hours.toString().padStart(2, '0');
            countdownElements.minutes.textContent = minutes.toString().padStart(2, '0');
            countdownElements.seconds.textContent = seconds.toString().padStart(2, '0');
        } else {
            // Happy New Year!
            clearInterval(countdownInterval);
            document.querySelector('.countdown-container h3').textContent = "Happy New Year 2026! 🎉";
        }
    }
    
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}

// Share website
function shareWebsite() {
    const shareData = {
        title: 'For My Gadhi ❤️ | A Love Story',
        text: 'Check out this beautiful love story website made with love!',
        url: window.location.href
    };
    
    if (navigator.share) {
        navigator.share(shareData);
    } else {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                alert('Link copied to clipboard! Share it with your loved ones. ❤️');
            })
            .catch(err => {
                prompt('Copy this link to share:', window.location.href);
            });
    }
}

// Amber's Voice Messages Functionality
function setupAmberVoiceMessages() {
    const audio1 = document.getElementById('amberAudio1');
    const audio2 = document.getElementById('amberAudio2');
    const playButtons = document.querySelectorAll('.special-play-btn');
    const loopButtons = document.querySelectorAll('.loop-btn');
    const volumeSliders = document.querySelectorAll('.volume-slider');
    const volumeToggles = document.querySelectorAll('.volume-toggle');
    const progressSliders = document.querySelectorAll('.progress-slider');
    
    // Track listen count
    let totalListens = parseInt(localStorage.getItem('amberVoiceListens')) || 0;
    updateListenCount(totalListens);
    
    // Initialize audio players
    [audio1, audio2].forEach((audio, index) => {
        // Set initial volume
        audio.volume = 0.8;
        
        // Update time display when metadata loads
        audio.addEventListener('loadedmetadata', function() {
            const totalSpan = this.parentElement.querySelector('.total');
            const minutes = Math.floor(this.duration / 60);
            const seconds = Math.floor(this.duration % 60);
            totalSpan.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        });
        
        // Update progress during playback
        audio.addEventListener('timeupdate', function() {
            const player = this.parentElement;
            const currentSpan = player.querySelector('.current');
            const progressFill = player.querySelector('.progress-fill');
            const progressSlider = player.querySelector('.progress-slider');
            
            const currentTime = this.currentTime;
            const duration = this.duration;
            
            // Update current time display
            const minutes = Math.floor(currentTime / 60);
            const seconds = Math.floor(currentTime % 60);
            currentSpan.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            
            // Update progress bar
            if (duration) {
                const progressPercent = (currentTime / duration) * 100;
                progressFill.style.width = `${progressPercent}%`;
                progressSlider.value = progressPercent;
            }
        });
        
        // When audio ends
        audio.addEventListener('ended', function() {
            const playBtn = this.parentElement.querySelector('.special-play-btn');
            playBtn.innerHTML = '<i class="fas fa-play"></i><div class="play-pulse"></div>';
            playBtn.classList.remove('playing');
            
            // Increment listen count
            totalListens++;
            localStorage.setItem('amberVoiceListens', totalListens);
            updateListenCount(totalListens);
        });
    });
    
    // Play/Pause buttons
    playButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const audioId = this.getAttribute('data-audio');
            const audio = document.getElementById(audioId);
            
            if (audio.paused) {
                // Pause other audio if playing
                [audio1, audio2].forEach(a => {
                    if (a !== audio && !a.paused) {
                        a.pause();
                        const otherBtn = a.parentElement.querySelector('.special-play-btn');
                        otherBtn.innerHTML = '<i class="fas fa-play"></i><div class="play-pulse"></div>';
                        otherBtn.classList.remove('playing');
                    }
                });
                
                // Play this audio
                audio.play();
                this.innerHTML = '<i class="fas fa-pause"></i><div class="play-pulse"></div>';
                this.classList.add('playing');
            } else {
                // Pause this audio
                audio.pause();
                this.innerHTML = '<i class="fas fa-play"></i><div class="play-pulse"></div>';
                this.classList.remove('playing');
            }
        });
    });
    
    // Loop buttons
    loopButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const player = this.closest('.special-audio-player');
            const audio = player.querySelector('.amber-audio');
            
            audio.loop = !audio.loop;
            this.classList.toggle('active', audio.loop);
        });
    });
    
    // Volume sliders
    volumeSliders.forEach(slider => {
        slider.addEventListener('input', function() {
            const player = this.closest('.special-audio-player');
            const audio = player.querySelector('.amber-audio');
            audio.volume = this.value / 100;
            
            // Update volume icon
            const volumeIcon = player.querySelector('.volume-toggle i');
            if (this.value == 0) {
                volumeIcon.className = 'fas fa-volume-mute';
            } else if (this.value < 50) {
                volumeIcon.className = 'fas fa-volume-down';
            } else {
                volumeIcon.className = 'fas fa-volume-up';
            }
        });
    });
    
    // Volume toggle buttons
    volumeToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const player = this.closest('.special-audio-player');
            const audio = player.querySelector('.amber-audio');
            const volumeSlider = player.querySelector('.volume-slider');
            const icon = this.querySelector('i');
            
            if (audio.volume > 0) {
                this.dataset.previousVolume = audio.volume;
                audio.volume = 0;
                volumeSlider.value = 0;
                icon.className = 'fas fa-volume-mute';
            } else {
                const previousVolume = parseFloat(this.dataset.previousVolume) || 0.8;
                audio.volume = previousVolume;
                volumeSlider.value = previousVolume * 100;
                icon.className = previousVolume < 0.5 ? 'fas fa-volume-down' : 'fas fa-volume-up';
            }
        });
    });
    
    // Progress sliders (seek)
    progressSliders.forEach(slider => {
        slider.addEventListener('input', function() {
            const player = this.closest('.special-audio-player');
            const audio = player.querySelector('.amber-audio');
            const progressFill = player.querySelector('.progress-fill');
            
            const seekTime = (this.value / 100) * audio.duration;
            audio.currentTime = seekTime;
            progressFill.style.width = `${this.value}%`;
        });
    });
    
    // Easter egg interaction
    const easterEgg = document.getElementById('voiceEasterEgg');
    if (easterEgg) {
        easterEgg.addEventListener('click', function() {
            this.style.color = 'var(--primary)';
            this.style.fontSize = '1.1rem';
            this.style.padding = '25px';
            this.style.background = 'rgba(255, 64, 129, 0.1)';
            this.style.borderRadius = '15px';
        });
    }
}

function updateListenCount(count) {
    const countElement = document.getElementById('totalListens');
    if (countElement) {
        countElement.textContent = count;
        countElement.style.transform = 'scale(1.2)';
        setTimeout(() => {
            countElement.style.transform = 'scale(1)';
        }, 300);
    }
}