const gameBoard = (function () {
  let i = 0;
  const gameMoves = [];

  const cells = Array.from(document.getElementsByClassName("square"));
  //console.log(squares);

  cells.forEach((cell) => {
    cell.setAttribute("data-index", i++);
    cell.textContent = "";
    gameMoves.push(cell);
  });

  return { i, cells, gameMoves };
})();

console.log(gameBoard.gameMoves);

function Player(name, marker, winCount) {
  return { name, marker, winCount };
}

function GamePlay() {
  const player1 = Player("Player1", "X", 0);
  const player2 = Player("Player2", "O", 0);
  const squares = Array.from(document.querySelectorAll(".square[data-index]"));
  // console.log(squares);
  let moves = 0;
  let winner = "";
  let tieCount = 0;

  // console.log(player1.marker);
  //console.log(player2.marker);

  let activePlayer = player1;
  // console.log(activePlayer.marker);

  const switchPlayer = function () {
    if (activePlayer === player1) {
      activePlayer = player2;
    } else {
      activePlayer = player1;
    }
  };

  const checkWinner = function () {
    const winArray = [
      `${activePlayer.marker}`,
      `${activePlayer.marker}`,
      `${activePlayer.marker}`,
    ];

    let row1 = Array.from([
      gameBoard.gameMoves[0],
      gameBoard.gameMoves[1],
      gameBoard.gameMoves[2],
    ]);

    let row2 = Array.from([
      gameBoard.gameMoves[3],
      gameBoard.gameMoves[4],
      gameBoard.gameMoves[5],
    ]);

    let row3 = Array.from([
      gameBoard.gameMoves[6],
      gameBoard.gameMoves[7],
      gameBoard.gameMoves[8],
    ]);

    let col1 = Array.from([
      gameBoard.gameMoves[0],
      gameBoard.gameMoves[3],
      gameBoard.gameMoves[6],
    ]);

    let col2 = Array.from([
      gameBoard.gameMoves[1],
      gameBoard.gameMoves[4],
      gameBoard.gameMoves[7],
    ]);

    let col3 = Array.from([
      gameBoard.gameMoves[2],
      gameBoard.gameMoves[5],
      gameBoard.gameMoves[8],
    ]);

    let diag1 = Array.from([
      gameBoard.gameMoves[0],
      gameBoard.gameMoves[4],
      gameBoard.gameMoves[8],
    ]);

    let diag2 = Array.from([
      gameBoard.gameMoves[2],
      gameBoard.gameMoves[4],
      gameBoard.gameMoves[6],
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
        display.displayScores(player1.winCount, player2.winCount, tieCount);
        console.log(player1.name + " score: " + player1.winCount);
        newRound();
      } else if (winner === player2) {
        player2.winCount++;
        display.displayScores(player1.winCount, player2.winCount, tieCount);
        console.log(player2.name + " score: " + player2.winCount);
        newRound();
      }
    }
  };

  const checkTie = function () {
    if (moves === 9 && !winner) {
      tieCount++;
      display.displayScores(player1.winCount, player2.winCount, tieCount);
      console.log("It's a tie!");
      console.log("Ties: " + `${tieCount}`);
      newRound();
    }
  };

  const playRound = function () {
    squares.forEach((square) => {
      square.addEventListener("pointerdown", function (e) {
        if (!square || square.textContent !== "" || winner) {
          return;
        } else if (square && square.textContent === "") {
          moves++;
          //console.log(moves);
          gameBoard.gameMoves.splice(
            gameBoard.gameMoves.indexOf(square),
            1,
            `${activePlayer.marker}`
          );
          console.log(gameBoard.gameMoves);

          display.showMarker(square, `${activePlayer.marker}`);

          checkTie();
          checkWinner();
          if (!winner) {
            switchPlayer();
          }
        }
      });
    });
  };

  const newRound = function () {
    let ask = confirm("Play another round?");
    if (confirm(ask) == true) {
      gameBoard.gameMoves = [];
      gameBoard.i = 0;
      moves = 0;
      winner = "";

      gameBoard.cells.forEach((cell) => {
        cell.setAttribute("data-index", gameBoard.i++);
        cell.textContent = "";
        gameBoard.gameMoves.push(cell);
      });
    } else {
      newGame();
    }
  };

  const newGame = function () {
    newRound();
    player1.wins = 0;
    player2.wins = 0;
    tieCount = 0;
    activePlayer = player1;
  };

  return { squares, playRound };
}

function GameDisplay() {
  const showMarker = function (square, marker) {
    square.textContent = marker;
  };

  const displayScores = function (p1Tally, p2Tally, tiesTally) {
    p1Score = document.querySelector(".p1-tally");
    p2Score = document.querySelector(".p2-tally");
    tiesScore = document.querySelector(".ties-tally");

    p1Score.textContent = p1Tally;
    p2Score.textContent = p2Tally;
    tiesScore.textContent = tiesTally;
  };

  return { showMarker, displayScores };
}

const game = GamePlay();
const display = GameDisplay();

game.playRound();
