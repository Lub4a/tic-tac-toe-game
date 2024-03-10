const game = document.querySelector(".game");
const result = document.querySelector(".result");
const cells = document.querySelectorAll(".cell");
const btnNewGame = document.querySelector(".new-game");
let step = false;
let count = 0;
let countCros = 0;
let countZero = 0;
const audioCross = document.querySelector(".cross");
const audioZero = document.querySelector(".zero");
const round = `<svg class="null">
<circle r="45" cx="58" cy="58" stroke="red" stroke-width="10" fill="none" stroke-linecap="raund"></circle>
</svg>`;
const cross = `<svg class="cross">
<line class="first" x1="15" y1="15" x2="100" y2="100" stroke="blue" stroke-width="10" stroke-linecap="round"></line>
<line class="second" x1="100" y1="15" x2="15" y2="100" stroke="blue" stroke-width="10" stroke-linecap="round"></line>
</svg>`;

function writeCross(target) {
  target.innerHTML = cross;
  target.classList.add("x");
  audioCross.play();
  count++;
  countCros++;
}

function writeRound(target) {
  target.innerHTML = round;
  target.classList.add("o");
  audioZero.play();
  count++;
  countZero++;
}

function startGame(e) {
  if (!step) writeCross(e.target);
  else writeRound(e.target);
  step = !step;
  winner();
}

function newGame() {
  step = false;
  countCros = 0;
  count = 0;
  countZero = 0;
  result.innerText = "";
  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.classList.remove("x", "o", "active");
  });
  game.addEventListener("click", startGame);
}

function winner() {
  let comb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < comb.length; i++) {
    if (
      cells[comb[i][0]].classList.contains("x") &&
      cells[comb[i][1]].classList.contains("x") &&
      cells[comb[i][2]].classList.contains("x")
    ) {
      setTimeout(() => {
        cells[comb[i][0]].classList.add("active");
        cells[comb[i][1]].classList.add("active");
        cells[comb[i][2]].classList.add("active");
        result.innerText = `ВИГРАЛИ X за ${countCros} разів`;
      }, 1500);
      game.removeEventListener("click", startGame);
    } else if (
      cells[comb[i][0]].classList.contains("o") &&
      cells[comb[i][1]].classList.contains("o") &&
      cells[comb[i][2]].classList.contains("o")
    ) {
      setTimeout(() => {
        cells[comb[i][0]].classList.add("active");
        cells[comb[i][1]].classList.add("active");
        cells[comb[i][2]].classList.add("active");
        result.innerText = `ВИГРАЛИ O за ${countZero} ходів`;
      }, 1500);
      game.removeEventListener("click", startGame);
    } else if (count === 9) {
      setTimeout(() => {
        result.innerText = "НІЧИЯ!";
      }, 1000);
      game.removeEventListener("click", startGame);
    }
  }
}

btnNewGame.addEventListener("click", newGame);
game.addEventListener("click", startGame);
