'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
  // named export
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfRows = numberOfRows;
    this._numberOfColumns = numberOfColumns;
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns; // use to determine if game is over yet
    this._playerBoard = this.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = this.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Board, [{
    key: 'flipTile',
    value: function flipTile(rowIndex, columnIndex) {
      // Method for user to flip a tile

      // Has tile already been flipped by player?
      if (this._playerBoard[rowIndex][columnIndex] != '  ') {
        console.log('Tile has already been flipped!');
        return null;
      }

      // Is there a bomb? If so, place on player board
      else if (this._bombBoard[rowIndex][columnIndex].includes('B')) {
          this._playerBoard[rowIndex][columnIndex] = 'B ';
        }

        // No bomb? Then how many neighboring bombs?
        else {
            this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs([rowIndex, columnIndex]).toString() + ' ';
          }

      // decrement the number of tiles by one
      this._numberOfTiles--;
    }
  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(userBombGuess) {
      if (!Array.isArray(userBombGuess)) {
        return "User guess should be an array";
      }

      var offsetTiles = this._getOffsetTiles(this._bombedBoard, userBombGuess[0], userBombGuess[1]);

      numberBombs = 0;
      for (i = 0; i < offsetTiles.length; i++) {
        if (this._bombedBoard[offsetTiles[i][0]][offsetTiles[i][1]] == 'B ') {
          numberBombs++;
        }
      }

      return numberBombs;
    }

    // Helper function to get the coordinates of the sister cells as an array

  }, {
    key: '_getOffsetTiles',
    value: function _getOffsetTiles(bombedBoard, rowIndex, columnIndex) {
      boardRows = this._bombedBoard.length;
      boardColumns = this._bombedBoard[0].length;

      // Check that inputted row and index are realistic
      if (rowIndex < 0 || rowIndex > boardRows || columnIndex < 0 || columnIndex > boardColumns) {
        return 'invalid row or column index'; // TODO: change to console.log()?
      }

      // Create and return array with locations of neighbor indices
      return_array = [];

      for (var _i = -1; _i <= 1; _i++) {
        for (var j = -1; j <= 1; j++) {
          // Check eligble spaces around user choice, exclude that point itself
          if (rowIndex + _i < boardRows && rowIndex + _i >= 0 && columnIndex + j < boardColumns && columnIndex + j >= 0 && !(_i === 0 && j === 0)) {
            return_array.push([rowIndex + _i, columnIndex + j]);
          }
        }
      }
      return return_array;
    }
  }, {
    key: 'hasSafeTiles',
    value: function hasSafeTiles() {
      // a way to check if the user has won the game (has no more safe tiles)
      return this._numberOfBombs != this._numberOfTiles;
    }
  }, {
    key: 'print',
    value: function print() {
      // Function to print off Player board
      for (i = 0; i < this._playerBoard.length; i++) {
        console.log(this._playerBoard[i].join('|'));
      }
    }
  }, {
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      // don't forget .push()
      var board = [];
      for (var _i2 = 0; _i2 < numberOfRows; _i2++) {
        var row = [];
        for (var j = 0; j < numberOfColumns; j++) {
          row.push('  ');
        }
        board.push(row);
      }
      return board;
    }
  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      var board = this.generatePlayerBoard(numberOfRows, numberOfColumns);
      var bombedBoard = this.placeBombs(board, numberOfBombs);
      return bombedBoard;
    }
  }, {
    key: 'placeBombs',
    value: function placeBombs(board, numberOfBombs) {
      // assumes a blank board
      var rows = board.length;
      var columns = board[0].length;

      // check if number of bombs plausible
      if (numberOfBombs > rows * columns) {
        console.log('ERROR: more bombs than space on board'); // TODO: Is this the right way to do it?
        return null;
      }

      // insert each bomb into a spot on board not already occupied by a bomb
      var bombCounter = 0;
      while (bombCounter < numberOfBombs) {
        var guessRow = this.getRandomInt(rows);
        var guessColumn = this.getRandomInt(columns);
        if (board[guessRow][guessColumn] == 'B ') {
          continue;
        } else {
          board[guessRow][guessColumn] = 'B ';
          bombCounter++;
        };
      }
      return board;
    }
  }, {
    key: 'getRandomInt',
    value: function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }]);

  return Board;
}();