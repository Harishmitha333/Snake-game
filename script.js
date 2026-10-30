const canvas = document.getElementById("gameCanvas");

const ctx = canvas.getContext("2d");

//canvas size
canvas.width = 400;
canvas.height = 400;

const gridSize = 20;
let snake = [{ x: gridSize * 5, y: gridSize * 5}];
let direction = { x: 0, y: 0};
let food = { x: gridSize * 7, y: gridSize * 7};
let gameOver = false;
let gameLoopInterval;

function drawRect(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, gridSize, gridSize);
}

function drawSnake() {
    snake.forEach((segment) => drawRect(segment.x, segment.y, "lime"));
}

function drawFood() {
    drawRect(food.x, food.y, "red");
}

function updateSnake() {
    const head = {
        x: snake[0].x + direction.x * gridSize,
        y: snake[0].y + direction.y * gridSize,
    };

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        placeFood();
    } else {
        snake.pop();
    }

    // to check collision with walls
    if(
        head.x < 0 ||
        head.x >= canvas.width ||
        head.y < 0 ||
        head.y >= canvas.height
    ) {
        gameOver = true;
    }

    // collision with itself
    for( let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            gameOver = true;
        }
    }
}

function placeFood() {
    food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
}

function handleKeyPress(event) {
    const { key } = event;
    if (key === "ArrowUp" && direction.y === 0) direction = { x: 0, y: -1 };
    if (key === "ArrowDown" && direction.y === 0) direction = { x: 0, y: 1 };
    if (key === "ArrowLeft" && direction.x === 0) direction = { x: -1, y: 0 };
    if (key === "ArrowRight" && direction.x === 0) direction = { x: 1, y: 0 };
}

function gameLoop() {
    if (gameOver) {
        clearInterval(gameLoopInterval);
        alert("Game Over! Press OK to restart.");
        restartGame();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    drawSnake();
    updateSnake();
}

function restartGame() {
    snake = [{ x: gridSize * 5, y: gridSize * 5 }];
    direction = { x: 0, y: 0};
    food = { x: gridSize * 7, y: gridSize * 7 };
    gameOver = false;
    gameLoopInterval = setInterval(gameLoop, 100);
}

document.addEventListener("keydown", handleKeyPress);
restartGame();