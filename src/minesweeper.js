
/*
const blankLine = '  |   |  ';
const guessLine = '1 |   |  ';
const bombLine = '  | B |  ';

console.log('This is what an empty board would look like:');
console.log(blankLine);
console.log(blankLine);
console.log(blankLine);

console.log('This is what a board with a guess and a bomb on it would look like:');
console.log(guessLine);
console.log(bombLine);
console.log(blankLine); */

/*
const printBoard = (board) => {
  console.log('Current Board');
  console.log(board[0].join (' | '));
  console.log(board[1].join (' | '));
  console.log(board[2].join (' | '));
}
const board = [ [' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' '] ];
console.log(printBoard(board));

board[0][1] = '1';
board[2][2] = 'B';
console.log(printBoard(board)); */

// Comment out the old code above this line

const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = [];
  for (let i = 0; i < numberOfRows; i++) {
    let row = [];
    for (let j = 0; j < numberOfColumns; j++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
}
// console.log(generatePlayerBoard(2, 3));

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = [];
  for (let i = 0; i < numberOfRows; i++) {
    let row = [];
    for (let j = 0; j < numberOfColumns; j++) {
      row.push(null);
    }
    board.push(row);
  }
let numberOfBombsPlaced = 0;
//The code in your while loop has the potential to place bombs on top of
// already existing bombs. This will be fixed when you learn about control flow.
while (numberOfBombsPlaced < numberOfBombs) {
  let randomRowIndex = Math.floor (Math.random() * numberOfRows);
  let randomColumnIndex = Math.floor (Math.random() * numberOfColumns);
  if (board[randomRowIndex][randomColumnIndex] !== 'B') {
    board[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
  }
  board[randomRowIndex][randomColumnIndex] = 'B';
  numberOfBombsPlaced++;

  }
  return board;
}

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  const neighborOffsets = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
    [1, 1] ];

    const numberOfRows = bombBoard.length;
    const numberOfColumns = bombBoard[0].length;
    let numberOfBombs = 0;
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if(neighborRowIndex >= 0 &&
        neighborRowIndex < numberOfRows &&
        neighborColumnIndex >= 0 &&
        neighborColumnIndex < numberOfColumns) {
          if(bombBoard[neighborRowIndex][0] == 'B') {
            numberOfBombs++;
          }
        }
        return numberOfBombs;
    });
}

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if (playerBoard[rowIndex][columnIndex] !== ' '){
    console.log('This tile has already been flipped');
    return;
  } else if (bombBoard[rowIndex][columnIndex] === 'B'){
      playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
}

const printBoard = (board) => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
};

let playerBoard = generatePlayerBoard(3, 3);
let bombBoard = generateBombBoard(3, 3, 3);
console.log('Player Board:');
printBoard(playerBoard);
console.log('Bomb Board:');
// bombBoard will sometimes have less bombs than specified due to the previously-mentioned missing code.
// Additionally, printing bombBoard will not look clean due to use of null instead of ' ' - this should just be for debugging, not presentation.
printBoard(bombBoard);
