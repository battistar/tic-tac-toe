import { ReactComponent as Cross } from 'assets/icons/cross.svg';

const Winner = (): JSX.Element => {
  return (
    <div className="winner">
      <div className="winner--text">
        <span>Player</span>
        <Cross className="winner--symbol" />
        <span>win!</span>
      </div>
      <button className="winner--button">New game</button>
    </div>
  );
};

export default Winner;
