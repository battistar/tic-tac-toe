import Cell from 'components/Cell';
import CurrentPlayer from 'components/CurrentPlayer';
import Grid from 'components/Grid';
import WinnerBox from 'components/WinnerBox';
import { cloneDeep } from 'lodash';
import { Winner, Player, Grid as GameGrid } from 'models/Game';
import { useCallback, useEffect, useReducer, useRef } from 'react';

interface GameStatus {
  grid: GameGrid;
  currentPlayer: 'X' | 'O';
  winner?: Winner;
}

type GameAction =
  | { type: 'UPDATE_GRID'; payload: GameGrid }
  | { type: 'SET_CURRENT_PLAYER'; payload: Player }
  | { type: 'SET_WINNER'; payload: Winner }
  | { type: 'RESET' };

interface Point {
  x: number;
  y: number;
}

interface Line {
  start: Point;
  end: Point;
}

const initialGameState: GameStatus = {
  grid: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  currentPlayer: 'X',
};

const App = (): JSX.Element => {
  const [gameStatus, dispatch] = useReducer((state: GameStatus, action: GameAction) => {
    switch (action.type) {
      case 'UPDATE_GRID':
        return { ...state, grid: action.payload };
      case 'SET_CURRENT_PLAYER':
        return { ...state, currentPlayer: action.payload };
      case 'SET_WINNER':
        return { ...state, winner: action.payload };
      case 'RESET':
        return initialGameState;
    }
  }, initialGameState);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }
  }, []);

  const drawLine = useCallback((line: Line): void => {
    if (canvasRef.current) {
      const canvasCtx = canvasRef.current.getContext('2d');

      if (canvasCtx) {
        canvasCtx.beginPath();
        canvasCtx.moveTo(line.start.x, line.start.y);
        canvasCtx.lineTo(line.end.x, line.end.y);
        canvasCtx.strokeStyle = '#FFFFFF';
        canvasCtx.lineWidth = 4;
        canvasCtx.stroke();
      }
    }
  }, []);

  const clearCanvas = useCallback((): void => {
    if (canvasRef.current) {
      const canvasCtx = canvasRef.current.getContext('2d');

      if (canvasCtx) {
        canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  }, []);

  const checkWin = useCallback((grid: GameGrid): Line | null => {
    let result = null;

    // Rows

    if (canvasRef.current && grid[0][0] !== '' && grid[0][0] === grid[0][1] && grid[0][1] === grid[0][2]) {
      result = {
        start: { x: 0, y: canvasRef.current.height / 6 },
        end: { x: canvasRef.current.width, y: canvasRef.current.height / 6 },
      };
    }

    if (canvasRef.current && grid[1][0] !== '' && grid[1][0] === grid[1][1] && grid[1][1] === grid[1][2]) {
      result = {
        start: { x: 0, y: canvasRef.current.height / 2 },
        end: { x: canvasRef.current.width, y: canvasRef.current.height / 2 },
      };
    }

    if (canvasRef.current && grid[2][0] !== '' && grid[2][0] === grid[2][1] && grid[2][1] === grid[2][2]) {
      result = {
        start: { x: 0, y: (canvasRef.current.height / 6) * 5 },
        end: { x: canvasRef.current.width, y: (canvasRef.current.height / 6) * 5 },
      };
    }

    // Columns

    if (canvasRef.current && grid[0][0] !== '' && grid[0][0] === grid[1][0] && grid[1][0] === grid[2][0]) {
      result = {
        start: { x: canvasRef.current.width / 6, y: 0 },
        end: { x: canvasRef.current.width / 6, y: canvasRef.current.height },
      };
    }

    if (canvasRef.current && grid[0][1] !== '' && grid[0][1] === grid[1][1] && grid[1][1] === grid[2][1]) {
      result = {
        start: { x: canvasRef.current.width / 2, y: 0 },
        end: { x: canvasRef.current.width / 2, y: canvasRef.current.height },
      };
    }

    if (canvasRef.current && grid[0][2] !== '' && grid[0][2] === grid[1][2] && grid[1][2] === grid[2][2]) {
      result = {
        start: { x: (canvasRef.current.width / 6) * 5, y: 0 },
        end: { x: (canvasRef.current.width / 6) * 5, y: canvasRef.current.height },
      };
    }

    // Diagonal

    if (canvasRef.current && grid[0][0] !== '' && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
      result = { start: { x: 0, y: 0 }, end: { x: canvasRef.current.width, y: canvasRef.current.height } };
    }

    if (canvasRef.current && grid[0][2] !== '' && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
      result = { start: { x: canvasRef.current.width, y: 0 }, end: { x: 0, y: canvasRef.current.height } };
    }

    return result;
  }, []);

  const checkDraw = useCallback((grid: GameGrid): boolean => {
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
  }, []);

  const handleClickCell = useCallback(
    (row: number, column: number) => () => {
      const grid = cloneDeep(gameStatus.grid);

      if (gameStatus.currentPlayer === 'X') {
        grid[row][column] = 'X';
        dispatch({ type: 'UPDATE_GRID', payload: grid });
        dispatch({ type: 'SET_CURRENT_PLAYER', payload: 'O' });
      } else {
        grid[row][column] = 'O';
        dispatch({ type: 'UPDATE_GRID', payload: grid });
        dispatch({ type: 'SET_CURRENT_PLAYER', payload: 'X' });
      }

      const winnerLine = checkWin(grid);
      if (winnerLine !== null) {
        drawLine(winnerLine);
        dispatch({ type: 'SET_WINNER', payload: gameStatus.currentPlayer });
      } else {
        const draw = checkDraw(grid);
        if (draw) {
          dispatch({ type: 'SET_WINNER', payload: 'XO' });
        }
      }
    },
    [checkDraw, checkWin, drawLine, gameStatus.currentPlayer, gameStatus.grid]
  );

  const handleClickNewGame = useCallback((): void => {
    clearCanvas();

    dispatch({ type: 'RESET' });
  }, [clearCanvas]);

  return (
    <>
      <main>
        <div className="container">
          <div className="canvas--container">
            <canvas ref={canvasRef}></canvas>
            <Grid>
              <Cell
                onClick={handleClickCell(0, 0)}
                symbol={gameStatus.grid[0][0]}
                disabled={gameStatus.winner !== undefined || gameStatus.grid[0][0] !== ''}
              />
              <Cell
                onClick={handleClickCell(0, 1)}
                symbol={gameStatus.grid[0][1]}
                disabled={gameStatus.winner !== undefined || gameStatus.grid[0][1] !== ''}
              />
              <Cell
                onClick={handleClickCell(0, 2)}
                symbol={gameStatus.grid[0][2]}
                disabled={gameStatus.winner !== undefined || gameStatus.grid[0][2] !== ''}
              />
              <Cell
                onClick={handleClickCell(1, 0)}
                symbol={gameStatus.grid[1][0]}
                disabled={gameStatus.winner !== undefined || gameStatus.grid[1][0] !== ''}
              />
              <Cell
                onClick={handleClickCell(1, 1)}
                symbol={gameStatus.grid[1][1]}
                disabled={gameStatus.winner !== undefined || gameStatus.grid[1][1] !== ''}
              />
              <Cell
                onClick={handleClickCell(1, 2)}
                symbol={gameStatus.grid[1][2]}
                disabled={gameStatus.winner !== undefined || gameStatus.grid[1][2] !== ''}
              />
              <Cell
                onClick={handleClickCell(2, 0)}
                symbol={gameStatus.grid[2][0]}
                disabled={gameStatus.winner !== undefined || gameStatus.grid[2][0] !== ''}
              />
              <Cell
                onClick={handleClickCell(2, 1)}
                symbol={gameStatus.grid[2][1]}
                disabled={gameStatus.winner !== undefined || gameStatus.grid[2][1] !== ''}
              />
              <Cell
                onClick={handleClickCell(2, 2)}
                symbol={gameStatus.grid[2][2]}
                disabled={gameStatus.winner !== undefined || gameStatus.grid[2][2] !== ''}
              />
            </Grid>
          </div>
          <CurrentPlayer player={gameStatus.currentPlayer} />
          {gameStatus.winner !== undefined && <WinnerBox winner={gameStatus.winner} onClick={handleClickNewGame} />}
        </div>
      </main>
    </>
  );
};

export default App;
