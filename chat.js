// chat.js - логика чата "Хорошее Настроение"

let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
let currentUser = localStorage.getItem('currentNickname');

// Показываем текущий ник при загрузке
document.addEventListener('DOMContentLoaded', function() {
    displayCurrentNickname();
    displayMessages();
    
    // Можно отправлять сообщения по Enter
    document.getElementById('messageInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});

// Установить ник
function setNickname() {
    const nicknameInput = document.getElementById('nicknameInput');
    let nickname = nicknameInput.value.trim();
    
    if (nickname === '') {
        // Если ник не ввели, создаем случайного гостя
        nickname = 'Гость_' + Math.floor(Math.random() * 1000);
    }
    
    currentUser = nickname;
    localStorage.setItem('currentNickname', nickname);
    
    displayCurrentNickname();
    nicknameInput.value = '';
    
    // УБРАЛ сообщение о присоединении к чату
}

// Показать текущий ник
function displayCurrentNickname() {
    const nicknameDisplay = document.getElementById('currentNickname');
    if (currentUser) {
        nicknameDisplay.textContent = `Твой ник: ${currentUser}`;
        nicknameDisplay.style.color = '#ff6b6b';
    } else {
        nicknameDisplay.textContent = 'Введи ник выше или останься Гостем';
        nicknameDisplay.style.color = '#666';
    }
}

// Отправить сообщение
function sendMessage() {
    const input = document.getElementById('messageInput');
    const text = input.value.trim();
    
    if (text === '') return;
    
    // Если пользователь не установил ник, создаем случайного гостя
    if (!currentUser) {
        currentUser = 'Гость_' + Math.floor(Math.random() * 1000);
        localStorage.setItem('currentNickname', currentUser);
        displayCurrentNickname();
    }
    
    // Добавляем сообщение
    const message = {
        user: currentUser,
        text: text,
        timestamp: new Date().toLocaleTimeString()
    };
    
    messages.push(message);
    localStorage.setItem('chatMessages', JSON.stringify(messages));
    
    // Очищаем поле ввода
    input.value = '';
    
    // Обновляем отображение
    displayMessages();
}

// Добавить системное сообщение (оставляем только для очистки чата)
function addSystemMessage(text) {
    const message = {
        user: 'Система',
        text: text,
        timestamp: new Date().toLocaleTimeString(),
        type: 'system'
    };
    
    messages.push(message);
    localStorage.setItem('chatMessages', JSON.stringify(messages));
    displayMessages();
}

// Показать все сообщения
function displayMessages() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = '';
    
    // Оставляем только приветственное сообщение если чат пустой
    if (messages.length === 0) {
        const welcomeMsg = document.createElement('div');
        welcomeMsg.className = 'message system-message';
        welcomeMsg.textContent = '🤡 Добро пожаловать в самый смешной чат! Напиши что-нибудь веселое!';
        chatMessages.appendChild(welcomeMsg);
    } else {
        // Показываем все сообщения кроме системных о присоединении
        messages.forEach(msg => {
            // Пропускаем системные сообщения о присоединении
            if (msg.type === 'system' && msg.text.includes('присоединился')) {
                return; // пропускаем это сообщение
            }
            
            const messageDiv = document.createElement('div');
            
            if (msg.type === 'system') {
                messageDiv.className = 'message system-message';
                messageDiv.textContent = msg.text;
            } else {
                const isCurrentUser = msg.user === currentUser;
                messageDiv.className = `message ${isCurrentUser ? 'user-message' : 'other-message'}`;
                messageDiv.innerHTML = `<strong>${msg.user}:</strong> ${msg.text}`;
            }
            
            chatMessages.appendChild(messageDiv);
        });
    }
    
    // Прокручиваем вниз
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ⚡ ОЧИСТИТЬ ЧАТ
function clearChat() {
    if (confirm('Точно очистить всю историю чата?')) {
        messages = [];
        localStorage.setItem('chatMessages', JSON.stringify(messages));
        displayMessages();
    }
}