// export default function Square()

// Syntax explanation:

// "export": makes the function available to other files
// "default": the Square function is the main function of this file
// "function Square()": the function

// CSS import for Square component
import './Square.css';

export default function Square({ value, onSquareClick }) {
  // function Square({ value, onSquareClick }) means the Square component can be passed props called value and on SquareClick.
  // The value prop is the value of the square while the onSquareClick prop is a function that gets called when the square is clicked.

  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
