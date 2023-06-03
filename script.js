'use strict';

// Starting point
let gameActive = true;
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Query selectors
const cells = document.querySelectorAll('.cell');
const restartBtn = document.querySelector('.restart');
const start = document.querySelector('.start');
const container = document.querySelector('.container');
const display = document.querySelector('.display');
const winner = document.querySelector('.winner');
const winnerDisplay = document.querySelector('.winner-display');

// Event listeners
restartBtn.addEventListener('click', restartGame);
start.addEventListener('click', startGame);
cells.forEach(function (cell) {
  cell.addEventListener('click', handleClickedCell);
});

// Functions to handle the game logic
function handleClickedCell(e) {
  let clickedCell = e.currentTarget;

  let cellNum = clickedCell.getAttribute('data-cell');
  let cell = document.querySelector(`.cell-${cellNum}`);

  if (cell.children[0] || !gameActive) {
    return;
  }

  fillArray(cellNum);
  fillCell(cell);
  checkResult();
}

function fillArray(arg) {
  gameState[arg] = currentPlayer;
}

function fillCell(cell) {
  if (currentPlayer === 'X') {
    cell.innerHTML = `<img src="/img/cross.png" alt="">`;
  } else {
    cell.innerHTML = `<img src="/img/round.png" alt="">`;
  }
}

function checkResult() {
  let roundWon = false;
  for (let i = 0; i < 8; i++) {
    let currentCondition = winningConditions[i];
    let a = gameState[currentCondition[0]];
    let b = gameState[currentCondition[1]];
    let c = gameState[currentCondition[2]];

    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    displayWinner();
    gameActive = false;
    return;
  }

  let tie = !gameState.includes('');
  if (tie) {
    displayTie();
    gameActive = false;
    return;
  }

  changePlayer();
}

function startGame() {
  start.style = 'transform: translateY(-400%);';
  display.textContent = `'${currentPlayer}' TURN`;
}

function restartGame() {
  gameActive = true;
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  display.textContent = `'${currentPlayer}' TURN`;

  document.querySelectorAll('.cell').forEach(function (cell) {
    cell.innerHTML = '';
  });

  winner.classList.add('hide');
}

function changePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  display.textContent = `'${currentPlayer}' TURN`;
}

function displayWinner() {
  setTimeout(function () {
    winner.classList.remove('hide');
    winner.textContent = `'${currentPlayer}' won the game`;
  }, 500);
}

function displayTie() {
  setTimeout(function () {
    winner.classList.remove('hide');
    winner.textContent = `Tie!`;
  }, 500);
}
