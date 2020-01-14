import express from 'express';
import http from 'http';
import socketio from 'socket.io';

import createGame from './public/createGame.js';

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);

app.use(express.static('public'));

const game = createGame();
game.addPlayer({playerId: 'pl1', playerX: 0, playerY:0});
game.addPlayer({playerId: 'pl2', playerX: 2, playerY:2});
game.addPlayer({playerId: 'pl3', playerX: 4, playerY:4});

game.addFruit({fruitId: 'fr1', fruitX: 9, fruitY: 9});
game.addFruit({fruitId: 'fr2', fruitX: 6, fruitY: 6});

sockets.on('connection', (socket) => {
    const playerId = socket.id;
    console.log(`> Player Connected on Server with id ${playerId}`);

    socket.emit('setup', game.state);
})

server.listen(3000, () => {
    console.log('server listening on port 3000');
})