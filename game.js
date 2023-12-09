import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
  snakeIntersection,
  getSnakeHead,
} from "./shake.js";
import { update as updateFood, draw as drawFood } from "/food.js";
import { outsideGrid } from "./grid.js";

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById("game-board");

function main(cuurentTime) {
  if (gameOver) {
    if (confirm("You lost. Press ok to restart")) {
      window.location = "/";
    }
    return;
  }
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (cuurentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
  lastRenderTime = cuurentTime;

  update();
  draw();
}
// draw();
window.requestAnimationFrame(main);

function update() {
  updateSnake();
  updateFood();
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
