import Cell from 'components/Cell';
import CurrentPlayer from 'components/CurrentPlayer';
import Grid from 'components/Grid';
import WinnerBox from 'components/WinnerBox';
import GameStatus, { CellSymbol, Draw, Grid as GameStatusGrid, Player } from 'models/GameStatus';
import Point from 'models/Point';
import { useEffect, useRef, useState } from 'react';

const checkDraw = (grid: GameStatusGrid): boolean => {
  let emptyCells = 0;
  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];
    for (let j = 0; j < row.length; j++) {
      const cell = row[j];
      if (cell === '') {
        emptyCells++;
      }
    }
  }

  return emptyCells === 0;
};

const App = (): JSX.Element => {
  const [gameData, setGameData] = useState<GameStatus>({
    grid: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    currentPlayer: Player.X,
    isFinished: false,
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }
  }, []);

  const drawLine = (startPoint: Point, endPoint: Point): void => {
    if (canvasRef.current) {
      const canvasCtx = canvasRef.current.getContext('2d');

      if (canvasCtx) {
        canvasCtx.beginPath();
        canvasCtx.moveTo(startPoint.x, startPoint.y);
        canvasCtx.lineTo(endPoint.x, endPoint.y);
        canvasCtx.strokeStyle = '#FFFFFF';
        canvasCtx.lineWidth = 4;
        canvasCtx.stroke();
      }
    }
  };

  const clearCanvas = (): void => {
    if (canvasRef.current) {
      const canvasCtx = canvasRef.current.getContext('2d');

      if (canvasCtx) {
        canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  };

  const checkWin = (grid: GameStatusGrid): boolean => {
    // Rows

    if (grid[0][0] !== '' && grid[0][0] === grid[0][1] && grid[0][1] === grid[0][2]) {
      if (canvasRef.current) {
        drawLine(
          { x: 0, y: canvasRef.current.height / 6 },
          { x: canvasRef.current.width, y: canvasRef.current.height / 6 }
        );
      }

      return true;
    }

    if (grid[1][0] !== '' && grid[1][0] === grid[1][1] && grid[1][1] === grid[1][2]) {
      if (canvasRef.current) {
        drawLine(
          { x: 0, y: canvasRef.current.height / 2 },
          { x: canvasRef.current.width, y: canvasRef.current.height / 2 }
        );
      }

      return true;
    }

    if (grid[2][0] !== '' && grid[2][0] === grid[2][1] && grid[2][1] === grid[2][2]) {
      if (canvasRef.current) {
        drawLine(
          { x: 0, y: (canvasRef.current.height / 6) * 5 },
          { x: canvasRef.current.width, y: (canvasRef.current.height / 6) * 5 }
        );
      }

      return true;
    }

    // Columns

    if (grid[0][0] !== '' && grid[0][0] === grid[1][0] && grid[1][0] === grid[2][0]) {
      if (canvasRef.current) {
        drawLine(
          { x: canvasRef.current.width / 6, y: 0 },
          { x: canvasRef.current.width / 6, y: canvasRef.current.height }
        );
      }

      return true;
    }

    if (grid[0][1] !== '' && grid[0][1] === grid[1][1] && grid[1][1] === grid[2][1]) {
      if (canvasRef.current) {
        drawLine(
          { x: canvasRef.current.width / 2, y: 0 },
          { x: canvasRef.current.width / 2, y: canvasRef.current.height }
        );
      }

      return true;
    }

    if (grid[0][2] !== '' && grid[0][2] === grid[1][2] && grid[1][2] === grid[2][2]) {
      if (canvasRef.current) {
        drawLine(
          { x: (canvasRef.current.width / 6) * 5, y: 0 },
          { x: (canvasRef.current.width / 6) * 5, y: canvasRef.current.height }
        );
      }

      return true;
    }

    // Diagonal

    if (grid[0][0] !== '' && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
      if (canvasRef.current) {
        drawLine({ x: 0, y: 0 }, { x: canvasRef.current.width, y: canvasRef.current.height });
      }

      return true;
    }

    if (grid[0][2] !== '' && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
      if (canvasRef.current) {
        drawLine({ x: canvasRef.current.width, y: 0 }, { x: 0, y: canvasRef.current.height });
      }

      return true;
    }

    return false;
  };

  const handleClickCell = (row: number, column: number) => () => {
    setGameData((prevGameData) => {
      let symbol: CellSymbol;
      let nextPlayer: Player;
      if (prevGameData.currentPlayer === Player.X) {
        symbol = 'X';
        nextPlayer = Player.O;
      } else {
        symbol = 'O';
        nextPlayer = Player.X;
      }

      const grid = prevGameData.grid;

      grid[row][column] = symbol;

      const win = checkWin(grid);
      const draw = checkDraw(grid);

      let isFinished = false;
      let winner;
      if (win) {
        isFinished = true;
        winner = prevGameData.currentPlayer;
      }
      if (draw) {
        isFinished = true;
        winner = Draw.XO;
      }

      const newGameData: GameStatus = {
        grid: grid,
        currentPlayer: nextPlayer,
        isFinished: isFinished,
        winner: winner,
      };

      return newGameData;
    });
  };

  const handleClickNewGame = (): void => {
    clearCanvas();

    setGameData({
      grid: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      currentPlayer: Player.X,
      isFinished: false,
    });
  };

  return (
    <>
      <main>
        <div className="container">
          <div className="canvas--container">
            <canvas ref={canvasRef}></canvas>
            <Grid>
              <Cell
                onClick={handleClickCell(0, 0)}
                symbol={gameData.grid[0][0]}
                disabled={gameData.isFinished || gameData.grid[0][0] !== ''}
              />
              <Cell
                onClick={handleClickCell(0, 1)}
                symbol={gameData.grid[0][1]}
                disabled={gameData.isFinished || gameData.grid[0][1] !== ''}
              />
              <Cell
                onClick={handleClickCell(0, 2)}
                symbol={gameData.grid[0][2]}
                disabled={gameData.isFinished || gameData.grid[0][2] !== ''}
              />
              <Cell
                onClick={handleClickCell(1, 0)}
                symbol={gameData.grid[1][0]}
                disabled={gameData.isFinished || gameData.grid[1][0] !== ''}
              />
              <Cell
                onClick={handleClickCell(1, 1)}
                symbol={gameData.grid[1][1]}
                disabled={gameData.isFinished || gameData.grid[1][1] !== ''}
              />
              <Cell
                onClick={handleClickCell(1, 2)}
                symbol={gameData.grid[1][2]}
                disabled={gameData.isFinished || gameData.grid[1][2] !== ''}
              />
              <Cell
                onClick={handleClickCell(2, 0)}
                symbol={gameData.grid[2][0]}
                disabled={gameData.isFinished || gameData.grid[2][0] !== ''}
              />
              <Cell
                onClick={handleClickCell(2, 1)}
                symbol={gameData.grid[2][1]}
                disabled={gameData.isFinished || gameData.grid[2][1] !== ''}
              />
              <Cell
                onClick={handleClickCell(2, 2)}
                symbol={gameData.grid[2][2]}
                disabled={gameData.isFinished || gameData.grid[2][2] !== ''}
              />
            </Grid>
          </div>
          <CurrentPlayer player={gameData.currentPlayer} />
          {gameData.isFinished && <WinnerBox winner={gameData.winner} onClick={handleClickNewGame} />}
        </div>
      </main>
    </>
  );
};

export default App;
