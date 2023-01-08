interface GridProps {
  children: React.ReactNode;
}

const Grid = (props: GridProps): JSX.Element => {
  return <div className="grid">{props.children}</div>;
};

export default Grid;
