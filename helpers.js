/* eslint-disable max-depth */
const generateBoard = () => {
  const grid = [
    [0, 0, 0, 0, 1, 0],
    [0, 1, 1, 0, 0, 0],
    [0, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 1, 1, 1, 1, 0],
    [0, 1, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ];
  return grid;
};

const countAliveCells = (board, row, col) => {
  let aliveCounter = 0;

  for (let i = col; i < board[row].length - 1; i++) {
    aliveCounter = 0;
    if (board[row - 1][col] === 1) {
      aliveCounter++;
    }

    if (board[row - 1][col + 1] === 1) {
      aliveCounter++;
    }

    if (board[row][col + 1] === 1) {
      aliveCounter++;
    }

    if (board[row + 1][col + 1] === 1) {
      aliveCounter++;
    }

    if (board[row + 1][col] === 1) {
      aliveCounter++;
    }

    if (board[row + 1][col - 1] === 1) {
      aliveCounter++;
    }

    if (board[row][col - 1] === 1) {
      aliveCounter++;
    }

    if (board[row - 1][col - 1] === 1) {
      aliveCounter++;
    }
  }

  return aliveCounter;
};

export const gameOfLife = () => {
  let gameBoard = generateBoard();
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
          if (gameBoard[i][j] === 1) {
            if (aliveCells < 2 || aliveCells > 3) {
              newBoard[i].push(0);
            } else {
              newBoard[i].push(1);
            }
          }

          if (gameBoard[i][j] === 0) {
            if (aliveCells === 3) {
              newBoard[i].push(1);
            } else {
              newBoard[i].push(0);
            }
          }
        } else {
          newBoard[i].push(0);
        }
      }
    }

    gameBoard = newBoard;
    console.log(newBoard);
  }

  setInterval(startRound, 1000);
};
