var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


server.listen(3000);

app.get('/', function (req, res) {
      res.json({ welcome: 'to minesweeper online'});
});

var players     = [];
var gameBoard   = {};
var gameData = {};

io.on('connection', function (socket) {

    if( players.length === 1) {
        players.push({ 'player': 'p2', 'socket': socket} );
        socket.emit('joinGame', { player: 'p2', gameBoard: gameBoard });
        console.log('p2 has joined the game');
    }

    if( players.length === 0) {
        players.push({ 'player': 'p1', 'socket': socket} );
        console.log('init game');
        socket.emit('initGame', {player: 'p1'});
        console.log('p1 has joined the game');
    }

    socket.on('setGameBoard', function(data) {
        gameBoard = data;
    });

    socket.on('movement', function(data){

        //gameData.gameBoard = gameBoard;
        io.emit('rivalsMove', data);
        console.log('another player made his movement');
    });

});
