const gameBoard = (function () {
  const gameMoves = [];
  let i = 0;

  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    square.setAttribute("data-index", i++);
    gameMoves.push("");
  });

  return { gameMoves, squares };
})();

console.log(gameBoard.gameMoves);

function Player(name, marker) {
  return { name, marker };
}

function GamePlay() {
  const player1 = Player("Player1", "X");
  const player2 = Player("Player2", "O");

  console.log(player1);
  console.log(player2);

  let activePlayer = player1;
  console.log(activePlayer.marker);

  const switchPlayer = function () {
    if ((activePlayer = activePlayer === player1)) {
      player2;
    } else {
      player1;
    }
  };

  const placeMarker = function () {
    gameBoard.squares.forEach((square) => {
      square.addEventListener("pointerdown", function (e) {
        if (e.target !== square || square.textContent !== "") {
          return;
        } else if (e.target === square && square.textContent === "") {
          console.log("click");
        }
      });
    });
  };

  return { switchPlayer, placeMarker };
}

const game = GamePlay();

game.placeMarker();
