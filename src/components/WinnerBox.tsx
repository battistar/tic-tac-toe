import { ReactComponent as Cross } from 'assets/icons/cross.svg';
import { ReactComponent as Circle } from 'assets/icons/circle.svg';
import { Winner } from 'models/Game';

interface WinnerBoxProps {
  winner: Winner;
  onClick: () => void;
}

const WinnerBox = (props: WinnerBoxProps): JSX.Element => {
  let symbol;
  if (props.winner === 'X') {
    symbol = <Cross className="winner--symbol" />;
  }
  if (props.winner === 'O') {
    symbol = <Circle className="winner--symbol" />;
  }

  return (
    <div className="winner">
      {props.winner === 'XO' && (
        <div className="winner--text">
          <span>Draw!</span>
        </div>
      )}
      {symbol && (
        <div className="winner--text">
          <span>Player</span>
          {symbol}
          <span>win!</span>
        </div>
      )}
      <button className="winner--button" onClick={props.onClick}>
        New game
      </button>
    </div>
  );
};

export default WinnerBox;
