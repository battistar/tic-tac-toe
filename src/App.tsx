import Cell from 'components/Cell';
import Grid from 'components/Grid';

const App = (): JSX.Element => {
  return (
    <main>
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
    </main>
  );
};

export default App;
