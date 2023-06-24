import { useState } from "react";
import "./App.css";
import { TURNS } from "./components/constant";
import { checkWinner } from "./functions";

function App() {
  const [board, setBoard] = useState(() => {
    const savedBoard = JSON.parse(localStorage.getItem("board"));
    return savedBoard ? savedBoard : Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const savedTurn = JSON.parse(localStorage.getItem("turn"));
    return savedTurn ? savedTurn : TURNS.X;
  });

  const handleClick = (index) => {
    const newBoard = [...board];
    if (newBoard[index] !== null) return;
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", JSON.stringify(newTurn));

    const winner = checkWinner(newBoard);
    if (winner) {
      alert(`Player ${winner} wins!`);
      resetGame();
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
  };

  return (
    <>
      <h1 className="title">Tic Tac Toe</h1>
      <div className="center">
        <button className="btn_reset" onClick={() => resetGame()}>
          RESET GAME
        </button>
      </div>
      <div className="container">
        {board.map((cell, index) => (
          <div className="tile" key={index} onClick={() => handleClick(index)}>
            {cell}
          </div>
        ))}
      </div>
      <div className="turn">
        <h2 className="subtitle">Turn</h2>
        <div>
          <div className="tileturn">{turn}</div>
        </div>
      </div>
    </>
  );
}

export default App;
