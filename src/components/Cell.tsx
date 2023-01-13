import { ReactComponent as Cross } from 'assets/icons/cross.svg';
import { ReactComponent as Circle } from 'assets/icons/circle.svg';
import { CellSymbol } from 'models/GameStatus';

interface CellProps {
  symbol: CellSymbol;
  onClick: () => void;
  disabled: boolean;
}

const Cell = (props: CellProps): JSX.Element => {
  let symbol = <Circle className="cell--symbol empty" />;
  if (props.symbol === 'X') {
    symbol = <Cross className="cell--symbol" />;
  }
  if (props.symbol === 'O') {
    symbol = <Circle className="cell--symbol" />;
  }

  return (
    <button className="cell" onTouchStart={props.onClick} onClick={props.onClick} disabled={props.disabled}>
      {symbol}
    </button>
  );
};

export default Cell;
