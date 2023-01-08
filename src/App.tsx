import Cell from 'components/Cell';
import CurrentPlayer from 'components/CurrentPlayer';
import Grid from 'components/Grid';
import Winner from 'components/Winner';

const App = (): JSX.Element => {
  return (
    <>
      <main>
        <div className="container">
          <Grid>
            <Cell symbol="X" />
            <Cell symbol="X" />
            <Cell symbol="X" />
            <Cell symbol="O" />
            <Cell symbol="O" />
            <Cell symbol="O" />
            <Cell symbol="X" />
            <Cell symbol="X" />
            <Cell symbol="X" />
          </Grid>
        </div>
      </main>
      <CurrentPlayer />
      <Winner />
    </>
  );
};

export default App;
