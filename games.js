// 🎮 МИНИ-ИГРЫ СМЕХОТЫ

let stats = JSON.parse(localStorage.getItem('gameStats')) || {
    dice: 0,
    coin: { heads: 0, tails: 0 },
    random: 0,
    timer: 0,
    number: { wins: 0, losses: 0 },
    rps: { wins: 0, losses: 0, draws: 0 }
};

// Показываем игру
function showGame(gameType) {
    const gameArea = document.getElementById('gameArea');
    
    switch(gameType) {
        case 'dice':
            gameArea.innerHTML = getDiceGame();
            break;
        case 'coin':
            gameArea.innerHTML = getCoinGame();
            break;
        case 'random':
            gameArea.innerHTML = getRandomGame();
            break;
        case 'timer':
            gameArea.innerHTML = getTimerGame();
            break;
        case 'number':
            gameArea.innerHTML = getNumberGame();
            break;
        case 'rps':
            gameArea.innerHTML = getRPSGame();
            break;
    }
    
    updateStats();
}

// 🎲 Игра 1: Бросок кубика
function getDiceGame() {
    return `
        <div class="game-container">
            <h2>🎲 БРОСОК КУБИКА</h2>
            <div id="diceResult" class="dice-result">Нажми "Бросить"!</div>
            <button onclick="rollDice()" class="action-btn">🎲 БРОСИТЬ КУБИК</button>
            <p>Бросков сделано: <span id="diceCount">${stats.dice}</span></p>
        </div>
    `;
}

function rollDice() {
    const result = Math.floor(Math.random() * 6) + 1;
    const diceResult = document.getElementById('diceResult');
    const diceCount = document.getElementById('diceCount');
    
    // Анимация
    diceResult.style.transform = 'scale(0.8)';
    setTimeout(() => {
        diceResult.innerHTML = `
            <div class="dice-face">⚀⚁⚂⚃⚄⚅</div>
            <div class="dice-number">Выпало: <strong>${result}</strong></div>
        `;
        diceResult.style.transform = 'scale(1)';
        
        // Статистика
        stats.dice++;
        diceCount.textContent = stats.dice;
        saveStats();
    }, 200);
}

// 🪙 Игра 2: Орел/Решка
function getCoinGame() {
    return `
        <div class="game-container">
            <h2>🪙 ОРЕЛ ИЛИ РЕШКА</h2>
            <div id="coinResult" class="coin-result">
                <div class="coin">🪙</div>
            </div>
            <div class="coin-buttons">
                <button onclick="flipCoin('heads')" class="action-btn">🦅 ОРЕЛ</button>
                <button onclick="flipCoin('tails')" class="action-btn">🐍 РЕШКА</button>
            </div>
            <p>Орлов: ${stats.coin.heads} | Решек: ${stats.coin.tails}</p>
        </div>
    `;
}

function flipCoin(choice) {
    const result = Math.random() > 0.5 ? 'heads' : 'tails';
    const coinResult = document.getElementById('coinResult');
    const isWin = choice === result;
    
    // Анимация броска
    coinResult.innerHTML = `<div class="coin spinning">🪙</div>`;
    
    setTimeout(() => {
        coinResult.innerHTML = `
            <div class="coin">${result === 'heads' ? '🦅' : '🐍'}</div>
            <div class="coin-text">${isWin ? '🎉 Ты выиграл!' : '💀 Ты проиграл!'}</div>
        `;
        
        // Статистика
        if (result === 'heads') stats.coin.heads++;
        else stats.coin.tails++;
        saveStats();
        updateStats();
    }, 1000);
}

// 🎯 Игра 3: Случайный выбор
function getRandomGame() {
    return `
        <div class="game-container">
            <h2>🎯 СЛУЧАЙНЫЙ ВЫБОР</h2>
            <textarea id="optionsInput" placeholder="Введи варианты через запятую&#10;Например: пицца, суши, бургеры" class="options-input"></textarea>
            <button onclick="randomChoice()" class="action-btn">🎰 ВЫБРАТЬ СЛУЧАЙНЫЙ ВАРИАНТ</button>
            <div id="randomResult" class="random-result"></div>
            <p>Выборов сделано: <span id="randomCount">${stats.random}</span></p>
        </div>
    `;
}

function randomChoice() {
    const input = document.getElementById('optionsInput').value.trim();
    const options = input.split(',').map(opt => opt.trim()).filter(opt => opt);
    
    if (options.length === 0) {
        document.getElementById('randomResult').innerHTML = '<div class="error">Введи варианты через запятую!</div>';
        return;
    }
    
    const randomIndex = Math.floor(Math.random() * options.length);
    const result = options[randomIndex];
    
    document.getElementById('randomResult').innerHTML = `
        <div class="random-winner">🎉 ВЫБРАНО: <strong>${result}</strong></div>
    `;
    
    stats.random++;
    document.getElementById('randomCount').textContent = stats.random;
    saveStats();
}

// ⏱️ Игра 4: Таймер
function getTimerGame() {
    return `
        <div class="game-container">
            <h2>⏱️ ТАЙМЕР ОБРАТНОГО ОТСЧЕТА</h2>
            <input type="number" id="timerInput" placeholder="Секунды" min="1" max="300" class="timer-input">
            <button onclick="startTimer()" class="action-btn">🚀 ЗАПУСТИТЬ ТАЙМЕР</button>
            <button onclick="stopTimer()" class="action-btn" style="background: #ff6b6b;">⏹️ ОСТАНОВИТЬ</button>
            <div id="timerDisplay" class="timer-display">00:00</div>
            <p>Таймеров запущено: <span id="timerCount">${stats.timer}</span></p>
        </div>
    `;
}

let timerInterval;
function startTimer() {
    const seconds = parseInt(document.getElementById('timerInput').value);
    if (!seconds || seconds < 1) {
        alert('Введи количество секунд!');
        return;
    }
    
    let timeLeft = seconds;
    const timerDisplay = document.getElementById('timerDisplay');
    
    stopTimer(); // Останавливаем предыдущий таймер
    
    timerInterval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerDisplay.innerHTML = '🎉 ВРЕМЯ ВЫШЛО! 🎉';
            timerDisplay.style.background = '#ff6b6b';
            stats.timer++;
            saveStats();
            document.getElementById('timerCount').textContent = stats.timer;
        }
        
        timeLeft--;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    document.getElementById('timerDisplay').textContent = '00:00';
    document.getElementById('timerDisplay').style.background = '';
}

// 🔢 Игра 5: Угадай число
function getNumberGame() {
    return `
        <div class="game-container">
            <h2>🔢 УГАДАЙ ЧИСЛО</h2>
            <p>Я загадал число от 1 до 100. Попробуй угадать!</p>
            <input type="number" id="guessInput" placeholder="Твое число" min="1" max="100" class="number-input">
            <button onclick="checkGuess()" class="action-btn">🎯 ПРОВЕРИТЬ</button>
            <div id="guessResult" class="guess-result"></div>
            <p>Побед: ${stats.number.wins} | Поражений: ${stats.number.losses}</p>
        </div>
    `;
}

let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function checkGuess() {
    const guess = parseInt(document.getElementById('guessInput').value);
    const resultDiv = document.getElementById('guessResult');
    
    if (!guess || guess < 1 || guess > 100) {
        resultDiv.innerHTML = '<div class="error">Введи число от 1 до 100!</div>';
        return;
    }
    
    attempts++;
    
    if (guess === secretNumber) {
        resultDiv.innerHTML = `<div class="win">🎉 УГАДАЛ! За ${attempts} попыток!</div>`;
        stats.number.wins++;
        resetNumberGame();
    } else if (attempts >= 7) {
        resultDiv.innerHTML = `<div class="lose">💀 ПРОИГРАЛ! Число было: ${secretNumber}</div>`;
        stats.number.losses++;
        resetNumberGame();
    } else {
        const hint = guess < secretNumber ? 'БОЛЬШЕ' : 'МЕНЬШЕ';
        resultDiv.innerHTML = `<div class="hint">Не угадал! Попытка ${attempts}/7. Подсказка: ${hint}</div>`;
    }
    
    saveStats();
    updateStats();
}

function resetNumberGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    setTimeout(() => {
        document.getElementById('guessInput').value = '';
        document.getElementById('guessResult').innerHTML = '';
    }, 3000);
}

// ✂️ Игра 6: Камень-Ножницы-Бумага
function getRPSGame() {
    return `
        <div class="game-container">
            <h2>✂️ КАМЕНЬ-НОЖНИЦЫ-БУМАГА</h2>
            <div class="rps-buttons">
                <button onclick="playRPS('rock')" class="rps-btn">🪨</button>
                <button onclick="playRPS('paper')" class="rps-btn">📄</button>
                <button onclick="playRPS('scissors')" class="rps-btn">✂️</button>
            </div>
            <div id="rpsResult" class="rps-result">Сделай свой выбор!</div>
            <p>Побед: ${stats.rps.wins} | Поражений: ${stats.rps.losses} | Ничьих: ${stats.rps.draws}</p>
        </div>
    `;
}

function playRPS(playerChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const botChoice = choices[Math.floor(Math.random() * 3)];
    const resultDiv = document.getElementById('rpsResult');
    
    const emoji = { rock: '🪨', paper: '📄', scissors: '✂️' };
    
    let result;
    if (playerChoice === botChoice) {
        result = 'НИЧЬЯ!';
        stats.rps.draws++;
    } else if (
        (playerChoice === 'rock' && botChoice === 'scissors') ||
        (playerChoice === 'paper' && botChoice === 'rock') ||
        (playerChoice === 'scissors' && botChoice === 'paper')
    ) {
        result = '🎉 ТЫ ВЫИГРАЛ!';
        stats.rps.wins++;
    } else {
        result = '💀 ТЫ ПРОИГРАЛ!';
        stats.rps.losses++;
    }
    
    resultDiv.innerHTML = `
        <div class="rps-comparison">
            <div>Ты: ${emoji[playerChoice]}</div>
            <div>VS</div>
            <div>Бот: ${emoji[botChoice]}</div>
        </div>
        <div class="rps-result-text">${result}</div>
    `;
    
    saveStats();
    updateStats();
}

// 📊 Общие функции
function saveStats() {
    localStorage.setItem('gameStats', JSON.stringify(stats));
}

function updateStats() {
    const statsDisplay = document.getElementById('statsDisplay');
    statsDisplay.innerHTML = `
        <div>🎲 Бросков кубика: ${stats.dice}</div>
        <div>🪙 Орлов/Решек: ${stats.coin.heads}/${stats.coin.tails}</div>
        <div>🎯 Случайных выборов: ${stats.random}</div>
        <div>⏱️ Таймеров: ${stats.timer}</div>
        <div>🔢 Угадай число: ${stats.number.wins}/${stats.number.losses}</div>
        <div>✂️ КНБ: ${stats.rps.wins}/${stats.rps.losses}/${stats.rps.draws}</div>
    `;
}

// Загружаем статистику при старте
document.addEventListener('DOMContentLoaded', updateStats);