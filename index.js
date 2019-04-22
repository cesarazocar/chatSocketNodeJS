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
    
    server.getConnections(function(error, count) {
        console.log('server conections: '+count);    
        });

    console.log('new connection id:', socket.id);

    socket.on('chat:newuser',(userdata)=>{
        console.log('username connected:'+userdata.username);
        socket.broadcast.emit('chat:newuser',{
            uniqueId: socket.id,
            username: userdata.username
        
        });
    });


  

    
    /*socket.emit('chat:typing', {
        uniqueId:socket.id
    });*/
    
    //escuchar evento del socket al cual estoy conectado
    socket.on('chat:message',(data)=>{ //recibe data (on es escuchar)

        //enviar a todos los usuarios incluyendo al que lo envió
        io.sockets.emit('chat:message',data);              //a todos los sockets que estan conectados vamos a emitirle un evento mensaje
        console.log(data.username+" says: "+data.message)
       
    });
    
    socket.on('chat:typing',(userdata)=>{
        socket.broadcast.emit('chat:typing',userdata); //broadcast para enviar a todos los usuarios excepto al que lo envio
        

    });

    socket.on('chat:closing',(userdata)=>{
        socket.broadcast.emit('chat:closing',userdata); //broadcast para enviar a todos los usuarios excepto al que lo envio
        console.log('user '+userdata.username+' left the room');

    });

});
