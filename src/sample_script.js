import {Board} from './board';
import {Game} from '.game';

/* ----------------------------------------//----------------------------------
Hi! This is scrap paper with functions that imitate Codecademy example
functionality from the Build Web Applications from Scratch course
----------------------------------------//---------------------------------- */

// Mimic Codecademy functionality
const codeCademyPrint = (numberOfRows, numberOfColumns, numberOfBombs) => {
  console.log('Player Board:');
  printBoard(Board.generatePlayerBoard(numberOfRows,numberOfColumns));
  console.log('Bomb Board:');
  printBoard(Board.generateBombBoard(numberOfRows,numberOfColumns,numberOfBombs));
}

// codeCademyPrint(3,3,5);

// Mimic Codecademy functionality
const codeCademyFlipTilePrint = (numberOfRows, numberOfColumns, numberOfBombs,
                                guessRow, guessColumn) => {
  let playerBoard = Board.generatePlayerBoard(3,3);
  let bombBoard = Board.generateBombBoard(3,3,3);
  console.log('Player Board:');
  printBoard(playerBoard);
  console.log('Bomb Board');
  printBoard(bombBoard);
  console.log('Updated Player Board:');
  printBoard(flipTile(playerBoard, bombBoard, guessRow,guessColumn));
}

// codeCademyFlipTilePrint(3,3,3,0,0);

const g = new Game(3,3,3);
