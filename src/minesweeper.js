class Game {
  constructor (numberOfRows, numberOfColumns, numberOfBombs){
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove (rowIndex, columnIndex){
    // flip a tile
    this._board.flipTile(rowIndex, columnIndex);
    // let a user know if bomb discovered
    // allow user to keep going if appropriate
    if (this._board._playerBoard[rowIndex][columnIndex].includes('B')){
      console.log('You chose a bomb! Game over');
      this._board.print()
    }
    else if (this._board.hasSafeTiles()){
      console.log('Current Board:');
      this._board.print();
      //this._board.flipTile(rowIndex, columnIndex);
    }
    else {
      console.log('You win!');
      this._board.print()
    }

  }
}

class Board {
  constructor (numberOfRows, numberOfColumns, numberOfBombs){
    this._numberOfRows = numberOfRows;
    this._numberOfColumns = numberOfColumns;
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns; // use to determine if game is over yet
    this._playerBoard = this.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = this.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard(){
    return this._playerBoard;
  }

  flipTile (rowIndex, columnIndex){
    // Method for user to flip a tile

    // Has tile already been flipped by player?
    if (this._playerBoard[rowIndex][columnIndex] != '  '){
      console.log('Tile has already been flipped!');
      return null;
    }

    // Is there a bomb? If so, place on player board
    else if (this._bombBoard[rowIndex][columnIndex].includes('B')){
      this._playerBoard[rowIndex][columnIndex] = 'B ';
    }

    // No bomb? Then how many neighboring bombs?
    else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(
                                            [rowIndex, columnIndex]).toString()
                                            + ' ';
    }

    // decrement the number of tiles by one
    this._numberOfTiles--;
  }

  getNumberOfNeighborBombs (userBombGuess) {
    if (!Array.isArray(userBombGuess)){
      return "User guess should be an array"
    }

    let offsetTiles = this._getOffsetTiles(this._bombedBoard, userBombGuess[0], userBombGuess[1]);

    numberBombs = 0
    for (i = 0; i< offsetTiles.length; i++){
      if (this._bombedBoard[offsetTiles[i][0]][offsetTiles[i][1]] == 'B '){
        numberBombs++;
      }
    }

    return numberBombs;
  }

  // Helper function to get the coordinates of the sister cells as an array
  _getOffsetTiles (bombedBoard, rowIndex, columnIndex) {
    boardRows = this._bombedBoard.length;
    boardColumns = this._bombedBoard[0].length;

    // Check that inputted row and index are realistic
    if (rowIndex < 0 || rowIndex>boardRows || columnIndex < 0
        || columnIndex > boardColumns){
      return 'invalid row or column index' // TODO: change to console.log()?
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

  hasSafeTiles() {
    // a way to check if the user has won the game (has no more safe tiles)
    return this._numberOfBombs != this._numberOfTiles;
  }

  print() {
    // Function to print off Player board
    for (i=0; i<this._playerBoard.length; i++){
      console.log(this._playerBoard[i].join('|'));
    }
  }

  generatePlayerBoard (numberOfRows, numberOfColumns) {
    // don't forget .push()
    let board = []
    for (let i=0; i < numberOfRows; i++){
      let row = []
        for (let j=0; j < numberOfColumns; j++){
          row.push('  ')
        }
      board.push(row)
    }
    return board
  }

  generateBombBoard (numberOfRows, numberOfColumns, numberOfBombs){
    let board = this.generatePlayerBoard(numberOfRows, numberOfColumns);
    let bombedBoard = this.placeBombs(board, numberOfBombs);
    return bombedBoard;
  }

  placeBombs (board, numberOfBombs) {
    // assumes a blank board
    let rows = board.length;
    let columns = board[0].length;

    // check if number of bombs plausible
    if (numberOfBombs > rows*columns){
      console.log('ERROR: more bombs than space on board') // TODO: Is this the right way to do it?
      return null;
    }

    // insert each bomb into a spot on board not already occupied by a bomb
    let bombCounter =0
    while (bombCounter < numberOfBombs){
      let guessRow = this.getRandomInt(rows);
      let guessColumn = this.getRandomInt(columns);
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

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}

// ----------------------------------------// ----------------------------------

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

// codeCademyFlipTilePrint(3,3,3,0,0);

const g = new Game(3,3,3);
