export enum Player {
  X = 'x',
  O = 'o',
}

export enum Draw {
  XO = 'xo',
}

export type Winner = Player | Draw;

export type CellSymbol = 'X' | 'O' | '';

export type Grid = [
  [CellSymbol, CellSymbol, CellSymbol],
  [CellSymbol, CellSymbol, CellSymbol],
  [CellSymbol, CellSymbol, CellSymbol]
];

interface GameStatus {
  grid: Grid;
  currentPlayer: Player;
  isFinished: boolean;
  winner?: Winner;
}

export default GameStatus;
