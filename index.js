// Dependencias
const express = require('express'); // Rutas y peticiones HTTP
const http = require('http'); // Creamos un servidor HTTP
const { Server } = require('socket.io');

//Inicializacion del servidor y Socket.io
const app = express(); // Creamos la aplicacion express(nos ayuda a las rutas)
const server = http.createServer(app) // Envolvemos la app
const io = new Server(server);// conexiones entrantes
const port = 3000;

app.get('/', (req,res) => {
    res.sendfile(__dirname +'/index.html')
})

io.on('connection', (socket) => { // Cuando un cliente nuevo se conecta
  console.log('Un usuario se ha conectado');

  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
