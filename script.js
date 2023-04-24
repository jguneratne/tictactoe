const gameBoard = (function () {
  let i = 0;
  const gameMoves = [];

  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    square.setAttribute("data-index", i++);
    square.textContent = "";
    gameMoves.push(square);
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
  let winner = "";

  //console.log(player1.marker);
  //console.log(player2.marker);

  let activePlayer = player1;
  console.log(activePlayer);

  const switchPlayer = function () {
    if (activePlayer.marker === player1.marker) {
      activePlayer.marker = player2.marker;
    } else {
      activePlayer.marker = player1.marker;
    }
  };

  const checkWinner = function () {
    if (
      gameBoard.gameMoves[(0, 1, 2)] === activePlayer.marker ||
      gameBoard.gameMoves[(3, 4, 5)] === activePlayer.marker ||
      gameBoard.gameMoves[(6, 7, 8)] === activePlayer.marker ||
      gameBoard.gameMoves[(0, 4, 8)] === activePlayer.marker ||
      gameBoard.gameMoves[(2, 4, 6)] === activePlayer.marker
    ) {
      winner = activePlayer;
      console.log(`${activePlayer.name}` + " is the winner!");
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
          gameBoard.gameMoves.splice(
            gameBoard.gameMoves.indexOf(square),
            1,
            `${activePlayer.marker}`
          );
          console.log(gameBoard.gameMoves);
          checkWinner();
          if (!winner) {
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
