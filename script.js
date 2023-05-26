const gameBoard = (function () {
  let board = new Array(9).fill("");
  console.log(board);

  const reset = function () {
    board.fill("");
  };

  const update = function (index, marker) {
    if (board[index] !== "") {
      return false;
    } else {
      board[index] = marker;
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

function Player(name, marker, winCount) {
  return { name, marker, winCount };
}

const playerNames = (function () {
  const namesForm = document.querySelector(".names");

  namesForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const playerNames = new FormData(names);
    const getNames = [...playerNames.values()];

    let firstPlayer = Player(getNames[0], "X", 0);
    let secondPlayer = Player(getNames[1], "O", 0);

    GamePlay.startGame(firstPlayer, secondPlayer);
  });
})();

const GameDisplay = (function () {
  let clickHandler = null;
  //let startHandler = null;
  const gameContainer = document.querySelector(".game-box");
  const squares = gameContainer.querySelectorAll(".square");
  squares.forEach((square) => {
    square.addEventListener("pointerdown", function (e) {
      let cellIndex = square.dataset.index;

      if (clickHandler) {
        clickHandler(cellIndex);
      }
      console.log(`Cell ${cellIndex} clicked`);
    });
  });

  // const addStartHandler = function (startHandlerFunction) {
  //   if (typeof startHandlerFunction === "function") {
  //     startHandler = startHandlerFunction;
  //   } else {
  //     throw new Error("Click Handler must be a function!");
  //   }
  // };

  const addClickHandler = function (clickHandlerFunction) {
    if (typeof clickHandlerFunction === "function") {
      clickHandler = clickHandlerFunction;
    } else {
      throw new Error("Click Handler must be a function!");
    }
  };

  return { addClickHandler };
})();

const GamePlay = (function () {
  let isPlaying = false;
  let player1;
  let player2;
  let activePlayer;
  let moves = 0;
  let winner = "";
  let tieCount = 0;
  let result = "";

  const startGame = function (p1, p2) {
    isPlaying = true;
    player1 = p1;
    //console.log(player1);
    player2 = p2;
    //console.log(player2);

    activePlayer = player1;
    console.log(activePlayer.marker);

    const homeScreen = document.querySelector(".home-container");
    homeScreen.style.display = "none";
  };

  const switchPlayer = function () {
    if (activePlayer === player1) {
      activePlayer = player2;
    } else {
      activePlayer = player1;
    }
    //display.showTurn(activePlayer, activePlayer.name);
  };

  const checkWinner = function () {
    const winArray = [
      `${activePlayer.marker}`,
      `${activePlayer.marker}`,
      `${activePlayer.marker}`,
    ];

    let row1 = Array.from([
      gameBoard.getBoard[0],
      gameBoard.getBoard[1],
      gameBoard.getBoard[2],
    ]);

    let row2 = Array.from([
      gameBoard.getBoard[3],
      gameBoard.getBoard[4],
      gameBoard.getBoard[5],
    ]);

    let row3 = Array.from([
      gameBoard.getBoard[6],
      gameBoard.getBoard[7],
      gameBoard.getBoard[8],
    ]);

    let col1 = Array.from([
      gameBoard.getBoard[0],
      gameBoard.getBoard[3],
      gameBoard.getBoard[6],
    ]);

    let col2 = Array.from([
      gameBoard.getBoard[1],
      gameBoard.getBoard[4],
      gameBoard.getBoard[7],
    ]);

    let col3 = Array.from([
      gameBoard.getBoard[2],
      gameBoard.getBoard[5],
      gameBoard.getBoard[8],
    ]);

    let diag1 = Array.from([
      gameBoard.getBoard[0],
      gameBoard.getBoard[4],
      gameBoard.getBoard[8],
    ]);

    let diag2 = Array.from([
      gameBoard.getBoard[2],
      gameBoard.getBoard[4],
      gameBoard.getBoard[6],
    ]);

    const compareMoves = (wins, marks) =>
      wins.length === marks.length &&
      wins.every((element, index) => element === marks[index]);

    if (
      compareMoves(winArray, row1) === true ||
      compareMoves(winArray, row2) === true ||
      compareMoves(winArray, row3) === true ||
      compareMoves(winArray, col1) === true ||
      compareMoves(winArray, col2) === true ||
      compareMoves(winArray, col3) === true ||
      compareMoves(winArray, diag1) === true ||
      compareMoves(winArray, diag2) === true
    ) {
      winner = activePlayer;
      console.log(`${activePlayer.name}` + " is the winner!");

      if (winner === player1) {
        player1.winCount++;
        result = player1.name + " wins!";
        setTimeout(display.showWinner, 200, winner, tieCount, result);
      } else if (winner === player2) {
        player2.winCount++;
        result = player2.name + " wins!";
        setTimeout(display.showWinner, 200, winner, tieCount, result);
      }
    }
  };

  const checkTie = function () {
    if (moves === 9 && !winner) {
      tieCount++;
      result = "It's a tie!";
      setTimeout(display.showWinner, 200, winner, tieCount, result);
    }
  };

  const placeMarker = function (clickedCell) {
    gameBoard.update(clickedCell, `${activePlayer.marker}`);
    console.log(gameBoard.getBoard());
    moves++;
    checkTie();
    checkWinner();
    if (!winner) {
      switchPlayer();
    } else if (winner || moves === 9) {
      isPlaying = false;
      gameBoard.reset();
    }
  };

  // GameDisplay.addStartHandler(startGame);
  GameDisplay.addClickHandler(placeMarker);

  return { startGame, placeMarker };
})();

// function GamePlay() {
//   // const squares = Array.from(
//   //   document.querySelectorAll(".square[data-index]")
//   // ).fill("");

//   const squares = Array.from(document.querySelectorAll(".square[data-index]"));

//   console.log(squares);

//   const getPlayers = function (p1, p2) {
//     player1 = p1;
//     // console.log(player1);
//     player2 = p2;
//     // console.log(player2);

//     activePlayer = player1;
//     //console.log(activePlayer);
//   };

//   let moves = 0;
//   let winner = "";
//   let tieCount = 0;
//   let result = "";

//   const switchPlayer = function () {
//     if (activePlayer === player1) {
//       activePlayer = player2;
//     } else {
//       activePlayer = player1;
//     }
//     //display.showTurn(activePlayer, activePlayer.name);
//   };

//   const checkWinner = function () {
//     const winArray = [
//       `${activePlayer.marker}`,
//       `${activePlayer.marker}`,
//       `${activePlayer.marker}`,
//     ];

//     let row1 = Array.from([
//       gameBoard.getBoard[0],
//       gameBoard.getBoard[1],
//       gameBoard.getBoard[2],
//     ]);

//     let row2 = Array.from([
//       gameBoard.getBoard[3],
//       gameBoard.getBoard[4],
//       gameBoard.getBoard[5],
//     ]);

//     let row3 = Array.from([
//       gameBoard.getBoard[6],
//       gameBoard.getBoard[7],
//       gameBoard.getBoard[8],
//     ]);

//     let col1 = Array.from([
//       gameBoard.getBoard[0],
//       gameBoard.getBoard[3],
//       gameBoard.getBoard[6],
//     ]);

//     let col2 = Array.from([
//       gameBoard.getBoard[1],
//       gameBoard.getBoard[4],
//       gameBoard.getBoard[7],
//     ]);

//     let col3 = Array.from([
//       gameBoard.getBoard[2],
//       gameBoard.getBoard[5],
//       gameBoard.getBoard[8],
//     ]);

//     let diag1 = Array.from([
//       gameBoard.getBoard[0],
//       gameBoard.getBoard[4],
//       gameBoard.getBoard[8],
//     ]);

//     let diag2 = Array.from([
//       gameBoard.getBoard[2],
//       gameBoard.getBoard[4],
//       gameBoard.getBoard[6],
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
//         } else {
//           moves++;

//           gameBoard.update(square, `${activePlayer.marker}`);
//           console.log(gameBoard.getBoard());

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
//     gameBoard.getBoard();
//     moves = 0;
//     winner = "";

//     //display.showScores(player1.winCount, player2.winCount, tieCount);
//     // display.showTurn(activePlayer, activePlayer.name);
//   };

//   const newGame = function () {
//     const noThanks = document.querySelector(".no");

//     noThanks.addEventListener("pointerdown", function () {
//       location.reload();
//     });
//   };

//   return {
//     // squares,
//     getPlayers,
//     playRound,
//     //     newRound,
//     //     newGame,
//   };
// }

// function GameDisplay() {
//   //   const winScreen = document.querySelector(".win-screen-container");
//   //   const winResult = document.querySelector(".result");

//   const showMarker = function (square, marker) {
//     square.textContent = marker;
//   };

//   //   const showScores = function (p1Tally, p2Tally, tiesTally) {
//   //     const p1Score = document.querySelector(".p1-tally");
//   //     const p2Score = document.querySelector(".p2-tally");
//   //     const tiesScore = document.querySelector(".ties-tally");

//   //     p1Score.textContent = p1Tally;
//   //     p2Score.textContent = p2Tally;
//   //     tiesScore.textContent = tiesTally;
//   //   };

//   //   const showTurn = function (whoseTurn, name) {
//   //     const p1Turn = document.querySelector(".p1-turn");
//   //     const p2Turn = document.querySelector(".p2-turn");

//   //     console.log(game.player1);

//   //     if (whoseTurn === game.player1) {
//   //       p1Turn.textContent = `${name}` + "'s" + " turn!";
//   //       p2Turn.textContent = "";
//   //     } else if (whoseTurn === game.player2) {
//   //       p1Turn.textContent = "";
//   //       p2Turn.textContent = `${name}` + "'s" + " turn!";
//   //     }
//   //   };

//   //   const showWinner = function (winner, tie, result) {
//   //     if (winner || tie) {
//   //       winScreen.style.display = "initial";
//   //       winResult.textContent = result;
//   //       showNewRound();
//   //     }
//   //   };

//   //   const showNewRound = function () {
//   //     const letsGo = document.querySelector(".yes");

//   //     letsGo.addEventListener("pointerdown", function () {
//   //       winScreen.style.display = "none";
//   //       game.newRound();
//   //     });
//   //   };

//   return {
//     showMarker,
//     // showScores, showTurn, showWinner, winScreen
//   };
// }

// const game = GamePlay();
// const display = GameDisplay();

// // game.newGame();
