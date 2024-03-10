/* eslint-disable max-depth */
const generateBoard = (row, col) => {
  const grid = [];
  for (let i = 0; i < row; i++) {
    grid.push([]);
    for (let j = 0; j < col; j++) {
      const randomNum = Math.trunc(Math.random() * 2);
      if (randomNum === 0) {
        grid[i].push('⬜');
      } else {
        grid[i].push('⬛');
      }
    }
  }

  return grid;
};

const countAliveCells = (board, row, col) => {
  let aliveCounter = 0;

  for (let i = col; i < board[row].length - 1; i++) {
    aliveCounter = 0;
    if (board[row - 1][col] === '⬛') {
      aliveCounter++;
    }

    if (board[row - 1][col + 1] === '⬛') {
      aliveCounter++;
    }

    if (board[row][col + 1] === '⬛') {
      aliveCounter++;
    }

    if (board[row + 1][col + 1] === '⬛') {
      aliveCounter++;
    }

    if (board[row + 1][col] === '⬛') {
      aliveCounter++;
    }

    if (board[row + 1][col - 1] === '⬛') {
      aliveCounter++;
    }

    if (board[row][col - 1] === '⬛') {
      aliveCounter++;
    }

    if (board[row - 1][col - 1] === '⬛') {
      aliveCounter++;
    }
  }

  return aliveCounter;
};

const createTable = (board) => {
  const table = document.createElement('table');

  board.forEach((row) => {
    const tr = document.createElement('tr');

    row.forEach((cell) => {
      const td = document.createElement('td');
      td.textContent = cell;
      tr.appendChild(td);
    });

    table.appendChild(tr);
  });

  return table;
};

export const gameOfLife = () => {
  let gameBoard = generateBoard(20, 20);
  let table = createTable(gameBoard);
  const htmlBoard = document.querySelector('.game-board');
  const gameBtns = document.querySelector('.game-btns');

  htmlBoard.appendChild(table);

  function startRound() {
    const newBoard = [];
    for (let i = 0; i < gameBoard.length; i++) {
      newBoard.push([]);
      for (let j = 0; j < gameBoard[i].length; j++) {
        if (
          i > 0 &&
          i < gameBoard.length - 1 &&
          j > 0 &&
          j < gameBoard[i].length - 1
        ) {
          const aliveCells = countAliveCells(gameBoard, i, j);
          if (gameBoard[i][j] === '⬛') {
            if (aliveCells < 2 || aliveCells > 3) {
              newBoard[i].push('⬜');
            } else {
              newBoard[i].push('⬛');
            }
          }

          if (gameBoard[i][j] === '⬜') {
            if (aliveCells === 3) {
              newBoard[i].push('⬛');
            } else {
              newBoard[i].push('⬜');
            }
          }
        } else {
          newBoard[i].push('⬜');
        }
      }
    }

    gameBoard = newBoard;
    table = createTable(newBoard);
    const newTable = document.querySelector('.game-board table');
    newTable.innerHTML = table.innerHTML;
  }

  let isStarted = false;
  let intervalId;

  const onClickStart = () => {
    if (isStarted === false) {
      intervalId = setInterval(startRound, 500);
      isStarted = true;
    }
  };

  const onClickStop = () => {
    clearInterval(intervalId);
    isStarted = false;
  };

  gameBtns.children[0].addEventListener('click', onClickStart);
  gameBtns.children[1].addEventListener('click', onClickStop);
};
