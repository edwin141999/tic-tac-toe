import { WINNING_COMBINATIONS } from "../components/constant";

export const checkWinner = (board) => {
  for (const element of WINNING_COMBINATIONS) {
    const [a, b, c] = element;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  isBoardFull(board) && alert("It's a tie!");
  return null;
};

export const isBoardFull = (board) => {
  for (const element of board) {
    if (element === null) {
      return false;
    }
  }
  return true;
};