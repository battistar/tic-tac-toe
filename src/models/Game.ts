export type CellValue = 'X' | 'O' | '';

export type Grid = [
  [CellValue, CellValue, CellValue],
  [CellValue, CellValue, CellValue],
  [CellValue, CellValue, CellValue]
];

export type Player = 'X' | 'O';

export type Winner = Player | 'XO';
