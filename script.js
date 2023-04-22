const gameBoard = (function () {
  const gameMoves = [];
  let i = 0;

  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    square.setAttribute("data-index", i++);
    // gameMoves.push(square);
  });

  return { squares, gameMoves };
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

  const switchPlayer = function () {
    if ((activePlayer = activePlayer === player1)) {
      player2;
    } else {
      player1;
    }
  };

  const placeMarker = function () {
    for (square of gameBoard.squares.values()) {
      square.addEventListener("pointerdown", function (e) {
        // if (!e.target === gameBoard.gameMoves[square]) {
        //   return;
        // } else
        if (e.target === gameBoard.gameMoves[square]) {
          console.log("click");
          gameBoard.gameMoves.splice(square, 1, `${Player.marker}`);
          console.log(gameBoard.gameMoves);
        }
      });
    }
  };

  return { player1, player2, placeMarker };
}

GamePlay();

// const board = gameBoard();
