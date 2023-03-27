import { ReactComponent as Cross } from 'assets/icons/cross.svg';
import { ReactComponent as Circle } from 'assets/icons/circle.svg';
import { CellValue } from 'models/Game';

interface CellProps {
  symbol: CellValue;
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

  const handleTouchStart = (): void => {
    if (!props.disabled) {
      props.onClick;
    }
  };

  return (
    <button className="cell" onTouchStart={handleTouchStart} onClick={props.onClick} disabled={props.disabled}>
      {symbol}
    </button>
  );
};

export default Cell;
