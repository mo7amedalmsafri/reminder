
let currentFormat = localStorage.getItem('timeFormat') || '24';

function updateUAEClock() {
    const now = new Date();
    const uaeOffset = 4 * 60;
    const localOffset = now.getTimezoneOffset();
    const totalOffset = (uaeOffset + localOffset) * 60 * 1000;
    const uaeTime = new Date(now.getTime() + totalOffset);

    let hours = uaeTime.getHours();
    const minutes = String(uaeTime.getMinutes()).padStart(2, '0');

    let displayHours = hours;
    let suffix = '';

    if (currentFormat === '12') {
        suffix = hours >= 12 ? ' م' : ' ص';
        displayHours = hours % 12 || 12;
    }

    displayHours = String(displayHours).padStart(2, '0');
    
    const icon = (hours >= 6 && hours < 18) ? "☀️" : "🌙";
    document.getElementById('timer').textContent = `${icon} ${displayHours}:${minutes} ${suffix}`;
    
}

function applyActiveFormat() {
    const btn24 = document.getElementById('btn24');
    const btn12 = document.getElementById('btn12');

    if (currentFormat === '24') {
        btn24.classList.add('active');
        btn12.classList.remove('active');
    } else {
        btn12.classList.add('active');
        btn24.classList.remove('active');
    }

    // تأثير وميض على الساعة
    const timer = document.getElementById('timer');
    timer.style.transition = 'opacity 0.3s ease';
    timer.style.opacity = 0.5;
    setTimeout(() => {
        timer.style.opacity = 1;
    }, 300);
}

setInterval(updateUAEClock, 1000);
updateUAEClock();
applyActiveFormat();

document.getElementById('btn24').addEventListener('click', () => {
    currentFormat = '24';
    localStorage.setItem('timeFormat', '24');
    applyActiveFormat();
    updateUAEClock();
});

document.getElementById('btn12').addEventListener('click', () => {
    currentFormat = '12';
    localStorage.setItem('timeFormat', '12');
    applyActiveFormat();
    updateUAEClock();
});

document.getElementById('startButton').addEventListener('click', () => {
    const alarmCount = parseInt(document.getElementById('alarmCount').value);
    const intervalMinutes = parseInt(document.getElementById('interval').value);
    const interval = intervalMinutes * 60 * 1000;
    let counter = 0;

    const startButton = document.getElementById('startButton');
    startButton.disabled = true;
    startButton.textContent = '⏳ جارٍ التنبيه...';

    const playAlarm = () => {
        alert('🔔 منبه رقم ' + (counter + 1));
        counter++;
        if (counter < alarmCount) {
            setTimeout(playAlarm, interval);
        } else {
            startButton.disabled = false;
            startButton.textContent = 'بدء التنبيه';
        }
    };

    playAlarm();
});
