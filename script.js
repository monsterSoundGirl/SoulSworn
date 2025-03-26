// Use the global TurnTimer instead of importing
// import TurnTimer from './timer.js';

// Create a reference to the timer class without instantiating it
let timerClass = TurnTimer;  // This will be available from timer.js
let gameTimer = null;

// Main deck and discard pile data
let mainDeck = [];
let mainDiscard = [];
let altDeck = [];
let altDiscard = [];

// Card interaction state
let draggedCard = null;
let highlightedCard = null;
let isDragging = false;

// Card data structure
const cardData = {
    cardBacks: {
        small: 'assets/JPG/cards/card_back/cardBack_smalls.jpg',
        large: 'assets/JPG/cards/card_back/cardBack_bigs.jpg'
    },
    // Generate 50 test cards with the specified pattern
    testCards: Array.from({ length: 50 }, (_, i) => {
        // Convert index to padded number (01-50)
        const cardNum = String(i + 1).padStart(2, '0');
        return {
            id: `test${cardNum}`,
            name: `Test Card ${cardNum}`,
            description: `Description for test card ${cardNum}`,
            imageUrl: {
                small: `assets/JPG/cards/_test_cards/test_smalls/ssworn_test_deck-${cardNum}.jpg`,
                large: `assets/JPG/cards/_test_cards/test_bigs/ssworn_test_deck-${cardNum}_lrg.jpg`
            },
            faceUp: false
        };
    }),
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

// Game state
let playerCount = 1;
let playerHands = [];
let gameStarted = false;

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

// Initialize event listeners
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
    
    // Make sure setup screen is visible and game board is hidden
    console.log('Setup element:', document.getElementById('setup'));
    console.log('Setup style:', document.getElementById('setup').style.display);
    document.getElementById('gameBoard').style.display = 'none';
    document.getElementById('setup').style.display = 'flex';
    
    // Set up menu UI interactions
    initializeMenuInteractions();
    
    // Start game button
    const startBtn = document.getElementById('startGameBtn');
    console.log('Start button found:', startBtn);
    
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            console.log('Start button clicked');
            startGame();
        });
    } else {
        console.error('Start button not found in the DOM');
    }
    
    // Menu icon
    document.getElementById('menuIcon').addEventListener('click', () => {
        console.log('Menu clicked');
    });
    
    // Settings icon
    document.getElementById('settingsIcon').addEventListener('click', () => {
        console.log('Settings clicked');
    });

    // D20 area click handler
    document.getElementById('d20Area').addEventListener('click', animateD20Roll);
});

// Initialize menu interactions
function initializeMenuInteractions() {
    // Deck type selections
    const mainDeckSelect = document.getElementById('mainDeckType');
    const altDeckSelect = document.getElementById('altDeckType');
    
    if (mainDeckSelect) {
        mainDeckSelect.addEventListener('change', () => {
            console.log('Main deck type changed:', mainDeckSelect.value);
        });
    }
    
    if (altDeckSelect) {
        altDeckSelect.addEventListener('change', () => {
            console.log('Alt deck type changed:', altDeckSelect.value);
        });
    }
    
    // Card preview navigation
    const prevCardBtn = document.getElementById('prevCard');
    const nextCardBtn = document.getElementById('nextCard');
    
    if (prevCardBtn) {
        prevCardBtn.addEventListener('click', () => {
            console.log('Previous card button clicked');
        });
    }
    
    if (nextCardBtn) {
        nextCardBtn.addEventListener('click', () => {
            console.log('Next card button clicked');
        });
    }
    
    // Join game button
    const joinBtn = document.getElementById('joinBtn');
    if (joinBtn) {
        joinBtn.addEventListener('click', () => {
            const joinCode = document.getElementById('joinCode').value;
            console.log('Join game button clicked with code:', joinCode);
        });
    }
}

// Deck initialization function
function initializeMainDeck() {
    console.log('Initializing main deck with all test cards');
    // Clear the deck
    mainDeck = [];
    
    // Copy all test cards to the deck
    mainDeck = cardData.testCards.map(card => ({...card, faceUp: false}));
    
    // Shuffle the deck
    shuffleArray(mainDeck);
    
    // Initialize the deck element
    renderMainDeck();
    
    console.log(`Main deck initialized with ${mainDeck.length} cards`);
}

// Render main deck
function renderMainDeck() {
    const deckElement = document.getElementById('mainDeck');
    deckElement.innerHTML = '';
    
    // Add deck count indicator
    const deckCount = document.createElement('div');
    deckCount.className = 'deck-count';
    deckCount.textContent = mainDeck.length;
    deckElement.appendChild(deckCount);
    
    // Only render the top card if the deck has cards
    if (mainDeck.length > 0) {
        const topCard = mainDeck[0];
        
        // Create a single draggable element to represent the top card
        const cardElement = document.createElement('div');
        cardElement.className = 'deck-card-container';
        cardElement.setAttribute('draggable', 'true');
        cardElement.dataset.fromDeck = 'true';
        cardElement.dataset.faceUp = topCard.faceUp ? 'true' : 'false';
        
        // Create card front (the actual card image)
        const cardFront = document.createElement('img');
        cardFront.className = 'deck-card-front';
        cardFront.src = topCard.imageUrl.small;
        cardFront.alt = topCard.name;
        
        // Create card back
        const cardBack = document.createElement('img');
        cardBack.className = 'deck-card-back';
        cardBack.src = cardData.cardBacks.small;
        cardBack.alt = 'Card Back';
        
        // Add correct visibility based on face up/down state
        if (topCard.faceUp) {
            cardFront.style.display = 'block';
            cardBack.style.display = 'none';
        } else {
            cardFront.style.display = 'none';
            cardBack.style.display = 'block';
        }
        
        // Add elements to container
        cardElement.appendChild(cardFront);
        cardElement.appendChild(cardBack);
        
        // Add event listeners
        cardElement.addEventListener('dragstart', handleSimpleDeckDragStart);
        cardElement.addEventListener('dragend', handleSimpleDeckDragEnd);
        cardElement.addEventListener('click', function() {
            // Show in inspector without changing state
            updateInspector(topCard);
        });
        cardElement.addEventListener('dblclick', function() {
            // Toggle face up/down state
            topCard.faceUp = !topCard.faceUp;
            renderMainDeck();
        });
        
        deckElement.appendChild(cardElement);
    }
}

// Handle dragging a card from the deck - simplified approach
function handleSimpleDeckDragStart(event) {
    if (mainDeck.length === 0) return;
    
    draggedCard = event.currentTarget;
    event.dataTransfer.setData('text/plain', 'deck-card');
    
    // Add visual feedback
    draggedCard.classList.add('dragging');
    
    // Always show card in inspector when dragged
    updateInspector(mainDeck[0]);
    
    // Use the correct image for dragging based on current state
    const isFaceUp = draggedCard.dataset.faceUp === 'true';
    if (event.dataTransfer.setDragImage) {
        const img = new Image();
        if (isFaceUp) {
            img.src = mainDeck[0].imageUrl.small;
        } else {
            img.src = cardData.cardBacks.small;
        }
        event.dataTransfer.setDragImage(img, 40, 72);
    }
}

// Handle end of dragging a card from the deck
function handleSimpleDeckDragEnd(event) {
    if (draggedCard) {
        draggedCard.classList.remove('dragging');
        draggedCard = null;
    }
}

// Handle dropping cards onto the discard pile
function handleDiscardDrop(event) {
    event.preventDefault();
    
    if (!draggedCard) return;
    
    // Check if we're dragging from the deck wrapper
    if (draggedCard.dataset.fromDeck === 'true') {
        // Move top card from deck to discard
        if (mainDeck.length > 0) {
            const card = mainDeck.shift();
            card.faceUp = true; // Cards in discard are always face up
            mainDiscard.push(card);
            
            // Update the display
            renderMainDeck();
            renderMainDiscard();
        }
        return;
    }
    
    // Handle cards dragged from other places
    const cardId = draggedCard.dataset.cardId;
    if (cardId) {
        // Find the card data
        let foundCard;
        if (cardId.startsWith('test')) {
            const cardNum = cardId.replace('test', '');
            const index = parseInt(cardNum, 10) - 1;
            if (index >= 0 && index < 50) {
                // Create a copy of the card for the discard pile
                const originalCard = cardData.testCards[index];
                foundCard = {...originalCard, faceUp: true};
            }
        }
        
        if (foundCard) {
            // Add to discard
            mainDiscard.push(foundCard);
            
            // Remove from original position
            draggedCard.remove();
            
            // Update display
            renderMainDiscard();
        }
    }
}

// Initialize deck event listeners
function initializeDeckEventListeners() {
    // Add event listeners for the discard pile
    const mainDiscardElement = document.getElementById('mainDiscard');
    mainDiscardElement.addEventListener('dragover', (e) => e.preventDefault());
    mainDiscardElement.addEventListener('drop', handleDiscardDrop);
}

// Start game function
function startGame() {
    console.log('Starting game...');
    
    // Get selected player count
    const playerCountSelect = document.getElementById('playerCount');
    playerCount = parseInt(playerCountSelect.value);
    console.log('Player count:', playerCount);
    
    if (playerCount < 1 || playerCount > 4) {
        console.error('Invalid player count:', playerCount);
        return;
    }

    // Initialize game state
    gameStarted = true;
    playerHands = Array(playerCount).fill().map(() => []);
    initializePlayerTokens();
    
    // Generate story grid slots
    const storyGrid = document.getElementById('storyGrid');
    storyGrid.innerHTML = ''; // Clear existing slots
    for (let i = 0; i < 40; i++) { // 4x10 grid
        const slot = document.createElement('div');
        slot.className = 'gridSlot';
        slot.dataset.index = i;
        slot.addEventListener('dragover', handleDragOver);
        slot.addEventListener('drop', handleDrop);
        storyGrid.appendChild(slot);
    }

    // Initialize mutable column slots
    const mutableColumn = document.getElementById('mutableColumn');
    mutableColumn.innerHTML = ''; // Clear existing slots
    for (let i = 0; i < 4; i++) {
        const slot = document.createElement('div');
        slot.className = 'mutableSlot';
        slot.dataset.index = i;
        slot.addEventListener('dragover', handleDragOver);
        slot.addEventListener('drop', handleDrop);
        mutableColumn.appendChild(slot);
    }

    // Initialize d20 with starting value of 20 in green
    const d20Area = document.getElementById('d20Area');
    const rollDisplay = document.createElement('div');
    rollDisplay.className = 'roll-number';
    rollDisplay.textContent = '20';
    rollDisplay.style.color = '#4ae24a'; // Green for 20
    d20Area.innerHTML = '';
    d20Area.appendChild(rollDisplay);

    // Show only the active player hands
    const playerHandElements = document.querySelectorAll('.playerHand');
    playerHandElements.forEach((hand, index) => {
        hand.style.display = index < playerCount ? 'flex' : 'none';
    });

    // Initialize turn timer with global reference
    gameTimer = new TurnTimer('turnTimer', 120); // 2 minutes
    gameTimer.updateDisplay();

    // Timer controls - use the existing elements from the timer.js
    document.getElementById('toggleBtn').addEventListener('click', function() {
        if (gameTimer.isRunning) {
            gameTimer.pause();
        } else {
            if (gameTimer.remaining === 0) {
                gameTimer.reset();
            }
            gameTimer.start();
        }
    });

    document.getElementById('resetBtn').addEventListener('click', function() {
        gameTimer.reset();
    });
    
    // Duration setting controls
    const minutesInput = document.getElementById('timerMinutes');
    const secondsInput = document.getElementById('timerSeconds');
    document.getElementById('setDurationBtn').addEventListener('click', function() {
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;
        const totalSeconds = (minutes * 60) + seconds;
        
        if (totalSeconds > 0) {
            gameTimer.setDuration(totalSeconds);
        }
    });
    
    // Input validation
    minutesInput.addEventListener('input', function() {
        let value = parseInt(this.value) || 0;
        if (value > 60) value = 60;
        if (value < 0) value = 0;
        this.value = value;
    });
    
    secondsInput.addEventListener('input', function() {
        let value = parseInt(this.value) || 0;
        if (value > 59) value = 59;
        if (value < 0) value = 0;
        this.value = value;
    });
    
    // Initialize the deck
    initializeMainDeck();
    initializeDeckEventListeners();
    
    // Render initial cards (without test card)
    renderHands();
    
    // Hide setup screen and show game board
    document.getElementById('setup').style.display = 'none';
    document.getElementById('gameBoard').style.display = 'block';
    
    console.log('Game initialized successfully');
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

// D20 roll animation
function animateD20Roll() {
    const d20Area = document.getElementById('d20Area');
    const rollDisplay = document.createElement('div');
    rollDisplay.id = 'rollDisplay';
    rollDisplay.className = 'roll-number';
    d20Area.innerHTML = '';
    d20Area.appendChild(rollDisplay);

    let duration = 2000; // 2 seconds
    let interval = 50; // Update every 50ms
    let startTime = Date.now();
    let animationFrame;

    function updateDisplay() {
        let currentTime = Date.now();
        let elapsed = currentTime - startTime;
        
        if (elapsed < duration) {
            // Generate random number 1-20
            let randomNum = Math.floor(Math.random() * 20) + 1;
            rollDisplay.textContent = randomNum.toString();
            rollDisplay.style.color = '#ffffff'; // White during animation
            
            // Slow down the animation gradually
            interval = 50 + (elapsed / duration) * 200;
            
            animationFrame = setTimeout(updateDisplay, interval);
        } else {
            // Final roll
            let finalRoll = Math.floor(Math.random() * 20) + 1;
            rollDisplay.textContent = finalRoll.toString();
            
            // Set color based on roll value
            if (finalRoll === 20) {
                rollDisplay.style.color = '#4ae24a'; // Green
            } else if (finalRoll === 1) {
                rollDisplay.style.color = '#e24a4a'; // Red
            } else {
                rollDisplay.style.color = '#ffffff'; // White
            }
            
            rollDisplay.classList.add('final-roll');
        }
    }

    updateDisplay();
}

// Create card element
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
                
                hand.appendChild(cardSlot);
            }
        }
    });
}

// Handle card click
function handleCardClick(event) {
    const card = event.currentTarget;
    const cardId = card.dataset.cardId;
    
    console.log('Card clicked:', cardId);
    
    // Remove highlight from previously highlighted card
    if (highlightedCard) {
        highlightedCard.classList.remove('highlighted');
    }
    
    // Highlight this card
    card.classList.add('highlighted');
    highlightedCard = card;
    
    // Find the card data
    let foundCard;
    if (cardId.startsWith('char')) {
        foundCard = cardData.characterCards.find(c => c.id === cardId);
    } else if (cardId.startsWith('test')) {
        foundCard = cardData.testCards.find(c => c.id === cardId);
    } else if (cardId.startsWith('monster')) {
        foundCard = deck.find(c => c.id === cardId);
    }
    
    console.log('Found card data:', foundCard);
    
    // Update inspector if card data found
    if (foundCard) {
        updateInspector(foundCard);
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
    const target = event.currentTarget;
    
    // Only add drag-over class to valid drop targets
    if (target.classList.contains('handCard') || 
        target.classList.contains('gridSlot') || 
        target.classList.contains('mutableSlot')) {
        target.classList.add('drag-over');
    }
}

// Handle drop
function handleDrop(event) {
    event.preventDefault();
    const target = event.currentTarget;
    target.classList.remove('drag-over');
    
    if (!draggedCard) return;

    // Don't allow dropping character cards into hand card slots, grid slots, or mutable slots
    if (draggedCard.classList.contains('charCard') && 
        (target.classList.contains('handCard') || 
         target.classList.contains('gridSlot') || 
         target.classList.contains('mutableSlot'))) {
        return;
    }

    // Special handling for cards dragged from the deck
    if (draggedCard.dataset.fromDeck === 'true') {
        // Get a reference to the card data
        const card = {...mainDeck.shift()};
        
        // Get the face-up state from the deck
        const isFaceUp = draggedCard.dataset.faceUp === 'true';
        card.faceUp = isFaceUp;
        
        // Handle drops in hand card slots
        if (target.classList.contains('handCard')) {
            // If target already has a card, swap them
            const existingCard = target.querySelector('.card');
            if (existingCard) {
                // Put the existing card back into the deck
                mainDeck.unshift({...cardData.testCards.find(c => c.id === existingCard.dataset.cardId), faceUp: false});
            }
            
            // Create a new properly sized card for the hand
            const newCard = createCardElement(card);
            
            // Apply face-up/face-down state
            if (!card.faceUp) {
                newCard.classList.add('face-down');
                newCard.style.transform = 'rotateY(180deg)';
            } else {
                newCard.classList.remove('face-down');
                newCard.style.transform = 'rotateY(0deg)';
            }
            
            target.appendChild(newCard);
            
            // Update the main deck display
            renderMainDeck();
            return;
        }
        // Handle drops in grid slots
        else if (target.classList.contains('gridSlot')) {
            // Handle existing card in slot
            const existingCard = target.querySelector('.card');
            if (existingCard) {
                // Find empty slot or return card to deck
                const allGridSlots = Array.from(document.querySelectorAll('.gridSlot'));
                const emptySlot = allGridSlots.find(slot => !slot.querySelector('.card'));
                
                if (emptySlot) {
                    emptySlot.appendChild(existingCard);
                } else {
                    mainDeck.unshift(card);
                    renderMainDeck();
                    return;
                }
            }
            
            // Create a new properly sized card for the grid
            const newCard = createCardElement(card);
            
            // Apply face-up/face-down state
            if (!card.faceUp) {
                newCard.classList.add('face-down');
                newCard.style.transform = 'rotateY(180deg)';
            } else {
                newCard.classList.remove('face-down');
                newCard.style.transform = 'rotateY(0deg)';
            }
            
            target.appendChild(newCard);
            
            // Update the main deck display
            renderMainDeck();
            return;
        }
        // Handle drops in mutable slots
        else if (target.classList.contains('mutableSlot')) {
            // Handle existing card in slot
            const existingCard = target.querySelector('.card');
            if (existingCard) {
                // Find empty slot or return card to deck
                const allMutableSlots = Array.from(document.querySelectorAll('.mutableSlot'));
                const emptySlot = allMutableSlots.find(slot => !slot.querySelector('.card'));
                
                if (emptySlot) {
                    emptySlot.appendChild(existingCard);
                } else {
                    mainDeck.unshift(card);
                    renderMainDeck();
                    return;
                }
            }
            
            // Create a new properly sized card for the mutable slot
            const newCard = createCardElement(card);
            
            // Apply face-up/face-down state
            if (!card.faceUp) {
                newCard.classList.add('face-down');
                newCard.style.transform = 'rotateY(180deg)';
            } else {
                newCard.classList.remove('face-down');
                newCard.style.transform = 'rotateY(0deg)';
            }
            
            target.appendChild(newCard);
            
            // Update the main deck display
            renderMainDeck();
            return;
        }
        
        // If the drop is not in a valid target, return the card to the deck
        mainDeck.unshift(card);
        renderMainDeck();
        return;
    }

    // Handle drops for non-deck cards
    // Handle drops in hand card slots
    if (target.classList.contains('handCard')) {
        const sourceParent = draggedCard.parentNode;
        
        // If target already has a card, swap them
        const existingCard = target.querySelector('.card');
        if (existingCard) {
            sourceParent.appendChild(existingCard);
        }
        
        target.appendChild(draggedCard);
        
        // Ensure hand structure remains intact
        const hand = sourceParent.closest('.playerHand') || target.closest('.playerHand');
        if (hand) {
            // Verify all slots are present
            const slots = hand.querySelectorAll('.handCard');
            if (slots.length < 5) {
                renderHands();
            }
        }
    }
    // Handle drops in grid slots
    else if (target.classList.contains('gridSlot')) {
        const sourceParent = draggedCard.parentNode;
        
        // If target already has a card, find the nearest empty slot
        const existingCard = target.querySelector('.card');
        if (existingCard) {
            // Find all grid slots
            const allGridSlots = Array.from(document.querySelectorAll('.gridSlot'));
            const currentIndex = allGridSlots.indexOf(target);
            
            // Search for nearest empty slot
            let emptySlot = null;
            let searchRadius = 1;
            const maxSearch = Math.max(10, 4); // Width or height of grid
            
            while (!emptySlot && searchRadius <= maxSearch) {
                // Check slots in expanding radius
                for (let i = -searchRadius; i <= searchRadius; i++) {
                    for (let j = -searchRadius; j <= searchRadius; j++) {
                        const checkIndex = currentIndex + (i * 10) + j;
                        if (checkIndex >= 0 && checkIndex < allGridSlots.length) {
                            const checkSlot = allGridSlots[checkIndex];
                            if (!checkSlot.querySelector('.card')) {
                                emptySlot = checkSlot;
                                break;
                            }
                        }
                    }
                    if (emptySlot) break;
                }
                searchRadius++;
            }
            
            // If no empty slot found, return card to original position
            if (!emptySlot) {
                draggedCard.style.transform = ''; // Reset any transform
                return;
            }
            
            // Move existing card to empty slot
            emptySlot.appendChild(existingCard);
        }
        
        // Place dragged card in target slot
        target.appendChild(draggedCard);
        draggedCard.style.transform = ''; // Reset any transform
    }
    // Handle drops in mutable slots
    else if (target.classList.contains('mutableSlot')) {
        const sourceParent = draggedCard.parentNode;
        
        // If target already has a card, find the nearest empty mutable slot
        const existingCard = target.querySelector('.card');
        if (existingCard) {
            // Find all mutable slots
            const allMutableSlots = Array.from(document.querySelectorAll('.mutableSlot'));
            const currentIndex = allMutableSlots.indexOf(target);
            
            // Search for nearest empty slot
            let emptySlot = null;
            let searchRadius = 1;
            const maxSearch = 4; // Number of mutable slots
            
            while (!emptySlot && searchRadius <= maxSearch) {
                // Check slots in expanding radius
                for (let i = -searchRadius; i <= searchRadius; i++) {
                    const checkIndex = currentIndex + i;
                    if (checkIndex >= 0 && checkIndex < allMutableSlots.length) {
                        const checkSlot = allMutableSlots[checkIndex];
                        if (!checkSlot.querySelector('.card')) {
                            emptySlot = checkSlot;
                            break;
                        }
                    }
                }
                if (emptySlot) break;
                searchRadius++;
            }
            
            // If no empty slot found, return card to deck
            if (!emptySlot) {
                mainDeck.unshift({...card, faceUp: false});
                renderMainDeck();
                return;
            }
            
            // Move existing card to empty slot
            emptySlot.appendChild(existingCard);
        }
        
        // Create a new properly sized card for the mutable slot
        const newCard = createCardElement(card);
        
        // Keep cards face-down when coming from the deck
        newCard.classList.add('face-down');
        newCard.style.transform = 'rotateY(180deg)';
        
        newCard.draggable = true;
        newCard.addEventListener('click', handleCardClick);
        newCard.addEventListener('dblclick', handleCardDoubleClick);
        newCard.addEventListener('dragstart', handleCardDragStart);
        newCard.addEventListener('dragend', handleCardDragEnd);
        
        target.appendChild(newCard);
        
        // Update the main deck display
        renderMainDeck();
        return;
    }
    
    // If the drop is not in a valid target, return the card to the deck
    mainDeck.unshift({...card, faceUp: isFaceUp});
    renderMainDeck();
    return;
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

// Update inspector with clicked card
function updateInspector(card) {
    console.log('Updating inspector with card:', card);
    const inspector = document.getElementById('inspector');
    inspector.innerHTML = ''; // Clear current inspector content
    
    if (card) {
        const inspectorCard = document.createElement('div');
        inspectorCard.className = 'card inspector-card';
        inspectorCard.dataset.cardId = card.id;
        
        // Create front image element (always visible in inspector)
        const frontImg = document.createElement('img');
        frontImg.src = card.imageUrl.large;
        frontImg.alt = card.name;
        frontImg.className = 'card-front';
        frontImg.style.width = '100%';
        frontImg.style.height = '100%';
        frontImg.style.objectFit = 'contain';
        frontImg.style.borderRadius = '5px';
        frontImg.style.position = 'absolute';
        frontImg.style.backfaceVisibility = 'hidden';
        inspectorCard.appendChild(frontImg);
        
        // Create back image element
        const backImg = document.createElement('img');
        backImg.src = cardData.cardBacks.large;
        backImg.alt = 'Card Back';
        backImg.className = 'card-back';
        backImg.style.width = '100%';
        backImg.style.height = '100%';
        backImg.style.objectFit = 'contain';
        backImg.style.borderRadius = '5px';
        backImg.style.position = 'absolute';
        backImg.style.backfaceVisibility = 'hidden';
        backImg.style.transform = 'rotateY(180deg)';
        inspectorCard.appendChild(backImg);
        
        // Always show front of card in inspector (even if it's face-down in the game)
        inspectorCard.classList.remove('face-down');
        inspectorCard.style.transform = 'rotateY(0deg)';
        
        inspector.appendChild(inspectorCard);
        console.log('Inspector card created and added');
    }
}

// Add fullscreen handling
document.addEventListener('keydown', function(e) {
    // Check for Command+F (Mac) or Control+F (Windows)
    if ((e.metaKey || e.ctrlKey) && e.key === 'f') {
        e.preventDefault(); // Prevent default find behavior
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        }
    }
    
    // Check for Escape key
    if (e.key === 'Escape' && document.fullscreenElement) {
        document.exitFullscreen();
    }
});

// Update instructions based on OS
document.addEventListener('DOMContentLoaded', function() {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const instructions = document.querySelector('.fullscreen-instructions');
    if (instructions) {
        if (isMac) {
            instructions.innerHTML = 'Press <kbd>⌘F</kbd> for fullscreen • <kbd>Esc</kbd> to exit';
        } else {
            instructions.innerHTML = 'Press <kbd>Ctrl+F</kbd> for fullscreen • <kbd>Esc</kbd> to exit';
        }
    }
});

// Render main discard pile
function renderMainDiscard() {
    const discardElement = document.getElementById('mainDiscard');
    discardElement.innerHTML = '';
    
    // Add discard count indicator
    const discardCount = document.createElement('div');
    discardCount.className = 'deck-count';
    discardCount.textContent = mainDiscard.length;
    discardElement.appendChild(discardCount);
    
    // Only render the top card if the discard has cards
    if (mainDiscard.length > 0) {
        const topCard = mainDiscard[mainDiscard.length - 1];
        const cardElement = createCardElement({...topCard, faceUp: true}); // Always show face-up
        cardElement.classList.add('discard-card');
        // Discard cards are always face up
        cardElement.classList.remove('face-down');
        cardElement.style.transform = 'rotateY(0deg)';
        
        discardElement.appendChild(cardElement);
    }
}