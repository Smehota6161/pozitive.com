// Часы
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock();

// Случайные анимации для элементов
function addRandomAnimations() {
    const elements = document.querySelectorAll('.nav-btn, .ad-space, .donate-btn');
    elements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = `rotate(${Math.random() * 10 - 5}deg) scale(1.05)`;
        });
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'rotate(0deg) scale(1)';
        });
    });
}

document.addEventListener('DOMContentLoaded', addRandomAnimations);