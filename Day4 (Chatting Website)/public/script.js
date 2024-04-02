const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const nameInput = document.getElementById('name');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value && nameInput.value) {
        socket.emit('chat message', input.value, nameInput.value);
        input.value = '';
        nameInput.value = '';
    }
    else{
        alert('Please enter a name and a message');
    }
});

socket.on('chat message', (msg) => {
    const item = document.createElement('li');
    item.textContent = `${msg.username}: ${msg.msg}`;
    document.getElementById('messages').appendChild(item);
});