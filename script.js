var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var food = {};
var score = 0;
var dir = '';
var renderTime = 200;

var snake = [
    {
        x: 5,
        y: 5
    }
];

canvas.width = 420;
canvas.height = 420;


createFood();

setInterval(function () {
    drawGame();
}, renderTime);


function drawGame() {
    ctx.clearRect(0, 0, 420, 420);
    foodCollision();
    drawFood();
    drawSnake();
    selfCollision();
    drawScore();
}

function selfCollision() {
    if (snake.length > 4) {
        var x = snake[0].x;
        var y = snake[0].y;
        for (var i = 4; i < snake.length; i++) {
            if (x === snake[i].x && y === snake[i].y) {
                dir = '';
                snake = [{x: 5, y: 5}];
                createFood();
                score = 0;
            }
        }
    }
}

function addSnake() {
    var x = snake[0].x;
    var y = snake[0].y;
    if (dir === 'left') x -= 1;
    if (dir === 'right') x += 1;
    if (dir === 'up') y -= 1;
    if (dir === 'down') y += 1;
    var obj = {};
    obj.x = x;
    obj.y = y;
    snake.unshift(obj);
    createFood();
    score++;
}

function foodCollision() {
    var x = snake[0].x;
    var y = snake[0].y;
    if (dir === 'left') x -= 1;
    if (dir === 'right') x += 1;
    if (dir === 'up') y -= 1;
    if (dir === 'down') y += 1;
    if (food.x === x && food.y === y) {
        var obj = {};
        obj.x = x;
        obj.y = y;
        snake.unshift(obj);
        createFood();
        score++;
        return;
    }
    moveSnake();
}

function drawScore() {
    ctx.fillStyle = "#00F";
    ctx.font = "18px Arial";
    ctx.fillText("score : " + score, 320, 400);
}

function moveSnake() {
    var x = 0;
    var y = 0;
    var obj = {};
    obj.x = snake[0].x;
    obj.y = snake[0].y;
    if (dir === 'left') x -= 1;
    if (dir === 'right') x += 1;
    if (dir === 'up') y -= 1;
    if (dir === 'down') y += 1;
    obj.x = wallCollision(obj.x + x);
    obj.y = wallCollision(obj.y + y);
    if (dir) {
        snake.pop();
        snake.unshift(obj);
    }
}

function wallCollision(val) {
    if (val < 0) val = 20;
    if (val > 20) val = 0;
    return val;
}

document.addEventListener('keydown', function (e) {
    var pressBtn = e.key;
    if (pressBtn === 'ArrowLeft' && dir !== 'right') dir = 'left';
    if (pressBtn === 'ArrowUp' && dir !== 'down') dir = 'up';
    if (pressBtn === 'ArrowRight' && dir !== 'left') dir = 'right';
    if (pressBtn === 'ArrowDown' && dir !== 'up') dir = 'down';

});

function drawFood() {
    var x = food.x * 20;
    // console.log(x);
    var y = food.y * 20;
    ctx.fillStyle = 'maroon';
    ctx.fillRect(x, y, 18, 18);
}

function createFood() {
    function randomInteger(min, max) {
        var rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
    }

    var x = randomInteger(0, 20);
    var y = randomInteger(0, 20);

    for (var i = 0; i < snake.length; i++) {
        if (x === snake[i].x && y === snake[i].y) {
            createFood();
            return;
        }
    }
    food.x = x;
    food.y = y;
}

function drawSnake() {
    ctx.fillStyle = 'green';
    for (var i = 0; i < snake.length; i++) {
        var x = snake[i].x * 20;
        var y = snake[i].y * 20;
        ctx.fillRect(x, y, 18, 18);
    }
}
