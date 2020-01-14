export default function createGame() {

    const state = {
        players: {},
        fruits: {},
        screen: {
            width: 10,
            height: 10
        }
    }

    function addPlayer(command) {
        const playerId = command.playerId;
        const playerX = command.playerX;
        const playerY = command.playerY;

        state.players[playerId] = {
            x: playerX,
            y: playerY
        }
    }

    function removePlayer(command) {
        const playerId = command.playerId;
        delete state.players[playerId];
    }

    function addFruit(command) {
        const fruitId = command.fruitId;
        const fruitX = command.fruitX;
        const fruitY = command.fruitY;

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        }
    }

    function removeFruit(command) {
        const fruitId = command.fruitId;
        delete state.fruits[fruitId];
    }

    function movePlayer(command) {
        //console.log(`Moving ${command.playerId} with ${command.keyPressed}`);

        const acceptedMoves = {
            ArrowUp() {
                //console.log('UP');
                if(player.y - 1 >= 0) {
                    player.y = player.y - 1;
                    return;
                }
            },
            ArrowDown() {
                //console.log('DOWN');
                if(player.y + 1 < state.screen.height) {
                    player.y = player.y + 1;
                    return;
                }
            },
            ArrowLeft() {
                //console.log('LEFT');
                if(player.x - 1 >= 0) {
                    player.x = player.x - 1;
                    return;
                }
            },
            ArrowRight() {
                // console.log('RIGHT');
                if(player.x + 1 < state.screen.width) {
                    player.x = player.x + 1;
                    return;
                }
            }
        }

        function checkCollision(playerId) {
            for(const fruitId in state.fruits) {
                const player = state.players[playerId];
                const fruit = state.fruits[fruitId];
                if(player.x === fruit.x && player.y === fruit.y) {
                    console.log(`COLLISION! ${playerId} and ${fruitId} collided!`);
                    removeFruit({fruitId});
                }
            }
        }

        const keyPressed = command.keyPressed;
        const playerId = command.playerId;
        const player = state.players[command.playerId];
        const moveFunction = acceptedMoves[keyPressed]

        if(player && moveFunction) {
            moveFunction(player);
            checkCollision(playerId);
        }

        return //temp
    }

    return {
        addPlayer,
        removePlayer,
        movePlayer,
        addFruit,
        removeFruit,
        state
    }
}