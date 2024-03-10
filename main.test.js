import { generateBoard, countAliveCells } from './helpers.js';

describe('generateBoard', () => {
  test('should contain only ⬜ and ⬛ cells', () => {
    const board = generateBoard(20, 20);
    const validCells = ['⬜', '⬛'];
    expect(
      board.every((row) => row.every((cell) => validCells.includes(cell)))
    ).toBe(true);
  });
});

describe('countAliveCells', () => {
  test('should count alive cells correctly', () => {
    const board = [
      ['⬜', '⬜', '⬜'],
      ['⬜', '⬛', '⬜'],
      ['⬜', '⬜', '⬜'],
    ];
    expect(countAliveCells(board, 1, 1)).toBe(0);
  });
});
