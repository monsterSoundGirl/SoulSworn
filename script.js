// Define a simple TurnTimer class if not already available
// The TurnTimer class is now defined in timer.js
// Create a reference to the timer class
// let gameTimer = null;

// Main deck and discard pile data
let mainDeck = [];
let mainDiscard = [];
let altDeck = [];
let altDiscard = [];

// Card interaction state
let draggedCard = null;
let highlightedCard = null;
let isDragging = false;

// Player character assignments
let playerCharacters = [];

// Card data structure
const cardData = {
    cardBacks: {
        small: 'assets/JPG/cards/nonDeck/card_back/cardBack.jpg',
        large: 'assets/JPG/cards/nonDeck/card_back/cardBack.jpg'
    },
    // Remove the test cards and character cards definitions as they'll be loaded dynamically
};

// Game state
let playerCount = 1;
let playerHands = [];
let gameStarted = false;
let playerNames = []; // Array to store player names

// Token state
const MAX_TOKENS = 7;
let playerTokens = [];

// Token interaction state
let selectedToken = null;

// Card type definitions
const CARD_TYPES = {
    ITEM: 'item',
    LOCATION: 'location',
    MONSTER: 'monster',
    NPC: 'NPC',
    SPELL: 'spell'
};

// Card types that don't go in the deck
const NON_DECK_TYPES = {
    CHARACTER: 'character',
    OBJECTIVE: 'objective',
    CARD_BACK: 'card_back'
};

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
    document.getElementById('gameBoard').style.display = 'none';
    document.getElementById('setup').style.display = 'flex';
    
    // Set up menu UI interactions
    initializeMenuInteractions();
    
    // Initialize deck type selection
    initializeDeckTypeSelection();
    
    // Start game button
    const startBtn = document.getElementById('startGameBtn');
    
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            // Check if game is already in progress
            if (gameStarted) {
                // Just resume the game by showing the game board
                document.getElementById('setup').style.display = 'none';
                document.getElementById('gameBoard').style.display = 'block';
                console.log('Resuming existing game');
            } else {
                // Initialize a new game
                startGame();
            }
        });
    } else {
        console.error('Start button not found in the DOM');
    }
    
    // Menu icon
    document.getElementById('menuIcon').addEventListener('click', () => {
        console.log('Menu clicked');
        // Hide game board but keep game active
        document.getElementById('gameBoard').style.display = 'none';
        document.getElementById('setup').style.display = 'flex';
        
        // Change button text to "Resume Game" since a game is active
        document.getElementById('startGameBtn').textContent = 'Resume Game';
        
        // Disable game settings to prevent state changes
        disableGameSettings(true);
    });
    
    // Notes tray button
    document.getElementById('notesButton').addEventListener('click', () => {
        toggleNotesTray();
    });
    
    // Close notes button
    document.getElementById('closeNotes').addEventListener('click', () => {
        toggleNotesTray(false);
    });
    
    // Rules tray button
    document.getElementById('rulesButton').addEventListener('click', () => {
        toggleRulesTray();
    });
    
    // Close rules button
    document.getElementById('closeRules').addEventListener('click', () => {
        toggleRulesTray(false);
    });
    
    // Initialize notes editor
    initializeNotesEditor();
    
    // Settings icon
    document.getElementById('settingsIcon').addEventListener('click', () => {
        showSettingsMenu();
    });
    
    // Objectives button
    document.getElementById('objectivesButton').addEventListener('click', showAllCards);
    
    // Random Objective button
    document.getElementById('randomObjectiveButton').addEventListener('click', selectRandomObjective);
    
    // Save Game button
    document.getElementById('saveGameBtn').addEventListener('click', showSaveGameDialog);
    
    // Load Game button
    document.getElementById('loadGameBtn').addEventListener('click', showLoadGameDialog);

    // D20 area click handler
    document.getElementById('d20Area').addEventListener('click', animateD20Roll);
    
    // Deck control buttons
    document.getElementById('mainDeckDraw').addEventListener('click', () => drawCards('main'));
    document.getElementById('mainDeckShuffle').addEventListener('click', () => shuffleDiscardIntoDeck('main'));
    document.getElementById('altDeckDraw').addEventListener('click', () => drawCards('alt'));
    document.getElementById('altDeckShuffle').addEventListener('click', () => shuffleDiscardIntoDeck('alt'));
});

// Initialize menu interactions
function initializeMenuInteractions() {
    // Deck type selections - removed mainDeckSelect since it's no longer used
    
    // Initialize alt deck checkboxes
    initializeAltDeckCheckboxes();
    
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

    // Player count change handler to show/hide player setup sections
    const playerCountSelect = document.getElementById('playerCount');
    if (playerCountSelect) {
        playerCountSelect.addEventListener('change', updatePlayerSetupVisibility);
        // Initialize visibility based on default selection
        updatePlayerSetupVisibility();
    }
    
    // Add event listeners to player name inputs for live updating
    for (let i = 1; i <= 4; i++) {
        const nameInput = document.getElementById(`player${i}Name`);
        if (nameInput) {
            nameInput.addEventListener('input', function() {
                updatePlayerName(i - 1, this.value);
            });
        }
    }

    // Initialize card type selection dropdowns
    initializeCardTypeDropdowns();
}

// Initialize alt deck checkboxes with interactivity
function initializeAltDeckCheckboxes() {
    // This function is deprecated in favor of initializeDeckTypeSelection
    console.log('Initializing deck type selection');
    initializeDeckTypeSelection();
}

// Initialize deck type selection switches
function initializeDeckTypeSelection() {
    const deckSwitches = document.querySelectorAll('.deck-switch-item');
    
    deckSwitches.forEach(switchItem => {
        const cardType = switchItem.dataset.cardType;
        const positions = switchItem.querySelectorAll('.deck-switch-position');
        const knob = switchItem.querySelector('.deck-switch-knob');
        
        // Add click handler to each position
        positions.forEach(position => {
            position.addEventListener('click', function() {
                // Remove active class from all positions
                positions.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked position
                this.classList.add('active');
                
                // Update knob position
                const positionType = this.dataset.position;
                knob.className = 'deck-switch-knob position-' + positionType;
                
                // Log the current selection
                logDeckSelections();
            });
        });
    });
}

// Get the current deck selections for all card types
function getDeckSelections() {
    const selections = {};
    const deckSwitches = document.querySelectorAll('.deck-switch-item');
    
    deckSwitches.forEach(switchItem => {
        const cardType = switchItem.dataset.cardType;
        const activePosition = switchItem.querySelector('.deck-switch-position.active');
        
        if (activePosition) {
            selections[cardType] = activePosition.dataset.position;
        }
    });
    
    return selections;
}

// Log current deck selections to console
function logDeckSelections() {
    const selections = getDeckSelections();
    console.log('Current deck selections:', selections);
    
    // Build and log formatted deck contents
    const mainDeckTypes = [];
    const altDeckTypes = [];
    const excludedTypes = [];
    
    Object.entries(selections).forEach(([type, position]) => {
        if (position === 'main') {
            mainDeckTypes.push(type);
        } else if (position === 'alt') {
            altDeckTypes.push(type);
        } else if (position === 'none') {
            excludedTypes.push(type);
        }
    });
    
    console.log('Main deck will contain:', mainDeckTypes.join(', '));
    console.log('Alt deck will contain:', altDeckTypes.join(', '));
    console.log('Excluded card types:', excludedTypes.join(', '));
}

// Get alt deck types (for backward compatibility)
function getSelectedAltDeckTypes() {
    const selections = getDeckSelections();
    return Object.entries(selections)
        .filter(([type, position]) => position === 'alt')
        .map(([type]) => type);
}

// Get the deck distribution configuration
function getDeckDistribution() {
    const selections = getDeckSelections();
    
    return {
        main: Object.entries(selections)
            .filter(([type, position]) => position === 'main')
            .map(([type]) => type),
        alt: Object.entries(selections)
            .filter(([type, position]) => position === 'alt')
            .map(([type]) => type),
        none: Object.entries(selections)
            .filter(([type, position]) => position === 'none')
            .map(([type]) => type)
    };
}

// Generalized function to handle card selection for different card types
function initializeCardTypeDropdowns() {
    // Initialize character selection dropdowns for all players
    for (let i = 1; i <= 4; i++) {
        initializeCardSelection(`player${i}Character`, CHARACTER_CARDS);
        
        // Add change handler to update character in game
        const dropdown = document.getElementById(`player${i}Character`);
        if (dropdown) {
            dropdown.addEventListener('change', function() {
                if (gameStarted) {
                    // Find selected character
                    const characterId = this.value;
                    if (characterId) {
                        updatePlayerCharacter(i - 1, characterId);
                    }
                }
                
                // Always update available characters for other dropdowns
                updateAvailableCharacters();
            });
        }
    }
    
    // Initialize objective selection dropdown
    initializeCardSelection('objectiveSelect', OBJECTIVE_CARDS);
    
    // Initialize number of scenes validation
    const scenesCountInput = document.getElementById('scenesCount');
    if (scenesCountInput) {
        scenesCountInput.addEventListener('change', function() {
            const value = parseInt(this.value);
            if (isNaN(value) || value < 3) {
                this.value = 3;
            } else if (value > 40) {
                this.value = 40;
            }
        });
    }
    
    // Set initial player name defaults
    setPlayerNameDefaults();
    
    // Update available characters initially
    updateAvailableCharacters();
}

// Function to update available character selections
function updateAvailableCharacters() {
    const selectedCharacters = [];
    
    // Get all currently selected characters
    for (let i = 1; i <= 4; i++) {
        const dropdown = document.getElementById(`player${i}Character`);
        if (dropdown && dropdown.value) {
            selectedCharacters.push(dropdown.value);
        }
    }
    
    // Update the available options in each dropdown
    for (let i = 1; i <= 4; i++) {
        const dropdown = document.getElementById(`player${i}Character`);
        if (!dropdown) continue;
        
        const currentValue = dropdown.value;
        
        // Store all options
        const options = Array.from(dropdown.options);
        
        // Clear dropdown except first option (placeholder)
        while (dropdown.options.length > 1) {
            dropdown.remove(1);
        }
        
        // Re-add character options
        CHARACTER_CARDS.forEach(card => {
            // Skip if this character is already selected by another player
            if (selectedCharacters.includes(card.id) && card.id !== currentValue) {
                return;
            }
            
            const option = document.createElement('option');
            option.value = card.id;
            option.textContent = card.name;
            dropdown.appendChild(option);
        });
        
        // Restore the current selection
        if (currentValue) {
            dropdown.value = currentValue;
        }
    }
}

// Function to set default player names
function setPlayerNameDefaults() {
    for (let i = 1; i <= 4; i++) {
        const nameInput = document.getElementById(`player${i}Name`);
        if (nameInput && !nameInput.value.trim()) {
            nameInput.value = `Player ${i}`;
        }
    }
}

// Generic function to handle card selection dropdowns
function initializeCardSelection(selectId, cardCollection) {
    const dropdown = document.getElementById(selectId);
    
    if (!dropdown) {
        console.error(`Dropdown with ID ${selectId} not found`);
        return;
    }
    
    // Clear existing options except the first placeholder
    while (dropdown.options.length > 1) {
        dropdown.remove(1);
    }
    
    // Add "No Predefined Objective" option at the top for objective selection
    if (selectId === 'objectiveSelect') {
        const noObjectiveOption = document.createElement('option');
        noObjectiveOption.value = "no_objective";
        noObjectiveOption.textContent = "No Predefined Objective";
        dropdown.appendChild(noObjectiveOption);
    }
    
    // Add each card as an option
    cardCollection.forEach(card => {
        const option = document.createElement('option');
        option.value = card.id;
        option.textContent = card.name;
        dropdown.appendChild(option);
    });
    
    // Show card in preview when selected
    dropdown.addEventListener('change', function() {
        const selectedCardId = this.value;
        if (selectedCardId && selectedCardId !== "no_objective") {
            const selectedCard = cardCollection.find(card => card.id === selectedCardId);
            if (selectedCard) {
                updateCardPreview(selectedCard);
                
                // If a game is in progress and this is the character select dropdown, update player character
                if (gameStarted && selectId === 'characterSelect') {
                    updatePlayerCharacter(selectedCard);
                }
            }
        } else if (selectedCardId === "no_objective") {
            // Clear the preview for "No Predefined Objective"
            const previewContainer = document.querySelector('.preview-placeholder');
            if (previewContainer) {
                previewContainer.innerHTML = '<p>No Predefined Objective selected</p>';
            }
        }
    });
}

// Update card preview in the UI
function updateCardPreview(card) {
    // Try to find preview placeholder in the start menu
    const previewContainer = document.querySelector('.preview-placeholder');
    if (previewContainer) {
        // Clear existing content
        previewContainer.innerHTML = '';
        
        // Create a card preview
        const cardPreview = document.createElement('div');
        cardPreview.className = 'card-preview-wrapper';
        cardPreview.style.height = '100%';
        cardPreview.style.width = '100%';
        cardPreview.style.display = 'flex';
        cardPreview.style.justifyContent = 'center';
        cardPreview.style.alignItems = 'center';
        
        // Create the image
        const previewImg = document.createElement('img');
        previewImg.src = card.imageUrl;
        previewImg.alt = card.name;
        previewImg.style.height = '100%';
        previewImg.style.width = 'auto';
        previewImg.style.maxWidth = '100%';
        previewImg.style.objectFit = 'contain'; // Maintain aspect ratio
        previewImg.style.borderRadius = '10px';
        
        // Add card name and additional info if needed
        const cardInfo = document.createElement('div');
        cardInfo.className = 'card-info';
        cardInfo.style.position = 'absolute';
        cardInfo.style.bottom = '10px';
        cardInfo.style.left = '0';
        cardInfo.style.right = '0';
        cardInfo.style.textAlign = 'center';
        cardInfo.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        cardInfo.style.color = 'white';
        cardInfo.style.padding = '5px';
        cardInfo.style.borderBottomLeftRadius = '10px';
        cardInfo.style.borderBottomRightRadius = '10px';
        cardInfo.textContent = card.name;
        
        // Add elements to the DOM
        cardPreview.appendChild(previewImg);
        cardPreview.appendChild(cardInfo);
        previewContainer.appendChild(cardPreview);
    }
    
    // Also update the main inspector if we're in game
    if (gameStarted) {
        updateInspector(card);
    }
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
    
    // Only create a clickable deck card if there are cards in the deck
    if (mainDeck.length > 0) {
        // Create a draggable container for the top card
        const deckCardContainer = document.createElement('div');
        deckCardContainer.className = 'deck-card-container';
        deckCardContainer.draggable = true;
        deckCardContainer.dataset.fromDeck = 'true';
        
        // Add card images (back is shown by default)
        const cardBack = document.createElement('img');
        cardBack.className = 'deck-card-back';
        cardBack.src = cardData.cardBacks.small;
        cardBack.alt = 'Card Back';
        deckCardContainer.appendChild(cardBack);
        
        // Add the top card's front image (hidden by default)
        const topCard = mainDeck[0];
        if (topCard) {
            const cardFront = document.createElement('img');
            cardFront.className = 'deck-card-front';
            cardFront.src = topCard.imageUrl;
            cardFront.alt = topCard.name;
            cardFront.style.display = topCard.faceUp ? 'block' : 'none'; // Show front if card is face up
            cardBack.style.display = topCard.faceUp ? 'none' : 'block'; // Hide back if card is face up
            deckCardContainer.appendChild(cardFront);
            
            // Store the card ID on the container
            deckCardContainer.dataset.cardId = topCard.id;
        }
        
        // Add click event to view the card in the inspector
        deckCardContainer.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Only show in inspector if we have cards and the top card exists
            if (mainDeck.length > 0 && mainDeck[0]) {
                // Show the card in the inspector
                updateInspector(mainDeck[0]);
                
                // Highlight the clicked card
                if (highlightedCard) highlightedCard.classList.remove('highlighted');
                this.classList.add('highlighted');
                highlightedCard = this;
            }
        });
        
        // Add double-click event for flipping the top card
        deckCardContainer.addEventListener('dblclick', function(e) {
            e.stopPropagation();
            const cardFront = this.querySelector('.deck-card-front');
            const cardBack = this.querySelector('.deck-card-back');
            
            if (cardFront && cardBack && mainDeck.length > 0) {
                // Toggle visibility of front and back
                if (cardFront.style.display === 'none') {
                    cardFront.style.display = 'block';
                    cardBack.style.display = 'none';
                    // Update the card in the deck to be face up
                    mainDeck[0].faceUp = true;
                    showNotification('Card flipped face-up', 'info');
                } else {
                    cardFront.style.display = 'none';
                    cardBack.style.display = 'block';
                    // Update the card in the deck to be face down
                    mainDeck[0].faceUp = false;
                    showNotification('Card flipped face-down', 'info');
                }
            }
        });
        
        // Add drag event for dragging the top card
        deckCardContainer.addEventListener('dragstart', function(e) {
            e.stopPropagation();
            this.classList.add('dragging');
            draggedCard = this;
            
            // Set dragged card data
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', this.dataset.cardId);
        });
        
        deckCardContainer.addEventListener('dragend', function(e) {
            e.stopPropagation();
            this.classList.remove('dragging');
            draggedCard = null;
        });
        
        deckElement.appendChild(deckCardContainer);
    }
}

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
        
        // Make the top discard card draggable
        cardElement.setAttribute('draggable', 'true');
        cardElement.dataset.fromDiscard = 'true';
        
        // Add drag event handlers
        cardElement.addEventListener('dragstart', function(e) {
            e.stopPropagation();
            this.classList.add('dragging');
            draggedCard = this;
        });
        
        cardElement.addEventListener('dragend', function(e) {
            e.stopPropagation();
            this.classList.remove('dragging');
            draggedCard = null;
        });
        
        discardElement.appendChild(cardElement);
    } else {
        // Empty discard pile
        const emptyIndicator = document.createElement('div');
        emptyIndicator.className = 'empty-discard';
        emptyIndicator.textContent = 'Empty';
        emptyIndicator.style.color = '#888';
        emptyIndicator.style.fontSize = '12px';
        emptyIndicator.style.position = 'absolute';
        emptyIndicator.style.top = '50%';
        emptyIndicator.style.left = '50%';
        emptyIndicator.style.transform = 'translate(-50%, -50%)';
        discardElement.appendChild(emptyIndicator);
    }
    
    // Add drop event handlers
    discardElement.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        this.classList.add('drag-over');
    });
    
    discardElement.addEventListener('dragleave', function() {
        this.classList.remove('drag-over');
    });
    
    discardElement.addEventListener('drop', handleDiscardDrop);
}

// Handle dropping cards onto the discard pile
function handleDiscardDrop(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('drag-over');
    
    // Check if there's a dragged card
    if (!draggedCard) return;
    
    // Determine if this is the main or alt discard pile
    const isMainDiscard = event.currentTarget.id === 'mainDiscard';
    const isAltDiscard = event.currentTarget.id === 'altDiscard';
    
    // Check if we're dragging from a deck
    if (draggedCard.dataset.fromDeck === 'true' || draggedCard.dataset.fromAltDeck === 'true') {
        // Check if we're dragging from the correct deck
        const isFromMain = draggedCard.dataset.fromDeck === 'true';
        const isFromAlt = draggedCard.dataset.fromAltDeck === 'true';
        
        // Only allow drops to matching discard pile
        if ((isMainDiscard && isFromMain) || (isAltDiscard && isFromAlt)) {
            // Determine which deck and discard to work with
            const deck = isMainDiscard ? mainDeck : altDeck;
            const discard = isMainDiscard ? mainDiscard : altDiscard;
            
            if (deck.length > 0) {
                // Get the top card (by reference, not creating a new copy)
                const card = deck[0];
                // Move it from deck to discard
                deck.shift();
                card.faceUp = true; // Cards in discard are always face up
                discard.push(card);
                
                // Update the display once
                if (isMainDiscard) {
                    renderMainDeck();
                    renderMainDiscard();
                } else {
                    renderAltDeck();
                    renderAltDiscard();
                }
                
                // Show visual feedback
                showNotification(`Card moved to ${isMainDiscard ? 'main' : 'alt'} discard pile`, 'info');
            }
        } else {
            // Wrong discard pile for this deck
            showNotification('Cards can only be discarded to their corresponding discard pile', 'error');
        }
        return;
    }
    
    // Check if we're dragging from a discard pile to the same discard pile
    if ((isMainDiscard && draggedCard.dataset.fromDiscard === 'true') ||
        (isAltDiscard && draggedCard.dataset.fromAltDiscard === 'true')) {
        // Don't do anything when dragging to same discard
        return;
    }
    
    // Handle cards dragged from other places (slots, hand, etc.)
    const cardId = draggedCard.dataset.cardId;
    if (cardId) {
        // Try to find the card in all data sources
        let card = findCardById(cardId);
        
        if (!card) {
            showNotification('Card data not found', 'error');
            return;
        }
        
        // Check if the card type belongs to the correct deck
        const cardType = card.type.toLowerCase();
        
        // Get deck distribution from game state
        const deckDistribution = gameState?.deckDistribution || { 
            main: [], 
            alt: [],
            none: []
        };
        
        // Check if the card type belongs to the correct deck
        if (isMainDiscard && deckDistribution.alt.includes(cardType)) {
            showNotification(`${cardType} cards belong in the Alt discard pile`, 'error');
            return;
        }
        
        if (isAltDiscard && deckDistribution.main.includes(cardType)) {
            showNotification(`${cardType} cards belong in the Main discard pile`, 'error');
            return;
        }
        
        // Now handle discarding the card from its source
        if (removeCardFromSource(cardId)) {
            // Make a copy of the card to avoid reference issues
            const cardCopy = {...card, faceUp: true}; // Cards in discard are always face up
            
            // Add card to appropriate discard pile
            if (isMainDiscard) {
                mainDiscard.push(cardCopy);
                renderMainDiscard();
            } else {
                altDiscard.push(cardCopy);
                renderAltDiscard();
            }
            
            // Remove card element from its original location
            draggedCard.remove();
            
            // Show feedback
            showNotification(`Card discarded to ${isMainDiscard ? 'main' : 'alt'} discard pile`, 'info');
        } else {
            showNotification('Failed to remove card from its source', 'error');
        }
    }
}

// Helper function to remove a card from its source by ID
function removeCardFromSource(cardId) {
    if (!cardId) return false;
    
    // Search in player hands
    for (let i = 0; i < playerHands.length; i++) {
        if (!playerHands[i]) continue;
        
        const cardIndex = playerHands[i].findIndex(c => c && c.id === cardId);
        if (cardIndex !== -1) {
            // Remove from hand
            const card = playerHands[i][cardIndex];
            playerHands[i][cardIndex] = null;
            return true;
        }
    }
    
    // Search in main deck
    const mainDeckIndex = mainDeck.findIndex(c => c.id === cardId);
    if (mainDeckIndex !== -1) {
        mainDeck.splice(mainDeckIndex, 1);
        return true;
    }
    
    // Search in alt deck
    const altDeckIndex = altDeck.findIndex(c => c.id === cardId);
    if (altDeckIndex !== -1) {
        altDeck.splice(altDeckIndex, 1);
        return true;
    }
    
    // If card wasn't found in known sources, just return true to allow discarding
    return true;
}

// Handle drop
function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const target = event.currentTarget;
    target.classList.remove('drag-over');
    
    if (!draggedCard) {
        console.error('No dragged card found in handleDrop');
        return;
    }
    
    // Special handling for cards dragged from the main deck
    if (draggedCard.dataset.fromDeck === 'true') {
        // Only proceed if we have cards in the deck
        if (mainDeck.length === 0) {
            console.warn('Attempted to drag from empty deck');
            return;
        }
        
        // Get a copy of the top card and remove it from the deck
        const cardData = {...mainDeck.shift()};
        
        // Create a new card element
        const newCard = createCardElement(cardData);
        
        // Check if target already has a card
        const existingCard = target.querySelector('.card');
        if (existingCard) {
            existingCard.remove();
        }
        
        // Add it to the target slot
        target.appendChild(newCard);
        
        // Update the deck display
        renderMainDeck();
        
        return;
    }
    
    // Special handling for cards dragged from the alternative deck
    if (draggedCard.dataset.fromAltDeck === 'true') {
        // Only proceed if we have cards in the alt deck
        if (altDeck.length === 0) {
            console.warn('Attempted to drag from empty alt deck');
            return;
        }
        
        // Get a copy of the top card and remove it from the alt deck
        const cardData = {...altDeck.shift()};
        
        // Create a new card element
        const newCard = createCardElement(cardData);
        
        // Check if target already has a card
        const existingCard = target.querySelector('.card');
        if (existingCard) {
            existingCard.remove();
        }
        
        // Add it to the target slot
        target.appendChild(newCard);
        
        // Update the alt deck display
        renderAltDeck();
        
        return;
    }
    
    // Special handling for cards dragged from the main discard pile
    if (draggedCard.dataset.fromDiscard === 'true') {
        // Only proceed if we have cards in the discard
        if (mainDiscard.length === 0) {
            console.warn('Attempted to drag from empty discard');
            return;
        }
        
        // Get a copy of the top card and remove it from the discard
        const cardData = {...mainDiscard.pop()};
        
        // Create a new card element
        const newCard = createCardElement(cardData);
        
        // Check if target already has a card
        const existingCard = target.querySelector('.card');
        if (existingCard) {
            existingCard.remove();
        }
        
        // Add it to the target slot
        target.appendChild(newCard);
        
        // Update the discard display
        renderMainDiscard();
        
        return;
    }
    
    // Special handling for cards dragged from the alt discard pile
    if (draggedCard.dataset.fromAltDiscard === 'true') {
        // Only proceed if we have cards in the alt discard
        if (altDiscard.length === 0) {
            console.warn('Attempted to drag from empty alt discard');
            return;
        }
        
        // Get a copy of the top card and remove it from the alt discard
        const cardData = {...altDiscard.pop()};
        
        // Create a new card element
        const newCard = createCardElement(cardData);
        
        // Check if target already has a card
        const existingCard = target.querySelector('.card');
        if (existingCard) {
            existingCard.remove();
        }
        
        // Add it to the target slot
        target.appendChild(newCard);
        
        // Update the alt discard display
        renderAltDiscard();
        
        return;
    }

    // For cards dragged from other locations (not the deck or discard)
    // Just move the card to the target slot, handling any existing cards
    const sourceParent = draggedCard.parentNode;
    
    if (sourceParent === target) {
        return; // No need to do anything if dropping on same element
    }
    
    // Check if target already has a card
    const existingCard = target.querySelector('.card');
    if (existingCard) {
        // If source had a card and target has a card, swap them
        sourceParent.appendChild(existingCard);
    }
    
    // Move dragged card to target
    target.appendChild(draggedCard);
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
    const inspector = document.getElementById('inspector');
    if (!inspector) {
        console.error('Inspector element not found');
        return;
    }
    
    inspector.innerHTML = ''; // Clear current inspector content
    
    if (card) {
        // Create a container that takes up the full inspector space
        const cardContainer = document.createElement('div');
        cardContainer.className = 'inspector-card-container';
        cardContainer.style.width = '100%';
        cardContainer.style.height = '100%';
        cardContainer.style.display = 'flex';
        cardContainer.style.flexDirection = 'column';
        cardContainer.style.justifyContent = 'center';
        cardContainer.style.alignItems = 'center';
        cardContainer.style.backgroundColor = '#1a1a1a';
        cardContainer.style.position = 'relative';
        cardContainer.style.boxSizing = 'border-box';
        cardContainer.style.padding = '10px';
        cardContainer.style.overflow = 'hidden'; // Prevent overflow
        
        // Create wrapper for the image to enforce aspect ratio
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'inspector-image-wrapper';
        imageWrapper.style.width = '100%';
        imageWrapper.style.height = '100%';
        imageWrapper.style.display = 'flex';
        imageWrapper.style.justifyContent = 'center';
        imageWrapper.style.alignItems = 'center';
        imageWrapper.style.overflow = 'hidden';
        imageWrapper.style.position = 'relative';
        
        // Show loading indicator
        const loadingText = document.createElement('div');
        loadingText.style.position = 'absolute';
        loadingText.style.top = '50%';
        loadingText.style.left = '50%';
        loadingText.style.transform = 'translate(-50%, -50%)';
        loadingText.style.color = 'white';
        loadingText.style.fontSize = '18px';
        loadingText.textContent = `Loading ${card.name}...`;
        imageWrapper.appendChild(loadingText);
        
        // Function to create placeholder SVG for missing cards in larger format
        function createInspectorPlaceholder(cardName, cardType) {
            const colors = {
                'monster': '#d35f5f',
                'spell': '#5f5fd3',
                'item': '#5fd35f',
                'location': '#d3aa5f',
                'NPC': '#aa5fd3',
                'character': '#e5a619',
                'objective': '#19e5e5'
            };
            const color = colors[cardType] || '#5a5a5a';
            
            return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="333" height="600" viewBox="0 0 333 600"><rect width="100%" height="100%" fill="${color}"/><text x="50%" y="30%" font-family="Arial" font-size="30" fill="white" text-anchor="middle" dominant-baseline="middle">${cardType.toUpperCase()}</text><text x="50%" y="50%" font-family="Arial" font-size="25" fill="white" text-anchor="middle" dominant-baseline="middle">${cardName}</text><text x="50%" y="70%" font-family="Arial" font-size="20" fill="white" text-anchor="middle" dominant-baseline="middle">IMAGE LOADING ERROR</text></svg>`;
        }
        
        // Create the card image with CRITICAL styling for proper scaling
        const cardImage = document.createElement('img');
        cardImage.className = 'inspector-card-image';
        cardImage.alt = card.name;
        
        // Set fixed max dimensions to ensure proper scaling
        cardImage.style.maxHeight = '100%';
        cardImage.style.maxWidth = '100%';
        cardImage.style.width = 'auto';
        cardImage.style.height = 'auto';
        cardImage.style.objectFit = 'contain'; // Ensure entire image is visible
        cardImage.style.display = 'block'; // Block removes extra space beneath the image
        cardImage.style.borderRadius = '5px';
        cardImage.style.margin = 'auto'; // Center the image
        
        // Store the card data as an attribute to allow retrieval later
        cardImage.dataset.cardId = card.id;
        cardImage.dataset.cardType = card.type;
        
        // Handle image load events
        cardImage.onload = function() {
            loadingText.remove();
            
            // Adjust image size based on its natural dimensions
            const containerHeight = imageWrapper.clientHeight;
            const containerWidth = imageWrapper.clientWidth;
            const imageRatio = this.naturalWidth / this.naturalHeight;
            const containerRatio = containerWidth / containerHeight;
            
            if (imageRatio > containerRatio) {
                // Wide card - prioritize fitting width
                this.style.width = '100%';
                this.style.height = 'auto';
            } else {
                // Tall or square card - prioritize fitting height
                this.style.height = '100%';
                this.style.width = 'auto';
            }
        };
        
        cardImage.onerror = function() {
            loadingText.textContent = `Could not load image for ${card.name}`;
            loadingText.style.color = '#e24a4a';
            
            // Use a placeholder SVG for the error state
            cardImage.src = createInspectorPlaceholder(card.name, card.type);
        };
        
        // Add the image to the wrapper
        imageWrapper.appendChild(cardImage);
        
        // Add the wrapper to the container
        cardContainer.appendChild(imageWrapper);
        
        // Add container to inspector
        inspector.appendChild(cardContainer);
        
        // Set source to trigger loading
        if (card.imageUrl) {
            cardImage.src = card.imageUrl;
        } else {
            // No image URL provided
            cardImage.src = createInspectorPlaceholder(card.name, card.type);
            loadingText.textContent = `No image available for ${card.name}`;
        }
        
        // Store the currently displayed card in the inspector for later reference
        inspector.dataset.currentCardId = card.id;
        
        // Remove loading text after a timeout even if image is still loading
        setTimeout(() => {
            if (loadingText.parentNode === imageWrapper) {
                loadingText.remove();
            }
        }, 5000);
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

// Base URL for assets - handles both local and GitHub Pages environments
const BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
  ? '' 
  : '/SoulSworn';

// Helper function to get asset path
function getAssetPath(path) {
  return `${BASE_URL}/${path}`;
}

// Update card back path
const CARD_BACK_PATH = getAssetPath('assets/JPG/cards/nonDeck/card_back/cardBack.jpg');

// Character cards (non-deck cards)
const CHARACTER_CARDS = [
    {
        id: 'characters_alleyWitch',
        name: 'Alley Witch',
        type: 'character',
        imageUrl: 'assets/JPG/cards/nonDeck/character/characters_alleyWitch.jpg',
        faceUp: true
    },
    {
        id: 'characters_cursedScholar',
        name: 'Cursed Scholar',
        type: 'character',
        imageUrl: 'assets/JPG/cards/nonDeck/character/characters_cursedScholar.jpg',
        faceUp: true
    },
    {
        id: 'characters_detective',
        name: 'Detective',
        type: 'character',
        imageUrl: 'assets/JPG/cards/nonDeck/character/characters_detective.jpg',
        faceUp: true
    },
    {
        id: 'characters_monsterHunter',
        name: 'Monster Hunter',
        type: 'character',
        imageUrl: 'assets/JPG/cards/nonDeck/character/characters_monsterHunter.jpg',
        faceUp: true
    },
    {
        id: 'characters_quietRogue',
        name: 'Quiet Rogue',
        type: 'character',
        imageUrl: 'assets/JPG/cards/nonDeck/character/characters_quietRogue.jpg',
        faceUp: true
    },
    {
        id: 'characters_reluctantHero',
        name: 'Reluctant Hero',
        type: 'character',
        imageUrl: 'assets/JPG/cards/nonDeck/character/characters_reluctantHero.jpg',
        faceUp: true
    },
    {
        id: 'characters_scarredShifter',
        name: 'Scarred Shifter',
        type: 'character',
        imageUrl: 'assets/JPG/cards/nonDeck/character/characters_scarredShifter.jpg',
        faceUp: true
    },
    {
        id: 'characters_spiritMedium',
        name: 'Spirit Medium',
        type: 'character',
        imageUrl: 'assets/JPG/cards/nonDeck/character/characters_spiritMedium.jpg',
        faceUp: true
    },
    {
        id: 'characters_techSavant',
        name: 'Tech Savant',
        type: 'character',
        imageUrl: 'assets/JPG/cards/nonDeck/character/characters_techSavant.jpg',
        faceUp: true
    }
];

// Objective cards (also non-deck cards)
const OBJECTIVE_CARDS = [
    {
        id: 'objective_bounty',
        name: 'Bounty',
        type: 'objective',
        imageUrl: 'assets/JPG/cards/nonDeck/objective/objectives_bounty.jpg',
        faceUp: true
    },
    {
        id: 'objective_breachTheSanctuary',
        name: 'Breach The Sanctuary',
        type: 'objective',
        imageUrl: 'assets/JPG/cards/nonDeck/objective/objectives_breachTheSanctuary.jpg',
        faceUp: true
    },
    {
        id: 'objective_buryTheTruth',
        name: 'Bury The Truth',
        type: 'objective',
        imageUrl: 'assets/JPG/cards/nonDeck/objective/objectives_buryTheTruth.jpg',
        faceUp: true
    },
    {
        id: 'objective_closeTheRift',
        name: 'Close The Rift',
        type: 'objective',
        imageUrl: 'assets/JPG/cards/nonDeck/objective/objectives_closeTheRift.jpg',
        faceUp: true
    },
    {
        id: 'objective_destroyTheArifacts',
        name: 'Destroy The Artifacts',
        type: 'objective',
        imageUrl: 'assets/JPG/cards/nonDeck/objective/objectives_destroyTheArifacts.jpg',
        faceUp: true
    },
    {
        id: 'objective_endTheCycle',
        name: 'End The Cycle',
        type: 'objective',
        imageUrl: 'assets/JPG/cards/nonDeck/objective/objectives_endTheCycle.jpg',
        faceUp: true
    },
    {
        id: 'objective_escort',
        name: 'Escort',
        type: 'objective',
        imageUrl: 'assets/JPG/cards/nonDeck/objective/objectives_escort.jpg',
        faceUp: true
    },
    {
        id: 'objective_femmeFatale',
        name: 'Femme Fatale',
        type: 'objective',
        imageUrl: 'assets/JPG/cards/nonDeck/objective/objectives_femmeFatale.jpg',
        faceUp: true
    },
    {
        id: 'objective_findTheHollow',
        name: 'Find The Hollow',
        type: 'objective',
        imageUrl: 'assets/JPG/cards/nonDeck/objective/objectives_findTheHollow.jpg',
        faceUp: true
    },
    {
        id: 'objective_forbiddenLove',
        name: 'Forbidden Love',
        type: 'objective',
        imageUrl: 'assets/JPG/cards/nonDeck/objective/objectives_forbiddenLove.jpg',
        faceUp: true
    },
    {
        id: 'objective_letThemGo',
        name: 'Let Them Go',
        type: 'objective',
        imageUrl: 'assets/JPG/cards/nonDeck/objective/objectives_letThemGo.jpg',
        faceUp: true
    },
    {
        id: 'objective_oneLastJob',
        name: 'One Last Job',
        type: 'objective',
        imageUrl: 'assets/JPG/cards/nonDeck/objective/objectives_oneLastJob.jpg',
        faceUp: true
    },
    {
        id: 'objective_raceTheEclipse',
        name: 'Race The Eclipse',
        type: 'objective',
        imageUrl: 'assets/JPG/cards/nonDeck/objective/objectives_raceTheEclipse.jpg',
        faceUp: true
    },
    {
        id: 'objective_ransom',
        name: 'Ransom',
        type: 'objective',
        imageUrl: 'assets/JPG/cards/nonDeck/objective/objectives_ransom.jpg',
        faceUp: true
    },
    {
        id: 'objective_realWorld',
        name: 'Real World',
        type: 'objective',
        imageUrl: 'assets/JPG/cards/nonDeck/objective/objectives_realWorld.jpg',
        faceUp: true
    },
    {
        id: 'objective_rescue',
        name: 'Rescue',
        type: 'objective',
        imageUrl: 'assets/JPG/cards/nonDeck/objective/objectives_rescue.jpg',
        faceUp: true
    },
    {
        id: 'objective_sayGoodbye',
        name: 'Say Goodbye',
        type: 'objective',
        imageUrl: 'assets/JPG/cards/nonDeck/objective/objectives_sayGoodbye.jpg',
        faceUp: true
    },
    {
        id: 'objective_sealThePact',
        name: 'Seal The Pact',
        type: 'objective',
        imageUrl: 'assets/JPG/cards/nonDeck/objective/objectives_sealThePact.jpg',
        faceUp: true
    },
    {
        id: 'objective_severTheSource',
        name: 'Sever The Source',
        type: 'objective',
        imageUrl: 'assets/JPG/cards/nonDeck/objective/objectives_severTheSource.jpg',
        faceUp: true
    },
    {
        id: 'objective_smotherTheSpark',
        name: 'Smother The Spark',
        type: 'objective',
        imageUrl: 'assets/JPG/cards/nonDeck/objective/objectives_smotherTheSpark.jpg',
        faceUp: true
    },
    {
        id: 'objective_trackThePredator',
        name: 'Track The Predator',
        type: 'objective',
        imageUrl: 'assets/JPG/cards/nonDeck/objective/objectives_trackThePredator.jpg',
        faceUp: true
    }
];

// Deck cards by type - UPDATED to include all 98 cards
const DECK_CARDS = {
    // Monster cards - 12 cards
    monster: [
        {
            id: 'monster_ashenWalker',
            name: 'Ashen Walker',
            type: 'monster',
            imageUrl: 'assets/JPG/cards/deck/monster/monsters_ashenWalker.jpg',
            faceUp: false
        },
        {
            id: 'monster_blackEyedKid',
            name: 'Black Eyed Kid',
            type: 'monster',
            imageUrl: 'assets/JPG/cards/deck/monster/monsters_blackEyedKid.jpg',
            faceUp: false
        },
        {
            id: 'monster_boneReaper',
            name: 'Bone Reaper',
            type: 'monster',
            imageUrl: 'assets/JPG/cards/deck/monster/monsters_boneReaper.jpg',
            faceUp: false
        },
        {
            id: 'monster_carnivalCreep',
            name: 'Carnival Creep',
            type: 'monster',
            imageUrl: 'assets/JPG/cards/deck/monster/monsters_carnivalCreep.jpg',
            faceUp: false
        },
        {
            id: 'monster_draugr',
            name: 'Draugr',
            type: 'monster',
            imageUrl: 'assets/JPG/cards/deck/monster/monsters_draugr.jpg',
            faceUp: false
        },
        {
            id: 'monster_gargoyle',
            name: 'Gargoyle',
            type: 'monster',
            imageUrl: 'assets/JPG/cards/deck/monster/monsters_gargolye.jpg',
            faceUp: false
        },
        {
            id: 'monster_ghoul',
            name: 'Ghoul',
            type: 'monster',
            imageUrl: 'assets/JPG/cards/deck/monster/monsters_ghoul.jpg',
            faceUp: false
        },
        {
            id: 'monster_manafuro',
            name: 'Manafuro',
            type: 'monster',
            imageUrl: 'assets/JPG/cards/deck/monster/monsters_manafuro.jpg',
            faceUp: false
        },
        {
            id: 'monster_polterGeist',
            name: 'Polter Geist',
            type: 'monster',
            imageUrl: 'assets/JPG/cards/deck/monster/monsters_polterGeist.jpg',
            faceUp: false
        },
        {
            id: 'monster_shadowWraith',
            name: 'Shadow Wraith',
            type: 'monster',
            imageUrl: 'assets/JPG/cards/deck/monster/monsters_shadowWraith.jpg',
            faceUp: false
        },
        {
            id: 'monster_urbanChimera1',
            name: 'Urban Chimera',
            type: 'monster',
            imageUrl: 'assets/JPG/cards/deck/monster/monsters_urbanChimera.jpg',
            faceUp: false
        },
        {
            id: 'monster_urbanChimera2',
            name: 'Urban Chimera',
            type: 'monster',
            imageUrl: 'assets/JPG/cards/deck/monster/monsters_urbanChimera copy 2.jpg',
            faceUp: false
        }
    ],
    
    // Item cards - 32 cards
    item: [
        {
            id: 'item_amberSin',
            name: 'Amber Sin',
            type: 'item',
            imageUrl: 'assets/JPG/cards/deck/item/items_amberSin.jpg',
            faceUp: false
        },
        {
            id: 'item_atlantianDisc',
            name: 'Atlantian Disc',
            type: 'item',
            imageUrl: 'assets/JPG/cards/deck/item/items_atlantianDisc.jpg',
            faceUp: false
        },
        {
            id: 'item_blackGuitar',
            name: 'Black Guitar',
            type: 'item',
            imageUrl: 'assets/JPG/cards/deck/item/items_blackGuitar.jpg',
            faceUp: false
        },
        {
            id: 'item_bloodCandle',
            name: 'Blood Candle',
            type: 'item',
            imageUrl: 'assets/JPG/cards/deck/item/items_bloodCandle.jpg',
            faceUp: false
        },
        {
            id: 'item_bottomlessBag',
            name: 'Bottomless Bag',
            type: 'item',
            imageUrl: 'assets/JPG/cards/deck/item/items_bottomlessBag.jpg',
            faceUp: false
        },
        {
            id: 'item_chainsOfTheBound',
            name: 'Chains Of The Bound',
            type: 'item',
            imageUrl: 'assets/JPG/cards/deck/item/items_chainsOfTheBound.jpg',
            faceUp: false
        },
        {
            id: 'item_charcoalPendant',
            name: 'Charcoal Pendant',
            type: 'item',
            imageUrl: 'assets/JPG/cards/deck/item/items_charcoalPendant.jpg',
            faceUp: false
        },
        {
            id: 'item_curatorsNotebook',
            name: 'Curators Notebook',
            type: 'item',
            imageUrl: 'assets/JPG/cards/deck/item/items_curatorsNotebook.jpg',
            faceUp: false
        },
        {
            id: 'item_cursedMobile',
            name: 'Cursed Mobile',
            type: 'item',
            imageUrl: 'assets/JPG/cards/deck/item/items_cursedMobile.jpg',
            faceUp: false
        },
        {
            id: 'item_devilsContract',
            name: 'Devils Contract',
            type: 'item',
            imageUrl: 'assets/JPG/cards/deck/item/items_devilsContract.jpg',
            faceUp: false
        },
        {
            id: 'item_diabloSauce',
            name: 'Diablo Sauce',
            type: 'item',
            imageUrl: 'assets/JPG/cards/deck/item/items_diabloSauce.jpg',
            faceUp: false
        },
        {
            id: 'item_dragonBoots',
            name: 'Dragon Boots',
            type: 'item',
            imageUrl: 'assets/JPG/cards/deck/item/items_dragonBoots.jpg',
            faceUp: false
        },
        {
            id: 'item_enchantedMap',
            name: 'Enchanted Map',
            type: 'item',
            imageUrl: 'assets/JPG/cards/deck/item/items_enchantedMap.jpg',
            faceUp: false
        },
        {
            id: 'item_ghoulPie',
            name: 'Ghoul Pie',
            type: 'item',
            imageUrl: 'assets/JPG/cards/deck/item/items_ghoulPie.jpg',
            faceUp: false
        },
        {
            id: 'item_gildedCross',
            name: 'Gilded Cross',
            type: 'item',
            imageUrl: 'assets/JPG/cards/deck/item/items_gildedCross.jpg',
            faceUp: false
        },
        {
            id: 'item_graveSpade',
            name: 'Grave Spade',
            type: 'item',
            imageUrl: 'assets/JPG/cards/deck/item/items_graveSpade.jpg',
            faceUp: false
        },
        {
            id: 'item_heartOfStone',
            name: 'Heart Of Stone',
            type: 'item',
            imageUrl: 'assets/JPG/cards/deck/item/items_heartOfStone.jpg',
            faceUp: false
        },
        {
            id: 'item_hollowCoin',
            name: 'Hollow Coin',
            type: 'item',
            imageUrl: 'assets/JPG/cards/deck/item/items_hollowCoin.jpg',
            faceUp: false
        },
        {
            id: 'item_huntersPal',
            name: 'Hunters Pal',
            type: 'item',
            imageUrl: 'assets/JPG/cards/deck/item/items_huntersPal.jpg',
            faceUp: false
        },
        {
            id: 'item_marinersFlask',
            name: 'Mariners Flask',
            type: 'item',
            imageUrl: 'assets/JPG/cards/deck/item/items_marinersFlask.jpg',
            faceUp: false
        },
        {
            id: 'item_oracle8Ball',
            name: 'Oracle 8 Ball',
            type: 'item',
            imageUrl: 'assets/JPG/cards/deck/item/items_oracle8Ball.jpg',
            faceUp: false
        },
        {
            id: 'item_ravenCup',
            name: 'Raven Cup',
            type: 'item',
            imageUrl: 'assets/JPG/cards/deck/item/items_ravenCup.jpg',
            faceUp: false
        },
        {
            id: 'item_ricetteDiFamiglia',
            name: 'Ricette Di Famiglia',
            type: 'item',
            imageUrl: 'assets/JPG/cards/deck/item/items_ricetteDiFamiglia.jpg',
            faceUp: false
        },
        {
            id: 'item_saltTin',
            name: 'Salt Tin',
            type: 'item',
            imageUrl: 'assets/JPG/cards/deck/item/items_saltTin.jpg',
            faceUp: false
        },
        {
            id: 'item_shadowCloak',
            name: 'Shadow Cloak',
            type: 'item',
            imageUrl: 'assets/JPG/cards/deck/item/items_shadowCloak.jpg',
            faceUp: false
        },
        {
            id: 'item_silverSpoon',
            name: 'Silver Spoon',
            type: 'item',
            imageUrl: 'assets/JPG/cards/deck/item/items_silverSpoon.jpg',
            faceUp: false
        },
        {
            id: 'item_spiritFlask',
            name: 'Spirit Flask',
            type: 'item',
            imageUrl: 'assets/JPG/cards/deck/item/items_spiritFlask.jpg',
            faceUp: false
        },
        {
            id: 'item_theEidolon',
            name: 'The Eidolon',
            type: 'item',
            imageUrl: 'assets/JPG/cards/deck/item/items_theEidolon.jpg',
            faceUp: false
        },
        {
            id: 'item_theGodSpike',
            name: 'The God Spike',
            type: 'item',
            imageUrl: 'assets/JPG/cards/deck/item/items_theGodSpike.jpg',
            faceUp: false
        },
        {
            id: 'item_trustyLighter',
            name: 'Trusty Lighter',
            type: 'item',
            imageUrl: 'assets/JPG/cards/deck/item/items_trustyLighter.jpg',
            faceUp: false
        },
        {
            id: 'item_vampireKey',
            name: 'Vampire Key',
            type: 'item',
            imageUrl: 'assets/JPG/cards/deck/item/items_vampireKey.jpg',
            faceUp: false
        },
        {
            id: 'item_viceDice',
            name: 'Vice Dice',
            type: 'item',
            imageUrl: 'assets/JPG/cards/deck/item/items_viceDice.jpg',
            faceUp: false
        }
    ],
    
    // Location cards - 21 cards
    location: [
        {
            id: 'location_4thStreetForge',
            name: '4th Street Forge',
            type: 'location',
            imageUrl: 'assets/JPG/cards/deck/location/locations_4thStreetForge.jpg',
            faceUp: false
        },
        {
            id: 'location_bloodedBathHouse',
            name: 'Blooded Bath House',
            type: 'location',
            imageUrl: 'assets/JPG/cards/deck/location/locations_bloodedBathHouse.jpg',
            faceUp: false
        },
        {
            id: 'location_crimsonHall',
            name: 'Crimson Hall',
            type: 'location',
            imageUrl: 'assets/JPG/cards/deck/location/locations_crimsonHall.jpg',
            faceUp: false
        },
        {
            id: 'location_crossroadStation',
            name: 'Crossroad Station',
            type: 'location',
            imageUrl: 'assets/JPG/cards/deck/location/locations_crossroadStation.jpg',
            faceUp: false
        },
        {
            id: 'location_darkBazaar',
            name: 'Dark Bazaar',
            type: 'location',
            imageUrl: 'assets/JPG/cards/deck/location/locations_darkBazaar.jpg',
            faceUp: false
        },
        {
            id: 'location_echoingAlley',
            name: 'Echoing Alley',
            type: 'location',
            imageUrl: 'assets/JPG/cards/deck/location/locations_echoingAlley.jpg',
            faceUp: false
        },
        {
            id: 'location_forgottenAltar',
            name: 'Forgotten Altar',
            type: 'location',
            imageUrl: 'assets/JPG/cards/deck/location/locations_forgottenAltar.jpg',
            faceUp: false
        },
        {
            id: 'location_goldenArchive',
            name: 'Golden Archive',
            type: 'location',
            imageUrl: 'assets/JPG/cards/deck/location/locations_goldenArchive.jpg',
            faceUp: false
        },
        {
            id: 'location_grandeRoma',
            name: 'Grande Roma',
            type: 'location',
            imageUrl: 'assets/JPG/cards/deck/location/locations_grandeRoma.jpg',
            faceUp: false
        },
        {
            id: 'location_hopeSanitarium',
            name: 'Hope Sanitarium',
            type: 'location',
            imageUrl: 'assets/JPG/cards/deck/location/locations_hopeSanitarium.jpg',
            faceUp: false
        },
        {
            id: 'location_legendsHospital',
            name: 'Legends Hospital',
            type: 'location',
            imageUrl: 'assets/JPG/cards/deck/location/locations_legendsHospital.jpg',
            faceUp: false
        },
        {
            id: 'location_monarchsCourt',
            name: 'Monarchs Court',
            type: 'location',
            imageUrl: 'assets/JPG/cards/deck/location/locations_monarchsCourt.jpg',
            faceUp: false
        },
        {
            id: 'location_neonGraveyard',
            name: 'Neon Graveyard',
            type: 'location',
            imageUrl: 'assets/JPG/cards/deck/location/locations_neonGraveyard.jpg',
            faceUp: false
        },
        {
            id: 'location_newPartyPub',
            name: 'New Party Pub',
            type: 'location',
            imageUrl: 'assets/JPG/cards/deck/location/locations_newPartyPub.jpg',
            faceUp: false
        },
        {
            id: 'location_oracleAvenue',
            name: 'Oracle Avenue',
            type: 'location',
            imageUrl: 'assets/JPG/cards/deck/location/locations_oracleAvenue.jpg',
            faceUp: false
        },
        {
            id: 'location_rustedFairground',
            name: 'Rusted Fairground',
            type: 'location',
            imageUrl: 'assets/JPG/cards/deck/location/locations_rustedFairground.jpg',
            faceUp: false
        },
        {
            id: 'location_thePhantomLine',
            name: 'The Phantom Line',
            type: 'location',
            imageUrl: 'assets/JPG/cards/deck/location/locations_thePhantomLine.jpg',
            faceUp: false
        },
        {
            id: 'location_unseelieGarden',
            name: 'Unseelie Garden',
            type: 'location',
            imageUrl: 'assets/JPG/cards/deck/location/locations_unseelieGarden.jpg',
            faceUp: false
        },
        {
            id: 'location_veinousOssuary',
            name: 'Veinous Ossuary',
            type: 'location',
            imageUrl: 'assets/JPG/cards/deck/location/locations_veinousOssuary.jpg',
            faceUp: false
        },
        {
            id: 'location_wholeGrocer',
            name: 'Whole Grocer',
            type: 'location',
            imageUrl: 'assets/JPG/cards/deck/location/locations_wholeGrocer.jpg',
            faceUp: false
        },
        {
            id: 'location_wickedBrew',
            name: 'Wicked Brew',
            type: 'location',
            imageUrl: 'assets/JPG/cards/deck/location/locations_wickedBrew.jpg',
            faceUp: false
        }
    ],
    
    // NPC cards - 21 cards
    NPC: [
        {
            id: 'npc_daddysLilPrincess',
            name: 'Daddy\'s Lil Princess',
            type: 'NPC',
            imageUrl: 'assets/JPG/cards/deck/NPC/NPCs_daddysLilPrincess.jpg',
            faceUp: false
        },
        {
            id: 'npc_dreamingGirl',
            name: 'Dreaming Girl',
            type: 'NPC',
            imageUrl: 'assets/JPG/cards/deck/NPC/NPCs_dreamingGirl.jpg',
            faceUp: false
        },
        {
            id: 'npc_enigmaticTraveler',
            name: 'Enigmatic Traveler',
            type: 'NPC',
            imageUrl: 'assets/JPG/cards/deck/NPC/NPCs_enigmaticTraveler.jpg',
            faceUp: false
        },
        {
            id: 'npc_exploitedDancer',
            name: 'Exploited Dancer',
            type: 'NPC',
            imageUrl: 'assets/JPG/cards/deck/NPC/NPCs_exploitedDancer.jpg',
            faceUp: false
        },
        {
            id: 'npc_fence',
            name: 'Fence',
            type: 'NPC',
            imageUrl: 'assets/JPG/cards/deck/NPC/NPCs_fence.jpg',
            faceUp: false
        },
        {
            id: 'npc_formerLarper',
            name: 'Former Larper',
            type: 'NPC',
            imageUrl: 'assets/JPG/cards/deck/NPC/NPCs_formerLarper.jpg',
            faceUp: false
        },
        {
            id: 'npc_influentialHipster',
            name: 'Influential Hipster',
            type: 'NPC',
            imageUrl: 'assets/JPG/cards/deck/NPC/NPCs_influentialHipster.jpg',
            faceUp: false
        },
        {
            id: 'npc_loveInterest',
            name: 'Love Interest',
            type: 'NPC',
            imageUrl: 'assets/JPG/cards/deck/NPC/NPCs_loveInterest.jpg',
            faceUp: false
        },
        {
            id: 'npc_lushwithaStory',
            name: 'Lush with a Story',
            type: 'NPC',
            imageUrl: 'assets/JPG/cards/deck/NPC/NPCs_lushwithaStory.jpg',
            faceUp: false
        },
        {
            id: 'npc_mercenary',
            name: 'Mercenary',
            type: 'NPC',
            imageUrl: 'assets/JPG/cards/deck/NPC/NPCs_mercenary.jpg',
            faceUp: false
        },
        {
            id: 'npc_officeBurearat',
            name: 'Office Burearat',
            type: 'NPC',
            imageUrl: 'assets/JPG/cards/deck/NPC/NPCs_officeBurearat.jpg',
            faceUp: false
        },
        {
            id: 'npc_pensiveNoble',
            name: 'Pensive Noble',
            type: 'NPC',
            imageUrl: 'assets/JPG/cards/deck/NPC/NPCs_pensiveNoble.jpg',
            faceUp: false
        },
        {
            id: 'npc_seelieHouseServant',
            name: 'Seelie House Servant',
            type: 'NPC',
            imageUrl: 'assets/JPG/cards/deck/NPC/NPCs_seelieHouseServant.jpg',
            faceUp: false
        },
        {
            id: 'npc_sexyJournalist',
            name: 'Sexy Journalist',
            type: 'NPC',
            imageUrl: 'assets/JPG/cards/deck/NPC/NPCs_sexyJournalist.jpg',
            faceUp: false
        },
        {
            id: 'npc_sexyMechanic',
            name: 'Sexy Mechanic',
            type: 'NPC',
            imageUrl: 'assets/JPG/cards/deck/NPC/NPCs_sexyMechanic.jpg',
            faceUp: false
        },
        {
            id: 'npc_smuggler',
            name: 'Smuggler',
            type: 'NPC',
            imageUrl: 'assets/JPG/cards/deck/NPC/NPCs_smuggler.jpg',
            faceUp: false
        },
        {
            id: 'npc_snarkyShifter',
            name: 'Snarky Shifter',
            type: 'NPC',
            imageUrl: 'assets/JPG/cards/deck/NPC/NPCs_snarkyShifter.jpg',
            faceUp: false
        },
        {
            id: 'npc_transitOracle',
            name: 'Transit Oracle',
            type: 'NPC',
            imageUrl: 'assets/JPG/cards/deck/NPC/NPCs_transitOracle.jpg',
            faceUp: false
        },
        {
            id: 'npc_undeadCop',
            name: 'Undead Cop',
            type: 'NPC',
            imageUrl: 'assets/JPG/cards/deck/NPC/NPCs_undeadCop.jpg',
            faceUp: false
        },
        {
            id: 'npc_upperWestLady',
            name: 'Upper West Lady',
            type: 'NPC',
            imageUrl: 'assets/JPG/cards/deck/NPC/NPCs_upperWestLady.jpg',
            faceUp: false
        },
        {
            id: 'npc_zombieCoroner',
            name: 'Zombie Coroner',
            type: 'NPC',
            imageUrl: 'assets/JPG/cards/deck/NPC/NPCs_zombieCoroner.jpg',
            faceUp: false
        }
    ],
    
    // Spell cards - 12 cards
    spell: [
        {
            id: 'spell_bagTrance',
            name: 'Bag Trance',
            type: 'spell',
            imageUrl: 'assets/JPG/cards/deck/spell/spells_bagTrance.jpg',
            faceUp: false
        },
        {
            id: 'spell_borrowVisage',
            name: 'Borrow Visage',
            type: 'spell',
            imageUrl: 'assets/JPG/cards/deck/spell/spells_borrowVisage.jpg',
            faceUp: false
        },
        {
            id: 'spell_ghostWalk',
            name: 'Ghost Walk',
            type: 'spell',
            imageUrl: 'assets/JPG/cards/deck/spell/spells_ghostWalk.jpg',
            faceUp: false
        },
        {
            id: 'spell_hungerHex',
            name: 'Hunger Hex',
            type: 'spell',
            imageUrl: 'assets/JPG/cards/deck/spell/spells_hungerHex.jpg',
            faceUp: false
        },
        {
            id: 'spell_marionette',
            name: 'Marionette',
            type: 'spell',
            imageUrl: 'assets/JPG/cards/deck/spell/spells_marionette.jpg',
            faceUp: false
        },
        {
            id: 'spell_mirrorSnap',
            name: 'Mirror Snap',
            type: 'spell',
            imageUrl: 'assets/JPG/cards/deck/spell/spells_mirrorSnap.jpg',
            faceUp: false
        },
        {
            id: 'spell_mothLight',
            name: 'Moth Light',
            type: 'spell',
            imageUrl: 'assets/JPG/cards/deck/spell/spells_mothLight.jpg',
            faceUp: false
        },
        {
            id: 'spell_redTether',
            name: 'Red Tether',
            type: 'spell',
            imageUrl: 'assets/JPG/cards/deck/spell/spells_redTether.jpg',
            faceUp: false
        },
        {
            id: 'spell_sociopathicMutter',
            name: 'Sociopathic Mutter',
            type: 'spell',
            imageUrl: 'assets/JPG/cards/deck/spell/spells_sociopathicMutter.jpg',
            faceUp: false
        },
        {
            id: 'spell_stitchLight',
            name: 'Stitch Light',
            type: 'spell',
            imageUrl: 'assets/JPG/cards/deck/spell/spells_stitchLight.jpg',
            faceUp: false
        },
        {
            id: 'spell_stoneBreath',
            name: 'Stone Breath',
            type: 'spell',
            imageUrl: 'assets/JPG/cards/deck/spell/spells_stoneBreath.jpg',
            faceUp: false
        },
        {
            id: 'spell_wallFlower',
            name: 'Wall Flower',
            type: 'spell',
            imageUrl: 'assets/JPG/cards/deck/spell/spells_wallFlower.jpg',
            faceUp: false
        }
    ]
};

// Function to test loading an image
function preloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => {
            console.error(`Failed to load image: ${url}`);
            reject(new Error(`Failed to load image: ${url}`));
        };
        img.src = url;
    });
}

// Function to load card data from a JSON file
async function loadCardDataFromJson() {
    try {
        // Fetch card data from a JSON file
        const response = await fetch('assets/card-data.json');
        if (!response.ok) {
            throw new Error(`Failed to load card data: ${response.status} ${response.statusText}`);
        }
        
        // Parse the JSON response
        const data = await response.json();
        
        // Return the card data
        return data;
    } catch (error) {
        console.error('Error loading card data from JSON:', error);
        
        // If there's an error loading from JSON, fall back to hardcoded data
        console.log('Falling back to hardcoded card data');
        return {
            deck: DECK_CARDS,
            nonDeck: {
                character: CHARACTER_CARDS,
                objective: OBJECTIVE_CARDS
            }
        };
    }
}

// Modified function to load all cards using the JSON data
async function loadAllCards() {
    const allCardData = {
        deck: {},
        nonDeck: {}
    };
    
    // Initialize card data structure for each type
    Object.values(CARD_TYPES).forEach(type => {
        allCardData.deck[type] = [];
    });
    
    // Initialize non-deck card data structure
    Object.values(NON_DECK_TYPES).forEach(type => {
        allCardData.nonDeck[type] = [];
    });
    
    try {
        // Verify card back exists first - this is critical
        try {
            await preloadImage(CARD_BACK_PATH);
            console.log('Card back verified: ', CARD_BACK_PATH);
        } catch (error) {
            console.error('Card back not found! This is a critical error.', error);
            throw new Error('Card back not found at ' + CARD_BACK_PATH);
        }
        
        // Try to load card data from JSON
        const jsonCardData = await loadCardDataFromJson();
        
        // If we have JSON data, use it
        if (jsonCardData) {
            console.log('Successfully loaded card data from JSON');
            
            // Load character cards
            if (jsonCardData.nonDeck && jsonCardData.nonDeck.character) {
                allCardData.nonDeck[NON_DECK_TYPES.CHARACTER] = [...jsonCardData.nonDeck.character];
            } else {
                // Fall back to hardcoded character cards
                allCardData.nonDeck[NON_DECK_TYPES.CHARACTER] = [...CHARACTER_CARDS];
            }
            
            // Load objective cards
            if (jsonCardData.nonDeck && jsonCardData.nonDeck.objective) {
                allCardData.nonDeck[NON_DECK_TYPES.OBJECTIVE] = [...jsonCardData.nonDeck.objective];
            } else {
                // Fall back to hardcoded objective cards
                allCardData.nonDeck[NON_DECK_TYPES.OBJECTIVE] = [...OBJECTIVE_CARDS];
            }
            
            // Load deck cards
            if (jsonCardData.deck) {
                Object.entries(jsonCardData.deck).forEach(([type, cards]) => {
                    if (allCardData.deck[type]) {
                        allCardData.deck[type] = [...cards];
                    }
                });
            } else {
                // Fall back to hardcoded deck cards
                Object.entries(DECK_CARDS).forEach(([type, cards]) => {
                    allCardData.deck[type] = [...cards];
                });
            }
        } else {
            // Fall back to hardcoded data if JSON loading failed
            allCardData.nonDeck[NON_DECK_TYPES.CHARACTER] = [...CHARACTER_CARDS];
            allCardData.nonDeck[NON_DECK_TYPES.OBJECTIVE] = [...OBJECTIVE_CARDS];
            
            Object.entries(DECK_CARDS).forEach(([type, cards]) => {
                allCardData.deck[type] = [...cards];
            });
        }
        
        // Update card data object with card back path
        cardData.cardBacks = {
            small: CARD_BACK_PATH,
            large: CARD_BACK_PATH
        };
        
    } catch (error) {
        console.error('Error loading cards:', error);
        
        // Fall back to hardcoded data if there was an error
        allCardData.nonDeck[NON_DECK_TYPES.CHARACTER] = [...CHARACTER_CARDS];
        allCardData.nonDeck[NON_DECK_TYPES.OBJECTIVE] = [...OBJECTIVE_CARDS];
        
        Object.entries(DECK_CARDS).forEach(([type, cards]) => {
            allCardData.deck[type] = [...cards];
        });
    }
    
    return allCardData;
}

// Function to initialize all decks with loaded cards
async function initializeDecks() {
    // Show loading indicator
    const gameBoard = document.getElementById('gameBoard');
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading-indicator';
    loadingDiv.style.position = 'absolute';
    loadingDiv.style.top = '50%';
    loadingDiv.style.left = '50%';
    loadingDiv.style.transform = 'translate(-50%, -50%)';
    loadingDiv.style.padding = '20px';
    loadingDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    loadingDiv.style.color = 'white';
    loadingDiv.style.borderRadius = '10px';
    loadingDiv.style.zIndex = '1000';
    loadingDiv.style.textAlign = 'center';
    loadingDiv.style.maxHeight = '80vh';
    loadingDiv.style.overflowY = 'auto';
    loadingDiv.innerHTML = '<h2>Loading Cards...</h2><p>Please wait while we load high-resolution cards</p>';
    gameBoard.appendChild(loadingDiv);
    
    // Create a debug button to show all image paths for verification
    const debugBtn = document.createElement('button');
    debugBtn.textContent = 'Debug Images';
    debugBtn.style.marginTop = '10px';
    debugBtn.style.padding = '5px 10px';
    debugBtn.style.borderRadius = '5px';
    debugBtn.onclick = function() {
        showImageDebugWindow();
    };
    loadingDiv.appendChild(debugBtn);
    
    function updateLoadingStatus(message) {
        const statusElement = document.createElement('p');
        statusElement.textContent = message;
        loadingDiv.appendChild(statusElement);
    }
    
    try {
        updateLoadingStatus('Loading card data...');
        const loadedCards = await loadAllCards();
        
        if (!loadedCards) {
            updateLoadingStatus('Error: No card data loaded');
            return false;
        }
        
        // Store character cards in cardData for easier access
        cardData.characterCards = loadedCards.nonDeck[NON_DECK_TYPES.CHARACTER] || [];
        updateLoadingStatus(`Loaded ${cardData.characterCards ? cardData.characterCards.length : 0} character cards`);
        
        // Store objective cards in cardData for easier access
        cardData.objectiveCards = loadedCards.nonDeck[NON_DECK_TYPES.OBJECTIVE] || [];
        updateLoadingStatus(`Loaded ${cardData.objectiveCards ? cardData.objectiveCards.length : 0} objective cards`);
        
        // Get the deck distribution configuration
        const deckDistribution = getDeckDistribution();
        updateLoadingStatus(`Using deck distribution: Main ${deckDistribution.main.join(', ')}, Alt ${deckDistribution.alt.join(', ')}, None ${deckDistribution.none.join(', ')}`);
        
        // Store configuration in game state
        if (!gameState) {
            gameState = { deckDistribution };
        } else {
            gameState.deckDistribution = deckDistribution;
        }
        
        // For backwards compatibility
        if (!gameState.altDeckTypes) {
            gameState.altDeckTypes = deckDistribution.alt;
        }
        
        // Initialize main deck and alt deck
        mainDeck = [];
        altDeck = [];
        
        // Track card counts for reporting
        const deckCounts = {
            main: {},
            alt: {}
        };
        
        // Process each card type based on configuration
        Object.entries(loadedCards.deck).forEach(([type, cards]) => {
            if (cards && cards.length > 0) {
                // Make type lowercase for consistent comparison
                const lowercaseType = type.toLowerCase();
                
                // Check deck assignment based on distribution
                if (deckDistribution.alt.includes(lowercaseType)) {
                    updateLoadingStatus(`Adding ${cards.length} ${type} cards to the alt deck`);
                    // Add to alt deck
                    altDeck.push(...cards.map(card => ({...card, faceUp: false})));
                    
                    // Track count
                    deckCounts.alt[type] = cards.length;
                } else if (deckDistribution.main.includes(lowercaseType)) {
                    updateLoadingStatus(`Adding ${cards.length} ${type} cards to the main deck`);
                    // Add to main deck
                    mainDeck.push(...cards.map(card => ({...card, faceUp: false})));
                    
                    // Track count
                    deckCounts.main[type] = cards.length;
                } else {
                    // Card type is excluded (none)
                    updateLoadingStatus(`Excluding ${cards.length} ${type} cards from both decks`);
                }
            }
        });
        
        // Add objective cards to alt deck if selected
        if (deckDistribution.alt.includes('objective') && cardData.objectiveCards) {
            updateLoadingStatus(`Adding ${cardData.objectiveCards.length} objective cards to the alt deck`);
            altDeck.push(...cardData.objectiveCards.map(card => ({...card, faceUp: false})));
            deckCounts.alt['objective'] = cardData.objectiveCards.length;
        }
        
        // Display counts
        updateLoadingStatus('Card distribution:');
        Object.entries(deckCounts.main).forEach(([type, count]) => {
            updateLoadingStatus(`Main deck - ${type}: ${count} cards`);
        });
        Object.entries(deckCounts.alt).forEach(([type, count]) => {
            updateLoadingStatus(`Alt deck - ${type}: ${count} cards`);
        });
        
        // If main deck is empty, use emergency placeholders
        if (mainDeck.length === 0) {
            updateLoadingStatus('No cards loaded for main deck, using emergency placeholders');
            mainDeck = createTestDeck();
            updateLoadingStatus(`Created emergency deck with ${mainDeck.length} placeholder cards`);
        }
        
        // Shuffle both decks
        updateLoadingStatus(`Shuffling main deck with ${mainDeck.length} cards`);
        shuffleArray(mainDeck);
        
        if (altDeck.length > 0) {
            updateLoadingStatus(`Shuffling alt deck with ${altDeck.length} cards`);
            shuffleArray(altDeck);
        }
        
        // Update the display
        renderMainDeck();
        renderMainDiscard();
        
        // Render alt deck if there are cards
        if (altDeck.length > 0) {
            updateLoadingStatus(`Rendering alt deck with ${altDeck.length} cards`);
            renderAltDeck();
            renderAltDiscard();
            
            // Set up alt deck event listeners
            initializeAltDeckEventListeners();
        }
        
        updateLoadingStatus(`Decks initialized: Main(${mainDeck.length}), Alt(${altDeck.length})`);
        
        // Remove loading indicator after a short delay
        setTimeout(() => {
            loadingDiv.remove();
        }, 2000);
        
        return mainDeck.length > 0;
    } catch (error) {
        console.error('Error initializing decks:', error);
        updateLoadingStatus(`Error: ${error.message}`);
        
        // Fallback to emergency placeholders
        updateLoadingStatus('Using emergency placeholders due to error');
        mainDeck = createTestDeck();
        updateLoadingStatus(`Created emergency deck with ${mainDeck.length} placeholder cards`);
        renderMainDeck();
        renderMainDiscard();
        
        // Show error in loading indicator
        updateLoadingStatus('ERROR: Could not load card assets');
        updateLoadingStatus('Check browser console for details');
        
        // Keep debug button available but hide other info after a delay
        setTimeout(() => {
            while (loadingDiv.firstChild) {
                if (loadingDiv.firstChild === debugBtn) {
                    break;
                }
                loadingDiv.removeChild(loadingDiv.firstChild);
            }
            loadingDiv.innerHTML = '<h3>Card Loading Error</h3><p>Click Debug Images to troubleshoot</p>';
            loadingDiv.appendChild(debugBtn);
        }, 5000);
        
        return true; // Return true to continue game initialization
    }
}

// Render alt deck
function renderAltDeck() {
    const deckElement = document.getElementById('altDeck');
    if (!deckElement) {
        console.error('Alt deck element not found');
        return;
    }
    
    deckElement.innerHTML = '';
    
    // Add deck count indicator
    const deckCount = document.createElement('div');
    deckCount.className = 'deck-count';
    deckCount.textContent = altDeck.length;
    deckElement.appendChild(deckCount);
    
    // Only create a clickable deck card if there are cards in the deck
    if (altDeck.length > 0) {
        // Create a draggable container for the top card
        const deckCardContainer = document.createElement('div');
        deckCardContainer.className = 'deck-card-container';
        deckCardContainer.draggable = true;
        deckCardContainer.dataset.fromAltDeck = 'true';
        
        // Add card images (back is shown by default)
        const cardBack = document.createElement('img');
        cardBack.className = 'deck-card-back';
        cardBack.src = cardData.cardBacks.small;
        cardBack.alt = 'Card Back';
        deckCardContainer.appendChild(cardBack);
        
        // Add the top card's front image (hidden by default)
        const topCard = altDeck[0];
        if (topCard) {
            const cardFront = document.createElement('img');
            cardFront.className = 'deck-card-front';
            cardFront.src = topCard.imageUrl || createPlaceholderSVG(topCard.name, topCard.type);
            cardFront.alt = topCard.name;
            cardFront.style.display = topCard.faceUp ? 'block' : 'none'; // Show front if card is face up
            cardBack.style.display = topCard.faceUp ? 'none' : 'block'; // Hide back if card is face up
            deckCardContainer.appendChild(cardFront);
            
            // Store the card ID on the container
            deckCardContainer.dataset.cardId = topCard.id;
        }
        
        // Add click event to view the card in the inspector
        deckCardContainer.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Only show in inspector if we have cards and the top card exists
            if (altDeck.length > 0 && altDeck[0]) {
                // Show the card in the inspector
                updateInspector(altDeck[0]);
                
                // Highlight the clicked card
                if (highlightedCard) highlightedCard.classList.remove('highlighted');
                this.classList.add('highlighted');
                highlightedCard = this;
            }
        });
        
        // Add double-click event for flipping the top card
        deckCardContainer.addEventListener('dblclick', function(e) {
            e.stopPropagation();
            const cardFront = this.querySelector('.deck-card-front');
            const cardBack = this.querySelector('.deck-card-back');
            
            if (cardFront && cardBack && altDeck.length > 0) {
                // Toggle visibility of front and back
                if (cardFront.style.display === 'none') {
                    cardFront.style.display = 'block';
                    cardBack.style.display = 'none';
                    // Update the card in the deck to be face up
                    altDeck[0].faceUp = true;
                    showNotification('Card flipped face-up', 'info');
                } else {
                    cardFront.style.display = 'none';
                    cardBack.style.display = 'block';
                    // Update the card in the deck to be face down
                    altDeck[0].faceUp = false;
                    showNotification('Card flipped face-down', 'info');
                }
            }
        });
        
        // Add drag event for dragging the top card
        deckCardContainer.addEventListener('dragstart', function(e) {
            e.stopPropagation();
            this.classList.add('dragging');
            draggedCard = this;
            
            // Set dragged card data
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', this.dataset.cardId);
        });
        
        deckCardContainer.addEventListener('dragend', function(e) {
            e.stopPropagation();
            this.classList.remove('dragging');
            draggedCard = null;
        });
        
        deckElement.appendChild(deckCardContainer);
    } else {
        // Empty deck indicator
        const emptyIndicator = document.createElement('div');
        emptyIndicator.className = 'empty-deck';
        emptyIndicator.textContent = 'Empty';
        emptyIndicator.style.color = '#888';
        emptyIndicator.style.fontSize = '12px';
        emptyIndicator.style.position = 'absolute';
        emptyIndicator.style.top = '50%';
        emptyIndicator.style.left = '50%';
        emptyIndicator.style.transform = 'translate(-50%, -50%)';
        deckElement.appendChild(emptyIndicator);
    }
    
    // Function to create placeholder SVG for missing cards
    function createPlaceholderSVG(cardName, cardType) {
        const colors = {
            'monster': '#d35f5f',
            'spell': '#5f5fd3',
            'item': '#5fd35f',
            'location': '#d3aa5f',
            'NPC': '#aa5fd3',
            'character': '#e5a619',
            'objective': '#19e5e5'
        };
        const color = colors[cardType] || '#5a5a5a';
        
        return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="144" viewBox="0 0 80 144"><rect width="100%" height="100%" fill="${color}"/><text x="50%" y="30%" font-family="Arial" font-size="10" fill="white" text-anchor="middle" dominant-baseline="middle">${cardType.toUpperCase()}</text><text x="50%" y="50%" font-family="Arial" font-size="8" fill="white" text-anchor="middle" dominant-baseline="middle">${cardName}</text><text x="50%" y="70%" font-family="Arial" font-size="8" fill="white" text-anchor="middle" dominant-baseline="middle">IMAGE ERROR</text></svg>`;
    }
}

// Initialize alt deck event listeners
function initializeAltDeckEventListeners() {
    // Get the alt deck element
    const altDeckElement = document.getElementById('altDeck');
    if (!altDeckElement) {
        console.error('Alt deck element not found');
        return;
    }

    // Make the alt deck a valid drop target
    altDeckElement.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        this.classList.add('drag-over');
    });
    
    altDeckElement.addEventListener('dragleave', function() {
        this.classList.remove('drag-over');
    });
    
    altDeckElement.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        
        // Handle dropping a card onto the alt deck
        if (draggedCard) {
            const cardId = draggedCard.dataset.cardId;
            if (cardId) {
                // Find the card data
                const card = findCardById(cardId);
                if (card) {
                    // Add to the top of the alt deck
                    altDeck.unshift({...card, faceUp: false});
                    
                    // Remove the card from its original location
                    draggedCard.remove();
                    
                    // Update the alt deck display
                    renderAltDeck();
                }
            }
        }
    });
    
    // Add event listeners for the alt discard pile
    const altDiscardElement = document.getElementById('altDiscard');
    if (altDiscardElement) {
        altDiscardElement.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            this.classList.add('drag-over');
        });
        altDiscardElement.addEventListener('drop', handleDiscardDrop);
    }
}

// Render alt discard pile
function renderAltDiscard() {
    const discardElement = document.getElementById('altDiscard');
    if (!discardElement) return;
    
    discardElement.innerHTML = '';
    
    // Add discard count indicator
    const discardCount = document.createElement('div');
    discardCount.className = 'deck-count';
    discardCount.textContent = altDiscard.length;
    discardElement.appendChild(discardCount);
    
    // Only render the top card if the discard has cards
    if (altDiscard.length > 0) {
        const topCard = altDiscard[altDiscard.length - 1];
        const cardElement = createCardElement({...topCard, faceUp: true}); // Always show face-up
        cardElement.classList.add('discard-card');
        // Discard cards are always face up
        cardElement.classList.remove('face-down');
        cardElement.style.transform = 'rotateY(0deg)';
        
        // Make the top discard card draggable
        cardElement.setAttribute('draggable', 'true');
        cardElement.dataset.fromAltDiscard = 'true';
        
        // Add drag event handlers
        cardElement.addEventListener('dragstart', function(e) {
            e.stopPropagation();
            this.classList.add('dragging');
            draggedCard = this;
        });
        
        cardElement.addEventListener('dragend', function(e) {
            e.stopPropagation();
            this.classList.remove('dragging');
            draggedCard = null;
        });
        
        discardElement.appendChild(cardElement);
    } else {
        // Empty discard pile
        const emptyIndicator = document.createElement('div');
        emptyIndicator.className = 'empty-discard';
        emptyIndicator.textContent = 'Empty';
        emptyIndicator.style.color = '#888';
        emptyIndicator.style.fontSize = '12px';
        emptyIndicator.style.position = 'absolute';
        emptyIndicator.style.top = '50%';
        emptyIndicator.style.left = '50%';
        emptyIndicator.style.transform = 'translate(-50%, -50%)';
        discardElement.appendChild(emptyIndicator);
    }
    
    // Add drop event handlers
    discardElement.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        this.classList.add('drag-over');
    });
    
    discardElement.addEventListener('dragleave', function() {
        this.classList.remove('drag-over');
    });
    
    discardElement.addEventListener('drop', handleDiscardDrop);
}

// Handle dropping cards onto the alt discard pile
function handleAltDiscardDrop(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('drag-over');
    
    if (!draggedCard) return;
    
    // Check if we're dragging from the alt deck wrapper
    if (draggedCard.dataset.fromAltDeck === 'true') {
        // Only proceed if we have cards in the alt deck
        if (altDeck.length === 0) {
            console.warn('Attempted to drag from empty alt deck');
            return;
        }
        
        // Get a copy of the top card and remove it from the alt deck
        const card = altDeck.shift();
        card.faceUp = true; // Cards in discard are always face up
        altDiscard.push(card);
        
        // Update the alt deck display
        renderAltDeck();
        renderAltDiscard();
        return;
    }
    
    // Check if we're dragging from the alt discard pile itself
    if (draggedCard.dataset.fromAltDiscard === 'true') {
        // We don't need to do anything if dragging to same pile
        return;
    }

    // Handle cards dragged from other places (slots, hand, etc.)
    const cardId = draggedCard.dataset.cardId;
    if (cardId) {
        // Find the card data
        let foundCard;
        let foundInDeck = false;
        let cardIndex = -1;
        
        // Search for card in all possible locations
        // Search in player hands
        for (let i = 0; i < playerHands.length; i++) {
            if (playerHands[i]) {
                cardIndex = playerHands[i].findIndex(c => c.id === cardId);
                if (cardIndex !== -1) {
                    foundCard = {...playerHands[i][cardIndex]};
                    playerHands[i].splice(cardIndex, 1); // Remove from hand
                    foundInDeck = true;
                    break;
                }
            }
        }
        
        // Search in main deck
        if (!foundInDeck) {
            cardIndex = mainDeck.findIndex(c => c.id === cardId);
            if (cardIndex !== -1) {
                foundCard = {...mainDeck[cardIndex]};
                mainDeck.splice(cardIndex, 1); // Remove from deck
                foundInDeck = true;
            }
        }
        
        // Search in alt deck
        if (!foundInDeck) {
            cardIndex = altDeck.findIndex(c => c.id === cardId);
            if (cardIndex !== -1) {
                foundCard = {...altDeck[cardIndex]};
                altDeck.splice(cardIndex, 1); // Remove from deck
                foundInDeck = true;
            }
        }
        
        // If card was not found in any data structure, create a new card object
        if (!foundInDeck) {
            // Handle emergency placeholder cards 
            if (cardId.startsWith('emergency')) {
                const match = cardId.match(/emergency(\d+)/);
                if (match) {
                    const cardNum = parseInt(match[1]);
                    if (!isNaN(cardNum)) {
                        // Determine card type based on number
                        const cardType = cardNum % 5 === 0 ? 'monster' : 
                                       cardNum % 5 === 1 ? 'spell' : 
                                       cardNum % 5 === 2 ? 'item' : 
                                       cardNum % 5 === 3 ? 'location' : 'NPC';
                        
                        // Create emergency card object
                        foundCard = {
                            id: cardId,
                            name: `Placeholder ${cardType.charAt(0).toUpperCase() + cardType.slice(1)} ${cardNum}`,
                            type: cardType
                        };
                    }
                }
            } else {
                // Try to find the card in the other card collections
                const allCardTypes = [...Object.keys(CARD_TYPES), ...Object.keys(NON_DECK_TYPES)];
                for (const type of allCardTypes) {
                    if (cardId.startsWith(type.toLowerCase() + '_')) {
                        // Extract the card name from the ID
                        const cardName = cardId.replace(type.toLowerCase() + '_', '');
                        foundCard = {
                            id: cardId,
                            name: cardName.charAt(0).toUpperCase() + cardName.slice(1),
                            type: type.toLowerCase()
                        };
                        break;
                    }
                }
            }
        }
        
        if (foundCard) {
            // Ensure the card is face up in the discard pile
            foundCard.faceUp = true;
            
            // Add to alt discard
            altDiscard.push(foundCard);
            
            // Remove from original position
            draggedCard.remove();
            
            // Update display
            renderAltDiscard();
        }
    }
}

// Create test deck for fallback - only used when no real cards are found
function createTestDeck() {
    // Create a small number of cards just so the game can function
    return Array.from({ length: 20 }, (_, i) => {
        // Convert index to padded number (01-20)
        const cardNum = String(i + 1).padStart(2, '0');
        const cardType = i % 5 === 0 ? 'monster' : 
                       i % 5 === 1 ? 'spell' : 
                       i % 5 === 2 ? 'item' : 
                       i % 5 === 3 ? 'location' : 'NPC';
        
        // Generate a color based on the card type
        const colors = {
            'monster': '#d35f5f',
            'spell': '#5f5fd3',
            'item': '#5fd35f',
            'location': '#d3aa5f',
            'NPC': '#aa5fd3'
        };
        const color = colors[cardType] || '#5a5a5a';
        
        return {
            id: `emergency${cardNum}`,
            type: cardType,
            name: `Placeholder ${cardType.charAt(0).toUpperCase() + cardType.slice(1)} ${cardNum}`,
            description: `Emergency placeholder card`,
            // Use SVG placeholder
            imageUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="144" viewBox="0 0 80 144"><rect width="100%" height="100%" fill="${color}"/><text x="50%" y="30%" font-family="Arial" font-size="12" fill="white" text-anchor="middle" dominant-baseline="middle">PLACEHOLDER</text><text x="50%" y="50%" font-family="Arial" font-size="20" fill="white" text-anchor="middle" dominant-baseline="middle">${cardType}</text><text x="50%" y="70%" font-family="Arial" font-size="10" fill="white" text-anchor="middle" dominant-baseline="middle">EMERGENCY</text></svg>`,
            faceUp: false
        };
    });
}

// Initialize the turn timer with proper controls
// Function removed - timer functionality has been removed

// Add a call to initialize the timer when the game starts
function startGame() {
    // Get selected player count
    const playerCountSelect = document.getElementById('playerCount');
    playerCount = parseInt(playerCountSelect.value);
    
    if (playerCount < 2 || playerCount > 4) {
        console.error('Invalid player count:', playerCount);
        return;
    }

    // Create arrays to store player names and character selections
    const selectedCharacterIds = [];
    let tempPlayerNames = [];
    
    // Validate player inputs
    for (let i = 1; i <= playerCount; i++) {
        const playerNameInput = document.getElementById(`player${i}Name`);
        let playerName = playerNameInput.value.trim();
        const characterSelect = document.getElementById(`player${i}Character`);
        const selectedCharacterId = characterSelect.value;
        
        // Set default name if empty
        if (!playerName) {
            playerName = `Player ${i}`;
            playerNameInput.value = playerName;
        }
        
        // Validate character selection
        if (!selectedCharacterId) {
            alert(`Please select a character for Player ${i}`);
            return;
        }
        
        // Check for duplicate character selections
        if (selectedCharacterIds.includes(selectedCharacterId)) {
            alert(`Duplicate character selection detected. Each player must have a unique character.`);
            return;
        }
        
        // Store player information
        tempPlayerNames.push(playerName);
        selectedCharacterIds.push(selectedCharacterId);
    }
    
    // Store player names in the global array
    playerNames = [...tempPlayerNames];

    // Get the number of scenes
    const scenesCountInput = document.getElementById('scenesCount');
    let scenesCount = 10; // Default value
    if (scenesCountInput) {
        scenesCount = parseInt(scenesCountInput.value);
        if (isNaN(scenesCount) || scenesCount < 3) {
            scenesCount = 3;
        } else if (scenesCount > 40) {
            scenesCount = 40;
        }
    }
    
    // Get selected alt deck card types
    const altDeckTypes = getSelectedAltDeckTypes();
    
    // Get the full deck distribution from switches
    const deckDistribution = getDeckDistribution();
    console.log('Deck distribution:', deckDistribution);
    
    // Get the selected objective
    const objectiveSelect = document.getElementById('objectiveSelect');
    const selectedObjectiveId = objectiveSelect.value;
    
    // Special handling for "No Predefined Objective" or ensure an objective is selected
    if (selectedObjectiveId === "no_objective") {
        // Continue with no objective
        console.log("Starting game with no predefined objective");
    } else if (!selectedObjectiveId) {
        alert('Please select an objective before starting the game');
        return;
    }
    
    // Continue with game initialization
    loadCardDataFromJson().then(async (jsonCardData) => {
        let characterCards = [];
        let objectiveCards = [];
        
        // Get character cards either from JSON or fallback to hardcoded
        if (jsonCardData && jsonCardData.nonDeck && jsonCardData.nonDeck.character) {
            characterCards = jsonCardData.nonDeck.character;
        } else {
            characterCards = CHARACTER_CARDS;
        }
        
        // Get objective cards either from JSON or fallback to hardcoded
        if (jsonCardData && jsonCardData.nonDeck && jsonCardData.nonDeck.objective) {
            objectiveCards = jsonCardData.nonDeck.objective;
        } else {
            objectiveCards = OBJECTIVE_CARDS;
        }
        
        // Find selected objective if there is one
        let selectedObjective = null;
        if (selectedObjectiveId && selectedObjectiveId !== "no_objective") {
            selectedObjective = objectiveCards.find(obj => obj.id === selectedObjectiveId);
            
            if (!selectedObjective) {
                console.error('Selected objective not found:', selectedObjectiveId);
                alert('Selected objective not found. Please try again.');
                return;
            }
        }
        
        // Create an array to track which characters have been assigned
        const assignedCharacters = [];
        
        // Find selected characters
        for (let i = 0; i < playerCount; i++) {
            const characterId = selectedCharacterIds[i];
            const character = characterCards.find(char => char.id === characterId);
            
            if (!character) {
                console.error(`Selected character not found: ${characterId} for Player ${i+1}`);
                alert(`Selected character not found for Player ${i+1}. Please try again.`);
                return;
            }
            
            // Add character to assigned characters
            assignedCharacters.push(character);
        }
        
        // Store the selected objective, scene count, and alt deck types in the game state
        gameState = {
            ...gameState || {},
            selectedObjective,
            scenesCount,
            finalSceneIndex: scenesCount - 1, // 0-based index
            altDeckTypes: altDeckTypes, // For backward compatibility
            deckDistribution: deckDistribution // Store the full distribution
        };
        
        // Initialize game state
        gameStarted = true;
        playerHands = Array(playerCount).fill().map(() => []);
        
        // Store the characters for all players
        playerCharacters = [...assignedCharacters];
        
        // Initialize player tokens
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
        // Timer functionality has been removed
    
        // Initialize the deck with our function
        const success = await initializeDecks();
        if (!success) {
            console.error('Failed to initialize decks. No cards loaded.');
            alert('Failed to load cards. Check the console for details.');
            return;
        }
        
        // Save assigned characters to cardData for access in renderHands
        cardData.characterCards = assignedCharacters;
        
        // Deal 5 cards to each player
        dealInitialCards(5);
        
        // Place the objective card in the final scene slot (or mark the slot if no objective)
        if (selectedObjective) {
            placeObjectiveCard(selectedObjective, gameState.finalSceneIndex);
            
            // Display the objective card in the inspector
            updateInspector(selectedObjective);
        } else {
            // Mark the final scene slot without a card
            markFinalSceneSlot(gameState.finalSceneIndex);
        }
        
        // Render character cards and hand slots
        renderHands();
        
        // Initialize deck event listeners
        initializeDeckEventListeners();
        
        // Hide setup screen and show game board
        document.getElementById('setup').style.display = 'none';
        document.getElementById('gameBoard').style.display = 'block';
        
        // Disable game settings when game is in progress
        disableGameSettings(true);
        
        // Change start button text to "Resume Game" for future returns to the menu
        document.getElementById('startGameBtn').textContent = 'Resume Game';
        
        // Setup and show instructions overlay
        setupInstructionsOverlay();
    }).catch(error => {
        console.error('Error starting game:', error);
        alert('Failed to start game: ' + error.message);
    });
}

// Initialize deck event listeners
function initializeDeckEventListeners() {
    // Add event listeners for the discard pile
    const mainDiscardElement = document.getElementById('mainDiscard');
    mainDiscardElement.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    });
    mainDiscardElement.addEventListener('drop', handleDiscardDrop);
    
    // Make sure all grid slots, hand slots, and mutable slots accept drops
    const allDropTargets = [
        ...document.querySelectorAll('.gridSlot'),
        ...document.querySelectorAll('.handCard'),
        ...document.querySelectorAll('.mutableSlot')
    ];
    
    allDropTargets.forEach(target => {
        target.addEventListener('dragover', function(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            this.classList.add('drag-over');
        });
        
        target.addEventListener('dragleave', function() {
            this.classList.remove('drag-over');
        });
        
        target.addEventListener('drop', handleDrop);
    });
}

// Render player hands
function renderHands() {
    console.log('Rendering player hands with character cards:', cardData.characterCards);
    
    // Clear existing hands
    const hands = document.querySelectorAll('.playerHand');
    hands.forEach(hand => {
        const playerIndex = parseInt(hand.id.replace('player', '').replace('Hand', '')) - 1;
        console.log(`Processing hand for player ${playerIndex + 1}`);
        
        // Store existing elements before clearing
        const existingElements = Array.from(hand.children);
        const tokenContainer = existingElements.find(el => el.classList.contains('tokenContainer'));
        const existingCards = existingElements.filter(el => el.classList.contains('card'));
        
        // Clear the hand
        hand.innerHTML = '';
        
        // Restore token container if it exists
        if (tokenContainer) {
            hand.appendChild(tokenContainer);
        }

        // Add character card if this is an active player
        if (playerIndex < playerCount) {
            console.log(`Rendering hand for player ${playerIndex + 1} (active)`);
            
            // First add a character card slot
            const charCardSlot = document.createElement('div');
            charCardSlot.className = 'handCard charCard';
            charCardSlot.style.width = '80px';
            charCardSlot.style.height = '144px';
            charCardSlot.style.position = 'relative';
            charCardSlot.style.marginRight = '8px';
            charCardSlot.setAttribute('data-player', playerIndex);
            charCardSlot.setAttribute('data-slot-type', 'character');
            
            // Get the character card for this player
            const characterCard = cardData.characterCards[playerIndex];
            
            if (characterCard) {
                console.log(`Character card for player ${playerIndex + 1}:`, characterCard);
                
                // Create and add character card with explicit faceUp setting
                const charCard = createCardElement({
                    ...characterCard,
                    faceUp: true  // Force character cards to be face up
                });
                
                charCard.classList.add('character-card');
                charCardSlot.appendChild(charCard);
                
                // Add player name label
                const playerNameLabel = document.createElement('div');
                playerNameLabel.className = 'player-name-label';
                playerNameLabel.textContent = playerNames[playerIndex] || `Player ${playerIndex + 1}`;
                playerNameLabel.style.position = 'absolute';
                playerNameLabel.style.left = '0';
                playerNameLabel.style.width = '100%';
                playerNameLabel.style.textAlign = 'center';
                playerNameLabel.style.fontWeight = 'bold';
                playerNameLabel.style.fontSize = '14px';
                playerNameLabel.style.color = 'white';
                playerNameLabel.style.textShadow = '1px 1px 2px rgba(0, 0, 0, 0.8)';
                
                // Position label based on hand position (top or bottom of board)
                if (hand.id === 'player1Hand' || hand.id === 'player2Hand') {
                    // Top hands - label under character card
                    playerNameLabel.style.top = '150px';  // Position below the card
                } else {
                    // Bottom hands - label above character card
                    playerNameLabel.style.top = '-25px';  // Position above the card
                }
                
                charCardSlot.appendChild(playerNameLabel);
                
                // Log successful character card creation
                console.log(`Added character card ${characterCard.name} to player ${playerIndex + 1}`);
            } else {
                console.warn(`No character card available for player ${playerIndex + 1}`);
                
                // Create a placeholder for missing character
                const placeholderDiv = document.createElement('div');
                placeholderDiv.className = 'card-placeholder';
                placeholderDiv.textContent = `Player ${playerIndex + 1}`;
                placeholderDiv.style.width = '100%';
                placeholderDiv.style.height = '100%';
                placeholderDiv.style.display = 'flex';
                placeholderDiv.style.justifyContent = 'center';
                placeholderDiv.style.alignItems = 'center';
                placeholderDiv.style.backgroundColor = '#1a1a1a';
                placeholderDiv.style.color = 'white';
                placeholderDiv.style.borderRadius = '5px';
                charCardSlot.appendChild(placeholderDiv);
            }
            
            hand.appendChild(charCardSlot);

            // Always create 5 hand card slots
            for (let i = 0; i < 5; i++) {
                const cardSlot = document.createElement('div');
                cardSlot.className = 'handCard';
                cardSlot.style.width = '80px';
                cardSlot.style.height = '144px';
                cardSlot.style.position = 'relative';
                cardSlot.setAttribute('data-player', playerIndex);
                cardSlot.setAttribute('data-slot', i);
                cardSlot.setAttribute('data-slot-type', 'hand');
                
                // Set up drag and drop
                cardSlot.addEventListener('dragover', function(e) {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'move';
                    this.classList.add('drag-over');
                });
                
                cardSlot.addEventListener('dragleave', function() {
                    this.classList.remove('drag-over');
                });
                
                cardSlot.addEventListener('drop', handleDrop);
                
                // Add a card to this slot if there's one in the player's hand at this position
                if (playerHands[playerIndex] && playerHands[playerIndex][i]) {
                    const cardData = playerHands[playerIndex][i];
                    const cardElement = createCardElement(cardData);
                    cardSlot.appendChild(cardElement);
                }
                
                hand.appendChild(cardSlot);
            }
        } else {
            // For inactive players, just hide the hand
            hand.style.display = 'none';
        }
    });
    
    console.log('Finished rendering hands');
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

// Create card element
function createCardElement(card, isInspector = false) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.dataset.cardId = card.id;
    
    // Set proper attributes for click handling
    cardDiv.setAttribute('draggable', 'true');
    
    // Track whether the card is face-up or face-down
    const isFaceDown = card.faceUp === false;
    if (isFaceDown) {
        cardDiv.classList.add('face-down');
        cardDiv.style.transform = 'rotateY(180deg)';
    } else {
        cardDiv.style.transform = 'rotateY(0deg)';
    }
    
    // Add placeholder while loading
    const placeholderDiv = document.createElement('div');
    placeholderDiv.className = 'card-placeholder';
    placeholderDiv.style.width = '100%';
    placeholderDiv.style.height = '100%';
    placeholderDiv.style.backgroundColor = '#1a1a1a';
    placeholderDiv.style.color = 'white';
    placeholderDiv.style.display = 'flex';
    placeholderDiv.style.justifyContent = 'center';
    placeholderDiv.style.alignItems = 'center';
    placeholderDiv.style.textAlign = 'center';
    placeholderDiv.style.padding = '5px';
    placeholderDiv.style.position = 'absolute';
    placeholderDiv.style.borderRadius = '5px';
    placeholderDiv.style.zIndex = '3'; // Higher than front/back
    placeholderDiv.textContent = card.name || 'Loading...';
    cardDiv.appendChild(placeholderDiv);
    
    // Function to create placeholder SVG for missing cards
    function createPlaceholderSVG(cardName, cardType) {
        const colors = {
            'monster': '#d35f5f',
            'spell': '#5f5fd3',
            'item': '#5fd35f',
            'location': '#d3aa5f',
            'NPC': '#aa5fd3',
            'character': '#e5a619',
            'objective': '#19e5e5'
        };
        const color = colors[cardType] || '#5a5a5a';
        
        return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="144" viewBox="0 0 80 144"><rect width="100%" height="100%" fill="${color}"/><text x="50%" y="30%" font-family="Arial" font-size="10" fill="white" text-anchor="middle" dominant-baseline="middle">${cardType.toUpperCase()}</text><text x="50%" y="50%" font-family="Arial" font-size="8" fill="white" text-anchor="middle" dominant-baseline="middle">${cardName}</text><text x="50%" y="70%" font-family="Arial" font-size="8" fill="white" text-anchor="middle" dominant-baseline="middle">IMAGE ERROR</text></svg>`;
    }
    
    // Create back image element immediately
    const backImg = document.createElement('img');
    backImg.src = cardData.cardBacks.small;
    backImg.alt = 'Card Back';
    backImg.className = 'card-back';
    backImg.style.width = '100%';
    backImg.style.height = '100%';
    backImg.style.objectFit = isInspector ? 'contain' : 'cover';
    backImg.style.borderRadius = '5px';
    backImg.style.position = 'absolute';
    backImg.style.top = '0';
    backImg.style.left = '0';
    backImg.style.backfaceVisibility = 'hidden';
    backImg.style.zIndex = isFaceDown ? '2' : '1';
    cardDiv.appendChild(backImg);
    
    // Handle card back image errors
    backImg.onerror = function() {
        console.error(`Failed to load card back image`);
        backImg.src = createPlaceholderSVG('Card Back', 'card_back');
    };
    
    // Create front image element (use direct creation for more reliability)
    if (card.imageUrl) {
        const frontImg = document.createElement('img');
        frontImg.className = 'card-front';
        frontImg.style.width = '100%';
        frontImg.style.height = '100%';
        frontImg.style.objectFit = isInspector ? 'contain' : 'cover';
        frontImg.style.borderRadius = '5px';
        frontImg.style.position = 'absolute';
        frontImg.style.top = '0';
        frontImg.style.left = '0';
        frontImg.style.backfaceVisibility = 'hidden';
        frontImg.style.zIndex = isFaceDown ? '1' : '2';
        
        // Set attributes after setting up error handler to catch initial load
        frontImg.alt = card.name;
        
        // Add the front image
        cardDiv.appendChild(frontImg);
        
        // Handle image load events
        frontImg.onload = function() {
            if (placeholderDiv.parentNode === cardDiv) {
                placeholderDiv.remove();
            }
        };
        
        frontImg.onerror = function() {
            console.error(`Failed to load image: ${card.imageUrl}`);
            placeholderDiv.textContent = `Failed to load: ${card.name}`;
            placeholderDiv.style.backgroundColor = '#5a1a1a';
            
            // Try with an alternative path or use a placeholder SVG
            frontImg.src = createPlaceholderSVG(card.name, card.type);
        };
        
        // Now set the source to begin loading
        frontImg.src = card.imageUrl;
        
        // Remove placeholder after a short delay even if image is still loading
        setTimeout(() => {
            if (placeholderDiv.parentNode === cardDiv) {
                placeholderDiv.remove();
            }
        }, 2000);
    } else {
        // No image URL provided, use placeholder SVG
        const frontImg = document.createElement('img');
        frontImg.className = 'card-front';
        frontImg.alt = card.name;
        frontImg.src = createPlaceholderSVG(card.name, card.type);
        frontImg.style.width = '100%';
        frontImg.style.height = '100%';
        frontImg.style.objectFit = isInspector ? 'contain' : 'cover';
        frontImg.style.borderRadius = '5px';
        frontImg.style.position = 'absolute';
        frontImg.style.top = '0';
        frontImg.style.left = '0';
        frontImg.style.backfaceVisibility = 'hidden';
        frontImg.style.zIndex = isFaceDown ? '1' : '2';
        
        cardDiv.appendChild(frontImg);
        placeholderDiv.style.backgroundColor = '#5a1a1a';
        placeholderDiv.textContent = `No image: ${card.name}`;
        
        // Remove placeholder after a delay
        setTimeout(() => {
            if (placeholderDiv.parentNode === cardDiv) {
                placeholderDiv.remove();
            }
        }, 1000);
    }
    
    // Add interaction event listeners directly
    cardDiv.addEventListener('click', function(e) {
        e.stopPropagation();
        handleCardClick(e);
    });
    
    cardDiv.addEventListener('dblclick', function(e) {
        e.stopPropagation();
        handleCardDoubleClick(e);
    });
    
    cardDiv.addEventListener('dragstart', function(e) {
        e.stopPropagation();
        handleCardDragStart(e);
    });
    
    cardDiv.addEventListener('dragend', function(e) {
        e.stopPropagation();
        handleCardDragEnd(e);
    });
    
    return cardDiv;
}

// Handle card click
function handleCardClick(event) {
    const card = event.currentTarget;
    
    if (!card || !card.dataset || !card.dataset.cardId) {
        console.error('Invalid card element clicked:', card);
        return;
    }
    
    const cardId = card.dataset.cardId;
    
    // Remove highlight from previously highlighted card
    if (highlightedCard) {
        highlightedCard.classList.remove('highlighted');
    }
    
    // Highlight this card
    card.classList.add('highlighted');
    highlightedCard = card;
    
    // Find the card data
    let foundCard = null;
    
    // Check ALL possible card sources
    // Check character cards
    if (cardData.characterCards) {
        foundCard = cardData.characterCards.find(c => c.id === cardId);
    }
    
    // Check objective cards if not found
    if (!foundCard && cardData.objectiveCards) {
        foundCard = cardData.objectiveCards.find(c => c.id === cardId);
    }
    
    // Check main deck if not found
    if (!foundCard && mainDeck.length > 0) {
        foundCard = mainDeck.find(c => c.id === cardId);
    }
    
    // Check main discard if not found
    if (!foundCard && mainDiscard.length > 0) {
        foundCard = mainDiscard.find(c => c.id === cardId);
    }
    
    // Check all player hands if not found
    if (!foundCard) {
        for (let i = 0; i < playerHands.length; i++) {
            if (playerHands[i]) {
                foundCard = playerHands[i].find(c => c.id === cardId);
                if (foundCard) break;
            }
        }
    }
    
    // If still not found, create a card object from the HTML element
    if (!foundCard) {
        // Determine the card type from the ID
        let cardType = 'unknown';
        
        if (cardId.startsWith('monster_')) cardType = 'monster';
        else if (cardId.startsWith('spell_')) cardType = 'spell';
        else if (cardId.startsWith('item_')) cardType = 'item';
        else if (cardId.startsWith('location_')) cardType = 'location';
        else if (cardId.startsWith('npc_')) cardType = 'NPC';
        else if (cardId.startsWith('characters_')) cardType = 'character';
        else if (cardId.startsWith('objective_')) cardType = 'objective';
        
        // Get name from displayed text or from ID
        let cardName = card.getAttribute('aria-label') || 
                        card.querySelector('.card-placeholder')?.textContent || 
                        cardId.split('_').pop().replace(/([A-Z])/g, ' $1').trim();
        
        // Get image URL from the front image if available
        const frontImg = card.querySelector('.card-front');
        const imgUrl = frontImg ? frontImg.src : null;
        
        foundCard = {
            id: cardId,
            name: cardName,
            type: cardType,
            imageUrl: imgUrl
        };
    }
    
    // Update inspector if card data found
    if (foundCard) {
        updateInspector(foundCard);
    } else {
        console.error('Could not find data for card ID:', cardId);
    }
}

// Handle card double click for flipping
function handleCardDoubleClick(event) {
    const card = event.currentTarget;
    
    // If card is already being animated, ignore this click
    if (card.dataset.isFlipping === 'true') {
        return;
    }
    
    const isFaceDown = !card.classList.contains('face-down');
    
    // Mark as currently flipping to prevent double animations
    card.dataset.isFlipping = 'true';
    
    // Toggle the face-down class
    if (isFaceDown) {
        card.classList.add('face-down');
    } else {
        card.classList.remove('face-down');
    }
    
    // Apply the flip animation
    card.style.transform = isFaceDown ? 'rotateY(180deg)' : 'rotateY(0deg)';
    
    // Add transition end event handler
    const transitionEndHandler = function() {
        // Make sure the correct side is visible
        const frontImg = card.querySelector('.card-front');
        const backImg = card.querySelector('.card-back');
        
        if (frontImg && backImg) {
            // Ensure proper z-index and visibility
            if (isFaceDown) {
                frontImg.style.zIndex = '1';
                backImg.style.zIndex = '2';
            } else {
                frontImg.style.zIndex = '2';
                backImg.style.zIndex = '1';
            }
        }
        
        // Clear flipping flag when animation is complete
        card.dataset.isFlipping = 'false';
        
        // Remove the event handler
        card.removeEventListener('transitionend', transitionEndHandler);
    };
    
    // Add the transition end listener
    card.addEventListener('transitionend', transitionEndHandler);
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

// Function to deal initial cards to all players
function dealInitialCards(cardsPerPlayer) {
    console.log(`Dealing ${cardsPerPlayer} cards to each of ${playerCount} players`);
    
    for (let playerIndex = 0; playerIndex < playerCount; playerIndex++) {
        // Ensure player's hand array exists
        if (!playerHands[playerIndex]) {
            playerHands[playerIndex] = [];
        }
        
        // Deal cards to this player
        for (let i = 0; i < cardsPerPlayer; i++) {
            if (mainDeck.length > 0) {
                const card = mainDeck.shift();
                card.faceUp = true; // Make cards face up so players can see them
                playerHands[playerIndex].push(card);
                console.log(`Dealt ${card.name} to player ${playerIndex + 1}`);
            } else {
                console.warn('Deck empty, cannot deal more cards');
                break;
            }
        }
    }
    
    // Update the deck display to reflect cards being removed
    renderMainDeck();
}

// Add a game state object for tracking global game information
let gameState = {
    selectedObjective: null,
    scenesCount: 10,
    finalSceneIndex: 9
};

// Function to place the objective card in the specified grid slot
function placeObjectiveCard(objectiveCard, slotIndex) {
    if (!objectiveCard) {
        console.error('No objective card provided to place in grid');
        return;
    }
    
    // Ensure index is within bounds (0-39)
    const safeIndex = Math.min(Math.max(0, slotIndex), 39);
    
    // Get the grid slot at the specified index
    const gridSlots = document.querySelectorAll('#storyGrid .gridSlot');
    if (gridSlots.length <= safeIndex) {
        console.error(`No grid slot found at index ${safeIndex}`);
        return;
    }
    
    const targetSlot = gridSlots[safeIndex];
    
    // Clear any existing card in the slot
    while (targetSlot.firstChild) {
        targetSlot.removeChild(targetSlot.firstChild);
    }
    
    // Create the objective card element
    const cardElement = createCardElement({...objectiveCard, faceUp: true});
    
    // Style the slot to highlight it as the objective slot
    targetSlot.style.boxShadow = '0 0 10px 2px #e5a619'; // Golden glow
    targetSlot.style.borderRadius = '5px';
    
    // Add the card to the slot
    targetSlot.appendChild(cardElement);
    
    console.log(`Placed objective card "${objectiveCard.name}" in slot ${safeIndex}`);
}

// Show all cards in a popup overlay for selection
function showAllCards() {
    // Check if we already have an overlay open
    if (document.getElementById('cards-overlay')) {
        return;
    }
    
    // Create overlay container
    const overlay = document.createElement('div');
    overlay.id = 'cards-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
    overlay.style.zIndex = '1000';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.padding = '20px';
    overlay.style.boxSizing = 'border-box';
    overlay.style.overflow = 'auto';
    
    // Add a title
    const title = document.createElement('h2');
    title.textContent = 'Browse All Cards';
    title.style.color = 'white';
    title.style.marginBottom = '20px';
    title.style.fontWeight = 'bold';
    title.style.textShadow = '0 2px 4px rgba(0,0,0,0.5)';
    overlay.appendChild(title);
    
    // Create tabs container
    const tabsContainer = document.createElement('div');
    tabsContainer.style.display = 'flex';
    tabsContainer.style.marginBottom = '20px';
    tabsContainer.style.backgroundColor = '#333';
    tabsContainer.style.borderRadius = '5px';
    tabsContainer.style.overflow = 'hidden';
    
    // Define card collections
    const cardCollections = [
        { id: 'locations', name: 'Locations', cards: DECK_CARDS.location },
        { id: 'npcs', name: 'NPCs', cards: DECK_CARDS.NPC },
        { id: 'items', name: 'Items', cards: DECK_CARDS.item },
        { id: 'monsters', name: 'Monsters', cards: DECK_CARDS.monster },
        { id: 'spells', name: 'Spells', cards: DECK_CARDS.spell },
        { id: 'characters', name: 'Characters', cards: CHARACTER_CARDS },
        { id: 'objectives', name: 'Objectives', cards: OBJECTIVE_CARDS }
    ];
    
    // Create tabs with active state for the first tab
    cardCollections.forEach((collection, index) => {
        const tab = document.createElement('div');
        tab.id = `tab-${collection.id}`;
        tab.textContent = collection.name;
        tab.style.padding = '10px 20px';
        tab.style.cursor = 'pointer';
        tab.style.color = 'white';
        tab.style.borderBottom = index === 0 ? '3px solid #e5a619' : 'none';
        tab.style.backgroundColor = index === 0 ? '#444' : 'transparent';
        
        tab.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.backgroundColor = '#444';
            }
        });
        
        tab.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.backgroundColor = 'transparent';
            }
        });
        
        tab.addEventListener('click', function() {
            // Set all tabs to inactive
            const tabs = tabsContainer.querySelectorAll('div');
            tabs.forEach(t => {
                t.classList.remove('active');
                t.style.borderBottom = 'none';
                t.style.backgroundColor = 'transparent';
            });
            
            // Set this tab to active
            this.classList.add('active');
            this.style.borderBottom = '3px solid #e5a619';
            this.style.backgroundColor = '#444';
            
            // Update the cards container
            updateCardsContainer(collection.cards);
        });
        
        // Add first tab as active
        if (index === 0) {
            tab.classList.add('active');
        }
        
        tabsContainer.appendChild(tab);
    });
    
    overlay.appendChild(tabsContainer);
    
    // Create a container for the cards grid
    const cardsContainer = document.createElement('div');
    cardsContainer.id = 'cards-grid-container';
    cardsContainer.style.display = 'grid';
    cardsContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
    cardsContainer.style.gap = '20px';
    cardsContainer.style.width = '90%';
    cardsContainer.style.maxWidth = '1200px';
    cardsContainer.style.padding = '20px';
    cardsContainer.style.boxSizing = 'border-box';
    cardsContainer.style.overflowY = 'auto';
    cardsContainer.style.maxHeight = '80vh';
    cardsContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    cardsContainer.style.borderRadius = '10px';
    
    // Function to update cards in the container
    function updateCardsContainer(cards) {
        // Clear current cards
        cardsContainer.innerHTML = '';
        
        // Add cards to the grid
        cards.forEach(card => {
            // Create card container
            const cardContainer = document.createElement('div');
            cardContainer.style.display = 'flex';
            cardContainer.style.flexDirection = 'column';
            cardContainer.style.alignItems = 'center';
            cardContainer.style.cursor = 'pointer';
            cardContainer.style.transition = 'transform 0.2s';
            cardContainer.style.backgroundColor = '#2a2a2a';
            cardContainer.style.padding = '10px';
            cardContainer.style.borderRadius = '10px';
            cardContainer.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
            
            // Add hover effect
            cardContainer.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            
            cardContainer.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
            
            // Add click handler to place the card in the next empty slot
            cardContainer.addEventListener('click', function() {
                // Close the overlay
                overlay.remove();
                
                // Place the card in the next empty slot in the story grid
                placeCardInNextEmptySlot(card);
            });
            
            // Create and add the card image
            const cardImage = document.createElement('img');
            cardImage.src = card.imageUrl;
            cardImage.alt = card.name;
            cardImage.style.width = '100%';
            cardImage.style.height = 'auto';
            cardImage.style.borderRadius = '5px';
            cardImage.style.marginBottom = '10px';
            cardImage.style.objectFit = 'contain';
            cardContainer.appendChild(cardImage);
            
            // Create and add the card name
            const cardName = document.createElement('div');
            cardName.textContent = card.name;
            cardName.style.color = 'white';
            cardName.style.fontSize = '14px';
            cardName.style.fontWeight = 'bold';
            cardName.style.textAlign = 'center';
            cardName.style.marginTop = '5px';
            cardContainer.appendChild(cardName);
            
            // Add the card container to the grid
            cardsContainer.appendChild(cardContainer);
        });
    }
    
    // Initially populate with the first collection (Objectives)
    updateCardsContainer(cardCollections[0].cards);
    
    // Add the cards container to the overlay
    overlay.appendChild(cardsContainer);
    
    // Add a close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.marginTop = '20px';
    closeButton.style.padding = '10px 20px';
    closeButton.style.backgroundColor = '#3a3a3a';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '5px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontWeight = 'bold';
    closeButton.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
    
    closeButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#4a4a4a';
    });
    
    closeButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#3a3a3a';
    });
    
    closeButton.addEventListener('click', function() {
        overlay.remove();
    });
    
    overlay.appendChild(closeButton);
    
    // Close overlay when clicking outside the cards (directly on the overlay)
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
    
    // Add the overlay to the document
    document.body.appendChild(overlay);
    
    // Add a small delay before adding escape key handler to prevent immediate closing
    setTimeout(() => {
        // Close overlay when pressing escape
        function handleEscKey(e) {
            if (e.key === 'Escape') {
                overlay.remove();
                document.removeEventListener('keydown', handleEscKey);
            }
        }
        
        document.addEventListener('keydown', handleEscKey);
    }, 100);
}

// Function to place a card in the next empty slot in the story grid
function placeCardInNextEmptySlot(card) {
    // Get all grid slots
    const gridSlots = document.querySelectorAll('#storyGrid .gridSlot');
    if (!gridSlots.length) {
        console.error('No grid slots found');
        return;
    }
    
    // Get the final scene index (either the Objective card or the end of story grid)
    const finalSceneIndex = gameState.finalSceneIndex || gridSlots.length - 1;
    
    // Find the first empty slot between the first slot (index 0) and the final scene
    let emptySlotIndex = -1;
    for (let i = 0; i < finalSceneIndex; i++) {
        // If the slot is empty (has no children or only has empty children)
        if (!gridSlots[i].querySelector('.card')) {
            emptySlotIndex = i;
            break;
        }
    }
    
    // If no empty slot was found, use the last slot before the final scene
    if (emptySlotIndex === -1) {
        emptySlotIndex = finalSceneIndex - 1;
    }
    
    // Clear any existing content in the slot
    const targetSlot = gridSlots[emptySlotIndex];
    while (targetSlot.firstChild) {
        targetSlot.removeChild(targetSlot.firstChild);
    }
    
    // Create the card element (face up)
    const cardElement = createCardElement({...card, faceUp: true});
    
    // Add the card to the slot
    targetSlot.appendChild(cardElement);
    
    // Show notification
    showNotification(`Placed "${card.name}" in the story grid`, 'success');
    
    // Also show the card in the inspector
    updateInspector(card);
}

// Show all objective cards in a popup overlay
function showAllObjectives() {
    // Check if we already have an overlay open
    if (document.getElementById('objectives-overlay')) {
        return;
    }
    
    // Create overlay container
    const overlay = document.createElement('div');
    overlay.id = 'objectives-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
    overlay.style.zIndex = '1000';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.padding = '20px';
    overlay.style.boxSizing = 'border-box';
    overlay.style.overflow = 'auto';
    
    // Add a title
    const title = document.createElement('h2');
    title.textContent = 'All Objective Cards';
    title.style.color = 'white';
    title.style.marginBottom = '20px';
    title.style.fontWeight = 'bold';
    title.style.textShadow = '0 2px 4px rgba(0,0,0,0.5)';
    overlay.appendChild(title);
    
    // Create a container for the cards grid
    const cardsContainer = document.createElement('div');
    cardsContainer.style.display = 'grid';
    cardsContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
    cardsContainer.style.gap = '20px';
    cardsContainer.style.width = '90%';
    cardsContainer.style.maxWidth = '1200px';
    cardsContainer.style.padding = '20px';
    cardsContainer.style.boxSizing = 'border-box';
    cardsContainer.style.overflowY = 'auto';
    cardsContainer.style.maxHeight = '80vh';
    
    // Add objective cards to the grid
    OBJECTIVE_CARDS.forEach(card => {
        // Create card container
        const cardContainer = document.createElement('div');
        cardContainer.style.display = 'flex';
        cardContainer.style.flexDirection = 'column';
        cardContainer.style.alignItems = 'center';
        cardContainer.style.cursor = 'pointer';
        cardContainer.style.transition = 'transform 0.2s';
        cardContainer.style.backgroundColor = '#2a2a2a';
        cardContainer.style.padding = '10px';
        cardContainer.style.borderRadius = '10px';
        cardContainer.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
        
        // Add hover effect
        cardContainer.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        cardContainer.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Add click handler to show in inspector
        cardContainer.addEventListener('click', function() {
            // Close the overlay
            overlay.remove();
            
            // Show the card in the inspector
            updateInspector(card);
        });
        
        // Create and add the card image
        const cardImage = document.createElement('img');
        cardImage.src = card.imageUrl;
        cardImage.alt = card.name;
        cardImage.style.width = '100%';
        cardImage.style.height = 'auto';
        cardImage.style.borderRadius = '5px';
        cardImage.style.marginBottom = '10px';
        cardImage.style.objectFit = 'contain';
        cardContainer.appendChild(cardImage);
        
        // Create and add the card name
        const cardName = document.createElement('div');
        cardName.textContent = card.name;
        cardName.style.color = 'white';
        cardName.style.fontSize = '14px';
        cardName.style.fontWeight = 'bold';
        cardName.style.textAlign = 'center';
        cardName.style.marginTop = '5px';
        cardContainer.appendChild(cardName);
        
        // Add the card container to the grid
        cardsContainer.appendChild(cardContainer);
    });
    
    // Add the cards container to the overlay
    overlay.appendChild(cardsContainer);
    
    // Add a close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.marginTop = '20px';
    closeButton.style.padding = '10px 20px';
    closeButton.style.backgroundColor = '#3a3a3a';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '5px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontWeight = 'bold';
    closeButton.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
    
    closeButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#4a4a4a';
    });
    
    closeButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#3a3a3a';
    });
    
    closeButton.addEventListener('click', function() {
        overlay.remove();
    });
    
    overlay.appendChild(closeButton);
    
    // Close overlay when clicking outside the cards (directly on the overlay)
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
    
    // Add the overlay to the document
    document.body.appendChild(overlay);
    
    // Add a small delay before adding escape key handler to prevent immediate closing
    setTimeout(() => {
        // Close overlay when pressing escape
        function handleEscKey(e) {
            if (e.key === 'Escape') {
                overlay.remove();
                document.removeEventListener('keydown', handleEscKey);
            }
        }
        
        document.addEventListener('keydown', handleEscKey);
    }, 100);
}

// Show settings menu with card browser options
function showSettingsMenu() {
    // Check if menu already exists
    if (document.getElementById('settings-menu')) {
        return;
    }
    
    // Create settings menu container
    const settingsMenu = document.createElement('div');
    settingsMenu.id = 'settings-menu';
    settingsMenu.style.position = 'absolute';
    settingsMenu.style.top = '24px';
    settingsMenu.style.right = '214px';
    settingsMenu.style.width = '250px';
    settingsMenu.style.backgroundColor = '#2a2a2a';
    settingsMenu.style.border = '1px solid #555';
    settingsMenu.style.borderRadius = '5px';
    settingsMenu.style.padding = '15px';
    settingsMenu.style.zIndex = '100';
    settingsMenu.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
    
    // Create title
    const title = document.createElement('h3');
    title.textContent = 'Card Library';
    title.style.color = 'white';
    title.style.margin = '0 0 15px 0';
    title.style.borderBottom = '1px solid #555';
    title.style.paddingBottom = '8px';
    settingsMenu.appendChild(title);
    
    // Create options
    const options = [
        { id: 'view-objectives', name: 'View Objective Cards', handler: showAllObjectives },
        { id: 'view-characters', name: 'View Character Cards', handler: () => showCardCollection(CHARACTER_CARDS, 'Character') },
        { id: 'view-monsters', name: 'View Monster Cards', handler: () => showCardCollection(DECK_CARDS.monster, 'Monster') },
        { id: 'view-spells', name: 'View Spell Cards', handler: () => showCardCollection(DECK_CARDS.spell, 'Spell') },
        { id: 'view-items', name: 'View Item Cards', handler: () => showCardCollection(DECK_CARDS.item, 'Item') },
        { id: 'view-locations', name: 'View Location Cards', handler: () => showCardCollection(DECK_CARDS.location, 'Location') },
        { id: 'view-npcs', name: 'View NPC Cards', handler: () => showCardCollection(DECK_CARDS.NPC, 'NPC') }
    ];
    
    // Create option buttons
    options.forEach(option => {
        const button = document.createElement('button');
        button.id = option.id;
        button.textContent = option.name;
        button.style.display = 'block';
        button.style.width = '100%';
        button.style.padding = '8px 12px';
        button.style.margin = '5px 0';
        button.style.backgroundColor = '#3a3a3a';
        button.style.border = 'none';
        button.style.borderRadius = '3px';
        button.style.color = 'white';
        button.style.cursor = 'pointer';
        button.style.textAlign = 'left';
        button.style.transition = 'background-color 0.2s';
        
        // Add hover effect
        button.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#4a4a4a';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#3a3a3a';
        });
        
        // Add click handler
        button.addEventListener('click', function() {
            settingsMenu.remove();
            option.handler();
        });
        
        settingsMenu.appendChild(button);
    });
    
    // Add close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.display = 'block';
    closeButton.style.width = '100%';
    closeButton.style.padding = '8px 12px';
    closeButton.style.marginTop = '15px';
    closeButton.style.backgroundColor = '#555';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '3px';
    closeButton.style.color = 'white';
    closeButton.style.cursor = 'pointer';
    closeButton.style.textAlign = 'center';
    closeButton.style.fontWeight = 'bold';
    
    closeButton.addEventListener('click', function() {
        settingsMenu.remove();
    });
    
    settingsMenu.appendChild(closeButton);
    
    // Add click-outside-to-close behavior
    document.addEventListener('click', function closeMenu(e) {
        if (e.target !== settingsMenu && !settingsMenu.contains(e.target) && e.target.id !== 'settingsIcon') {
            settingsMenu.remove();
            document.removeEventListener('click', closeMenu);
        }
    });
    
    // Add to the game board
    document.getElementById('gameBoard').appendChild(settingsMenu);
}

// Show a collection of cards in a grid view
function showCardCollection(cards, collectionTitle) {
    // Check if we already have an overlay open
    if (document.getElementById('cards-overlay')) {
        return;
    }
    
    // Create overlay container
    const overlay = document.createElement('div');
    overlay.id = 'cards-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
    overlay.style.zIndex = '1000';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.padding = '20px';
    overlay.style.boxSizing = 'border-box';
    overlay.style.overflow = 'auto';
    
    // Add a title
    const title = document.createElement('h2');
    title.textContent = `All ${collectionTitle} Cards (${cards.length})`;
    title.style.color = 'white';
    title.style.marginBottom = '20px';
    title.style.fontWeight = 'bold';
    title.style.textShadow = '0 2px 4px rgba(0,0,0,0.5)';
    overlay.appendChild(title);
    
    // Create a container for the cards grid
    const cardsContainer = document.createElement('div');
    cardsContainer.style.display = 'grid';
    cardsContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
    cardsContainer.style.gap = '20px';
    cardsContainer.style.width = '90%';
    cardsContainer.style.maxWidth = '1200px';
    cardsContainer.style.padding = '20px';
    cardsContainer.style.boxSizing = 'border-box';
    cardsContainer.style.overflowY = 'auto';
    cardsContainer.style.maxHeight = '80vh';
    
    // Add cards to the grid
    cards.forEach(card => {
        // Create card container
        const cardContainer = document.createElement('div');
        cardContainer.style.display = 'flex';
        cardContainer.style.flexDirection = 'column';
        cardContainer.style.alignItems = 'center';
        cardContainer.style.cursor = 'pointer';
        cardContainer.style.transition = 'transform 0.2s';
        cardContainer.style.backgroundColor = '#2a2a2a';
        cardContainer.style.padding = '10px';
        cardContainer.style.borderRadius = '10px';
        cardContainer.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
        
        // Add hover effect
        cardContainer.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        cardContainer.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Add click handler to show in inspector
        cardContainer.addEventListener('click', function() {
            // Close the overlay
            overlay.remove();
            
            // Show the card in the inspector
            updateInspector(card);
        });
        
        // Create and add the card image
        const cardImage = document.createElement('img');
        cardImage.src = card.imageUrl;
        cardImage.alt = card.name;
        cardImage.style.width = '100%';
        cardImage.style.height = 'auto';
        cardImage.style.borderRadius = '5px';
        cardImage.style.marginBottom = '10px';
        cardImage.style.objectFit = 'contain';
        cardContainer.appendChild(cardImage);
        
        // Create and add the card name
        const cardName = document.createElement('div');
        cardName.textContent = card.name;
        cardName.style.color = 'white';
        cardName.style.fontSize = '14px';
        cardName.style.fontWeight = 'bold';
        cardName.style.textAlign = 'center';
        cardName.style.marginTop = '5px';
        cardContainer.appendChild(cardName);
        
        // Add the card container to the grid
        cardsContainer.appendChild(cardContainer);
    });
    
    // Add the cards container to the overlay
    overlay.appendChild(cardsContainer);
    
    // Add a close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.marginTop = '20px';
    closeButton.style.padding = '10px 20px';
    closeButton.style.backgroundColor = '#3a3a3a';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '5px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontWeight = 'bold';
    closeButton.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
    
    closeButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#4a4a4a';
    });
    
    closeButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#3a3a3a';
    });
    
    closeButton.addEventListener('click', function() {
        overlay.remove();
    });
    
    overlay.appendChild(closeButton);
    
    // Close overlay when clicking outside the cards (directly on the overlay)
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
    
    // Add the overlay to the document
    document.body.appendChild(overlay);
    
    // Add a small delay before adding escape key handler to prevent immediate closing
    setTimeout(() => {
        // Close overlay when pressing escape
        function handleEscKey(e) {
            if (e.key === 'Escape') {
                overlay.remove();
                document.removeEventListener('keydown', handleEscKey);
            }
        }
        
        document.addEventListener('keydown', handleEscKey);
    }, 100);
}

// Select a random objective card and display it in the inspector
function selectRandomObjective() {
    // Make sure we have objective cards to choose from
    if (!OBJECTIVE_CARDS || OBJECTIVE_CARDS.length === 0) {
        console.error('No objective cards available');
        return;
    }
    
    // Select a random objective card
    const randomIndex = Math.floor(Math.random() * OBJECTIVE_CARDS.length);
    const randomObjectiveCard = OBJECTIVE_CARDS[randomIndex];
    
    // Display the card in the inspector
    updateInspector(randomObjectiveCard);
    
    // If a game is in progress, add a "Use" button to replace the current objective
    if (gameStarted) {
        // Find the inspector
        const inspector = document.getElementById('inspector');
        if (!inspector) return;
        
        // Create "Use" button container for proper positioning
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'use-objective-container';
        buttonContainer.style.position = 'absolute';
        buttonContainer.style.bottom = '15px';
        buttonContainer.style.left = '0';
        buttonContainer.style.width = '100%';
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'center';
        buttonContainer.style.zIndex = '10';
        
        // Create the Use button
        const useButton = document.createElement('button');
        useButton.textContent = 'Use This Objective';
        useButton.className = 'use-objective-btn';
        useButton.style.padding = '8px 16px';
        useButton.style.backgroundColor = '#2a6';
        useButton.style.color = 'white';
        useButton.style.border = 'none';
        useButton.style.borderRadius = '5px';
        useButton.style.cursor = 'pointer';
        useButton.style.fontWeight = 'bold';
        useButton.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
        
        // Add hover effects
        useButton.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#3b7';
        });
        
        useButton.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#2a6';
        });
        
        // Add click handler to replace the current objective
        useButton.addEventListener('click', function() {
            // Replace the current objective with the new one
            replaceCurrentObjective(randomObjectiveCard);
            
            // Remove the Use button after clicking
            buttonContainer.remove();
        });
        
        // Add button to container and container to inspector
        buttonContainer.appendChild(useButton);
        inspector.appendChild(buttonContainer);
    }
}

// Replace the current objective card in the game grid with a new objective card
function replaceCurrentObjective(newObjectiveCard) {
    if (!gameStarted || !gameState.finalSceneIndex) {
        console.error('Game not started or final scene index not set');
        return;
    }
    
    // Find the current objective card in the grid (at the final scene index)
    const gridSlots = document.querySelectorAll('#storyGrid .gridSlot');
    if (gridSlots.length <= gameState.finalSceneIndex) {
        console.error(`No grid slot found at index ${gameState.finalSceneIndex}`);
        return;
    }
    
    const targetSlot = gridSlots[gameState.finalSceneIndex];
    
    // Clear the current objective from the slot
    while (targetSlot.firstChild) {
        targetSlot.removeChild(targetSlot.firstChild);
    }
    
    // Create the new objective card element
    const cardElement = createCardElement({...newObjectiveCard, faceUp: true});
    
    // Add the new card to the slot
    targetSlot.appendChild(cardElement);
    
    // Update the game state to track the new objective
    gameState.selectedObjective = newObjectiveCard;
    
    // Show confirmation message
    const confirmationMessage = document.createElement('div');
    confirmationMessage.textContent = `Objective replaced with: ${newObjectiveCard.name}`;
    confirmationMessage.style.position = 'fixed';
    confirmationMessage.style.top = '20px';
    confirmationMessage.style.left = '50%';
    confirmationMessage.style.transform = 'translateX(-50%)';
    confirmationMessage.style.padding = '10px 20px';
    confirmationMessage.style.backgroundColor = 'rgba(42, 102, 85, 0.9)';
    confirmationMessage.style.color = 'white';
    confirmationMessage.style.borderRadius = '5px';
    confirmationMessage.style.zIndex = '1000';
    confirmationMessage.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
    
    // Add to the document and remove after a delay
    document.body.appendChild(confirmationMessage);
    setTimeout(() => {
        confirmationMessage.style.opacity = '0';
        confirmationMessage.style.transition = 'opacity 0.5s';
        setTimeout(() => confirmationMessage.remove(), 500);
    }, 3000);
}

// Show the save game dialog
function showSaveGameDialog() {
    // Check if a game is in progress
    if (!gameStarted) {
        alert('No game in progress to save.');
        return;
    }
    
    // Create overlay container
    const overlay = document.createElement('div');
    overlay.id = 'save-game-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
    overlay.style.zIndex = '1000';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    
    // Create dialog content
    const dialog = document.createElement('div');
    dialog.className = 'save-game-dialog';
    dialog.style.width = '500px';
    dialog.style.backgroundColor = '#2a2a2a';
    dialog.style.borderRadius = '10px';
    dialog.style.padding = '20px';
    dialog.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    
    // Add title
    const title = document.createElement('h2');
    title.textContent = 'Save Game';
    title.style.color = 'white';
    title.style.marginTop = '0';
    title.style.marginBottom = '20px';
    title.style.textAlign = 'center';
    dialog.appendChild(title);
    
    // Add save name input
    const saveNameContainer = document.createElement('div');
    saveNameContainer.style.marginBottom = '20px';
    
    const saveNameLabel = document.createElement('label');
    saveNameLabel.textContent = 'Save Name:';
    saveNameLabel.style.display = 'block';
    saveNameLabel.style.color = 'white';
    saveNameLabel.style.marginBottom = '5px';
    saveNameContainer.appendChild(saveNameLabel);
    
    const saveNameInput = document.createElement('input');
    saveNameInput.type = 'text';
    saveNameInput.id = 'save-name-input';
    saveNameInput.placeholder = 'Enter a name for your save';
    saveNameInput.value = `Soul Sworn Game - ${new Date().toLocaleString()}`;
    saveNameInput.style.width = '100%';
    saveNameInput.style.padding = '10px';
    saveNameInput.style.backgroundColor = '#3a3a3a';
    saveNameInput.style.border = 'none';
    saveNameInput.style.borderRadius = '5px';
    saveNameInput.style.color = 'white';
    saveNameInput.style.boxSizing = 'border-box';
    saveNameContainer.appendChild(saveNameInput);
    
    dialog.appendChild(saveNameContainer);
    
    // Add save options
    const saveOptionsContainer = document.createElement('div');
    saveOptionsContainer.style.marginBottom = '20px';
    
    // Create save buttons container
    const saveButtonsContainer = document.createElement('div');
    saveButtonsContainer.style.display = 'flex';
    saveButtonsContainer.style.justifyContent = 'space-between';
    saveButtonsContainer.style.gap = '10px';
    saveButtonsContainer.style.marginBottom = '20px';
    
    // Create localStorage save button
    const saveToLocalButton = document.createElement('button');
    saveToLocalButton.textContent = 'Save to Browser';
    saveToLocalButton.style.flex = '1';
    saveToLocalButton.style.padding = '12px';
    saveToLocalButton.style.backgroundColor = '#4CAF50';
    saveToLocalButton.style.color = 'white';
    saveToLocalButton.style.border = 'none';
    saveToLocalButton.style.borderRadius = '5px';
    saveToLocalButton.style.cursor = 'pointer';
    saveToLocalButton.style.fontWeight = 'bold';
    
    saveToLocalButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#45a049';
    });
    
    saveToLocalButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#4CAF50';
    });
    
    saveToLocalButton.addEventListener('click', function() {
        const saveName = document.getElementById('save-name-input').value.trim();
        if (!saveName) {
            alert('Please enter a name for your save.');
            return;
        }
        
        saveGame(saveName, 'localStorage');
        overlay.remove();
    });
    
    saveButtonsContainer.appendChild(saveToLocalButton);
    
    // Create JSON export button
    const exportJsonButton = document.createElement('button');
    exportJsonButton.textContent = 'Export as JSON';
    exportJsonButton.style.flex = '1';
    exportJsonButton.style.padding = '12px';
    exportJsonButton.style.backgroundColor = '#2196F3';
    exportJsonButton.style.color = 'white';
    exportJsonButton.style.border = 'none';
    exportJsonButton.style.borderRadius = '5px';
    exportJsonButton.style.cursor = 'pointer';
    exportJsonButton.style.fontWeight = 'bold';
    
    exportJsonButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#0b7dda';
    });
    
    exportJsonButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#2196F3';
    });
    
    exportJsonButton.addEventListener('click', function() {
        const saveName = document.getElementById('save-name-input').value.trim();
        if (!saveName) {
            alert('Please enter a name for your save.');
            return;
        }
        
        saveGame(saveName, 'json');
        overlay.remove();
    });
    
    saveButtonsContainer.appendChild(exportJsonButton);
    
    dialog.appendChild(saveButtonsContainer);
    
    // Add close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Cancel';
    closeButton.style.width = '100%';
    closeButton.style.padding = '12px';
    closeButton.style.backgroundColor = '#888';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '5px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontWeight = 'bold';
    
    closeButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#777';
    });
    
    closeButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#888';
    });
    
    closeButton.addEventListener('click', function() {
        overlay.remove();
    });
    
    dialog.appendChild(closeButton);
    
    // Add dialog to overlay
    overlay.appendChild(dialog);
    
    // Add overlay to document
    document.body.appendChild(overlay);
    
    // Focus the save name input
    setTimeout(() => saveNameInput.focus(), 100);
    
    // Add escape key handler
    function handleEscKey(e) {
        if (e.key === 'Escape') {
            overlay.remove();
            document.removeEventListener('keydown', handleEscKey);
        }
    }
    
    document.addEventListener('keydown', handleEscKey);
    
    // Close when clicking outside the dialog
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
}

// Show a notification toast
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.padding = '12px 20px';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    notification.style.zIndex = '1000';
    notification.style.fontWeight = 'bold';
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s ease-in-out';
    
    // Set colors based on notification type
    if (type === 'success') {
        notification.style.backgroundColor = '#4CAF50';
        notification.style.color = 'white';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#f44336';
        notification.style.color = 'white';
    } else if (type === 'warning') {
        notification.style.backgroundColor = '#ff9800';
        notification.style.color = 'white';
    } else {
        notification.style.backgroundColor = '#2196F3';
        notification.style.color = 'white';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Fade in
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Save the current game state
function saveGame(saveName, saveType) {
    // Save notes content
    const notesEditor = document.getElementById('notesEditor');
    const notesContent = notesEditor ? notesEditor.innerHTML : '';
    
    try {
        // Create a game state object with all relevant data
        const gameStateData = {
            version: 1, // For potential future compatibility
            timestamp: Date.now(),
            saveName: saveName,
            playerCount: playerCount,
            notesContent: notesContent, // Save notes content
            playerCharacters: playerCharacters.map(char => ({
                id: char.id,
                name: char.name,
                type: char.type,
                imageUrl: char.imageUrl
            })),
            playerHands: playerHands.map(hand => 
                hand.map(card => ({
                    id: card.id,
                    name: card.name,
                    type: card.type,
                    imageUrl: card.imageUrl,
                    faceUp: card.faceUp
                }))
            ),
            // Save the state of the story grid
            storyGrid: Array.from(document.querySelectorAll('#storyGrid .gridSlot')).map(slot => {
                const cardElement = slot.querySelector('.card');
                if (cardElement && cardElement.dataset.cardId) {
                    return {
                        index: parseInt(slot.dataset.index),
                        cardId: cardElement.dataset.cardId,
                        // Try to find the full card data
                        card: findCardById(cardElement.dataset.cardId)
                    };
                }
                return {
                    index: parseInt(slot.dataset.index),
                    cardId: null,
                    card: null
                };
            }),
            // Save the state of the mutable column
            mutableColumn: Array.from(document.querySelectorAll('#mutableColumn .mutableSlot')).map(slot => {
                const cardElement = slot.querySelector('.card');
                if (cardElement && cardElement.dataset.cardId) {
                    return {
                        index: parseInt(slot.dataset.index),
                        cardId: cardElement.dataset.cardId,
                        card: findCardById(cardElement.dataset.cardId)
                    };
                }
                return {
                    index: parseInt(slot.dataset.index),
                    cardId: null,
                    card: null
                };
            }),
            // Save main deck and discard pile
            mainDeck: mainDeck.map(card => ({
                id: card.id,
                name: card.name,
                type: card.type,
                imageUrl: card.imageUrl,
                faceUp: card.faceUp
            })),
            mainDiscard: mainDiscard.map(card => ({
                id: card.id,
                name: card.name,
                type: card.type,
                imageUrl: card.imageUrl,
                faceUp: card.faceUp
            })),
            // Save alt deck and discard pile
            altDeck: altDeck.map(card => ({
                id: card.id,
                name: card.name,
                type: card.type,
                imageUrl: card.imageUrl,
                faceUp: card.faceUp
            })),
            altDiscard: altDiscard.map(card => ({
                id: card.id,
                name: card.name,
                type: card.type,
                imageUrl: card.imageUrl,
                faceUp: card.faceUp
            })),
            // Save game settings and state
            gameState: {
                scenesCount: gameState.scenesCount,
                finalSceneIndex: gameState.finalSceneIndex,
                altDeckTypes: gameState.altDeckTypes,
                selectedObjective: gameState.selectedObjective ? {
                    id: gameState.selectedObjective.id,
                    name: gameState.selectedObjective.name,
                    type: gameState.selectedObjective.type,
                    imageUrl: gameState.selectedObjective.imageUrl
                } : null
            }
        };
        
        // Serialize the game state to JSON
        const gameStateJson = JSON.stringify(gameStateData);
        
        if (saveType === 'localStorage') {
            // Save to localStorage
            try {
                // Get existing saves
                let savedGames = JSON.parse(localStorage.getItem('soulSwornSavedGames') || '{}');
                
                // Add the new save
                savedGames[saveName] = gameStateJson;
                
                // Save back to localStorage
                localStorage.setItem('soulSwornSavedGames', JSON.stringify(savedGames));
                
                // Show success message
                showNotification('Game saved successfully!', 'success');
            } catch (err) {
                console.error('Error saving to localStorage:', err);
                alert('Failed to save game to browser storage. The save data might be too large or your browser storage might be full.');
            }
        } else if (saveType === 'json') {
            // Create JSON export for clipboard or file
            const textArea = document.createElement('textarea');
            textArea.value = gameStateJson;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                // Copy to clipboard
                const successful = document.execCommand('copy');
                
                if (successful) {
                    showNotification('Game data copied to clipboard!', 'success');
                } else {
                    // If copy fails, show the JSON in a dialog box
                    alert('Failed to copy to clipboard. Please copy the following JSON manually:\n\n' + gameStateJson);
                }
            } catch (err) {
                console.error('Error copying to clipboard:', err);
                alert('Failed to copy to clipboard. Please manually save the following JSON:\n\n' + gameStateJson);
            }
            
            document.body.removeChild(textArea);
        }
    } catch (err) {
        console.error('Error saving game:', err);
        alert('Failed to save game: ' + err.message);
    }
}

// Find a card by its ID in all available card collections
function findCardById(cardId) {
    if (!cardId) return null;
    
    // Check character cards
    const character = CHARACTER_CARDS.find(c => c.id === cardId);
    if (character) return character;
    
    // Check objective cards
    const objective = OBJECTIVE_CARDS.find(c => c.id === cardId);
    if (objective) return objective;
    
    // Check deck cards
    for (const type in DECK_CARDS) {
        const card = DECK_CARDS[type].find(c => c.id === cardId);
        if (card) return card;
    }
    
    // Check main deck
    const mainDeckCard = mainDeck.find(c => c.id === cardId);
    if (mainDeckCard) return mainDeckCard;
    
    // Check main discard
    const mainDiscardCard = mainDiscard.find(c => c.id === cardId);
    if (mainDiscardCard) return mainDiscardCard;
    
    // Check alt deck
    const altDeckCard = altDeck.find(c => c.id === cardId);
    if (altDeckCard) return altDeckCard;
    
    // Check alt discard
    const altDiscardCard = altDiscard.find(c => c.id === cardId);
    if (altDiscardCard) return altDiscardCard;
    
    // Create a minimal card object from the ID if we can infer the type
    if (cardId.startsWith('monster_')) {
        return { id: cardId, type: 'monster', name: cardId.replace('monster_', '').replace(/([A-Z])/g, ' $1').trim() };
    } else if (cardId.startsWith('spell_')) {
        return { id: cardId, type: 'spell', name: cardId.replace('spell_', '').replace(/([A-Z])/g, ' $1').trim() };
    } else if (cardId.startsWith('item_')) {
        return { id: cardId, type: 'item', name: cardId.replace('item_', '').replace(/([A-Z])/g, ' $1').trim() };
    } else if (cardId.startsWith('location_')) {
        return { id: cardId, type: 'location', name: cardId.replace('location_', '').replace(/([A-Z])/g, ' $1').trim() };
    } else if (cardId.startsWith('npc_')) {
        return { id: cardId, type: 'NPC', name: cardId.replace('npc_', '').replace(/([A-Z])/g, ' $1').trim() };
    } else if (cardId.startsWith('characters_')) {
        return { id: cardId, type: 'character', name: cardId.replace('characters_', '').replace(/([A-Z])/g, ' $1').trim() };
    } else if (cardId.startsWith('objective_')) {
        return { id: cardId, type: 'objective', name: cardId.replace('objective_', '').replace(/([A-Z])/g, ' $1').trim() };
    }
    
    // Last resort - return minimal info
    return { id: cardId, name: 'Unknown Card', type: 'unknown' };
}

// Show the load game dialog
function showLoadGameDialog() {
    // Create overlay container
    const overlay = document.createElement('div');
    overlay.id = 'load-game-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
    overlay.style.zIndex = '1000';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    
    // Create dialog content
    const dialog = document.createElement('div');
    dialog.className = 'load-game-dialog';
    dialog.style.width = '500px';
    dialog.style.backgroundColor = '#2a2a2a';
    dialog.style.borderRadius = '10px';
    dialog.style.padding = '20px';
    dialog.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    
    // Add title
    const title = document.createElement('h2');
    title.textContent = 'Load Game';
    title.style.color = 'white';
    title.style.marginTop = '0';
    title.style.marginBottom = '20px';
    title.style.textAlign = 'center';
    dialog.appendChild(title);
    
    // Create tabs for different loading methods
    const tabsContainer = document.createElement('div');
    tabsContainer.style.display = 'flex';
    tabsContainer.style.borderBottom = '1px solid #444';
    tabsContainer.style.marginBottom = '20px';
    
    const browserTab = document.createElement('div');
    browserTab.textContent = 'Browser Saves';
    browserTab.className = 'load-tab active';
    browserTab.style.padding = '10px 15px';
    browserTab.style.cursor = 'pointer';
    browserTab.style.borderBottom = '2px solid #4CAF50';
    browserTab.style.color = 'white';
    browserTab.style.fontWeight = 'bold';
    
    const jsonTab = document.createElement('div');
    jsonTab.textContent = 'Paste JSON';
    jsonTab.className = 'load-tab';
    jsonTab.style.padding = '10px 15px';
    jsonTab.style.cursor = 'pointer';
    jsonTab.style.color = '#999';
    
    tabsContainer.appendChild(browserTab);
    tabsContainer.appendChild(jsonTab);
    dialog.appendChild(tabsContainer);
    
    // Create content containers for each tab
    const browserContent = document.createElement('div');
    browserContent.className = 'tab-content';
    browserContent.id = 'browser-tab-content';
    browserContent.style.display = 'block';
    
    const jsonContent = document.createElement('div');
    jsonContent.className = 'tab-content';
    jsonContent.id = 'json-tab-content';
    jsonContent.style.display = 'none';
    
    // Setup tab switching
    browserTab.addEventListener('click', function() {
        browserTab.style.borderBottom = '2px solid #4CAF50';
        browserTab.style.color = 'white';
        jsonTab.style.borderBottom = 'none';
        jsonTab.style.color = '#999';
        browserContent.style.display = 'block';
        jsonContent.style.display = 'none';
    });
    
    jsonTab.addEventListener('click', function() {
        jsonTab.style.borderBottom = '2px solid #2196F3';
        jsonTab.style.color = 'white';
        browserTab.style.borderBottom = 'none';
        browserTab.style.color = '#999';
        jsonContent.style.display = 'block';
        browserContent.style.display = 'none';
    });
    
    // Load browser saved games
    try {
        const savedGames = JSON.parse(localStorage.getItem('soulSwornSavedGames') || '{}');
        const savedGamesList = document.createElement('div');
        savedGamesList.className = 'saved-games-list';
        savedGamesList.style.maxHeight = '300px';
        savedGamesList.style.overflowY = 'auto';
        
        // Create a message if no saved games
        if (Object.keys(savedGames).length === 0) {
            const noSavesMsg = document.createElement('div');
            noSavesMsg.textContent = 'No saved games found in browser storage.';
            noSavesMsg.style.color = '#999';
            noSavesMsg.style.textAlign = 'center';
            noSavesMsg.style.padding = '20px';
            savedGamesList.appendChild(noSavesMsg);
        } else {
            // Add each saved game
            Object.entries(savedGames).forEach(([name, gameData]) => {
                // Parse the save to get timestamp
                let saveInfo = { saveName: name };
                try {
                    const parsedData = JSON.parse(gameData);
                    saveInfo.timestamp = parsedData.timestamp;
                    saveInfo.playerCount = parsedData.playerCount;
                } catch (err) {
                    saveInfo.timestamp = Date.now();
                }
                
                // Create save item
                const saveItem = document.createElement('div');
                saveItem.className = 'save-item';
                saveItem.style.display = 'flex';
                saveItem.style.justifyContent = 'space-between';
                saveItem.style.alignItems = 'center';
                saveItem.style.padding = '10px';
                saveItem.style.margin = '5px 0';
                saveItem.style.backgroundColor = '#3a3a3a';
                saveItem.style.borderRadius = '5px';
                saveItem.style.cursor = 'pointer';
                
                // Add hover effect
                saveItem.addEventListener('mouseenter', function() {
                    this.style.backgroundColor = '#4a4a4a';
                });
                
                saveItem.addEventListener('mouseleave', function() {
                    this.style.backgroundColor = '#3a3a3a';
                });
                
                // Create save info
                const saveInfoDiv = document.createElement('div');
                saveInfoDiv.style.flex = '1';
                
                const saveName = document.createElement('div');
                saveName.textContent = saveInfo.saveName;
                saveName.style.fontWeight = 'bold';
                saveName.style.color = 'white';
                
                const saveDate = document.createElement('div');
                saveDate.textContent = saveInfo.timestamp ? new Date(saveInfo.timestamp).toLocaleString() : 'Unknown date';
                saveDate.style.fontSize = '12px';
                saveDate.style.color = '#999';
                
                const playerInfo = document.createElement('div');
                playerInfo.textContent = saveInfo.playerCount ? `${saveInfo.playerCount} player${saveInfo.playerCount > 1 ? 's' : ''}` : '';
                playerInfo.style.fontSize = '12px';
                playerInfo.style.color = '#999';
                
                saveInfoDiv.appendChild(saveName);
                saveInfoDiv.appendChild(saveDate);
                if (saveInfo.playerCount) saveInfoDiv.appendChild(playerInfo);
                
                // Create action buttons
                const actionsDiv = document.createElement('div');
                actionsDiv.style.display = 'flex';
                actionsDiv.style.gap = '5px';
                
                // Load button
                const loadButton = document.createElement('button');
                loadButton.textContent = 'Load';
                loadButton.style.padding = '5px 10px';
                loadButton.style.backgroundColor = '#4CAF50';
                loadButton.style.color = 'white';
                loadButton.style.border = 'none';
                loadButton.style.borderRadius = '3px';
                loadButton.style.cursor = 'pointer';
                
                loadButton.addEventListener('click', function(e) {
                    e.stopPropagation(); // Prevent triggering the saveItem click
                    loadGame(gameData);
                    overlay.remove();
                });
                
                // Delete button
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.style.padding = '5px 10px';
                deleteButton.style.backgroundColor = '#f44336';
                deleteButton.style.color = 'white';
                deleteButton.style.border = 'none';
                deleteButton.style.borderRadius = '3px';
                deleteButton.style.cursor = 'pointer';
                
                deleteButton.addEventListener('click', function(e) {
                    e.stopPropagation(); // Prevent triggering the saveItem click
                    if (confirm(`Are you sure you want to delete the save "${name}"?`)) {
                        // Remove the save
                        delete savedGames[name];
                        localStorage.setItem('soulSwornSavedGames', JSON.stringify(savedGames));
                        saveItem.remove();
                        
                        // Show notification
                        showNotification('Save deleted', 'info');
                        
                        // If no more saves, show empty message
                        if (Object.keys(savedGames).length === 0) {
                            const noSavesMsg = document.createElement('div');
                            noSavesMsg.textContent = 'No saved games found in browser storage.';
                            noSavesMsg.style.color = '#999';
                            noSavesMsg.style.textAlign = 'center';
                            noSavesMsg.style.padding = '20px';
                            savedGamesList.appendChild(noSavesMsg);
                        }
                    }
                });
                
                // Add buttons to actions div
                actionsDiv.appendChild(loadButton);
                actionsDiv.appendChild(deleteButton);
                
                // Add to save item
                saveItem.appendChild(saveInfoDiv);
                saveItem.appendChild(actionsDiv);
                
                // Add click handler to load save
                saveItem.addEventListener('click', function() {
                    loadGame(gameData);
                    overlay.remove();
                });
                
                // Add to list
                savedGamesList.appendChild(saveItem);
            });
        }
        
        browserContent.appendChild(savedGamesList);
    } catch (err) {
        console.error('Error loading saved games:', err);
        const errorMsg = document.createElement('div');
        errorMsg.textContent = 'Error loading saved games: ' + err.message;
        errorMsg.style.color = '#f44336';
        errorMsg.style.textAlign = 'center';
        errorMsg.style.padding = '20px';
        browserContent.appendChild(errorMsg);
    }
    
    // Add JSON paste area
    const jsonTextarea = document.createElement('textarea');
    jsonTextarea.placeholder = 'Paste your game save JSON here...';
    jsonTextarea.style.width = '100%';
    jsonTextarea.style.height = '200px';
    jsonTextarea.style.padding = '10px';
    jsonTextarea.style.backgroundColor = '#3a3a3a';
    jsonTextarea.style.color = 'white';
    jsonTextarea.style.border = 'none';
    jsonTextarea.style.borderRadius = '5px';
    jsonTextarea.style.resize = 'vertical';
    jsonTextarea.style.marginBottom = '15px';
    jsonTextarea.style.fontFamily = 'monospace';
    jsonContent.appendChild(jsonTextarea);
    
    // Add JSON load button
    const loadJsonButton = document.createElement('button');
    loadJsonButton.textContent = 'Load from JSON';
    loadJsonButton.style.width = '100%';
    loadJsonButton.style.padding = '12px';
    loadJsonButton.style.backgroundColor = '#2196F3';
    loadJsonButton.style.color = 'white';
    loadJsonButton.style.border = 'none';
    loadJsonButton.style.borderRadius = '5px';
    loadJsonButton.style.cursor = 'pointer';
    loadJsonButton.style.fontWeight = 'bold';
    
    loadJsonButton.addEventListener('click', function() {
        const jsonData = jsonTextarea.value.trim();
        if (!jsonData) {
            alert('Please paste a valid JSON save data.');
            return;
        }
        
        try {
            // Test if it's valid JSON
            JSON.parse(jsonData);
            
            // If valid, load it
            loadGame(jsonData);
            overlay.remove();
        } catch (err) {
            alert('Invalid JSON data: ' + err.message);
        }
    });
    
    jsonContent.appendChild(loadJsonButton);
    
    // Add content containers to dialog
    dialog.appendChild(browserContent);
    dialog.appendChild(jsonContent);
    
    // Add close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Cancel';
    closeButton.style.width = '100%';
    closeButton.style.padding = '12px';
    closeButton.style.backgroundColor = '#888';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '5px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontWeight = 'bold';
    closeButton.style.marginTop = '20px';
    
    closeButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#777';
    });
    
    closeButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#888';
    });
    
    closeButton.addEventListener('click', function() {
        overlay.remove();
    });
    
    dialog.appendChild(closeButton);
    
    // Add dialog to overlay
    overlay.appendChild(dialog);
    
    // Add overlay to document
    document.body.appendChild(overlay);
    
    // Add escape key handler
    function handleEscKey(e) {
        if (e.key === 'Escape') {
            overlay.remove();
            document.removeEventListener('keydown', handleEscKey);
        }
    }
    
    document.addEventListener('keydown', handleEscKey);
    
    // Close when clicking outside the dialog
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
}

// Load a game from save data
function loadGame(saveDataJson) {
    try {
        // Parse the save data
        const saveData = JSON.parse(saveDataJson);
        
        // Display confirmation dialog
        if (!confirm(`Are you sure you want to load the game "${saveData.saveName}"? This will replace your current game.`)) {
            return;
        }
        
        // Reset current game state
        gameStarted = true;
        
        // Load player count
        playerCount = saveData.playerCount;
        
        // Load player characters
        playerCharacters = saveData.playerCharacters.map(char => ({...char}));
        
        // Load player hands
        playerHands = saveData.playerHands.map(hand => hand.map(card => ({...card})));
        
        // Load main deck and discard
        mainDeck = saveData.mainDeck.map(card => ({...card}));
        mainDiscard = saveData.mainDiscard.map(card => ({...card}));
        
        // Load alt deck and discard
        altDeck = saveData.altDeck.map(card => ({...card}));
        altDiscard = saveData.altDiscard.map(card => ({...card}));
        
        // Load game state
        gameState = {
            scenesCount: saveData.gameState.scenesCount,
            finalSceneIndex: saveData.gameState.finalSceneIndex,
            altDeckTypes: saveData.gameState.altDeckTypes,
            selectedObjective: saveData.gameState.selectedObjective ? {
                ...saveData.gameState.selectedObjective
            } : null
        };
        
        // Load notes content if available
        if (saveData.notesContent) {
            const notesEditor = document.getElementById('notesEditor');
            if (notesEditor) {
                notesEditor.innerHTML = saveData.notesContent;
                updateNotesPlaceholder();
            }
        }
        
        // Show game board
        document.getElementById('setup').style.display = 'none';
        document.getElementById('gameBoard').style.display = 'block';
        
        // Initialize game board
        initializeBoardFromSave(saveData);
        
        // Show success notification
        showNotification('Game loaded successfully!', 'success');
    } catch (err) {
        console.error('Error loading game:', err);
        alert('Failed to load game: ' + err.message);
    }
}

// Initialize the game board from save data
function initializeBoardFromSave(saveData) {
    // Render player hands
    renderHands();
    
    // Render decks
    renderMainDeck();
    renderMainDiscard();
    renderAltDeck();
    renderAltDiscard();
    
    // Render story grid
    const storyGrid = document.getElementById('storyGrid');
    storyGrid.innerHTML = ''; // Clear existing slots
    
    // Create all grid slots
    for (let i = 0; i < 40; i++) {
        const slot = document.createElement('div');
        slot.className = 'gridSlot';
        slot.dataset.index = i;
        slot.addEventListener('dragover', handleDragOver);
        slot.addEventListener('drop', handleDrop);
        storyGrid.appendChild(slot);
    }
    
    // Fill grid slots with cards from save data
    const gridSlots = document.querySelectorAll('#storyGrid .gridSlot');
    saveData.storyGrid.forEach(slotData => {
        if (slotData.cardId && slotData.card && slotData.index < gridSlots.length) {
            const slot = gridSlots[slotData.index];
            const cardElement = createCardElement(slotData.card);
            slot.appendChild(cardElement);
            
            // Highlight the objective card slot
            if (slotData.index === gameState.finalSceneIndex) {
                slot.style.boxShadow = '0 0 10px 2px #e5a619'; // Golden glow
                slot.style.borderRadius = '5px';
            }
        }
    });
    
    // Fill mutable column slots
    const mutableSlots = document.querySelectorAll('#mutableColumn .mutableSlot');
    saveData.mutableColumn.forEach(slotData => {
        if (slotData.cardId && slotData.card && slotData.index < mutableSlots.length) {
            const slot = mutableSlots[slotData.index];
            const cardElement = createCardElement(slotData.card);
            slot.appendChild(cardElement);
        }
    });
    
    // Initialize deck event listeners
    initializeDeckEventListeners();
}

// Debug function to show all image paths
function showImageDebugWindow() {
    const debugWindow = document.createElement('div');
    debugWindow.style.position = 'fixed';
    debugWindow.style.top = '10%';
    debugWindow.style.left = '10%';
    debugWindow.style.width = '80%';
    debugWindow.style.height = '80%';
    debugWindow.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    debugWindow.style.color = 'white';
    debugWindow.style.padding = '20px';
    debugWindow.style.zIndex = '10000';
    debugWindow.style.overflowY = 'auto';
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '10px';
    closeBtn.style.right = '10px';
    closeBtn.onclick = function() {
        debugWindow.remove();
    };
    debugWindow.appendChild(closeBtn);
    
    // List all image paths
    const imageList = document.createElement('div');
    imageList.innerHTML = '<h3>Card Image Paths</h3>';
    
    // Check card back
    const cardBackItem = document.createElement('div');
    cardBackItem.innerHTML = `<p>Card Back: ${CARD_BACK_PATH} <button class="test-btn">Test</button></p>`;
    const testBackBtn = cardBackItem.querySelector('.test-btn');
    testBackBtn.onclick = function() {
        preloadImage(CARD_BACK_PATH)
            .then(() => {
                cardBackItem.style.color = 'green';
                cardBackItem.innerHTML += ' <span style="color:green">✓</span>';
            })
            .catch(() => {
                cardBackItem.style.color = 'red';
                cardBackItem.innerHTML += ' <span style="color:red">✗</span>';
            });
    };
    imageList.appendChild(cardBackItem);
    
    // Check characters
    imageList.innerHTML += '<h4>Character Cards</h4>';
    (cardData.characterCards || CHARACTER_CARDS).forEach(card => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `<p>${card.name}: ${card.imageUrl} <button class="test-btn">Test</button></p>`;
        const testBtn = itemDiv.querySelector('.test-btn');
        testBtn.onclick = function() {
            preloadImage(card.imageUrl)
                .then(() => {
                    itemDiv.style.color = 'green';
                    itemDiv.innerHTML += ' <span style="color:green">✓</span>';
                })
                .catch(() => {
                    itemDiv.style.color = 'red';
                    itemDiv.innerHTML += ' <span style="color:red">✗</span>';
                });
        };
        imageList.appendChild(itemDiv);
    });
    
    // Check deck cards
    Object.entries(DECK_CARDS).forEach(([type, cards]) => {
        imageList.innerHTML += `<h4>${type.charAt(0).toUpperCase() + type.slice(1)} Cards</h4>`;
        cards.forEach(card => {
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `<p>${card.name}: ${card.imageUrl} <button class="test-btn">Test</button></p>`;
            const testBtn = itemDiv.querySelector('.test-btn');
            testBtn.onclick = function() {
                preloadImage(card.imageUrl)
                    .then(() => {
                        itemDiv.style.color = 'green';
                        itemDiv.innerHTML += ' <span style="color:green">✓</span>';
                    })
                    .catch(() => {
                        itemDiv.style.color = 'red';
                        itemDiv.innerHTML += ' <span style="color:red">✗</span>';
                    });
            };
            imageList.appendChild(itemDiv);
        });
    });
    
    debugWindow.appendChild(imageList);
    document.body.appendChild(debugWindow);
}

// Animate the D20 dice roll
function animateD20Roll() {
    const d20Area = document.getElementById('d20Area');
    const rollDisplay = d20Area.querySelector('.roll-number');
    
    if (!d20Area || !rollDisplay) {
        console.error('D20 area or roll display not found');
        return;
    }
    
    // Disable clicks during animation
    d20Area.style.pointerEvents = 'none';
    
    // Add rolling animation class
    d20Area.classList.add('rolling');
    
    // Generate random numbers for the animation
    const animationSteps = 10;
    const animationDuration = 1500; // ms
    const stepDuration = animationDuration / animationSteps;
    let step = 0;
    
    // Start the animation
    const rollAnimation = setInterval(() => {
        // Generate a random number between 1 and 20
        const randomRoll = Math.floor(Math.random() * 20) + 1;
        rollDisplay.textContent = randomRoll;
        
        // Color based on roll value
        if (randomRoll === 20) {
            rollDisplay.style.color = '#4ae24a'; // Green for 20
        } else if (randomRoll === 1) {
            rollDisplay.style.color = '#e24a4a'; // Red for 1
        } else if (randomRoll >= 15) {
            rollDisplay.style.color = '#e5e54a'; // Yellow for high rolls
        } else {
            rollDisplay.style.color = 'white'; // White for normal rolls
        }
        
        step++;
        
        // End the animation
        if (step >= animationSteps) {
            clearInterval(rollAnimation);
            
            // Generate the final roll
            const finalRoll = Math.floor(Math.random() * 20) + 1;
            rollDisplay.textContent = finalRoll;
            
            // Set final color based on roll value
            if (finalRoll === 20) {
                rollDisplay.style.color = '#4ae24a'; // Green for 20
                // Add critical success flash
                d20Area.classList.add('critical-success');
                setTimeout(() => d20Area.classList.remove('critical-success'), 2000);
            } else if (finalRoll === 1) {
                rollDisplay.style.color = '#e24a4a'; // Red for 1
                // Add critical failure flash
                d20Area.classList.add('critical-failure');
                setTimeout(() => d20Area.classList.remove('critical-failure'), 2000);
            } else if (finalRoll >= 15) {
                rollDisplay.style.color = '#e5e54a'; // Yellow for high rolls
            } else {
                rollDisplay.style.color = 'white'; // White for normal rolls
            }
            
            // Remove rolling animation class
            d20Area.classList.remove('rolling');
            
            // Enable clicks again
            d20Area.style.pointerEvents = 'auto';
        }
    }, stepDuration);
}

// Function to disable or enable game settings
function disableGameSettings(disabled) {
    // Settings that should be disabled during gameplay
    const gameSettingsElements = [
        document.getElementById('playerCount'),
        document.getElementById('objectiveSelect'),
        document.getElementById('scenesCount'),
        ...document.querySelectorAll('#altDeckTypes input[type="checkbox"]'),
        document.getElementById('timerMinutes'),
        document.getElementById('timerSeconds')
    ];
    
    // Disable deck type selection switches
    const deckSwitches = document.querySelectorAll('.deck-switch-item');
    deckSwitches.forEach(switchItem => {
        // Get all position elements within this switch
        const positions = switchItem.querySelectorAll('.deck-switch-position');
        const track = switchItem.querySelector('.deck-switch-track');
        
        if (track) {
            if (disabled) {
                // Add disabled styling
                track.classList.add('disabled-setting');
                // Disable click events when disabled
                track.style.pointerEvents = disabled ? 'none' : 'auto';
            } else {
                // Remove disabled styling
                track.classList.remove('disabled-setting');
                track.style.pointerEvents = 'auto';
            }
        }
    });
    
    // Disable or enable each setting
    gameSettingsElements.forEach(element => {
        if (element) {
            element.disabled = disabled;
            
            // Apply visual indication of disabled state
            if (disabled) {
                element.classList.add('disabled-setting');
                // If it's a parent container with checkboxes, style it too
                if (element.closest('.checkbox-item')) {
                    element.closest('.checkbox-item').classList.add('disabled-setting');
                }
            } else {
                element.classList.remove('disabled-setting');
                // If it's a parent container with checkboxes, remove style
                if (element.closest('.checkbox-item')) {
                    element.closest('.checkbox-item').classList.remove('disabled-setting');
                }
            }
        }
    });
    
    // Add visual indication that settings are locked during gameplay
    const gameSettingsSection = document.querySelector('#gameSettings .menu-section');
    if (gameSettingsSection) {
        if (disabled) {
            // Add indicator that settings are locked
            if (!document.getElementById('settings-locked-notice')) {
                const lockedNotice = document.createElement('div');
                lockedNotice.id = 'settings-locked-notice';
                lockedNotice.className = 'settings-notice';
                lockedNotice.innerHTML = '<b>Settings locked during gameplay</b>';
                lockedNotice.style.color = '#ff9800';
                lockedNotice.style.padding = '10px';
                lockedNotice.style.marginBottom = '10px';
                lockedNotice.style.textAlign = 'center';
                lockedNotice.style.backgroundColor = 'rgba(255, 152, 0, 0.1)';
                lockedNotice.style.borderRadius = '5px';
                gameSettingsSection.insertBefore(lockedNotice, gameSettingsSection.firstChild);
            }
        } else {
            // Remove the indicator
            const lockedNotice = document.getElementById('settings-locked-notice');
            if (lockedNotice) {
                lockedNotice.remove();
            }
        }
    }
}

// Function to update player character during gameplay
function updatePlayerCharacter(playerIndex, characterId) {
    if (!gameStarted) return;
    
    // Find the character card data
    const character = CHARACTER_CARDS.find(c => c.id === characterId);
    if (!character) {
        console.error(`Character with ID ${characterId} not found`);
        return;
    }
    
    // Update the player character in the data arrays
    playerCharacters[playerIndex] = character;
    
    // Update the character card in the character cards array
    if (cardData.characterCards) {
        cardData.characterCards[playerIndex] = character;
    }
    
    // Re-render player hands to update the character card
    renderHands();
    
    console.log(`Character for Player ${playerIndex + 1} updated to: ${character.name}`);
    showNotification(`Player ${playerIndex + 1} character updated to: ${character.name}`, 'success');
}

// Draw cards from the specified deck
function drawCards(deckType) {
    console.log(`Drawing card from ${deckType} deck`);
    
    // Determine which deck to draw from
    const deck = deckType === 'main' ? mainDeck : altDeck;
    
    if (deck.length === 0) {
        showNotification(`${deckType === 'main' ? 'Main' : 'Alt'} deck is empty. Shuffle discard pile first.`, 'warning');
        return;
    }
    
    // Find all empty hand slots
    const emptySlots = [];
    
    for (let playerIndex = 0; playerIndex < playerCount; playerIndex++) {
        const playerHand = document.getElementById(`player${playerIndex + 1}Hand`);
        if (!playerHand) continue;
        
        const handSlots = playerHand.querySelectorAll('.handCard:not(.charCard)');
        handSlots.forEach((slot, slotIndex) => {
            if (!slot.querySelector('.card')) {
                emptySlots.push({
                    slot,
                    playerIndex,
                    slotIndex
                });
            }
        });
    }
    
    if (emptySlots.length === 0) {
        showNotification('No empty slots in player hands', 'info');
        return;
    }
    
    // Sort empty slots by player index and then slot index for round-robin dealing
    emptySlots.sort((a, b) => {
        if (a.playerIndex !== b.playerIndex) {
            return a.playerIndex - b.playerIndex;
        }
        return a.slotIndex - b.slotIndex;
    });
    
    // Deal cards to empty slots round-robin style
    let cardsToDeal = Math.min(emptySlots.length, deck.length);
    for (let i = 0; i < cardsToDeal; i++) {
        const card = deck.shift(); // Take the top card
        card.faceUp = false; // Make sure it's face down
        
        const targetSlot = emptySlots[i].slot;
        const playerIdx = emptySlots[i].playerIndex;
        const slotIdx = emptySlots[i].slotIndex;
        
        // Add card to player's hand data array
        if (!playerHands[playerIdx]) {
            playerHands[playerIdx] = [];
        }
        
        // Ensure the slot exists in the player's hand
        while (playerHands[playerIdx].length <= slotIdx) {
            playerHands[playerIdx].push(null);
        }
        
        // Add the card to the player's hand data
        playerHands[playerIdx][slotIdx] = card;
        
        // Create a card element and add it to the slot
        const cardElement = createCardElement(card);
        targetSlot.appendChild(cardElement);
    }
    
    // Update deck display
    if (deckType === 'main') {
        renderMainDeck();
    } else {
        renderAltDeck();
    }
    
    showNotification(`Dealt ${cardsToDeal} card${cardsToDeal !== 1 ? 's' : ''} from ${deckType} deck`, 'success');
}

// Shuffle discard pile into the deck
function shuffleDiscardIntoDeck(deckType) {
    console.log(`Shuffling ${deckType} discard into deck`);
    
    // Determine which discard/deck to work with
    const discard = deckType === 'main' ? mainDiscard : altDiscard;
    const deck = deckType === 'main' ? mainDeck : altDeck;
    
    if (discard.length === 0) {
        showNotification(`${deckType === 'main' ? 'Main' : 'Alt'} discard pile is empty`, 'warning');
        return;
    }
    
    // Add all cards from discard to deck
    deck.push(...discard);
    
    // Clear the discard pile
    if (deckType === 'main') {
        mainDiscard = [];
    } else {
        altDiscard = [];
    }
    
    // Shuffle the deck
    shuffleArray(deck);
    
    // Update displays
    if (deckType === 'main') {
        renderMainDeck();
        renderMainDiscard();
    } else {
        renderAltDeck();
        renderAltDiscard();
    }
    
    showNotification(`Shuffled ${deckType} discard pile into deck`, 'success');
}

// Function to show/hide player setup sections based on player count
function updatePlayerSetupVisibility() {
    const playerCount = parseInt(document.getElementById('playerCount').value) || 2;
    
    // Show/hide player setup sections based on count
    for (let i = 1; i <= 4; i++) {
        const playerSetup = document.getElementById(`player${i}Setup`);
        if (playerSetup) {
            playerSetup.style.display = i <= playerCount ? 'block' : 'none';
            
            // Add styling to player setup containers
            if (i <= playerCount) {
                // Apply styles to visible player sections
                playerSetup.style.backgroundColor = '#2a2a2a';
                playerSetup.style.padding = '15px';
                playerSetup.style.marginBottom = '10px';
                playerSetup.style.borderRadius = '5px';
                playerSetup.style.border = '1px solid #444';
            }
        }
    }
    
    // Set default player names
    setPlayerNameDefaults();
    
    // Update available characters
    updateAvailableCharacters();
    
    console.log(`Updated player setup visibility for ${playerCount} players`);
}

// Function to update player name in game state and UI
function updatePlayerName(playerIndex, newName) {
    // Update the player name in the global array
    if (!playerNames[playerIndex] || playerNames[playerIndex] !== newName) {
        playerNames[playerIndex] = newName || `Player ${playerIndex + 1}`;
        
        // If game is started, update the UI
        if (gameStarted) {
            updatePlayerNameInUI(playerIndex);
        }
    }
}

// Function to update player name in the UI
function updatePlayerNameInUI(playerIndex) {
    const playerHand = document.getElementById(`player${playerIndex + 1}Hand`);
    if (!playerHand) return;
    
    const nameLabel = playerHand.querySelector('.player-name-label');
    if (nameLabel) {
        nameLabel.textContent = playerNames[playerIndex] || `Player ${playerIndex + 1}`;
    } else {
        // If we need to re-render the entire hand
        renderHands();
    }
}

// Function to mark the final scene slot with a label when no objective card is used
function markFinalSceneSlot(slotIndex) {
    // Ensure index is within bounds (0-39)
    const safeIndex = Math.min(Math.max(0, slotIndex), 39);
    
    // Get the grid slot at the specified index
    const gridSlots = document.querySelectorAll('#storyGrid .gridSlot');
    if (gridSlots.length <= safeIndex) {
        console.error(`No grid slot found at index ${safeIndex}`);
        return;
    }
    
    const targetSlot = gridSlots[safeIndex];
    
    // Clear any existing content in the slot
    while (targetSlot.firstChild) {
        targetSlot.removeChild(targetSlot.firstChild);
    }
    
    // Style the slot to highlight it as the final scene slot
    targetSlot.style.boxShadow = '0 0 10px 2px #e5a619'; // Golden glow
    targetSlot.style.borderRadius = '5px';
    
    // Create and add a label to the slot
    const label = document.createElement('div');
    label.textContent = 'FINAL SCENE';
    label.style.width = '100%';
    label.style.height = '100%';
    label.style.display = 'flex';
    label.style.justifyContent = 'center';
    label.style.alignItems = 'center';
    label.style.textAlign = 'center';
    label.style.color = 'white';
    label.style.fontWeight = 'bold';
    label.style.fontSize = '14px';
    label.style.textShadow = '0 0 5px black';
    label.style.background = 'rgba(0, 0, 0, 0.5)';
    label.style.borderRadius = '5px';
    
    targetSlot.appendChild(label);
    
    console.log(`Marked slot ${safeIndex} as the final scene (no objective card)`);
}

// Instructions Overlay Functions
function loadInstructions() {
  // ===========================================================
  // ======== INSTRUCTIONS JSON DATA (EDIT BELOW) ==============
  // ===========================================================
  const instructionsData = {
    "instructions": [
      "Assign your character's attributes using the token controls."
    ]
  };
  // ===========================================================
  // ======== END OF INSTRUCTIONS DATA ========================
  // ===========================================================

  // Process the instructions data
  try {
    const instructionsContainer = document.getElementById('instructionsContainer');
    instructionsContainer.innerHTML = '';
    
    if (instructionsData && instructionsData.instructions && instructionsData.instructions.length > 0) {
      instructionsData.instructions.forEach((instruction, index) => {
        const instructionItem = document.createElement('div');
        instructionItem.className = 'instruction-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'instruction-checkbox';
        checkbox.id = `instruction-${index}`;
        checkbox.addEventListener('change', checkAllInstructions);
        
        const instructionText = document.createElement('div');
        instructionText.className = 'instruction-text';
        instructionText.textContent = instruction;
        
        instructionItem.appendChild(checkbox);
        instructionItem.appendChild(instructionText);
        instructionsContainer.appendChild(instructionItem);
      });
    } else {
      // Add fallback text if JSON is empty or malformed
      const fallbackItem = document.createElement('div');
      fallbackItem.className = 'instruction-item';
      fallbackItem.textContent = 'Assign your character tokens before starting the game.';
      instructionsContainer.appendChild(fallbackItem);
    }
    
    console.log('Instructions loaded:', instructionsData);
  } catch (error) {
    console.error('Error processing instructions:', error);
    // Add fallback text if there's an error processing the data
    const instructionsContainer = document.getElementById('instructionsContainer');
    instructionsContainer.innerHTML = '<div class="instruction-item"><input type="checkbox" class="instruction-checkbox" id="instruction-fallback"><div class="instruction-text">Assign your character tokens before starting the game.</div></div>';
  }

  // Load character setup interface
  loadCharacterSetup();
}

// Function to load character setup in the instructions overlay
function loadCharacterSetup() {
  const setupContainer = document.getElementById('characterSetupContainer');
  if (!setupContainer) return;
  
  setupContainer.innerHTML = '';
  
  // For each player, create a character card with token controls
  for (let i = 0; i < playerCount; i++) {
    const playerIndex = i;
    const character = playerCharacters[playerIndex];
    
    if (!character) {
      console.error(`No character found for player ${playerIndex + 1}`);
      continue;
    }
    
    // Create setup card for this character
    const setupCard = document.createElement('div');
    setupCard.className = 'setup-character-card';
    setupCard.dataset.playerIndex = playerIndex;
    
    // Add player name
    const playerNameDiv = document.createElement('div');
    playerNameDiv.className = 'setup-player-name';
    playerNameDiv.textContent = playerNames[playerIndex] || `Player ${playerIndex + 1}`;
    setupCard.appendChild(playerNameDiv);
    
    // Add character name
    const nameDiv = document.createElement('div');
    nameDiv.className = 'setup-character-name';
    nameDiv.textContent = character.name;
    setupCard.appendChild(nameDiv);
    
    // Add character image
    const characterImg = document.createElement('img');
    characterImg.className = 'setup-character-image';
    characterImg.src = character.imageUrl;
    characterImg.alt = character.name;
    characterImg.onerror = function() {
      // Fallback if image fails to load
      this.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="280" height="400" viewBox="0 0 280 400"><rect width="100%" height="100%" fill="#333"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle">${character.name}</text></svg>`;
    };
    setupCard.appendChild(characterImg);
    
    // Create token container (organized as a column like in the game)
    const tokenContainer = document.createElement('div');
    tokenContainer.className = 'setup-token-container';
    
    // Initialize token values if they don't exist
    if (!playerTokens[playerIndex]) {
      playerTokens[playerIndex] = {
        rational: 2,
        emotional: 2,
        physical: 2,
        total: 6
      };
    }
    
    // Token types (in the same order as in the game)
    const tokenTypes = [
      { name: 'rational', label: 'Rational', cssClass: 'rational-token' },
      { name: 'emotional', label: 'Emotional', cssClass: 'emotional-token' },
      { name: 'physical', label: 'Physical', cssClass: 'physical-token' }
    ];
    
    // Create controls for each token type
    tokenTypes.forEach(tokenType => {
      const tokenRow = document.createElement('div');
      tokenRow.className = 'setup-token-row';
      
      // Label
      const label = document.createElement('div');
      label.className = 'setup-token-label';
      label.textContent = tokenType.label;
      tokenRow.appendChild(label);
      
      // Control
      const control = document.createElement('div');
      control.className = 'setup-token-control';
      
      // Minus button
      const minusBtn = document.createElement('button');
      minusBtn.className = 'setup-token-button';
      minusBtn.textContent = '-';
      minusBtn.dataset.action = 'decrease';
      minusBtn.dataset.tokenType = tokenType.name;
      minusBtn.dataset.playerIndex = playerIndex;
      minusBtn.addEventListener('click', handleTokenButtonClick);
      control.appendChild(minusBtn);
      
      // Value display
      const valueDisplay = document.createElement('div');
      valueDisplay.className = `setup-token-value ${tokenType.cssClass}`;
      valueDisplay.textContent = playerTokens[playerIndex][tokenType.name];
      valueDisplay.id = `token-${playerIndex}-${tokenType.name}`;
      control.appendChild(valueDisplay);
      
      // Plus button
      const plusBtn = document.createElement('button');
      plusBtn.className = 'setup-token-button';
      plusBtn.textContent = '+';
      plusBtn.dataset.action = 'increase';
      plusBtn.dataset.tokenType = tokenType.name;
      plusBtn.dataset.playerIndex = playerIndex;
      plusBtn.addEventListener('click', handleTokenButtonClick);
      control.appendChild(plusBtn);
      
      tokenRow.appendChild(control);
      tokenContainer.appendChild(tokenRow);
    });
    
    // Total points display
    const totalPoints = document.createElement('div');
    totalPoints.className = 'setup-total-points';
    totalPoints.id = `total-points-${playerIndex}`;
    totalPoints.textContent = `Total Points: ${playerTokens[playerIndex].total}/7`;
    tokenContainer.appendChild(totalPoints);
    
    setupCard.appendChild(tokenContainer);
    setupContainer.appendChild(setupCard);
    
    // Update button states based on initial values
    updateTokenButtonStates(playerIndex);
  }
}

// Handle token button clicks in setup
function handleTokenButtonClick(event) {
  const action = event.currentTarget.dataset.action;
  const tokenType = event.currentTarget.dataset.tokenType;
  const playerIndex = parseInt(event.currentTarget.dataset.playerIndex);
  
  if (!playerTokens[playerIndex]) {
    console.error(`No token data for player ${playerIndex + 1}`);
    return;
  }
  
  const MAX_TOTAL = 7; // Maximum total points allowed
  
  if (action === 'increase') {
    // Check if we're at the max total
    if (playerTokens[playerIndex].total < MAX_TOTAL) {
      playerTokens[playerIndex][tokenType]++;
      playerTokens[playerIndex].total++;
    }
  } else if (action === 'decrease') {
    // Check if the token has points to decrease
    if (playerTokens[playerIndex][tokenType] > 0) {
      playerTokens[playerIndex][tokenType]--;
      playerTokens[playerIndex].total--;
    }
  }
  
  // Update the display
  const valueDisplay = document.getElementById(`token-${playerIndex}-${tokenType}`);
  if (valueDisplay) {
    valueDisplay.textContent = playerTokens[playerIndex][tokenType];
  }
  
  // Update total points display
  const totalDisplay = document.getElementById(`total-points-${playerIndex}`);
  if (totalDisplay) {
    totalDisplay.textContent = `Total Points: ${playerTokens[playerIndex].total}/7`;
  }
  
  // Update button states
  updateTokenButtonStates(playerIndex);
}

// Update button enabled/disabled states based on token values
function updateTokenButtonStates(playerIndex) {
  const MAX_TOTAL = 7;
  const playerToken = playerTokens[playerIndex];
  const atMax = playerToken.total >= MAX_TOTAL;
  
  // Get all buttons for this player
  const tokenTypes = ['rational', 'emotional', 'physical'];
  
  tokenTypes.forEach(type => {
    // Disable plus buttons when at max total
    const plusBtn = document.querySelector(`button[data-action="increase"][data-token-type="${type}"][data-player-index="${playerIndex}"]`);
    if (plusBtn) {
      plusBtn.disabled = atMax;
    }
    
    // Disable minus buttons when token value is 0
    const minusBtn = document.querySelector(`button[data-action="decrease"][data-token-type="${type}"][data-player-index="${playerIndex}"]`);
    if (minusBtn) {
      minusBtn.disabled = playerToken[type] <= 0;
    }
  });
  
  // Highlight total points if at max
  const totalDisplay = document.getElementById(`total-points-${playerIndex}`);
  if (totalDisplay) {
    if (atMax) {
      totalDisplay.style.color = '#4CAF50'; // Green when at max
    } else {
      totalDisplay.style.color = '#fff'; // White otherwise
    }
  }
}

// Apply token values to the game board
function applyTokenSetup() {
  console.log("Applying token setup to game board");
  
  // For each player, update the token values in the game
  for (let i = 0; i < playerCount; i++) {
    const playerToken = playerTokens[i];
    if (!playerToken) {
      console.warn(`No token data found for player ${i + 1}`);
      continue;
    }
    
    console.log(`Setting tokens for player ${i + 1}:`, playerToken);
    
    // Update token displays in the game
    updatePlayerTokenDisplay(i, 'rational', playerToken.rational);
    updatePlayerTokenDisplay(i, 'emotional', playerToken.emotional);
    updatePlayerTokenDisplay(i, 'physical', playerToken.physical);
  }
}

// Update a player's token display with the given value
function updatePlayerTokenDisplay(playerIndex, tokenType, value) {
  const playerHand = document.getElementById(`player${playerIndex + 1}Hand`);
  if (!playerHand) {
    console.error(`Player hand not found for player ${playerIndex + 1}`);
    return;
  }
  
  // Find the token container
  const tokenContainer = playerHand.querySelector('.tokenContainer');
  if (!tokenContainer) {
    console.error(`Token container not found for player ${playerIndex + 1}`);
    return;
  }
  
  // Find the specific token (could be an input or div)
  const token = tokenContainer.querySelector(`.token[data-attribute="${tokenType}"]`);
  if (!token) {
    console.error(`Token not found for attribute ${tokenType} for player ${playerIndex + 1}`);
    return;
  }
  
  console.log(`Found token element:`, token);
  
  // Update the token value
  if (token.tagName === 'INPUT') {
    // For input elements
    token.value = value;
  } else {
    // For div elements
    token.textContent = value;
  }
  
  // Add custom styling based on token type for better visibility
  token.style.borderColor = tokenType === 'rational' ? '#60236a' : 
                           tokenType === 'emotional' ? '#fbb03f' : 
                           '#7f7f7f';
                           
  token.style.backgroundColor = tokenType === 'rational' ? '#60236a' : 
                               tokenType === 'emotional' ? '#fbb03f' : 
                               '#7f7f7f';
                               
  token.style.color = tokenType === 'emotional' ? '#000000' : '#ffffff';
  
  // Check if max tokens
  const MAX_TOKENS = 7;
  if (playerTokens[playerIndex] && playerTokens[playerIndex].total >= MAX_TOKENS) {
    token.classList.add('maxed');
  } else {
    token.classList.remove('maxed');
  }
  
  console.log(`Updated token for player ${playerIndex + 1}: ${tokenType} = ${value}`);
}

function setupInstructionsOverlay() {
  // Ensure overlay is visible
  document.getElementById('instructionsOverlay').style.display = 'flex';
  
  // Initialize player tokens if they don't exist yet
  if (!playerTokens || !Array.isArray(playerTokens)) {
    playerTokens = [];
    for (let i = 0; i < playerCount; i++) {
      playerTokens[i] = {
        rational: 2,
        emotional: 2,
        physical: 2,
        total: 6
      };
    }
    console.log("Initialized player tokens:", playerTokens);
  }
  
  // Load instructions
  loadInstructions();
  
  // Close button functionality
  const closeBtn = document.querySelector('.close-overlay');
  closeBtn.addEventListener('click', () => {
    // Apply token setup before closing
    applyTokenSetup();
    document.getElementById('instructionsOverlay').style.display = 'none';
  });
  
  // Start play button functionality
  const startPlayBtn = document.getElementById('startPlayBtn');
  startPlayBtn.addEventListener('click', () => {
    // Apply token setup before closing
    applyTokenSetup();
    document.getElementById('instructionsOverlay').style.display = 'none';
  });
}

// Add this to existing event listeners for the start game button
document.getElementById('startGameBtn').addEventListener('click', function() {
  // Check if we're coming from a reset game (Resume Game button)
  const isResume = this.textContent === 'Resume Game';
  
  // Hide setup screen
  document.getElementById('setup').style.display = 'none';
  
  // Show game board
  document.getElementById('gameBoard').style.display = 'block';
  
  if (!isResume) {
    // Initialize game board for new game
    startGame();
  } else {
    // Just show the game board, game already initialized
    setupInstructionsOverlay();
  }
});

// Check if all instruction checkboxes are checked
function checkAllInstructions() {
  const checkboxes = document.querySelectorAll('.instruction-checkbox');
  const startPlayBtn = document.getElementById('startPlayBtn');
  
  // Check if all checkboxes are checked
  const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
  
  // Enable or disable the Play button
  startPlayBtn.disabled = !allChecked;
}
// End Game Sequence Functions
// Data for superlatives
const superlatives = [
  {
    id: 'tolkien',
    title: 'Tolkien Award',
    subtitle: 'Most likely to be accused of writing an epic fantasy',
    description: 'To the player that explained... just like... sooooo many details.'
  },
  {
    id: 'dwight',
    title: 'Dwight Award',
    subtitle: 'Most likely to run an office or tattle',
    description: 'To the player that helped the group stay on track and on task. Mostly.'
  },
  {
    id: 'fry',
    title: 'Stephen Fry Award',
    subtitle: 'Most likely to narrate documentaries',
    description: 'To the player that captured the story and brought everyone into it.'
  },
  {
    id: 'winchester',
    title: 'Winchester Award',
    subtitle: 'Most likely to survive the movie version',
    description: 'To the player whose clutch plays, teamwork, and badassery kept the rest of you alive, or at least entertained.'
  },
  {
    id: 'goth',
    title: 'Goth Chick Award',
    subtitle: 'Most likely to be consumed by the Obscura',
    description: 'To the player whose decisions, vibes, and inner darkness suggest they\'d be Soul Sworn by sunset. We love you. We fear you.'
  },
  {
    id: 'chaos',
    title: 'Lord of Chaos Award',
    subtitle: 'Most likely to thrive in total narrative collapse',
    description: 'For the agent of entropy who poured fuel on every twist and laughed as it burned. Mayhem loves you.'
  },
  {
    id: 'tiebreaker',
    title: 'RPG All-Star Award',
    subtitle: 'Best role-player',
    description: 'This tie-breaker is based on the player that best role-played their character.'
  }
];

// Initialize player awards
let playerAwards = {};

// Show confirmation dialog when "Complete Game" button is clicked
function initializeEndGameButton() {
  const completeGameBtn = document.getElementById('completeGameBtn');
  if (!completeGameBtn) return;
  
  completeGameBtn.addEventListener('click', showEndGameConfirmation);
}

// Show confirmation dialog
function showEndGameConfirmation() {
  const dialog = document.getElementById('confirmationDialog');
  dialog.style.display = 'block';
  
  // Add event listeners for confirmation buttons
  document.getElementById('confirmEndGame').addEventListener('click', startEndGameSequence);
  document.getElementById('cancelEndGame').addEventListener('click', () => {
    dialog.style.display = 'none';
  });
}

// Start the end game sequence
function startEndGameSequence() {
  // Hide confirmation dialog
  document.getElementById('confirmationDialog').style.display = 'none';
  
  // Reset awards
  playerAwards = {};
  for (let i = 0; i < playerCount; i++) {
    playerAwards[i] = [];
  }
  
  // Display end game screen
  displayEndGameScreen();
  
  // Start superlative voting
  startSuperlativeVoting();
}

// Display the end game screen with character cards
function displayEndGameScreen() {
  // Hide game board and show end game overlay
  document.getElementById('gameBoard').style.display = 'none';
  const endGameOverlay = document.getElementById('endGameOverlay');
  endGameOverlay.style.display = 'flex';
  
  // Display character cards
  displayCharacterCards();
  
  // Initialize new game button
  document.getElementById('newGameBtn').addEventListener('click', startNewGame);
}

// Display character cards on the end game screen
function displayCharacterCards() {
  const charactersContainer = document.getElementById('endGameCharacters');
  charactersContainer.innerHTML = '';
  
  // Create a card for each player
  for (let i = 0; i < playerCount; i++) {
    const playerIndex = i;
    const character = playerCharacters[playerIndex];
    const playerName = playerNames[playerIndex] || `Player ${playerIndex + 1}`;
    
    if (!character) {
      console.error(`No character found for player ${playerIndex + 1}`);
      continue;
    }
    
    // Create character card
    const characterCard = document.createElement('div');
    characterCard.className = 'end-character-card';
    characterCard.dataset.playerIndex = playerIndex;
    
    // Character image
    const image = document.createElement('img');
    image.className = 'end-character-image';
    image.src = character.imageUrl;
    image.alt = character.name;
    image.onerror = function() {
      // Fallback if image fails to load
      this.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="280" viewBox="0 0 200 280"><rect width="100%" height="100%" fill="#333"/><text x="50%" y="50%" font-family="Arial" font-size="20" fill="white" text-anchor="middle" dominant-baseline="middle">${character.name}</text></svg>`;
    };
    characterCard.appendChild(image);
    
    // Character name
    const nameElement = document.createElement('div');
    nameElement.className = 'end-character-name';
    nameElement.textContent = character.name;
    characterCard.appendChild(nameElement);
    
    // Player name
    const playerNameElement = document.createElement('div');
    playerNameElement.className = 'end-player-name';
    playerNameElement.textContent = playerName;
    characterCard.appendChild(playerNameElement);
    
    // Awards container (initially empty)
    const awardsContainer = document.createElement('div');
    awardsContainer.className = 'end-awards-container';
    awardsContainer.id = `awards-${playerIndex}`;
    characterCard.appendChild(awardsContainer);
    
    charactersContainer.appendChild(characterCard);
  }
}

// Current superlative index
let currentSuperlativeIndex = 0;

// Start the superlative voting process
function startSuperlativeVoting() {
  currentSuperlativeIndex = 0;
  displaySuperlativeVoting(currentSuperlativeIndex);
}

// Display superlative voting for the given index
function displaySuperlativeVoting(index) {
  const superlativeContainer = document.getElementById('superlativeContainer');
  
  // Check if we've gone through all superlatives
  if (index >= superlatives.length) {
    // If all superlatives are done, finalize the game
    finalizeGame();
    return;
  }
  
  const superlative = superlatives[index];
  
  // Clear previous content
  superlativeContainer.innerHTML = '';
  
  // Add superlative title
  const titleElement = document.createElement('div');
  titleElement.className = 'superlative-title';
  titleElement.textContent = `${superlative.title} (${superlative.subtitle})`;
  superlativeContainer.appendChild(titleElement);
  
  // Add description
  const descriptionElement = document.createElement('div');
  descriptionElement.className = 'superlative-description';
  descriptionElement.textContent = superlative.description;
  superlativeContainer.appendChild(descriptionElement);
  
  // Add voting buttons (one for each player)
  const votingSection = document.createElement('div');
  votingSection.className = 'vote-buttons';
  
  for (let i = 0; i < playerCount; i++) {
    const playerIndex = i;
    const playerName = playerNames[playerIndex] || `Player ${playerIndex + 1}`;
    const character = playerCharacters[playerIndex];
    
    if (!character) continue;
    
    const voteButton = document.createElement('button');
    voteButton.className = 'vote-button';
    voteButton.textContent = `${character.name} (${playerName})`;
    voteButton.dataset.playerIndex = playerIndex;
    
    voteButton.addEventListener('click', function() {
      // Remove 'selected' class from all buttons
      document.querySelectorAll('.vote-button').forEach(btn => {
        btn.classList.remove('selected');
      });
      
      // Add 'selected' class to this button
      this.classList.add('selected');
      
      // Record the vote after a short delay
      setTimeout(() => {
        recordVote(superlative.id, parseInt(this.dataset.playerIndex));
        nextSuperlative();
      }, 1000);
    });
    
    votingSection.appendChild(voteButton);
  }
  
  // Add skip button
  const skipButton = document.createElement('button');
  skipButton.className = 'vote-button skip-button';
  skipButton.textContent = 'Skip';
  skipButton.addEventListener('click', nextSuperlative);
  votingSection.appendChild(skipButton);
  
  superlativeContainer.appendChild(votingSection);
}

// Record a vote for a player
function recordVote(superlativeId, playerIndex) {
  // Add the award to the player's list
  if (!playerAwards[playerIndex]) {
    playerAwards[playerIndex] = [];
  }
  
  playerAwards[playerIndex].push(superlativeId);
  
  // Display the award immediately
  displayAward(superlativeId, playerIndex);
}

// Display an award badge under a player
function displayAward(superlativeId, playerIndex) {
  const awardsContainer = document.getElementById(`awards-${playerIndex}`);
  if (!awardsContainer) return;
  
  // Find the superlative data
  const superlative = superlatives.find(s => s.id === superlativeId);
  if (!superlative) return;
  
  // Create award badge
  const badge = document.createElement('div');
  badge.className = 'award-badge';
  badge.textContent = superlative.title;
  badge.title = superlative.subtitle;
  
  awardsContainer.appendChild(badge);
}

// Move to the next superlative
function nextSuperlative() {
  currentSuperlativeIndex++;
  displaySuperlativeVoting(currentSuperlativeIndex);
}

// Finalize the game and identify the Eidolon
function finalizeGame() {
  const superlativeContainer = document.getElementById('superlativeContainer');
  
  // Count awards for each player
  let maxAwards = 0;
  let playersWithMaxAwards = [];
  
  for (const [playerIdx, awards] of Object.entries(playerAwards)) {
    const awardCount = awards.length;
    
    if (awardCount > maxAwards) {
      maxAwards = awardCount;
      playersWithMaxAwards = [parseInt(playerIdx)];
    } else if (awardCount === maxAwards && maxAwards > 0) {
      playersWithMaxAwards.push(parseInt(playerIdx));
    }
  }
  
  // Check if we have a tie
  if (playersWithMaxAwards.length > 1 && maxAwards > 0) {
    // Display tie-breaker voting
    displayTieBreakerVoting(playersWithMaxAwards);
    return;
  }
  
  // If no tie or no awards, finalize the display
  finalizeDisplay(playersWithMaxAwards[0], maxAwards);
}
// Display the tie-breaker voting
function displayTieBreakerVoting(tiedPlayerIndices) {
  const superlativeContainer = document.getElementById('superlativeContainer');
  const tieBreaker = superlatives.find(s => s.id === 'tiebreaker');
  
  // Clear previous content
  superlativeContainer.innerHTML = '';
  
  // Add tie-breaker title
  const titleElement = document.createElement('div');
  titleElement.className = 'superlative-title';
  titleElement.textContent = `TIE BREAKER: ${tieBreaker.title} (${tieBreaker.subtitle})`;
  superlativeContainer.appendChild(titleElement);
  
  // Add description
  const descriptionElement = document.createElement('div');
  descriptionElement.className = 'superlative-description';
  descriptionElement.textContent = tieBreaker.description;
  superlativeContainer.appendChild(descriptionElement);
  
  // Add voting buttons (one for each tied player)
  const votingSection = document.createElement('div');
  votingSection.className = 'vote-buttons';
  
  for (const playerIndex of tiedPlayerIndices) {
    const playerName = playerNames[playerIndex] || `Player ${playerIndex + 1}`;
    const character = playerCharacters[playerIndex];
    
    if (!character) continue;
    
    const voteButton = document.createElement('button');
    voteButton.className = 'vote-button';
    voteButton.textContent = `${character.name} (${playerName})`;
    voteButton.dataset.playerIndex = playerIndex;
    
    voteButton.addEventListener('click', function() {
      // Remove 'selected' class from all buttons
      document.querySelectorAll('.vote-button').forEach(btn => {
        btn.classList.remove('selected');
      });
      
      // Add 'selected' class to this button
      this.classList.add('selected');
      
      // Record the vote after a short delay
      setTimeout(() => {
        // Add the tie-breaker award
        recordVote('tiebreaker', parseInt(this.dataset.playerIndex));
        
        // Finalize with the winner
        finalizeDisplay(parseInt(this.dataset.playerIndex), 
                       (playerAwards[this.dataset.playerIndex] || []).length);
      }, 1000);
    });
    
    votingSection.appendChild(voteButton);
  }
  
  superlativeContainer.appendChild(votingSection);
}

// Finalize the display with the winner
function finalizeDisplay(eidolonIndex, maxAwards) {
  const superlativeContainer = document.getElementById('superlativeContainer');
  superlativeContainer.innerHTML = '<div class="superlative-title">Voting Complete!</div><div class="superlative-description">All awards have been assigned. The player with the most awards is named the Eidolon!</div>';
  
  // If we have an Eidolon, mark them
  if (eidolonIndex >= 0 && maxAwards > 0) {
    const characterCard = document.querySelector(`.end-character-card[data-player-index="${eidolonIndex}"]`);
    
    if (characterCard) {
      // Position the card relative for the badge
      characterCard.style.position = 'relative';
      
      // Add the Eidolon badge
      const badge = document.createElement('div');
      badge.className = 'eidolon-badge';
      characterCard.appendChild(badge);
      
      // Add Eidolon title under awards
      const eidolonTitle = document.createElement('div');
      eidolonTitle.textContent = 'THE EIDOLON';
      eidolonTitle.style.color = 'gold';
      eidolonTitle.style.fontWeight = 'bold';
      eidolonTitle.style.fontSize = '20px';
      eidolonTitle.style.marginTop = '15px';
      characterCard.querySelector('.end-awards-container').appendChild(eidolonTitle);
    }
  }
}

// Start a new game
function startNewGame() {
  // Reset game state
  resetGameState();
  
  // Hide end game overlay and show setup screen
  document.getElementById('endGameOverlay').style.display = 'none';
  document.getElementById('setup').style.display = 'flex';
  document.getElementById('gameBoard').style.display = 'none';
  
  // Reset setup screen to initial state
  resetSetupScreen();
  
  // Ensure all controls are unlocked
  disableGameSettings(false);
  
  // Reinitialize menu interactions
  initializeMenuInteractions();
  
  // Reset event listeners
  initializeDeckTypeSelection();
  updateAvailableCharacters();
  
  // Update the Start Game button text back to "Start Game"
  const startGameBtn = document.getElementById('startGameBtn');
  if (startGameBtn) {
    startGameBtn.textContent = 'Start Game';
  }
}

// Reset game state for a new game
function resetGameState() {
  // Clear story grid
  const storyGrid = document.getElementById('storyGrid');
  storyGrid.innerHTML = '';
  
  // Reset player hands
  for (let i = 0; i < 4; i++) {
    const hand = document.getElementById(`player${i + 1}Hand`);
    if (hand) {
      const handCards = hand.querySelectorAll('.handCard');
      handCards.forEach(card => {
        card.innerHTML = '';
        card.style.backgroundImage = '';
        card.style.border = '';
        card.dataset.cardId = '';
      });
    }
  }
  
  // Reset decks
  document.getElementById('mainDeck').innerHTML = '';
  document.getElementById('mainDiscard').innerHTML = '';
  document.getElementById('altDeck').innerHTML = '';
  document.getElementById('altDiscard').innerHTML = '';
  
  // Reset awards
  playerAwards = {};
  
  // Reset current superlative index
  currentSuperlativeIndex = 0;
  
  // Clear game state variables
  mainDeck = [];
  mainDiscard = [];
  altDeck = [];
  altDiscard = [];
  playerHands = [[], [], [], []];
  playerCharacters = [];
  playerTokens = [];
  playerNames = [];
  storyCards = [];
  objectiveCard = null;
  
  // Reset any locked UI states
  document.querySelectorAll('.disabled-setting').forEach(element => {
    element.classList.remove('disabled-setting');
  });
  
  // Reset any locked form fields
  document.querySelectorAll('input:disabled, select:disabled').forEach(element => {
    if (!element.classList.contains('setup-token-button')) { // Don't reset token buttons
      element.disabled = false;
    }
  });
}

// Reset setup screen to initial state
function resetSetupScreen() {
  // Reset player count to default
  const playerCountSelect = document.getElementById('playerCount');
  if (playerCountSelect) {
    playerCountSelect.value = '2';
    playerCount = 2;
    updatePlayerSetupVisibility();
  }
  
  // Reset objective selection
  const objectiveSelect = document.getElementById('objectiveSelect');
  if (objectiveSelect) {
    objectiveSelect.value = '';
  }
  
  // Reset scenes count
  const scenesCountInput = document.getElementById('scenesCount');
  if (scenesCountInput) {
    scenesCountInput.value = '10';
  }
  
  // Reset deck type selections to defaults
  const deckSwitches = document.querySelectorAll('.deck-switch-item');
  deckSwitches.forEach(switchItem => {
    const cardType = switchItem.dataset.cardType;
    let defaultPosition = 'main';
    
    if (cardType === 'objective') {
      defaultPosition = 'none';
    }
    
    // Reset visual state
    const knob = switchItem.querySelector('.deck-switch-knob');
    if (knob) {
      knob.className = `deck-switch-knob position-${defaultPosition}`;
    }
    
    // Reset active state
    const positions = switchItem.querySelectorAll('.deck-switch-position');
    positions.forEach(pos => {
      if (pos.dataset.position === defaultPosition) {
        pos.classList.add('active');
      } else {
        pos.classList.remove('active');
      }
    });
  });
  
  // Reset player names and character selections
  for (let i = 1; i <= 4; i++) {
    const nameInput = document.getElementById(`player${i}Name`);
    const characterSelect = document.getElementById(`player${i}Character`);
    
    if (nameInput) {
      nameInput.value = '';
    }
    
    if (characterSelect) {
      characterSelect.value = '';
    }
  }
  
  // Reset timer duration
  const timerMinutes = document.querySelectorAll('#timerMinutes');
  const timerSeconds = document.querySelectorAll('#timerSeconds');
  
  timerMinutes.forEach(input => {
    input.value = '2';
  });
  
  timerSeconds.forEach(input => {
    input.value = '0';
  });
}

// Initialize end game button when document is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize end game button
  initializeEndGameButton();
  
  // Test PNG transparency (uncomment to test)
  // testPngTransparency();
});

// Function to initialize the game board
function initializeGameBoard() {
  // This is a wrapper function that calls the appropriate initialization functions
  console.log('Initializing game board...');
  
  // Initialize player tokens
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

  // Initialize turn timer
  // Timer functionality has been removed
  
  // Initialize deck event listeners
  initializeDeckEventListeners();
  
  console.log('Game board initialized successfully');
}

// Function to test PNG transparency support
function testPngTransparency() {
  console.log('Testing PNG transparency support');
  
  // Create a test icon using PNG with transparency
  const testIcon = document.createElement('div');
  testIcon.style.position = 'absolute';
  testIcon.style.top = '200px';
  testIcon.style.left = '200px';
  testIcon.style.width = '100px';
  testIcon.style.height = '100px';
  testIcon.style.zIndex = '1000';
  testIcon.style.cursor = 'pointer';
  
  // Add the PNG image
  const iconImg = document.createElement('img');
  iconImg.src = 'assets/PNG/d20_back.png'; // Using existing PNG in the assets folder
  iconImg.style.width = '100%';
  iconImg.style.height = '100%';
  iconImg.alt = 'PNG Test Icon';
  
  // Add a click handler to remove the test icon
  testIcon.addEventListener('click', function() {
    this.remove();
  });
  
  // Append the image to the test icon
  testIcon.appendChild(iconImg);
  
  // Append the test icon to the game board
  document.getElementById('gameBoard').appendChild(testIcon);
}

// Function to add a PNG icon to the UI
function addPngIcon(iconPath, elementId, options = {}) {
  // Get default options
  const {
    width = '32px',
    height = '32px',
    position = 'relative',
    top = 'auto',
    left = 'auto',
    zIndex = 'auto',
    onClick = null
  } = options;

  // Get the target element
  const targetElement = document.getElementById(elementId);
  if (!targetElement) {
    console.error(`Element with ID "${elementId}" not found`);
    return null;
  }

  // Create icon container
  const iconContainer = document.createElement('div');
  iconContainer.className = 'png-icon';
  iconContainer.style.position = position;
  iconContainer.style.width = width;
  iconContainer.style.height = height;
  iconContainer.style.display = 'flex';
  iconContainer.style.justifyContent = 'center';
  iconContainer.style.alignItems = 'center';
  
  // Set positioning if provided
  if (top !== 'auto') iconContainer.style.top = top;
  if (left !== 'auto') iconContainer.style.left = left;
  if (zIndex !== 'auto') iconContainer.style.zIndex = zIndex;
  
  // Create and add the image
  const iconImg = document.createElement('img');
  iconImg.src = iconPath;
  iconImg.style.width = '100%';
  iconImg.style.height = '100%';
  iconImg.style.objectFit = 'contain';
  
  // Add click handler if provided
  if (onClick && typeof onClick === 'function') {
    iconContainer.style.cursor = 'pointer';
    iconContainer.addEventListener('click', onClick);
  }
  
  // Append the image to the container
  iconContainer.appendChild(iconImg);
  
  // Append the container to the target element
  targetElement.appendChild(iconContainer);
  
  return iconContainer;
}

// Toggle the notes tray
function toggleNotesTray(show) {
    const notesTray = document.getElementById('notesTray');
    
    if (show === undefined) {
        // Toggle current state
        notesTray.classList.toggle('open');
    } else if (show) {
        // Explicitly show
        notesTray.classList.add('open');
    } else {
        // Explicitly hide
        notesTray.classList.remove('open');
    }
    
    // Save the notes content when closing
    if (!notesTray.classList.contains('open')) {
        saveNotesContent();
    }
}

// Initialize the notes editor
function initializeNotesEditor() {
    const notesEditor = document.getElementById('notesEditor');
    
    // Load saved notes if available
    const savedNotes = localStorage.getItem('gameNotes');
    if (savedNotes) {
        notesEditor.innerHTML = savedNotes;
    }
    
    // Set empty attribute for placeholder styling
    updateNotesPlaceholder();
    
    // Add input event listener to track content changes
    notesEditor.addEventListener('input', () => {
        updateNotesPlaceholder();
    });
    
    // Setup toolbar functionality
    setupNotesToolbar();
}

// Setup the rich text editor toolbar
function setupNotesToolbar() {
    const buttons = document.querySelectorAll('.notes-toolbar button');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const command = button.dataset.command;
            
            if (command === 'createLink') {
                const url = prompt('Enter a URL:', 'https://');
                if (url) {
                    document.execCommand(command, false, url);
                }
            } else {
                document.execCommand(command, false, null);
            }
            
            // Update button states
            updateToolbarButtonStates();
        });
    });
    
    // Monitor editor selection changes to update toolbar button states
    document.getElementById('notesEditor').addEventListener('mouseup', updateToolbarButtonStates);
    document.getElementById('notesEditor').addEventListener('keyup', updateToolbarButtonStates);
}

// Update the toolbar button states based on current selection
function updateToolbarButtonStates() {
    const buttons = document.querySelectorAll('.notes-toolbar button');
    
    buttons.forEach(button => {
        const command = button.dataset.command;
        
        // Skip for undo/redo
        if (command === 'undo' || command === 'redo') return;
        
        try {
            const commandState = document.queryCommandState(command);
            
            if (commandState) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        } catch (e) {
            // Some commands might not support queryCommandState
            console.log(`Command ${command} doesn't support state query`);
        }
    });
}

// Update the placeholder attribute
function updateNotesPlaceholder() {
    const notesEditor = document.getElementById('notesEditor');
    if (notesEditor.textContent.trim() === '') {
        notesEditor.setAttribute('data-empty', 'true');
    } else {
        notesEditor.removeAttribute('data-empty');
    }
}

// Save notes content to localStorage
function saveNotesContent() {
    const notesEditor = document.getElementById('notesEditor');
    if (notesEditor) {
        localStorage.setItem('gameNotes', notesEditor.innerHTML || '');
        console.log('Notes saved');
    }
}

// Toggle the rules tray
function toggleRulesTray(show) {
    const rulesTray = document.getElementById('rulesTray');
    
    if (show === undefined) {
        // Toggle current state
        rulesTray.classList.toggle('open');
    } else if (show) {
        // Explicitly show
        rulesTray.classList.add('open');
    } else {
        // Explicitly hide
        rulesTray.classList.remove('open');
    }
}

// Add save notes when game is saved
function saveGame(saveName, saveType) {
    // Save the notes content first
    saveNotesContent();
    
    // Existing code follows...
}




