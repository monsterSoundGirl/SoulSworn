// Your card data
const deck = [
  {
    id: 1,
    name: "Echoing Alley",
    description: "Whispers follow you, echoing secrets—or leading to doom.",
    imageUrl: "images/echoing_alley.jpg"
  },
  {
    id: 2,
    name: "Veiled Market",
    description: "Hidden bargains, cursed treasures—every deal has a price.",
    imageUrl: "images/veiled_market.jpg"
  },
  // ... Add as many as you want
];

// Global state
let playerCount = 1;
let playerHands = []; // array of arrays

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function startGame() {
  // Read number of players
  playerCount = parseInt(document.getElementById("playerCount").value, 10);
  if (playerCount < 1) playerCount = 1;

  // Initialize empty hands
  playerHands = [];
  for (let i = 0; i < playerCount; i++) {
    playerHands.push([]);
  }

  // Hide setup, show game area
  document.getElementById("setup").style.display = "none";
  document.getElementById("gameArea").style.display = "block";

  // (Optional) Shuffle deck at game start
  shuffleDeck();
  // (Optional) Immediately deal some initial cards?
  // dealCards(5);
  renderHands();
}

function shuffleDeck() {
  shuffleArray(deck);
  alert("Deck shuffled!");
}

function dealCards(cardsPerPlayer = 1) {
  // For each player, draw `cardsPerPlayer` from the top of the deck (if available)
  for (let p = 0; p < playerCount; p++) {
    for (let c = 0; c < cardsPerPlayer; c++) {
      if (deck.length > 0) {
        const card = deck.shift();
        playerHands[p].push(card);
      } else {
        alert("No more cards in the deck!");
        return;
      }
    }
  }
  renderHands();
}

function rollD20() {
  const result = Math.floor(Math.random() * 20) + 1;
  document.getElementById("rollResult").textContent = "You rolled a " + result;
}

function renderHands() {
  const container = document.getElementById("playerHands");
  container.innerHTML = ""; // Clear previous

  // For each player, create a section
  for (let p = 0; p < playerCount; p++) {
    const playerDiv = document.createElement("div");
    playerDiv.className = "player-hand";
    playerDiv.innerHTML = `<h3>Player ${p + 1}</h3>`;

    // For each card in that player’s hand, show a thumbnail
    playerHands[p].forEach(card => {
      const cardDiv = document.createElement("div");
      cardDiv.className = "card";

      cardDiv.innerHTML = `
        <img src="${card.imageUrl}" alt="${card.name}" class="card-img" />
        <h4>${card.name}</h4>
        <p>${card.description}</p>
      `;

      playerDiv.appendChild(cardDiv);
    });

    container.appendChild(playerDiv);
  }
}

// Hook up DOM events
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("startGameBtn").addEventListener("click", startGame);
  document.getElementById("shuffleBtn").addEventListener("click", shuffleDeck);
  document.getElementById("dealBtn").addEventListener("click", () => dealCards(1));
  document.getElementById("rollDieBtn").addEventListener("click", rollD20);
});