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

const GameDisplay = (function () {
  const homeScreen = document.querySelector(".home-container");
  const namesForm = document.querySelector(".names");
  const p1Turn = document.querySelector(".p1-turn");
  const p2Turn = document.querySelector(".p2-turn");
  const winScreen = document.querySelector(".win-screen-container");
  const winResult = document.querySelector(".result");
  const letsGo = document.querySelector(".yes");

  // Start Handler to begin game
  let startHandler = null;

  namesForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const playerNames = new FormData(names);
    const getNames = [...playerNames.values()];

    let firstPlayer = Player(getNames[0], "X", 0);
    let secondPlayer = Player(getNames[1], "O", 0);

    GamePlay.startGame(firstPlayer, secondPlayer);

    homeScreen.style.display = "none";
    p1Turn.textContent = `${firstPlayer.name}` + "'s" + " turn!";
  });

  const addStartHandler = function (startHandlerFunction) {
    if (typeof startHandlerFunction === "function") {
      startHandler = startHandlerFunction;
    } else {
      throw new Error("Click Handler must be a function!");
    }
  };

  // Click Handler to place markers on board
  let clickHandler = null;
  const gameContainer = document.querySelector(".game-box");
  const squares = gameContainer.querySelectorAll(".square");
  squares.forEach((square) => {
    square.addEventListener("pointerdown", function (e) {
      let cellIndex = square.dataset.index;

      if (clickHandler) {
        clickHandler(cellIndex);
        square.textContent = gameBoard.getBoard().at(cellIndex);
      }
      console.log(`Cell ${cellIndex} clicked`);
    });
  });

  const addClickHandler = function (clickHandlerFunction) {
    if (typeof clickHandlerFunction === "function") {
      clickHandler = clickHandlerFunction;
    } else {
      throw new Error("Click Handler must be a function!");
    }
  };

  // Show Player's Turn in DOM
  const switchPlayer = function (currentPlayer) {
    whoseTurn = currentPlayer;

    if (whoseTurn.marker === "X") {
      p1Turn.textContent = `${whoseTurn.name}` + "'s" + " turn!";
      p2Turn.textContent = "";
    } else if (whoseTurn.marker === "O") {
      p1Turn.textContent = "";
      p2Turn.textContent = `${whoseTurn.name}` + "'s" + " turn!";
    }
  };

  // Win Screen Handler to show winner at end
  const showWinScreen = function (winner, tie, result) {
    console.log(winner, result);

    if (winner || tie) {
      winScreen.style.display = "initial";
      winResult.textContent = result;
    }
  };

  const showScores = function (p1Tally, p2Tally, tiesTally) {
    const p1Score = document.querySelector(".p1-tally");
    const p2Score = document.querySelector(".p2-tally");
    const tiesScore = document.querySelector(".ties-tally");

    p1Score.textContent = p1Tally;
    p2Score.textContent = p2Tally;
    tiesScore.textContent = tiesTally;
  };

  // New Round Handler if playing again
  let newRound = null;

  letsGo.addEventListener("pointerdown", function () {
    winScreen.style.display = "none";
    GamePlay.newRound();
    console.log(gameBoard.getBoard());

    squares.forEach((square) => {
      let clearCell = square.dataset.index;
      square.textContent = gameBoard.getBoard().at(clearCell);
    });
  });

  const newRoundHandler = function (newRoundHandlerFunction) {
    if (typeof newRoundHandlerFunction === "function") {
      newRound = newRoundHandlerFunction;
    } else {
      throw new Error("Click Handler must be a function!");
    }
  };

  // Reset Game if not playing again
  let resetGame = null;

  const noThanks = document.querySelector(".no");

  noThanks.addEventListener("pointerdown", function () {
    location.reload();
  });

  return {
    addStartHandler,
    addClickHandler,
    switchPlayer,
    showWinScreen,
    showScores,
    newRoundHandler,
  };
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
    player2 = p2;

    activePlayer = player1;
  };

  const checkWinner = function () {
    const winArray = [
      `${activePlayer.marker}`,
      `${activePlayer.marker}`,
      `${activePlayer.marker}`,
    ];

    let row1 = Array.from([
      gameBoard.getBoard()[0],
      gameBoard.getBoard()[1],
      gameBoard.getBoard()[2],
    ]);

    let row2 = Array.from([
      gameBoard.getBoard()[3],
      gameBoard.getBoard()[4],
      gameBoard.getBoard()[5],
    ]);

    let row3 = Array.from([
      gameBoard.getBoard()[6],
      gameBoard.getBoard()[7],
      gameBoard.getBoard()[8],
    ]);

    let col1 = Array.from([
      gameBoard.getBoard()[0],
      gameBoard.getBoard()[3],
      gameBoard.getBoard()[6],
    ]);

    let col2 = Array.from([
      gameBoard.getBoard()[1],
      gameBoard.getBoard()[4],
      gameBoard.getBoard()[7],
    ]);

    let col3 = Array.from([
      gameBoard.getBoard()[2],
      gameBoard.getBoard()[5],
      gameBoard.getBoard()[8],
    ]);

    let diag1 = Array.from([
      gameBoard.getBoard()[0],
      gameBoard.getBoard()[4],
      gameBoard.getBoard()[8],
    ]);

    let diag2 = Array.from([
      gameBoard.getBoard()[2],
      gameBoard.getBoard()[4],
      gameBoard.getBoard()[6],
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
        setTimeout(GameDisplay.showWinScreen, 200, winner, tieCount, result);
      } else if (winner === player2) {
        player2.winCount++;
        result = player2.name + " wins!";
        setTimeout(GameDisplay.showWinScreen, 200, winner, tieCount, result);
      }
    }
  };

  const checkTie = function () {
    if (moves === 9 && !winner) {
      tieCount++;
      result = "It's a tie!";
      setTimeout(GameDisplay.showWinScreen, 200, winner, tieCount, result);
    }
  };

  const placeMarker = function (clickedCell) {
    gameBoard.update(clickedCell, `${activePlayer.marker}`);
    console.log(gameBoard.getBoard());
    moves++;
    //console.log(moves);

    checkTie();
    checkWinner();
    if (!winner) {
      if (activePlayer === player1) {
        activePlayer = player2;
      } else {
        activePlayer = player1;
      }
      let currentPlayer = activePlayer;
      GameDisplay.switchPlayer(currentPlayer);
    } else if (winner || moves === 9) {
      isPlaying = false;
    }
  };

  const newRound = function () {
    gameBoard.reset();
    moves = 0;
    winner = "";

    GameDisplay.showScores(player1.winCount, player2.winCount, tieCount);
  };

  GameDisplay.addStartHandler(startGame);
  GameDisplay.addClickHandler(placeMarker);
  GameDisplay.newRoundHandler(newRound);

  return { startGame, placeMarker, newRound };
})();
