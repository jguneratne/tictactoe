const gameBoard = (function () {
  let i = 0;
  const gameMoves = [];

  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    square.setAttribute("data-index", i++);
    square.textContent = "";
    gameMoves.push(square);
  });

  //const gameMoves = Array.from(squares);

  return { squares, gameMoves };
})();

console.log(gameBoard.gameMoves);

function Player(name, marker, winCount) {
  return { name, marker, winCount };
}

function GamePlay() {
  const player1 = Player("Player1", "X", 0);
  const player2 = Player("Player2", "O", 0);
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
        console.log(player1.name + " score: " + player1.winCount);
      } else if (winner === player2) {
        player2.winCount++;
        console.log(player2.name + " score: " + player2.winCount);
      }
    }
  };

  const placeMarker = function () {
    gameBoard.squares.forEach((square) => {
      square.addEventListener("pointerdown", function (e) {
        if (e.target !== square || square.textContent !== "" || winner) {
          return;
        } else if (
          e.target === square &&
          square.textContent === "" &&
          parseInt(square.dataset.index) ===
            parseInt(gameBoard.gameMoves.indexOf(square))
        ) {
          moves++;

          console.log(moves);
          gameBoard.gameMoves.splice(
            gameBoard.gameMoves.indexOf(square),
            1,
            `${activePlayer.marker}`
          );
          console.log(gameBoard.gameMoves);

          checkWinner();

          if (moves === 9 && !winner) {
            tieCount++;
            console.log("It's a tie!");
            console.log("Ties: " + `${tieCount}`);
          } else if (!winner) {
            switchPlayer();
          }
        }
      });
    });
  };

  return { placeMarker };
}

const game = GamePlay();

game.placeMarker();
