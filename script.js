// Card data structure
const cardData = {
    cardBacks: {
        small: 'assets/JPG/cards/card_back/cardBack_smalls.jpg',
        large: 'assets/JPG/cards/card_back/cardBack_bigs.jpg'
    },
    testCards: [
        {
            id: 'test1',
            name: 'Test Card 1',
            imageUrl: {
                small: 'assets/JPG/cards/_test_cards/test_smalls/test1.jpg',
                large: 'assets/JPG/cards/_test_cards/test_bigs/test1.jpg'
            }
        },
        {
            id: 'test2',
            name: 'Test Card 2',
            imageUrl: {
                small: 'assets/JPG/cards/_test_cards/test_smalls/test2.jpg',
                large: 'assets/JPG/cards/_test_cards/test_bigs/test2.jpg'
            }
        },
        {
            id: 'test3',
            name: 'Test Card 3',
            imageUrl: {
                small: 'assets/JPG/cards/_test_cards/test_smalls/test3.jpg',
                large: 'assets/JPG/cards/_test_cards/test_bigs/test3.jpg'
            }
        }
    ],
    characterCards: [
        {
            id: 'char1',
            name: 'Character 1',
            imageUrl: {
                small: 'assets/JPG/cards/character_cards/character_smalls/char1.jpg',
                large: 'assets/JPG/cards/character_cards/character_bigs/char1.jpg'
            }
        },
        {
            id: 'char2',
            name: 'Character 2',
            imageUrl: {
                small: 'assets/JPG/cards/character_cards/character_smalls/char2.jpg',
                large: 'assets/JPG/cards/character_cards/character_bigs/char2.jpg'
            }
        },
        {
            id: 'char3',
            name: 'Character 3',
            imageUrl: {
                small: 'assets/JPG/cards/character_cards/character_smalls/char3.jpg',
                large: 'assets/JPG/cards/character_cards/character_bigs/char3.jpg'
            }
        },
        {
            id: 'char4',
            name: 'Character 4',
            imageUrl: {
                small: 'assets/JPG/cards/character_cards/character_smalls/char4.jpg',
                large: 'assets/JPG/cards/character_cards/character_bigs/char4.jpg'
            }
        }
    ]
};

// Image preloading
const preloadImages = () => {
    const allCards = [...cardData.testCards, ...cardData.characterCards];
    const loadedImages = new Set();
    let totalImages = allCards.length * 2; // 2 sizes per card
    let loadedCount = 0;

    return new Promise((resolve, reject) => {
        allCards.forEach(card => {
            const smallImg = new Image();
            const largeImg = new Image();

            const handleLoad = () => {
                loadedCount++;
                if (loadedCount === totalImages) {
                    console.log('All card images loaded successfully');
                    resolve();
                }
            };

            const handleError = (error) => {
                console.error('Error loading card image:', error);
                reject(error);
            };

            smallImg.onload = handleLoad;
            largeImg.onload = handleLoad;
            smallImg.onerror = handleError;
            largeImg.onerror = handleError;

            smallImg.src = card.imageUrl.small;
            largeImg.src = card.imageUrl.large;
        });
    });
};

// Test function to verify card data and image loading
const testCardSetup = async () => {
    try {
        console.log('Testing card data structure:');
        console.log('Test cards:', cardData.testCards);
        console.log('Character cards:', cardData.characterCards);
        
        await preloadImages();
        console.log('Image preloading test passed');
        
        // Test card dimensions
        const testCard = document.createElement('div');
        testCard.className = 'handCard';
        document.body.appendChild(testCard);
        const computedStyle = window.getComputedStyle(testCard);
        console.log('Card dimensions:', {
            width: computedStyle.width,
            height: computedStyle.height
        });
        document.body.removeChild(testCard);
        
    } catch (error) {
        console.error('Card setup test failed:', error);
    }
};

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
    const count = parseInt(document.getElementById('playerCount').value);
    if (count >= 1 && count <= 4) {
        playerCount = count;
        initializeGameBoard();
    }
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
    cardDiv.className = 'card';
    cardDiv.dataset.cardId = card.id;
    
    // Create front image element
    const frontImg = document.createElement('img');
    frontImg.src = isInspector ? card.imageUrl.large : card.imageUrl.small;
    frontImg.alt = card.name;
    frontImg.className = 'card-front';
    frontImg.style.width = '100%';
    frontImg.style.height = '100%';
    frontImg.style.objectFit = 'cover';
    frontImg.style.borderRadius = '5px';
    frontImg.style.position = 'absolute';
    frontImg.style.backfaceVisibility = 'hidden';
    cardDiv.appendChild(frontImg);

    // Create back image element
    const backImg = document.createElement('img');
    backImg.src = isInspector ? cardData.cardBacks.large : cardData.cardBacks.small;
    backImg.alt = 'Card Back';
    backImg.className = 'card-back';
    backImg.style.width = '100%';
    backImg.style.height = '100%';
    backImg.style.objectFit = 'cover';
    backImg.style.borderRadius = '5px';
    backImg.style.position = 'absolute';
    backImg.style.backfaceVisibility = 'hidden';
    backImg.style.transform = 'rotateY(180deg)';
    cardDiv.appendChild(backImg);

    // Add interaction event listeners
    cardDiv.draggable = true;
    cardDiv.addEventListener('click', handleCardClick);
    cardDiv.addEventListener('dblclick', handleCardDoubleClick);
    cardDiv.addEventListener('dragstart', handleCardDragStart);
    cardDiv.addEventListener('dragend', handleCardDragEnd);

    return cardDiv;
}

// Render a player's hand
function renderHands() {
    // Clear existing hands
    const hands = document.querySelectorAll('.playerHand');
    hands.forEach(hand => {
        const playerIndex = parseInt(hand.id.replace('player', '').replace('Hand', '')) - 1;
        // Store existing token container and cards
        const tokenContainer = hand.querySelector('.tokenContainer');
        const existingCards = Array.from(hand.querySelectorAll('.card'));
        hand.innerHTML = '';
        
        if (tokenContainer) {
            hand.appendChild(tokenContainer);
        }

        // Add character card if this is an active player
        if (playerIndex < playerCount) {
            // Reuse existing character card or create new one
            let charCard;
            const existingCharCard = existingCards.find(card => card.classList.contains('charCard'));
            if (existingCharCard) {
                charCard = existingCharCard;
            } else {
                charCard = createCardElement(cardData.characterCards[playerIndex]);
                charCard.classList.add('charCard');
            }
            hand.appendChild(charCard);

            // Always create 5 hand card slots
            for (let i = 0; i < 5; i++) {
                const cardSlot = document.createElement('div');
                cardSlot.className = 'handCard';
                cardSlot.addEventListener('dragover', handleDragOver);
                cardSlot.addEventListener('drop', handleDrop);
                
                // If there was a card in this slot, reattach it
                const existingCard = existingCards.find(card => 
                    !card.classList.contains('charCard') && 
                    card.parentElement === hand.children[i + 1]
                );
                if (existingCard) {
                    cardSlot.appendChild(existingCard);
                }
                // Add test card to player 1's first slot
                else if (playerIndex === 0 && i === 0 && !hand.querySelector('.test-card')) {
                    const testCard = createCardElement(cardData.testCards[0]); // test1.jpg
                    testCard.classList.add('test-card');
                    cardSlot.appendChild(testCard);
                }
                
                hand.appendChild(cardSlot);
            }
        }
    });
}

// Update inspector view
function updateInspector(card) {
    const inspector = document.getElementById('inspector');
    inspector.innerHTML = '';
    
    if (card) {
        const inspectorCard = createCardElement(card, true);
        inspectorCard.classList.add('inspector-card');
        inspector.appendChild(inspectorCard);
    }
}

// Handle card click
function handleCardClick(event) {
    const card = event.currentTarget;
    const cardId = card.dataset.cardId;
    
    // Remove highlight from previously highlighted card
    if (highlightedCard) {
        highlightedCard.classList.remove('highlighted');
    }
    
    // Highlight this card
    card.classList.add('highlighted');
    highlightedCard = card;
    
    // Find the card data
    let cardData;
    if (cardId.startsWith('char')) {
        cardData = cardData.characterCards.find(c => c.id === cardId);
    } else if (cardId.startsWith('test')) {
        cardData = cardData.testCards.find(c => c.id === cardId);
    }
    
    // Update inspector if card data found
    if (cardData) {
        updateInspector(cardData);
    }
}

// Handle card double click for flipping
function handleCardDoubleClick(event) {
    const card = event.currentTarget;
    card.classList.toggle('face-down');
    
    // Apply the flip animation
    if (card.classList.contains('face-down')) {
        card.style.transform = 'rotateY(180deg)';
    } else {
        card.style.transform = 'rotateY(0)';
    }
}

// Handle drag start
function handleCardDragStart(event) {
    draggedCard = event.currentTarget;
    event.dataTransfer.setData('text/plain', ''); // Required for Firefox
    draggedCard.classList.add('dragging');
}

// Handle drag end
function handleCardDragEnd(event) {
    if (draggedCard) {
        draggedCard.classList.remove('dragging');
        draggedCard = null;
    }
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
    
    if (!draggedCard) return;

    // Don't allow dropping character cards into hand card slots
    if (draggedCard.classList.contains('charCard') && target.classList.contains('handCard')) {
        return;
    }

    if (target.classList.contains('handCard') || 
        target.classList.contains('gridSlot') || 
        target.classList.contains('mutableSlot')) {
        
        const sourceParent = draggedCard.parentNode;
        
        // If target already has a card, swap them
        const existingCard = target.querySelector('.card');
        if (existingCard) {
            sourceParent.appendChild(existingCard);
        }
        
        target.appendChild(draggedCard);
        
        // Ensure hand structure remains intact
        if (sourceParent.classList.contains('handCard') || target.classList.contains('handCard')) {
            const hand = sourceParent.closest('.playerHand') || target.closest('.playerHand');
            if (hand) {
                // Verify all slots are present
                const slots = hand.querySelectorAll('.handCard');
                if (slots.length < 5) {
                    renderHands();
                }
            }
        }
    }
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

// Initialize event listeners
window.addEventListener('DOMContentLoaded', () => {
    testCardSetup();
    // Start game button
    document.getElementById('startGameBtn').addEventListener('click', startGame);
    
    // Menu icon
    document.getElementById('menuIcon').addEventListener('click', () => {
        console.log('Menu clicked');
    });
    
    // Settings icon
    document.getElementById('settingsIcon').addEventListener('click', () => {
        console.log('Settings clicked');
    });
    
    // Initialize with setup modal visible
    document.getElementById('gameBoard').style.display = 'none';
    document.getElementById('setup').style.display = 'flex';

    // Token input validation
    document.querySelectorAll('.token').forEach(token => {
        token.addEventListener('input', function(e) {
            // Remove any non-digit characters
            this.value = this.value.replace(/[^0-9]/g, '');
            
            // Ensure the value is between 0 and 9
            if (this.value > 9) {
                this.value = 9;
            }
        });
    });
});