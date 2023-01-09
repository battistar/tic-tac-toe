import { ReactComponent as Cross } from 'assets/icons/cross.svg';
import { ReactComponent as Circle } from 'assets/icons/circle.svg';
import { ReactComponent as Arrow } from 'assets/icons/arrow.svg';
import { Player } from 'models/GameStatus';

interface CurrentPlayerProps {
  player: Player;
}

const CurrentPlayer = (props: CurrentPlayerProps): JSX.Element => {
  return (
    <div className="current-player">
      <div className="current-player--player">
        <Arrow className={`current-player--current ${props.player !== Player.X && 'hidden'}`} />
        <span>Player</span>
        <Cross className="current-player--symbol" />
      </div>
      <div className="current-player--player">
        <Arrow className={`current-player--current ${props.player !== Player.O && 'hidden'}`} />
        <span>Player</span>
        <Circle className="current-player--symbol" />
      </div>
    </div>
  );
};

export default CurrentPlayer;
