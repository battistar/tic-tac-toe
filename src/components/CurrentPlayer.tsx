import { ReactComponent as Cross } from 'assets/icons/cross.svg';
import { ReactComponent as Circle } from 'assets/icons/circle.svg';
import { ReactComponent as Arrow } from 'assets/icons/arrow.svg';

const CurrentPlayer = (): JSX.Element => {
  return (
    <div className="current-player">
      <div className="current-player--player">
        <Arrow className="current-player--current" />
        <span>Player</span>
        <Cross className="current-player--symbol" />
      </div>
      <div className="current-player--player">
        <Arrow className="current-player--current" />
        <span>Player</span>
        <Circle className="current-player--symbol" />
      </div>
    </div>
  );
};

export default CurrentPlayer;
