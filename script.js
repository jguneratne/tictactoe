const gameBoard = (function () {
  const gameMoves = ["", "", "", "", "", "", "", "", ""];

  return { gameMoves };
})();

const player = function (marker) {
  const makeMove = function () {
    const squares = document.querySelectorAll("[data-index]");
    squares.forEach((square) => {
      square.addEventListener("pointerdown", function (e) {
        const { target } = e;

        if (!e.target.matches("[data-index]")) {
          return;
        } else if (e.target.matches(`[data-index="0"]`)) {
          gameBoard.gameMoves.splice(0, 1, `${player.marker}`);
          square.textContent = `${player.marker}`;
          console.log(`${player.marker}`);
        }
      });
    });
  };
  return { marker, makeMove };
};

const gamePlay = function () {
  const player1 = player("X");
  const player2 = player("O");

  player1.makeMove();

  return { player1 };
};

const playGame = gamePlay();
