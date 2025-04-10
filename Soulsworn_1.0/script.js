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

// The shuffleArray function has been moved to utils.js

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

    // Add event listeners for deck and discard rendering
    EventSystem.subscribe('ui:renderDeck', (data) => {
        if (data.deckType === 'main') {
            renderMainDeck();
        } else if (data.deckType === 'alt') {
            renderAltDeck();
        }
    });
    
    EventSystem.subscribe('ui:renderDiscard', (data) => {
        if (data.deckType === 'main') {
            renderMainDiscard();
        } else if (data.deckType === 'alt') {
            renderAltDiscard();
        }
    });
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
                EventSystem.publish('ui:renderDeck', { deckType: isMainDiscard ? 'main' : 'alt' });
                EventSystem.publish('ui:renderDiscard', { deckType: isMainDiscard ? 'main' : 'alt' });
                
                // Show visual feedback
                NotificationService.show(`Card moved to ${isMainDiscard ? 'main' : 'alt'} discard pile`, 'info');
            }
        } else {
            // Wrong discard pile for this deck
            NotificationService.show('Cards can only be discarded to their corresponding discard pile', 'error');
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
            NotificationService.show('Card data not found', 'error');
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
            NotificationService.show(`${cardType} cards belong in the Alt discard pile`, 'error');
            return;
        }
        
        if (isAltDiscard && deckDistribution.main.includes(cardType)) {
            NotificationService.show(`${cardType} cards belong in the Main discard pile`, 'error');
            return;
        }
        
        // Now handle discarding the card from its source
        if (removeCardFromSource(cardId)) {
            // Make a copy of the card to avoid reference issues
            const cardCopy = {...card, faceUp: true}; // Cards in discard are always face up
            
            // Add card to appropriate discard pile
            if (isMainDiscard) {
                mainDiscard.push(cardCopy);
                EventSystem.publish('ui:renderDiscard', { deckType: 'main' });
            } else {
                altDiscard.push(cardCopy);
                EventSystem.publish('ui:renderDiscard', { deckType: 'alt' });
            }
            
            // Remove card element from its original location
            draggedCard.remove();
            
            // Show feedback
            NotificationService.show(`Card discarded to ${isMainDiscard ? 'main' : 'alt'} discard pile`, 'info');
        } else {
            NotificationService.show('Failed to remove card from its source', 'error');
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
        
        // Update the deck display by publishing an event
        EventSystem.publish('ui:renderDeck', { deck: 'main' });
        // renderMainDeck();
        
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
        
        // Update the alt deck display by publishing an event
        EventSystem.publish('ui:renderDeck', { deck: 'alt' });
        // renderAltDeck();
        
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
        
        // Update the discard display by publishing an event
        EventSystem.publish('ui:renderDiscard', { deck: 'main' });
        // renderMainDiscard();
        
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
        
        // Update the alt discard display by publishing an event
        EventSystem.publish('ui:renderDiscard', { deck: 'alt' });
        // renderAltDiscard();
        
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

// Card back path
const CARD_BACK_PATH = 'assets/JPG/cards/nonDeck/card_back/cardBack.jpg';

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
