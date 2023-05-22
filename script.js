const gameBoard = (function () {
  const board = new Array(9).fill("");

  const reset = function () {
    board.fill("");
  };

  const update = function (index, marker) {
    if (board[index] !== "") {
      return false;
    } else if (board[index] === marker) {
      return true;
    }
  };

  const getBoard = function () {
    return Array.from(board);
  };

  return {
    update,
    reset,
    getBoard,
  };
})();

// function GamePlay() {
//   const squares = Array.from(document.querySelectorAll(".square[data-index]"));

//   const getPlayers = function (p1, p2) {
//     player1 = p1;
//     //console.dir(player1);
//     player2 = p2;
//     //console.dir(player2);

//     activePlayer = player1;
//     //console.trace(activePlayer);
//   };

//   let moves = 0;
//   let winner = "";
//   let tieCount = 0;
//   let result = "";

//   const switchPlayer = function () {
//     if (activePlayer === player1) {
//       activePlayer = player2;
//       console.dir(activePlayer);
//     } else {
//       activePlayer = player1;
//     }
//     display.showTurn(activePlayer, activePlayer.name);
//     console.trace(activePlayer, activePlayer.name);
//   };

//   const checkWinner = function () {
//     const winArray = [
//       `${activePlayer.marker}`,
//       `${activePlayer.marker}`,
//       `${activePlayer.marker}`,
//     ];

//     let row1 = Array.from([
//       gameBoard.gameMoves[0],
//       gameBoard.gameMoves[1],
//       gameBoard.gameMoves[2],
//     ]);

//     let row2 = Array.from([
//       gameBoard.gameMoves[3],
//       gameBoard.gameMoves[4],
//       gameBoard.gameMoves[5],
//     ]);

//     let row3 = Array.from([
//       gameBoard.gameMoves[6],
//       gameBoard.gameMoves[7],
//       gameBoard.gameMoves[8],
//     ]);

//     let col1 = Array.from([
//       gameBoard.gameMoves[0],
//       gameBoard.gameMoves[3],
//       gameBoard.gameMoves[6],
//     ]);

//     let col2 = Array.from([
//       gameBoard.gameMoves[1],
//       gameBoard.gameMoves[4],
//       gameBoard.gameMoves[7],
//     ]);

//     let col3 = Array.from([
//       gameBoard.gameMoves[2],
//       gameBoard.gameMoves[5],
//       gameBoard.gameMoves[8],
//     ]);

//     let diag1 = Array.from([
//       gameBoard.gameMoves[0],
//       gameBoard.gameMoves[4],
//       gameBoard.gameMoves[8],
//     ]);

//     let diag2 = Array.from([
//       gameBoard.gameMoves[2],
//       gameBoard.gameMoves[4],
//       gameBoard.gameMoves[6],
//     ]);

//     const compareMoves = (wins, marks) =>
//       wins.length === marks.length &&
//       wins.every((element, index) => element === marks[index]);

//     if (
//       compareMoves(winArray, row1) === true ||
//       compareMoves(winArray, row2) === true ||
//       compareMoves(winArray, row3) === true ||
//       compareMoves(winArray, col1) === true ||
//       compareMoves(winArray, col2) === true ||
//       compareMoves(winArray, col3) === true ||
//       compareMoves(winArray, diag1) === true ||
//       compareMoves(winArray, diag2) === true
//     ) {
//       winner = activePlayer;
//       console.log(`${activePlayer.name}` + " is the winner!");

//       if (winner === player1) {
//         player1.winCount++;
//         result = player1.name + " wins!";
//         setTimeout(display.showWinner, 200, winner, tieCount, result);
//       } else if (winner === player2) {
//         player2.winCount++;
//         result = player2.name + " wins!";
//         setTimeout(display.showWinner, 200, winner, tieCount, result);
//       }
//     }
//   };

//   const checkTie = function () {
//     if (moves === 9 && !winner) {
//       tieCount++;
//       result = "It's a tie!";
//       setTimeout(display.showWinner, 200, winner, tieCount, result);
//     }
//   };

//   const playRound = function () {
//     newRound();
//     squares.forEach((square) => {
//       square.addEventListener("pointerdown", function (e) {
//         if (!square || square.textContent !== "" || winner) {
//           return;
//         } else if (square && square.textContent === "") {
//           moves++;
//           //console.log(moves);
//           gameBoard.gameMoves.splice(
//             gameBoard.gameMoves.indexOf(square),
//             1,
//             `${activePlayer.marker}`
//           );
//           console.log(gameBoard.gameMoves);

//           display.showMarker(square, `${activePlayer.marker}`);

//           checkTie();
//           checkWinner();
//           if (!winner) {
//             switchPlayer();
//           }
//         }
//       });
//     });
//   };

//   const newRound = function () {
//     getBoard();
//     moves = 0;
//     winner = "";

//     display.showScores(player1.winCount, player2.winCount, tieCount);
//     display.showTurn(activePlayer, activePlayer.name);
//   };

//   const newGame = function () {
//     const noThanks = document.querySelector(".no");

//     noThanks.addEventListener("pointerdown", function () {
//       location.reload();
//     });
//   };

//   return {
//     squares,
//     getPlayers,
//     playRound,
//     newRound,
//     newGame,
//   };
// }

// function GameDisplay() {
//   const winScreen = document.querySelector(".win-screen-container");
//   const winResult = document.querySelector(".result");

//   const showMarker = function (square, marker) {
//     square.textContent = marker;
//   };

//   const showScores = function (p1Tally, p2Tally, tiesTally) {
//     const p1Score = document.querySelector(".p1-tally");
//     const p2Score = document.querySelector(".p2-tally");
//     const tiesScore = document.querySelector(".ties-tally");

//     p1Score.textContent = p1Tally;
//     p2Score.textContent = p2Tally;
//     tiesScore.textContent = tiesTally;
//   };

//   const showTurn = function (whoseTurn, name) {
//     const p1Turn = document.querySelector(".p1-turn");
//     const p2Turn = document.querySelector(".p2-turn");

//     console.trace(game.player1);

//     if (whoseTurn === game.player1) {
//       p1Turn.textContent = `${name}` + "'s" + " turn!";
//       p2Turn.textContent = "";
//     } else if (whoseTurn === game.player2) {
//       p1Turn.textContent = "";
//       p2Turn.textContent = `${name}` + "'s" + " turn!";
//     }
//   };

//   const showWinner = function (winner, tie, result) {
//     if (winner || tie) {
//       winScreen.style.display = "initial";
//       winResult.textContent = result;
//       showNewRound();
//     }
//   };

//   const showNewRound = function () {
//     const letsGo = document.querySelector(".yes");

//     letsGo.addEventListener("pointerdown", function () {
//       winScreen.style.display = "none";
//       game.newRound();
//     });
//   };

//   return { showMarker, showScores, showTurn, showWinner, winScreen };
// }

// const game = GamePlay();
// const display = GameDisplay();

// game.newGame();
