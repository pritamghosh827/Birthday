// DOM Elements
const startBtn = document.getElementById('start-btn');
const scrollUpBtn = document.getElementById('scroll-up-btn');
const sections = document.querySelectorAll('.section');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Show first section
    sections[0].classList.add('active');

    // Add event listeners
    startBtn.addEventListener('click', startSurprise);
    scrollUpBtn.addEventListener('click', scrollToTop);

    // Observe sections for fade-in effect
    observeSections();
});

// Start surprise - scroll to next section
function startSurprise() {
    sections[1].scrollIntoView({ behavior: 'smooth' });
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Intersection Observer for section animations
function observeSections() {
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Trigger animations for elements within section
                const items = entry.target.querySelectorAll('.gallery-item, .reason-card');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.animation = `fadeInUp 0.6s ease forwards`;
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

// Add click animations to gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// Add click animations to reason cards
document.querySelectorAll('.reason-card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.98) rotateZ(1deg)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// Smooth scroll on page load
window.addEventListener('load', function() {
    // Ensure smooth scrolling is enabled
    document.documentElement.scrollBehavior = 'smooth';
});

// Add keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowDown') {
        window.scrollBy(0, window.innerHeight);
    } else if (event.key === 'ArrowUp') {
        window.scrollBy(0, -window.innerHeight);
    }
});

// Easter egg - show secret message on specific key combination
let easterEggKeys = [];
const easterEggSequence = ['b', 'i', 'r', 't', 'h', 'd', 'a', 'y'];

document.addEventListener('keydown', function(event) {
    if (event.key.toLowerCase() === 'b') {
        easterEggKeys = ['b'];
    } else if (easterEggKeys.length > 0 && event.key.toLowerCase() === easterEggSequence[easterEggKeys.length]) {
        easterEggKeys.push(event.key.toLowerCase());
        
        if (easterEggKeys.length === easterEggSequence.length) {
            showEasterEgg();
            easterEggKeys = [];
        }
    } else {
        easterEggKeys = [];
    }
});

function showEasterEgg() {
    // Create and show special message
    const easterEggDiv = document.createElement('div');
    easterEggDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #ff6b9d 0%, #ffa5b7 100%);
            color: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            z-index: 10000;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            max-width: 500px;
            animation: popIn 0.5s ease;
        ">
            <h2 style="font-size: 2rem; margin-bottom: 20px;">🎉 You Found the Secret! 🎉</h2>
            <p style="font-size: 1.2rem; margin-bottom: 20px;">This birthday is all about celebrating the amazing Coco!</p>
            <button onclick="this.parentElement.style.display='none'" style="
                padding: 10px 30px;
                background: white;
                color: #ff6b9d;
                border: none;
                border-radius: 20px;
                font-weight: 600;
                cursor: pointer;
                font-size: 1rem;
            ">Close</button>
        </div>
        <div onclick="this.remove()" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 9999;
        "></div>
    `;
    
    document.body.appendChild(easterEggDiv);

    // Create confetti animation
    createConfetti();
}

// Confetti animation
function createConfetti() {
    const colors = ['#ff6b9d', '#ffa5b7', '#ffe66d', '#667eea', '#764ba2'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.innerHTML = ['🎉', '🎂', '🎈', '💝', '🌸', '⭐'][Math.floor(Math.random() * 6)];
        confetti.style.cssText = `
            position: fixed;
            left: 50%;
            top: 50%;
            font-size: ${Math.random() * 20 + 20}px;
            opacity: 1;
            z-index: 10001;
            animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
            transform: translateX(${(Math.random() - 0.5) * 200}px);
        `;
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5000);
    }
}

// Add confetti fall animation to CSS dynamically if not already there
const style = document.createElement('style');
style.innerHTML = `
    @keyframes popIn {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    }
    
    @keyframes confettiFall {
        0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(window.innerHeight) translateX(${Math.random() * 200 - 100}px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Disable right-click on the page (optional, can be removed if you want)
// document.addEventListener('contextmenu', e => e.preventDefault());

// Add page visibility change detection for better UX
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden
        document.title = 'Come Back! 🎂';
    } else {
        // Page is visible
        document.title = 'Happy Birthday Coco! 🎂';
    }
});

// Add scroll snap for better mobile experience
document.documentElement.style.scrollSnapType = 'y mandatory';
sections.forEach(section => {
    section.style.scrollSnapAlign = 'start';
});

console.log('🎉 Happy Birthday Coco! 🎉');
console.log('💕 This website was made with love for someone special.');
