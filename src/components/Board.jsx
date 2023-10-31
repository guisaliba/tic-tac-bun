import Square from './Square';
import './Board.css';

export default function Board({ xIsNext, squares, onPlay }) {
  // Components use something called "state" to keep track of data. It's just like remembering something in your brain.
  // React provides the useState hook to create state in a function component.

  // We declare the shared state in the parent component and pass it to the child component through props.
  // This keeps the child component in sync with the parent component. This is called "lifting state up".
  // Board is the parent component here and Square is the child. The parent component can pass data through props to child component.

  // [squares, setSquares] = [state variable, function to change the state variable]
  // In this case, we are keeping track of the variable "squares" in an array of 9 elements.
  // Each element in this array holds a value for a square.

  // State is private to the component that declares it. This means that we can't access the state of the Board component directly from the Square component. Instead we can pass down a function from the Board to the Square, and make Square call that function when a square gets clicked.

  // From the docs: "To collect data from multiple children, or to have two child components communicate with each other, declare the shared state in their parent component instead. The parent component can pass that state back down to the children via props. This keeps the child components in sync with each other and with their parent."

  // We have to do this because for the Board component determine the winner of the game, it needs to know the state of the 9 squares. And since the Square component is child to Board, we lift its state up declaring it on the Board component.
  // This way when we call "setSquares" or any other function that changes the state of the squares array, the Board component will know about it and re-render the Square component with the new state.
  // And this can only happen because JavaScript supports closures, meaning that "handleClick" can read the squares' states and call "setSquares" method since they are both declared in the Board function (component).

  function handleClick(i) {
    // Returns the function earlier if the square is already filled.
    // This prevents the user from overwriting the value of a square.

    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice(); // Creates a copy of the squares array.
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    // The empty tag <> is a React fragment. It allows us to return multiple elements.
    // React components need to return a single JSX element and they must start with a capital letter.
    // <Board /> and <Square /> are both JSX elements.

    // Each square is a button that calls the "handleClick" function when clicked. The "handleClick" function changes the state of the squares array and it is called when "onSquareClick" is called. "onSquareClick" is a prop passed to the Square component, and it gets called when the square is clicked by the "onClick" attribute of the button element, which is a JSX attribute.

    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>

      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row

    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column

    [0, 4, 8], // left diagonal
    [2, 4, 6], // right diagonal
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
