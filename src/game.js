import {Board} from './board'; // since named export, use curly bracket

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
