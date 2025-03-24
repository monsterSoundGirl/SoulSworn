// Card data with monster cards for testing
const deck = [
  {
    id: 1,
    name: "Test Monster 1",
    description: "A fearsome creature from the depths.",
    imageUrl: "assets/JPG/cards/monster_cards/monster_1_289x485.jpg",
    originalImageUrl: "assets/JPG/cards/monster_cards/monster_1_1192x2000.jpg"
  },
  {
    id: 2,
    name: "Test Monster 2",
    description: "An ancient being of great power.",
    imageUrl: "assets/JPG/cards/monster_cards/monster_2_289x485.jpg",
    originalImageUrl: "assets/JPG/cards/monster_cards/monster_2_1192x2000.jpg"
  },
  {
    id: 3,
    name: "Test Monster 3",
    description: "A mysterious entity from beyond.",
    imageUrl: "assets/JPG/cards/monster_cards/monster_3_289x485.jpg",
    originalImageUrl: "assets/JPG/cards/monster_cards/monster_3_1192x2000.jpg"
  }
];

// Game state
let playerCount = 1;
let playerHands = [];
let gameStarted = false;

// Card interaction state
let draggedCard = null;
let highlightedCard = null;

// Token state
const MAX_TOKENS = 7;
let playerTokens = [];

// Token interaction state
let selectedToken = null;

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Initialize the game board
function initializeGameBoard() {
    // Generate story grid slots
    const storyGrid = document.getElementById('storyGrid');
    for (let i = 0; i < 40; i++) { // 4x10 grid
        const slot = document.createElement('div');
        slot.className = 'gridSlot';
        slot.dataset.index = i;
        storyGrid.appendChild(slot);
    }

    // Initialize player hands and tokens
    playerHands = [];
    initializePlayerTokens();
    
    for (let i = 0; i < playerCount; i++) {
        playerHands.push([]);
    }

    // Show game board, hide setup
    document.getElementById('gameBoard').style.display = 'flex';
    document.getElementById('setup').style.display = 'none';
    gameStarted = true;
    
    // Render initial hands
    renderHands();
}

// Start game function
function startGame() {
    playerCount = parseInt(document.getElementById('playerCount').value, 10);
    if (playerCount < 1) playerCount = 1;
    if (playerCount > 4) playerCount = 4;
    
    initializeGameBoard();
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

// Create a card element
function createCardElement(card, isInspector = false) {
    const cardDiv = document.createElement('div');
    cardDiv.className = `card ${isInspector ? 'inspector' : ''}`;
    cardDiv.dataset.cardId = card.id;
    
    // Use original image for inspector, display size for regular cards
    const imageUrl = isInspector ? card.originalImageUrl : card.imageUrl;
    
    cardDiv.innerHTML = `
        <img src="${imageUrl}" alt="${card.name}" />
        <div class="card-content">
            <div class="card-name">${card.name}</div>
            <div class="card-description">${card.description}</div>
        </div>
    `;

    // Add interaction event listeners
    cardDiv.addEventListener('click', handleCardClick);
    cardDiv.addEventListener('dblclick', handleCardDoubleClick);
    cardDiv.addEventListener('mousedown', handleCardDragStart);
    cardDiv.addEventListener('mouseup', handleCardDragEnd);
    cardDiv.addEventListener('mouseleave', handleCardDragEnd);

    return cardDiv;
}

// Handle card click
function handleCardClick(event) {
    const card = event.currentTarget;
    if (highlightedCard) {
        highlightedCard.classList.remove('highlighted');
    }
    card.classList.add('highlighted');
    highlightedCard = card;
    
    // Update inspector
    const cardId = card.dataset.cardId;
    const cardData = deck.find(c => c.id === parseInt(cardId));
    if (cardData) {
        updateInspector(cardData);
    }
}

// Handle card double click
function handleCardDoubleClick(event) {
    const card = event.currentTarget;
    card.classList.toggle('face-down');
}

// Handle card drag start
function handleCardDragStart(event) {
    draggedCard = event.currentTarget;
    draggedCard.classList.add('dragging');
    
    // Add drag-over listeners to valid drop targets
    document.querySelectorAll('.gridSlot, .mutableSlot').forEach(slot => {
        slot.addEventListener('dragover', handleDragOver);
        slot.addEventListener('drop', handleDrop);
    });
}

// Handle card drag end
function handleCardDragEnd(event) {
    if (draggedCard) {
        draggedCard.classList.remove('dragging');
        draggedCard = null;
    }
    
    // Remove drag-over listeners
    document.querySelectorAll('.gridSlot, .mutableSlot').forEach(slot => {
        slot.removeEventListener('dragover', handleDragOver);
        slot.removeEventListener('drop', handleDrop);
    });
}

// Handle drag over
function handleDragOver(event) {
    event.preventDefault();
    event.currentTarget.classList.add('drag-over');
}

// Handle drop
function handleDrop(event) {
    event.preventDefault();
    const target = event.currentTarget;
    target.classList.remove('drag-over');
    
    if (draggedCard && target.classList.contains('gridSlot') || target.classList.contains('mutableSlot')) {
        target.appendChild(draggedCard);
    }
}

// Update inspector view
function updateInspector(cardData) {
    const inspector = document.getElementById('cardInspector');
    inspector.innerHTML = '';
    inspector.appendChild(createCardElement(cardData, true));
}

// Initialize token state for each player
function initializePlayerTokens() {
    playerTokens = [];
    for (let i = 0; i < playerCount; i++) {
        playerTokens.push({
            rational: 0,
            emotional: 0,
            physical: 0,
            total: 0
        });
    }
}

// Handle token selection
function handleTokenClick(event) {
    const token = event.currentTarget;
    if (selectedToken) {
        selectedToken.classList.remove('selected');
    }
    token.classList.add('selected');
    selectedToken = token;
}

// Handle arrow key interactions
function handleArrowKeys(event) {
    if (!selectedToken) return;
    
    const token = selectedToken;
    const attribute = token.dataset.attribute;
    const playerIndex = parseInt(token.closest('.playerHand').dataset.playerIndex);
    const playerToken = playerTokens[playerIndex];

    switch(event.key) {
        case 'ArrowUp':
            if (playerToken.total < MAX_TOKENS) {
                playerToken[attribute]++;
                playerToken.total++;
                updateTokenDisplay(token, playerToken[attribute]);
                checkTokenMax(token, playerToken.total);
            }
            break;
        case 'ArrowDown':
            if (playerToken[attribute] > 0) {
                playerToken[attribute]--;
                playerToken.total--;
                updateTokenDisplay(token, playerToken[attribute]);
                checkTokenMax(token, playerToken.total);
            }
            break;
        case 'Tab':
            event.preventDefault();
            const tokens = Array.from(document.querySelectorAll('.token'));
            const currentIndex = tokens.indexOf(token);
            const nextIndex = event.shiftKey ? 
                (currentIndex - 1 + tokens.length) % tokens.length : 
                (currentIndex + 1) % tokens.length;
            tokens[nextIndex].click();
            break;
    }
}

// Update token display
function updateTokenDisplay(token, value) {
    token.textContent = value;
}

// Check if token is maxed
function checkTokenMax(token, total) {
    if (total >= MAX_TOKENS) {
        token.classList.add('maxed');
    } else {
        token.classList.remove('maxed');
    }
}

// Update render hands function to use new token interaction
function renderHands() {
    const topHands = document.getElementById('topPlayerHands');
    const bottomHands = document.getElementById('bottomPlayerHands');
    
    // Clear existing hands
    topHands.innerHTML = '';
    bottomHands.innerHTML = '';
    
    // Render hands based on player count
    for (let p = 0; p < playerCount; p++) {
        const playerHand = document.createElement('div');
        playerHand.className = 'playerHand';
        playerHand.dataset.playerIndex = p;
        
        // Add character card slot
        const charSlot = document.createElement('div');
        charSlot.className = 'card face-up';
        charSlot.innerHTML = '<div class="card-content">Character Card</div>';
        playerHand.appendChild(charSlot);
        
        // Add attribute tokens
        const tokenContainer = document.createElement('div');
        tokenContainer.className = 'token-container';
        
        const attributes = ['rational', 'emotional', 'physical'];
        attributes.forEach(attr => {
            const token = document.createElement('div');
            token.className = 'token';
            token.dataset.attribute = attr;
            token.textContent = playerTokens[p][attr];
            
            // Add token selection listener
            token.addEventListener('click', handleTokenClick);
            
            tokenContainer.appendChild(token);
        });
        
        playerHand.appendChild(tokenContainer);
        
        // Add hand cards
        playerHands[p].forEach(card => {
            playerHand.appendChild(createCardElement(card));
        });
        
        // Add to appropriate container
        if (p === 0 || p === 3) {
            bottomHands.appendChild(playerHand);
        } else {
            topHands.appendChild(playerHand);
        }
    }
}

// Initialize event listeners
window.addEventListener('DOMContentLoaded', () => {
    // Setup modal
    document.getElementById('startGameBtn').addEventListener('click', startGame);
    
    // Menu and settings icons
    document.getElementById('menuIcon').addEventListener('click', () => {
        // TODO: Implement menu functionality
        console.log('Menu clicked');
    });
    
    document.getElementById('settingsIcon').addEventListener('click', () => {
        // TODO: Implement settings functionality
        console.log('Settings clicked');
    });
    
    // Timer controls
    document.getElementById('resetTimer').addEventListener('click', () => {
        // TODO: Implement timer reset
        console.log('Timer reset clicked');
    });
    
    document.getElementById('toggleTimer').addEventListener('click', () => {
        // TODO: Implement timer toggle
        console.log('Timer toggle clicked');
    });
    
    // Add arrow key listener
    document.addEventListener('keydown', handleArrowKeys);
    
    // Initialize with setup modal visible
    document.getElementById('gameBoard').style.display = 'none';
    document.getElementById('setup').style.display = 'flex';
});