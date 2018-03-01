// two boards: one for player's guesses and the other
// for bomb locations

const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  // don't forget .push()
  board = []
  for (i=0; i < numberOfRows; i++){
    row = []
      for (j=0; j < numberOfColumns; j++){
        row.push('  ')
      }
    board.push(row)
  }
  return board
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const placeBombs = (board, numberOfBombs) => {
  // assumes a blank board
  let rows = board.length;
  let columns = board[0].length;

  // check if number of bombs plausible
  if (numberOfBombs > rows*columns){
    return 'ERROR: more bombs than space on board'
  }

  // insert each bomb into a spot on board not already occupied by a bomb
  let bombCounter =0
  while (bombCounter < numberOfBombs){
    let guessRow = getRandomInt(rows);
    let guessColumn = getRandomInt(columns);
    if (board[guessRow][guessColumn] == 'B '){
      continue;
    }
    else {
      board[guessRow][guessColumn] = 'B '
      bombCounter++;
    };
  }
  return board
}

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = generatePlayerBoard(numberOfRows, numberOfColumns);
  let bombedBoard = placeBombs(board, numberOfBombs);
  return bombedBoard;
}

// Function to print off board
const printBoard = (board) => {
  for (i=0; i<board.length; i++){
    console.log(board[i].join('|'));
  }
}


// Mimic Codecademy functionality
const codeCademyPrint = (numberOfRows, numberOfColumns, numberOfBombs) => {
  console.log('Player Board:');
  printBoard(generatePlayerBoard(numberOfRows,numberOfColumns));
  console.log('Bomb Board:');
  printBoard(generateBombBoard(numberOfRows,numberOfColumns,numberOfBombs));
}

codeCademyPrint(3,3,5);
