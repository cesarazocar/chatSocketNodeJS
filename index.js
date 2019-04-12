const path = require('path');
const express = require('express');
const app = express();


//settings
app.set('port',process.env.PORT || 3000); //que tome el puerto del sistema operativo si hay uno configurado, sino que tome el 3000

//static files (archivos que no cambian)
//console.log(__dirname + '\public') //__dirname + '\public' path evita utilizar el \ 
app.use(express.static(path.join(__dirname,'public')));

//iniciar el server
const server = app.listen(app.get('port'),()=>{
    console.log('server on port', app.get('port'));
    });

const SocketIo = require('socket.io');
const io = SocketIo(server);

//websockets
io.on('connection',(socket)=>{ //socket es la variable que recibe desde chat.js
    console.log('new connection id:',socket.id);
    
    //escuchar evento del socket al cual estoy conectado
    socket.on('chat:message',(data)=>{ //recibe data (on es escuchar)

        //enviar a todos los usuarios incluyendo al que lo envió
        io.sockets.emit('chat:message',data);              //a todos los sockets que estan conectados vamos a emitirle un evento

        
    });
    
    socket.on('chat:typing',(userdata)=>{
        socket.broadcast.emit('chat:typing',userdata); //broadcast para enviar a todos los usuarios excepto al que lo envio
    });

});
