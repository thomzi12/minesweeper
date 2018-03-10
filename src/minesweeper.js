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

// Helper function to get the coordinates of the sister cells as an array
const _getOffsetTiles = (bombedBoard, rowIndex, columnIndex) => {
  boardRows = bombedBoard.length;
  boardColumns = bombedBoard[0].length;

  // Check that inputted row and index are realistic
  if (rowIndex < 0 || rowIndex>boardRows || columnIndex < 0
      || columnIndex > boardColumns){
    return 'invalid row or column index'
  }

  // Create and return array with locations of neighbor indices
  return_array = []

  for (let i = -1; i<=1; i++){
    for (let j = -1; j<=1; j++){
      // Check eligble spaces around user choice, exclude that point itself
      if (((rowIndex + i) < boardRows) && ((rowIndex + i) >= 0)
        && ((columnIndex + j) < boardColumns) && ((columnIndex + j) >= 0)
        && !(i === 0 && j === 0)){
           return_array.push([rowIndex + i, columnIndex + j])
          }
    }
  }
  return return_array;
}

// Function to display the number of bombs adjacent to the flipped tile
const getNumberOfNeighborBombs = (bombedBoard, userBombGuess) => {
  if (!Array.isArray(userBombGuess)){
    return "User guess should be an array"
  }

  let offsetTiles = _getOffsetTiles(bombedBoard, userBombGuess[0], userBombGuess[1]);

  numberBombs = 0
  for (i = 0; i< offsetTiles.length; i++){
    if (bombedBoard[offsetTiles[i][0]][offsetTiles[i][1]] == 'B '){
      numberBombs++;
    }
  }

  return numberBombs;
}

// Function for user to flip a tile
// Note: bombBoard is meant to be static. Update guesses to the player board
const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {

  // Has tile already been flipped by player?
  if (playerBoard[rowIndex][columnIndex] != '  '){
    console.log('Tile has already been flipped!');
  }

  // Is there a bomb? If so, place on player board
  else if (bombBoard[rowIndex][columnIndex].includes('B')){
    playerBoard[rowIndex][columnIndex] = 'B ';
  }

  // No bomb? Then how many neighboring bombs?
  else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard,
                                          [rowIndex, columnIndex]).toString()
                                          + ' ';
  }
  return playerBoard;
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

// codeCademyPrint(3,3,5);

// Mimic Codecademy functionality
const codeCademyFlipTilePrint = (numberOfRows, numberOfColumns, numberOfBombs,
                                guessRow, guessColumn) => {
  let playerBoard = generatePlayerBoard(3,3);
  let bombBoard = generateBombBoard(3,3,3);
  console.log('Player Board:');
  printBoard(playerBoard);
  console.log('Bomb Board');
  printBoard(bombBoard);
  console.log('Updated Player Board:');
  printBoard(flipTile(playerBoard, bombBoard, guessRow,guessColumn));
}

codeCademyFlipTilePrint(3,3,3,0,0);
