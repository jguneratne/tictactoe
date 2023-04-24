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

function Player(name, marker) {
  return { name, marker };
}

function GamePlay() {
  const player1 = Player("Player1", "X");
  const player2 = Player("Player2", "O");

  console.log(player1.marker);
  console.log(player2.marker);

  let activePlayer = player1;
  // console.log(activePlayer.marker);

  const switchPlayer = function () {
    if (activePlayer === player1) {
      activePlayer = player2;
    } else {
      activePlayer = player1;
    }
  };

  const placeMarker = function () {
    gameBoard.squares.forEach((square) => {
      square.addEventListener("pointerdown", function (e) {
        if (e.target !== square || square.textContent !== "") {
          return;
        } else if (
          e.target === square &&
          square.textContent === "" &&
          parseInt(square.dataset.index) ===
            parseInt(gameBoard.gameMoves.indexOf(square))
        ) {
          gameBoard.gameMoves.splice(
            gameBoard.gameMoves.indexOf(square),
            1,
            `${activePlayer.marker}`
          );
          console.log(gameBoard.gameMoves);
          switchPlayer();
        }
      });
    });
  };

  return { placeMarker };
}

const game = GamePlay();

game.placeMarker();
