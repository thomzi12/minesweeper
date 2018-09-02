'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _board = require('./board');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// since named export, use curly bracket

var Game = function () {
  function Game(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Game);

    this._board = new _board.Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Game, [{
    key: 'playMove',
    value: function playMove(rowIndex, columnIndex) {
      // flip a tile
      this._board.flipTile(rowIndex, columnIndex);
      // let a user know if bomb discovered
      // allow user to keep going if appropriate
      if (this._board._playerBoard[rowIndex][columnIndex].includes('B')) {
        console.log('You chose a bomb! Game over');
        this._board.print();
      } else if (this._board.hasSafeTiles()) {
        console.log('Current Board:');
        this._board.print();
        //this._board.flipTile(rowIndex, columnIndex);
      } else {
        console.log('You win!');
        this._board.print();
      }
    }
  }]);

  return Game;
}();