let gameState = {
  players: [
    { total: 0, current: 0, name: "שחקן 1" },
    { total: 0, current: 0, name: "שחקן 2" },
  ],
  currentPlayer: 0,
  gameActive: true,
  rolling: false,
};

const diceFaces = {
  1: [{ x: 50, y: 50 }],
  2: [
    { x: 25, y: 25 },
    { x: 75, y: 75 },
  ],
  3: [
    { x: 25, y: 25 },
    { x: 50, y: 50 },
    { x: 75, y: 75 },
  ],
  4: [
    { x: 25, y: 25 },
    { x: 75, y: 25 },
    { x: 25, y: 75 },
    { x: 75, y: 75 },
  ],
  5: [
    { x: 25, y: 25 },
    { x: 75, y: 25 },
    { x: 50, y: 50 },
    { x: 25, y: 75 },
    { x: 75, y: 75 },
  ],
  6: [
    { x: 25, y: 25 },
    { x: 75, y: 25 },
    { x: 25, y: 50 },
    { x: 75, y: 50 },
    { x: 25, y: 75 },
    { x: 75, y: 75 },
  ],
};

function updateDisplay() {
  document.getElementById("player1Total").textContent =
    gameState.players[0].total;
  document.getElementById("player1Current").textContent =
    gameState.players[0].current;
  document.getElementById("player2Total").textContent =
    gameState.players[1].total;
  document.getElementById("player2Current").textContent =
    gameState.players[1].current;

  const player1Card = document.getElementById("player1Card");
  const player2Card = document.getElementById("player2Card");

  if (gameState.currentPlayer === 0) {
    player1Card.classList.add("active");
    player2Card.classList.remove("active");
    player1Card.querySelector(".current-turn").textContent = "your turn!";
  } else {
    player1Card.classList.remove("active");
    player2Card.classList.add("active");
    player1Card.querySelector(".current-turn").textContent = "whait...";
  }
}

function drawDice(number, cls) {
  const dice = document.getElementById(cls);
  const face = dice.querySelector(".dice-face");

  face.innerHTML = "";

  const dots = diceFaces[number];
  dots.forEach((dot) => {
    const dotEl = document.createElement("span");
    dotEl.className = "dot";
    dotEl.style.left = `${dot.x}%`;
    dotEl.style.top = `${dot.y}%`;
    face.appendChild(dotEl);
  });
}

function rollDice() {
  if (!gameState.gameActive) return;

  gameState.rolling = true;
  const dice = document.getElementById("dice");
  dice.classList.add("rolling");

  for (let i = 0; i < 10; i++) {
    drawDice(Math.floor(Math.random() * 6) + 1, "dice");
  }

  const result = Math.floor(Math.random() * 6) + 1;
  drawDice(result, "dice");

  dice.classList.remove("rolling");
  gameState.rolling = false;

  return result;
}

function rollDice2() {
  if (!gameState.gameActive) return;

  gameState.rolling = true;
  const dice = document.getElementById("dice-2");
  dice.classList.add("rolling");

  for (let i = 0; i < 10; i++) {
    drawDice(Math.floor(Math.random() * 6) + 1, "dice-2");
  }

  const result = Math.floor(Math.random() * 6) + 1;
  drawDice(result, "dice-2");

  dice.classList.remove("rolling");
  gameState.rolling = false;

  return result;
}

document.getElementById("rollBtn").addEventListener("click", () => {
  if (!gameState.gameActive || gameState.rolling) return;

  document.getElementById("resultMessage").textContent = "";

  const roll = rollDice();
  console.log(roll);
  const roll2 = rollDice2();
  console.log(roll2);

  if (roll === roll2) {
    gameState.players[gameState.currentPlayer].current = 0;
    gameState.players[gameState.currentPlayer].total = 0;

    switchPlayer();
  } else {
    gameState.players[gameState.currentPlayer].current += roll + roll2;
    updateDisplay();
  }
});

document.getElementById("holdBtn").addEventListener("click", () => {
  if (!gameState.gameActive || gameState.rolling) return;

  const player = gameState.players[gameState.currentPlayer];

  if (player.current === 0) {
    return;
  }

  player.total += player.current;
  player.current = 0;

  updateDisplay();

  if (player.total >= 20) {
    endGame();
  } else {
    switchPlayer();
  }
});

function switchPlayer() {
  gameState.currentPlayer = gameState.currentPlayer === 0 ? 1 : 0;
  updateDisplay();
  document.getElementById("resultMessage").textContent = "";
}

function endGame() {
  gameState.players[0].current = 0;
  gameState.players[0].total = 0;
  gameState.players[1].current = 0;
  gameState.players[1].total = 0;
}

document.getElementById("newGameBtn").addEventListener("click", newGame);

updateDisplay();
drawDice(1);
