//io('http://midominio.com')
const socket = io();


let message = document.getElementById('message');
let username = document.getElementById('username');
//let uniqueId = socket.id;
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');
let typing = false;




//message.style.display = "none";
//message.style.display = "block";


function button(){
    if(btn.textContent=='Enviar'){
        socket.emit('chat:message',{
            message:message.value,
            username:username.value      
        });  
        message.value = ''; //cuando ya se envió borra lo que tenia escrito en la casilla mensaje
    } 
    if(btn.textContent=='Ingresar'){
        username.disabled=true;
        message.style.display = 'block';
        btn.textContent='Enviar';

        socket.emit('chat:newuser', {
            username:username.value
        });

    }    
}

btn.addEventListener('click',function(){

    button();
   
});



message.addEventListener('keyup',function(e){


    var key = e.which || e.keyCode;

    if (key == 8 || key == 46) {//tecla backspace || delete
        //console.log("backspace || delete up");    
        if(message.value.length == 0){
            typing=false;
            typingevent();
        }
        
      }


});



message.addEventListener('keypress',function(e){

    
        typing=true;
        
    

    var key = e.which || e.keyCode;
    if (key === 13) {//tecla enter 
        button();//enviar
      }
   

      typingevent();

    

    
});

function typingevent(){
    socket.emit('chat:typing', {       

        username:username.value,
        typing:typing
    });
}


function closingevent(){
    socket.emit('chat:closing', {       

        username:username.value
    });
}






socket.on('chat:newuser',function(data){
    //let uniqueId = socket.id;
    //console.log(data.uniqueId);
    console.log(data.username);


    output.innerHTML += `<p style="color:#575ed8;">
    <strong>${data.username}</strong>: is now connected </p>`;


});



socket.on('chat:message',function(data){// aunque tengan el mismo nombre con el que emite arriba son distintos porque uno (emit) emite y el otro (on) escucha
    
    actions.innerHTML = '';
    console.log(data);
    output.innerHTML += `<p>
    <strong>${data.username}</strong>: ${data.message}
    </p>`;

}) ;

socket.on('chat:typing',function(data){
    //en el json chat:typing enviamos el nombre del usuario que esta escribiendo (username) o que dejo de escribir
    
    //console.log(data.username+" esta escribiendo");
    
    if(data.typing){
        actions.innerHTML = `<p><em>${data.username} is typing a message</em></p>`;
    }else{
        actions.innerHTML= "";
    }
    
});

socket.on('chat:closing',function(data){
    //en el json chat:typing enviamos el nombre del usuario que esta escribiendo (username) o que dejo de escribir
    
    //console.log(data.username+" esta escribiendo");
    
    
        actions.innerHTML = `<p><em>${data.username} has left the room</em></p>`;
    
    
});

window.onbeforeunload = closingCode;

function closingCode(){
   
    closingevent();
   return null;
}