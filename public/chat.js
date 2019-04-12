//io('http://midominio.com')
const socket = io();


let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click',function(){
    socket.emit('chat:message',{
        message:message.value,
        username:username.value
    });
    
console.log(username.value, message.value);
    message.value = ''; //cuando ya se envió borra lo que tenia escrito en la casilla mensaje
});

message.addEventListener('keypress',function(){
    socket.emit('chat:typing', username.value);
});

socket.on('chat:message',function(data){// aunque tengan el mismo nombre con el que emite arriba son distintos porque uno emite y el otro lo escucha
    
    actions.innerHTML = '';
    console.log(data);
    output.innerHTML += `<p>
    <strong>${data.username}</strong>: ${data.message}
    </p>`;

}) ;

socket.on('chat:typing',function(data){
    actions.innerHTML = `<p><em>${data} is typing a message</em></p>`;
});