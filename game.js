const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const playerPoint = document.getElementById('playerPoints');
const machinePoints = document.getElementById('machinePoints');


const playerRacketPos = {
    x: 0,
    y: 150
}

const ballPosition = {
    x: 600,
    y: 300,
}

var point = 1

var ballDirection = 'leftTop'



function generateRackets() {
    ctx.fillStyle = 'white'
    ctx.fillRect(playerRacketPos.x, playerRacketPos.y, 20, 300);

    ctx.fillStyle = 'white'
    ctx.fillRect(1180, 150, 20, 300);
};

function generateBoll() {
    ctx.beginPath();
    ctx.arc(ballPosition.x, ballPosition.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
}

function moveBall() {

    if(!ballDirection) {
        return
    }

    if(ballDirection === 'leftTop'){
        ballPosition.x -= 10
        ballPosition.y -= 10
    }
    if(ballDirection === 'rightTop'){
        ballPosition.x += 10
        ballPosition.y -= 10
    }
    if(ballDirection === 'rightDown') {
        ballPosition.x += 10
        ballPosition.y += 10
    }
    if(ballDirection === 'leftDown'){
        ballPosition.x -= 10
        ballPosition.y += 10
    }
}

function checkCollision() {
    if(ballDirection === 'leftTop' && ballPosition.y == 10){
        ballDirection = 'leftDown'
    }
    if(ballDirection === 'leftDown' && ballPosition.y == 600){
        ballDirection = 'leftTop'
    }
    if(ballDirection === 'rightTop' && ballPosition.y == 10){
        ballDirection = 'rightDown'
    }

    if(ballDirection === 'rightDown' && ballPosition.y == 600){
        ballDirection = 'rightTop'
    }

    // racket collision

    if(ballDirection === 'leftDown' && ballPosition.x == 20 && ballPosition.y >= playerRacketPos.y && ballPosition.y <= playerRacketPos.y + 300){
        ballDirection = 'rightDown'
    }

    if(ballDirection === 'leftTop' && ballPosition.x == 20 && ballPosition.y >= playerRacketPos.y && ballPosition.y <= playerRacketPos.y + 300){
        ballDirection = 'rightTop'
    }

    if(ballDirection === 'rightDown' && ballPosition.x == 1190 && ballPosition.y >= playerRacketPos.y && ballPosition.y <= playerRacketPos.y + 300){
        ballDirection = 'leftDown'
    }

    if(ballDirection === 'rightTop' && ballPosition.x == 1190 && ballPosition.y >= playerRacketPos.y && ballPosition.y <= playerRacketPos.y + 300){
        ballDirection = 'rightTop'
    }

    if(ballPosition.x === 0) {
        machinePoints.innerText = parseInt(machinePoints.innerText) + point
        ballPosition.x = 600
        ballPosition.y = 300
        ballDirection = 'leftTop'
    }

    if(ballPosition.x === 1200) {
        playerPoint.innerText = parseInt(playerPoint.innerText) + point
        ballPosition.x = 600
        ballPosition.y = 300
        ballDirection = 'leftTop'
    }

}

function moveRacket(e) {
    if (e.key === 'ArrowUp' && playerRacketPos.y > 0) {
        playerRacketPos.y -= 20
    } else if (e.key === 'ArrowDown' && playerRacketPos.y < 300) {
        playerRacketPos.y += 20
    }
}

document.addEventListener('keydown', moveRacket)

    setInterval(() => {
        ctx.clearRect(0,0, 1200, 600)
        checkCollision()
        moveBall()
        generateBoll()
        generateRackets()
    }, 50)
