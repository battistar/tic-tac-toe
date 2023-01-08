import { ReactComponent as Cross } from 'assets/icons/cross.svg';
import { ReactComponent as Circle } from 'assets/icons/circle.svg';

interface CellProps {
  symbol: string;
}

const Cell = (props: CellProps): JSX.Element => {
  return (
    <button className="cell">
      {props.symbol === 'X' ? <Cross className="cell--symbol" /> : <Circle className="cell--symbol" />}
    </button>
  );
};

export default Cell;
