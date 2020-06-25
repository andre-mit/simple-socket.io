const app = require('express')();

const server = require('http').createServer(app);

const io = require('socket.io')(server);

interface Message {
    user: string;
    message: string;
}

let allMessages: Message[] = [];

io.on('connection', (socket: SocketIO.Socket) => {
    console.log('Client connected. Id: ' + socket.id);
    socket.emit('previousMessages',allMessages);

    socket.on('sendMessage', (message: Message) => {
        allMessages.push(message);

        console.log(message);
        
        socket.broadcast.emit('receivedMessage', message);
    });
});

server.listen(3333, () => {
    console.log('Server listening 3333');
});