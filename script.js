const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const gridSize = 20;

let snake = [{ x: 100, y: 100 }];
let direction = { x: 0, y: 0 };

let food = { x: 140, y: 140 };

let score = 0;
let gameOver = false;
let gameLoopInterval;

const scoreDisplay = document.getElementById("score");

// Draw objects
function drawRect(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, gridSize, gridSize);
}

// Draw snake
function drawSnake() {
    snake.forEach(segment => {
        drawRect(segment.x, segment.y, "lime");
    });
}

// Draw food
function drawFood() {
    drawRect(food.x, food.y, "red");
}

// Place food randomly
function placeFood() {
    do {
        food.x = Math.floor(Math.random() * 20) * gridSize;
        food.y = Math.floor(Math.random() * 20) * gridSize;
    } while (
        snake.some(segment =>
            segment.x === food.x && segment.y === food.y
        )
    );
}

// Change direction
function changeDirection(newDirection) {

    if (newDirection === "up" && direction.y === 0) {
        direction = { x: 0, y: -1 };
    }

    else if (newDirection === "down" && direction.y === 0) {
        direction = { x: 0, y: 1 };
    }

    else if (newDirection === "left" && direction.x === 0) {
        direction = { x: -1, y: 0 };
    }

    else if (newDirection === "right" && direction.x === 0) {
        direction = { x: 1, y: 0 };
    }
}

// Keyboard controls
function handleKeyPress(event) {

    const keys = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right"
    };

    if (keys[event.key]) {
        event.preventDefault();
        changeDirection(keys[event.key]);
    }
}

// Update snake
function updateSnake() {

    const head = {
        x: snake[0].x + direction.x * gridSize,
        y: snake[0].y + direction.y * gridSize
    };

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.textContent = score;
        placeFood();
    } else {
        snake.pop();
    }

    // Wall collision
    if (
        head.x < 0 ||
        head.x >= canvas.width ||
        head.y < 0 ||
        head.y >= canvas.height
    ) {
        gameOver = true;
    }

    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (
            snake[i].x === head.x &&
            snake[i].y === head.y
        ) {
            gameOver = true;
            break;
        }
    }
}

// Game loop
function gameLoop() {

    if (gameOver) {
        clearInterval(gameLoopInterval);

        alert("Game Over! Your Score: " + score);

        restartGame();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawFood();
    drawSnake();

    updateSnake();
}

// Restart game
function restartGame() {

    snake = [{ x: 100, y: 100 }];
    direction = { x: 0, y: 0 };

    food = { x: 140, y: 140 };

    score = 0;
    scoreDisplay.textContent = score;

    gameOver = false;

    clearInterval(gameLoopInterval);

    gameLoopInterval = setInterval(gameLoop, 100);
}

// Event listener
document.addEventListener("keydown", handleKeyPress);

// Start game
restartGame();
