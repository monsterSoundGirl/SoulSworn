# Function Dependencies Analysis

This document provides a detailed analysis of function dependencies in the SoulSworn codebase. For each function, we identify:

1. **1st Degree Dependencies**: Functions directly called by the target function
2. **2nd Degree Dependencies**: Functions called by the 1st degree dependencies

This analysis helps understand the call hierarchy and identify potential refactoring opportunities.

## Core Game Functions

### startGame()
- **1st Degree Dependencies**:
  - `getDeckSelections()`
  - `getDeckDistribution()`
  - `initializeGameBoard()`
  - `dealInitialCards()`
  - `placeObjectiveCard()`
  - `initializePlayerTokens()`
  - `updatePlayerSetupVisibility()`
  - `setPlayerNameDefaults()`
  - `updateAvailableCharacters()`
  - `initializeCardTypeDropdowns()`
  - `initializeDeckEventListeners()`
  - `initializeAltDeckEventListeners()`
  - `initializeEndGameButton()`
  - `initializeNotesEditor()`
  - `showNotification()`

- **2nd Degree Dependencies**:
  - `shuffleArray()`
  - `findCardById()`
  - `createCardElement()`
  - `renderMainDeck()`
  - `renderMainDiscard()`
  - `renderAltDeck()`
  - `renderAltDiscard()`
  - `handleDragOver()`
  - `handleDrop()`
  - `handleDiscardDrop()`
  - `handleCardClick()`
  - `handleCardDoubleClick()`
  - `handleCardDragStart()`
  - `handleCardDragEnd()`
  - `updateTokenDisplay()`
  - `checkTokenMax()`
  - `updateTokenButtonStates()`
  - `updatePlayerCharacter()`
  - `updatePlayerName()`

### resetGameState()
- **1st Degree Dependencies**:
  - `renderMainDeck()`
  - `renderMainDiscard()`
  - `renderAltDeck()`
  - `renderAltDiscard()`
  - `renderHands()`

- **2nd Degree Dependencies**:
  - `createCardElement()`
  - `handleDragOver()`
  - `handleDrop()`
  - `handleDiscardDrop()`
  - `handleCardClick()`
  - `handleCardDoubleClick()`
  - `handleCardDragStart()`
  - `handleCardDragEnd()`

### dealInitialCards()
- **1st Degree Dependencies**:
  - `renderMainDeck()`
  - `createCardElement()`

- **2nd Degree Dependencies**:
  - `handleDragOver()`
  - `handleDrop()`
  - `handleDiscardDrop()`
  - `handleCardClick()`
  - `handleCardDoubleClick()`
  - `handleCardDragStart()`
  - `handleCardDragEnd()`

## Card Management Functions

### drawCards()
- **1st Degree Dependencies**:
  - `findCardById()`
  - `createCardElement()`
  - `renderMainDeck()`
  - `renderAltDeck()`
  - `showNotification()`

- **2nd Degree Dependencies**:
  - `handleDragOver()`
  - `handleDrop()`
  - `handleDiscardDrop()`
  - `handleCardClick()`
  - `handleCardDoubleClick()`
  - `handleCardDragStart()`
  - `handleCardDragEnd()`

### findCardById()
- **1st Degree Dependencies**: None

- **2nd Degree Dependencies**: None

### createCardElement()
- **1st Degree Dependencies**:
  - `handleCardClick()`
  - `handleCardDoubleClick()`
  - `handleCardDragStart()`
  - `handleCardDragEnd()`

- **2nd Degree Dependencies**: None

### renderMainDeck()
- **1st Degree Dependencies**:
  - `createCardElement()`
  - `handleCardClick()`
  - `handleCardDoubleClick()`
  - `handleCardDragStart()`
  - `handleCardDragEnd()`

- **2nd Degree Dependencies**: None

### renderMainDiscard()
- **1st Degree Dependencies**:
  - `createCardElement()`
  - `handleCardClick()`
  - `handleCardDoubleClick()`
  - `handleCardDragStart()`
  - `handleCardDragEnd()`
  - `handleDragOver()`
  - `handleDiscardDrop()`

- **2nd Degree Dependencies**: None

### renderAltDeck()
- **1st Degree Dependencies**:
  - `createCardElement()`
  - `handleCardClick()`
  - `handleCardDoubleClick()`
  - `handleCardDragStart()`
  - `handleCardDragEnd()`

- **2nd Degree Dependencies**: None

### renderAltDiscard()
- **1st Degree Dependencies**:
  - `createCardElement()`
  - `handleCardClick()`
  - `handleCardDoubleClick()`
  - `handleCardDragStart()`
  - `handleCardDragEnd()`
  - `handleDragOver()`
  - `handleDiscardDrop()`

- **2nd Degree Dependencies**: None

### removeCardFromSource()
- **1st Degree Dependencies**: None

- **2nd Degree Dependencies**: None

### shuffleDiscardIntoDeck()
- **1st Degree Dependencies**:
  - `shuffleArray()`
  - `renderMainDeck()`
  - `renderMainDiscard()`
  - `renderAltDeck()`
  - `renderAltDiscard()`
  - `showNotification()`

- **2nd Degree Dependencies**:
  - `createCardElement()`
  - `handleCardClick()`
  - `handleCardDoubleClick()`
  - `handleCardDragStart()`
  - `handleCardDragEnd()`
  - `handleDragOver()`
  - `handleDiscardDrop()`

## Player Management Functions

### initializePlayerTokens()
- **1st Degree Dependencies**:
  - `updateTokenDisplay()`
  - `checkTokenMax()`
  - `updateTokenButtonStates()`

- **2nd Degree Dependencies**: None

### updateTokenDisplay()
- **1st Degree Dependencies**: None

- **2nd Degree Dependencies**: None

### handleTokenClick()
- **1st Degree Dependencies**: None

- **2nd Degree Dependencies**: None

### handleTokenButtonClick()
- **1st Degree Dependencies**:
  - `updateTokenDisplay()`
  - `checkTokenMax()`
  - `updateTokenButtonStates()`

- **2nd Degree Dependencies**: None

### setPlayerNameDefaults()
- **1st Degree Dependencies**: None

- **2nd Degree Dependencies**: None

### updatePlayerCharacter()
- **1st Degree Dependencies**:
  - `findCardById()`
  - `updateAvailableCharacters()`

- **2nd Degree Dependencies**: None

### updateAvailableCharacters()
- **1st Degree Dependencies**: None

- **2nd Degree Dependencies**: None

### renderHands()
- **1st Degree Dependencies**:
  - `createCardElement()`

- **2nd Degree Dependencies**:
  - `handleCardClick()`
  - `handleCardDoubleClick()`
  - `handleCardDragStart()`
  - `handleCardDragEnd()`

## Event Handler Functions

### initializeDeckEventListeners()
- **1st Degree Dependencies**:
  - `handleDragOver()`
  - `handleDrop()`
  - `handleDiscardDrop()`

- **2nd Degree Dependencies**: None

### initializeAltDeckEventListeners()
- **1st Degree Dependencies**:
  - `handleDragOver()`
  - `handleDrop()`
  - `handleDiscardDrop()`
  - `findCardById()`
  - `renderAltDeck()`

- **2nd Degree Dependencies**:
  - `createCardElement()`
  - `handleCardClick()`
  - `handleCardDoubleClick()`
  - `handleCardDragStart()`
  - `handleCardDragEnd()`

### handleDragOver()
- **1st Degree Dependencies**: None

- **2nd Degree Dependencies**: None

### handleDrop()
- **1st Degree Dependencies**:
  - `findCardById()`
  - `createCardElement()`
  - `removeCardFromSource()`
  - `renderMainDeck()`

- **2nd Degree Dependencies**:
  - `handleCardClick()`
  - `handleCardDoubleClick()`
  - `handleCardDragStart()`
  - `handleCardDragEnd()`

### handleDiscardDrop()
- **1st Degree Dependencies**:
  - `findCardById()`
  - `removeCardFromSource()`
  - `renderMainDiscard()`
  - `renderAltDiscard()`

- **2nd Degree Dependencies**:
  - `createCardElement()`
  - `handleCardClick()`
  - `handleCardDoubleClick()`
  - `handleCardDragStart()`
  - `handleCardDragEnd()`

### handleCardClick()
- **1st Degree Dependencies**:
  - `findCardById()`
  - `updateInspector()`

- **2nd Degree Dependencies**: None

### handleCardDoubleClick()
- **1st Degree Dependencies**: None

- **2nd Degree Dependencies**: None

### handleCardDragStart()
- **1st Degree Dependencies**: None

- **2nd Degree Dependencies**: None

### handleCardDragEnd()
- **1st Degree Dependencies**: None

- **2nd Degree Dependencies**: None

## UI Functions

### showNotification()
- **1st Degree Dependencies**: None

- **2nd Degree Dependencies**: None

### displayCharacterCards()
- **1st Degree Dependencies**:
  - `createCardElement()`

- **2nd Degree Dependencies**:
  - `handleCardClick()`
  - `handleCardDoubleClick()`
  - `handleCardDragStart()`
  - `handleCardDragEnd()`

### displayAward()
- **1st Degree Dependencies**: None

- **2nd Degree Dependencies**: None

### initializeGameBoard()
- **1st Degree Dependencies**:
  - `initializePlayerTokens()`
  - `handleDragOver()`
  - `handleDrop()`
  - `initializeDeckEventListeners()`

- **2nd Degree Dependencies**:
  - `updateTokenDisplay()`
  - `checkTokenMax()`
  - `updateTokenButtonStates()`
  - `createCardElement()`
  - `handleCardClick()`
  - `handleCardDoubleClick()`
  - `handleCardDragStart()`
  - `handleCardDragEnd()`

### updatePlayerSetupVisibility()
- **1st Degree Dependencies**:
  - `setPlayerNameDefaults()`
  - `updateAvailableCharacters()`

- **2nd Degree Dependencies**: None

### resetSetupScreen()
- **1st Degree Dependencies**:
  - `updatePlayerSetupVisibility()`
  - `setPlayerNameDefaults()`

- **2nd Degree Dependencies**:
  - `updateAvailableCharacters()`

### showSettingsMenu()
- **1st Degree Dependencies**: None

- **2nd Degree Dependencies**: None

### toggleNotesTray()
- **1st Degree Dependencies**: None

- **2nd Degree Dependencies**: None

### toggleRulesTray()
- **1st Degree Dependencies**: None

- **2nd Degree Dependencies**: None

### initializeNotesEditor()
- **1st Degree Dependencies**: None

- **2nd Degree Dependencies**: None

### disableGameSettings()
- **1st Degree Dependencies**: None

- **2nd Degree Dependencies**: None

### updatePlayerNameInUI()
- **1st Degree Dependencies**: None

- **2nd Degree Dependencies**: None

### updateInspector()
- **1st Degree Dependencies**: None

- **2nd Degree Dependencies**: None

### checkTokenMax()
- **1st Degree Dependencies**: None

- **2nd Degree Dependencies**: None

### updateTokenButtonStates()
- **1st Degree Dependencies**: None

- **2nd Degree Dependencies**: None

### animateD20Roll()
- **1st Degree Dependencies**: None

- **2nd Degree Dependencies**: None

## Game End Functions

### startEndGameSequence()
- **1st Degree Dependencies**:
  - `displayEndGameScreen()`
  - `startSuperlativeVoting()`

- **2nd Degree Dependencies**:
  - `displayCharacterCards()`
  - `createCardElement()`
  - `handleCardClick()`
  - `handleCardDoubleClick()`
  - `handleCardDragStart()`
  - `handleCardDragEnd()`
  - `displaySuperlativeVoting()`
  - `displayAward()`

### displayEndGameScreen()
- **1st Degree Dependencies**:
  - `displayCharacterCards()`

- **2nd Degree Dependencies**:
  - `createCardElement()`
  - `handleCardClick()`
  - `handleCardDoubleClick()`
  - `handleCardDragStart()`
  - `handleCardDragEnd()`

### startSuperlativeVoting()
- **1st Degree Dependencies**:
  - `displaySuperlativeVoting()`

- **2nd Degree Dependencies**:
  - `displayAward()`

### nextSuperlative()
- **1st Degree Dependencies**:
  - `displaySuperlativeVoting()`

- **2nd Degree Dependencies**:
  - `displayAward()`

### recordVote()
- **1st Degree Dependencies**:
  - `displayAward()`

- **2nd Degree Dependencies**: None

## Save System Functions

### loadInstructions()
- **1st Degree Dependencies**:
  - `checkAllInstructions()`

- **2nd Degree Dependencies**: None

### showSaveGameDialog()
- **1st Degree Dependencies**: None

- **2nd Degree Dependencies**: None

### showLoadGameDialog()
- **1st Degree Dependencies**: None

- **2nd Degree Dependencies**: None

### saveGameState()
- **1st Degree Dependencies**: None

- **2nd Degree Dependencies**: None

### loadGameState()
- **1st Degree Dependencies**:
  - `initializeBoardFromSave()`

- **2nd Degree Dependencies**:
  - `renderHands()`
  - `renderMainDeck()`
  - `renderMainDiscard()`
  - `renderAltDeck()`
  - `renderAltDiscard()`
  - `createCardElement()`
  - `handleDragOver()`
  - `handleDrop()`
  - `initializeDeckEventListeners()`
  - `handleCardClick()`
  - `handleCardDoubleClick()`
  - `handleCardDragStart()`
  - `handleCardDragEnd()`

### initializeBoardFromSave()
- **1st Degree Dependencies**:
  - `renderHands()`
  - `renderMainDeck()`
  - `renderMainDiscard()`
  - `renderAltDeck()`
  - `renderAltDiscard()`
  - `createCardElement()`
  - `handleDragOver()`
  - `handleDrop()`
  - `initializeDeckEventListeners()`

- **2nd Degree Dependencies**:
  - `handleCardClick()`
  - `handleCardDoubleClick()`
  - `handleCardDragStart()`
  - `handleCardDragEnd()`

### checkAllInstructions()
- **1st Degree Dependencies**: None

- **2nd Degree Dependencies**: None

## Utility Functions

### shuffleArray()
- **1st Degree Dependencies**: None

- **2nd Degree Dependencies**: None

### getDeckSelections()
- **1st Degree Dependencies**: None

- **2nd Degree Dependencies**: None

### getDeckDistribution()
- **1st Degree Dependencies**:
  - `getDeckSelections()`

- **2nd Degree Dependencies**: None

### initializeCardTypeDropdowns()
- **1st Degree Dependencies**:
  - `updatePlayerCharacter()`
  - `updateAvailableCharacters()`
  - `setPlayerNameDefaults()`

- **2nd Degree Dependencies**:
  - `findCardById()`

### initializeMenuInteractions()
- **1st Degree Dependencies**:
  - `initializeAltDeckCheckboxes()`
  - `updatePlayerSetupVisibility()`
  - `updatePlayerName()`
  - `initializeCardTypeDropdowns()`

- **2nd Degree Dependencies**:
  - `setPlayerNameDefaults()`
  - `updateAvailableCharacters()`
  - `findCardById()`

### initializeAltDeckCheckboxes()
- **1st Degree Dependencies**: None

- **2nd Degree Dependencies**: None

### initializeEndGameButton()
- **1st Degree Dependencies**:
  - `showEndGameConfirmation()`

- **2nd Degree Dependencies**: None

### showEndGameConfirmation()
- **1st Degree Dependencies**:
  - `startEndGameSequence()`

- **2nd Degree Dependencies**:
  - `displayEndGameScreen()`
  - `startSuperlativeVoting()`
  - `displayCharacterCards()`
  - `createCardElement()`
  - `handleCardClick()`
  - `handleCardDoubleClick()`
  - `handleCardDragStart()`
  - `handleCardDragEnd()`
  - `displaySuperlativeVoting()`
  - `displayAward()`

### selectRandomObjective()
- **1st Degree Dependencies**:
  - `shuffleArray()`
  - `placeObjectiveCard()`
  - `showNotification()`

- **2nd Degree Dependencies**: None

### placeObjectiveCard()
- **1st Degree Dependencies**:
  - `findCardById()`
  - `createCardElement()`
  - `markFinalSceneSlot()`

- **2nd Degree Dependencies**:
  - `handleCardClick()`
  - `handleCardDoubleClick()`
  - `handleCardDragStart()`
  - `handleCardDragEnd()`

### markFinalSceneSlot()
- **1st Degree Dependencies**: None

- **2nd Degree Dependencies**: None

### showAllCards()
- **1st Degree Dependencies**:
  - `createCardElement()`

- **2nd Degree Dependencies**:
  - `handleCardClick()`
  - `handleCardDoubleClick()`
  - `handleCardDragStart()`
  - `handleCardDragEnd()`

### showAllObjectives()
- **1st Degree Dependencies**:
  - `createCardElement()`

- **2nd Degree Dependencies**:
  - `handleCardClick()`
  - `handleCardDoubleClick()`
  - `handleCardDragStart()`
  - `handleCardDragEnd()`

### showCardCollection()
- **1st Degree Dependencies**:
  - `createCardElement()`

- **2nd Degree Dependencies**:
  - `handleCardClick()`
  - `handleCardDoubleClick()`
  - `handleCardDragStart()`
  - `handleCardDragEnd()`

## Dependency Analysis Insights

Based on this dependency analysis, we can identify several key insights:

1. **Core Functions with Many Dependencies**:
   - `startGame()` has the most dependencies, making it a critical function
   - `initializeGameBoard()` has significant dependencies
   - `loadGameState()` and `initializeBoardFromSave()` have many dependencies

2. **Utility Functions with No Dependencies**:
   - `shuffleArray()`
   - `findCardById()`
   - `updateTokenDisplay()`
   - `showNotification()`
   - These are good candidates for early extraction

3. **Functions with Circular Dependencies**:
   - Several UI and event handler functions have circular dependencies
   - This suggests tight coupling that should be addressed

4. **Functions with Many Second-Degree Dependencies**:
   - `startGame()`
   - `initializeGameBoard()`
   - `loadGameState()`
   - `initializeBoardFromSave()`
   - These functions have complex dependency chains

5. **Functions with Minimal Dependencies**:
   - `shuffleArray()`
   - `findCardById()`
   - `updateTokenDisplay()`
   - `showNotification()`
   - These are good candidates for early extraction

This dependency analysis will be valuable for planning the modularization of the codebase, as it helps identify which functions should be extracted first and how to manage dependencies between modules.

## Line-by-Line Analysis of script.js

### Lines 1-500 Analysis

In this section, we'll analyze the script.js file in 500-line chunks to ensure comprehensive coverage of all functions and their dependencies.

#### Global Variables and Constants (Lines 1-50)
- **Global State Variables**:
  - `mainDeck`, `mainDiscard`, `altDeck`, `altDiscard`: Arrays for deck management
  - `draggedCard`, `highlightedCard`, `isDragging`: Card interaction state
  - `playerCharacters`: Array for player character assignments
  - `playerCount`, `playerHands`, `gameStarted`, `playerNames`: Game state variables
  - `MAX_TOKENS`, `playerTokens`, `selectedToken`: Token management variables

- **Constants**:
  - `CARD_TYPES`: Object defining card types (ITEM, LOCATION, MONSTER, NPC, SPELL)
  - `NON_DECK_TYPES`: Object defining card types that don't go in the deck (CHARACTER, OBJECTIVE, CARD_BACK)

#### Functions (Lines 51-500)

##### shuffleArray(arr)
- **Purpose**: Randomizes the order of elements in an array
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: Multiple functions including `startGame()`, `selectRandomObjective()`, `shuffleDiscardIntoDeck()`

##### DOMContentLoaded Event Listener (Lines 70-150)
- **Purpose**: Initializes the application when the DOM is fully loaded
- **1st Degree Dependencies**:
  - `initializeMenuInteractions()`
  - `initializeDeckTypeSelection()`
  - `startGame()`
  - `disableGameSettings()`
  - `toggleNotesTray()`
  - `initializeNotesEditor()`
  - `showSettingsMenu()`
  - `showAllCards()`
  - `selectRandomObjective()`
  - `showSaveGameDialog()`
  - `showLoadGameDialog()`
  - `animateD20Roll()`
  - `drawCards()`
  - `shuffleDiscardIntoDeck()`

##### initializeMenuInteractions() (Lines 151-200)
- **Purpose**: Sets up menu UI interactions and event listeners
- **1st Degree Dependencies**:
  - `initializeAltDeckCheckboxes()`
  - `updatePlayerSetupVisibility()`
  - `updatePlayerName()`
  - `initializeCardTypeDropdowns()`
- **2nd Degree Dependencies**:
  - `initializeDeckTypeSelection()`
  - `setPlayerNameDefaults()`
  - `updateAvailableCharacters()`
  - `findCardById()`

##### initializeAltDeckCheckboxes() (Lines 201-205)
- **Purpose**: Initializes alt deck checkboxes (deprecated)
- **1st Degree Dependencies**:
  - `initializeDeckTypeSelection()`
- **2nd Degree Dependencies**: None

##### initializeDeckTypeSelection() (Lines 206-250)
- **Purpose**: Sets up deck type selection switches
- **1st Degree Dependencies**:
  - `logDeckSelections()`
- **2nd Degree Dependencies**: None

#### Dependencies in Lines 1-500

1. **Core Initialization Functions**:
   - `initializeMenuInteractions()` has the most dependencies in this section
   - `initializeDeckTypeSelection()` is called by multiple functions

2. **Self-Contained Functions**:
   - `shuffleArray()` has no dependencies
   - `initializeAltDeckCheckboxes()` is simple and has minimal dependencies

3. **Event Listeners**:
   - The DOMContentLoaded event listener sets up many function calls
   - Most event listeners call a single function

4. **Global State Impact**:
   - Many functions modify global state variables
   - This creates implicit dependencies between functions

This analysis of the first 500 lines reveals a pattern of initialization functions that set up the game state and event listeners. The code in this section is primarily focused on setup and initialization rather than core game logic.

### Lines 501-1000 Analysis

This section analyzes lines 501-1000 of script.js, focusing on card rendering, drag-and-drop functionality, and player token initialization.

#### Card Rendering Functions (Lines 501-600)

##### updateInspector(card)
- **Purpose**: Updates the card inspector with details of the selected card
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `handleCardClick()`, `renderMainDeck()`

##### renderMainDeck()
- **Purpose**: Renders the main deck in the UI
- **1st Degree Dependencies**:
  - `updateInspector()`
  - `showNotification()`
- **2nd Degree Dependencies**: None
- **Used By**: Multiple functions including `startGame()`, `drawCards()`, `shuffleDiscardIntoDeck()`

##### renderMainDiscard()
- **Purpose**: Renders the main discard pile in the UI
- **1st Degree Dependencies**:
  - `createCardElement()`
  - `handleDiscardDrop()`
- **2nd Degree Dependencies**:
  - `handleCardClick()`
  - `handleCardDoubleClick()`
  - `handleCardDragStart()`
  - `handleCardDragEnd()`
- **Used By**: Multiple functions including `startGame()`, `drawCards()`, `shuffleDiscardIntoDeck()`

#### Drag and Drop Functions (Lines 601-900)

##### handleDiscardDrop(event)
- **Purpose**: Handles dropping cards onto discard piles
- **1st Degree Dependencies**:
  - `findCardById()`
  - `removeCardFromSource()`
  - `renderMainDeck()`
  - `renderMainDiscard()`
  - `renderAltDeck()`
  - `renderAltDiscard()`
  - `showNotification()`
- **2nd Degree Dependencies**:
  - `createCardElement()`
  - `handleCardClick()`
  - `handleCardDoubleClick()`
  - `handleCardDragStart()`
  - `handleCardDragEnd()`
- **Used By**: `renderMainDiscard()`, `renderAltDiscard()`

##### removeCardFromSource(cardId)
- **Purpose**: Removes a card from its source location (hand, deck, etc.)
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `handleDiscardDrop()`, `handleDrop()`

##### handleDrop(event)
- **Purpose**: Handles dropping cards onto slots
- **1st Degree Dependencies**:
  - `createCardElement()`
  - `renderMainDeck()`
  - `renderAltDeck()`
  - `renderMainDiscard()`
  - `renderAltDiscard()`
- **2nd Degree Dependencies**:
  - `handleCardClick()`
  - `handleCardDoubleClick()`
  - `handleCardDragStart()`
  - `handleCardDragEnd()`
- **Used By**: `initializeDeckEventListeners()`, `initializeAltDeckEventListeners()`

#### Player Token Functions (Lines 901-1000)

##### initializePlayerTokens()
- **Purpose**: Initializes token state for each player
- **1st Degree Dependencies**:
  - `updateTokenDisplay()`
  - `checkTokenMax()`
  - `updateTokenButtonStates()`

- **2nd Degree Dependencies**: None

##### updateTokenDisplay()
- **Purpose**: Updates the display of a token with a new value
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `handleArrowKeys()`, `handleTokenButtonClick()`

##### handleTokenClick()
- **Purpose**: Handles token selection in the UI
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: Event listeners in `initializePlayerTokens()`

##### handleArrowKeys(event)
- **Purpose**: Handles arrow key interactions for token management
- **1st Degree Dependencies**:
  - `updateTokenDisplay()`
  - `checkTokenMax()`
- **2nd Degree Dependencies**: None
- **Used By**: Event listeners in `initializePlayerTokens()`

##### handleTokenButtonClick()
- **Purpose**: Handles token button clicks in setup
- **1st Degree Dependencies**:
  - `updateTokenButtonStates()`
- **2nd Degree Dependencies**: None
- **Used By**: `loadCharacterSetup()`

##### updateTokenButtonStates(playerIndex)
- **Purpose**: Updates button enabled/disabled states based on token values
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `handleTokenButtonClick()`, `loadCharacterSetup()`

##### applyTokenSetup()
- **Purpose**: Applies token values to the game board
- **1st Degree Dependencies**:
  - `updatePlayerTokenDisplay()`
- **2nd Degree Dependencies**: None
- **Used By**: `setupInstructionsOverlay()`

##### updatePlayerTokenDisplay(playerIndex, tokenType, value)
- **Purpose**: Updates a player's token display with the given value
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `applyTokenSetup()`

#### Dependencies in Lines 501-1000

1. **Card Rendering Functions**:
   - `renderMainDeck()` and `renderMainDiscard()` have significant dependencies
   - These functions handle both rendering and event binding

2. **Drag and Drop Functions**:
   - `handleDiscardDrop()` and `handleDrop()` have complex logic with many dependencies
   - These functions handle card movement between different game areas

3. **Player Token Functions**:
   - `initializePlayerTokens()` has dependencies on token-related utility functions
   - This function sets up the initial token state for players

4. **Event Binding**:
   - Many functions in this section bind event listeners to DOM elements
   - This creates tight coupling between UI and game logic

This analysis of lines 501-1000 reveals a focus on card rendering, drag-and-drop functionality, and player token initialization. The code in this section handles the visual representation of game elements and user interactions with those elements.

### Lines 1001-1500 Analysis

This section analyzes lines 1001-1500 of script.js, focusing on token management, card inspection, and card data definitions.

#### Token Management Functions (Lines 1001-1050)

##### handleTokenClick(event)
- **Purpose**: Handles token selection in the UI
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: Event listeners in `initializePlayerTokens()`

##### handleArrowKeys(event)
- **Purpose**: Handles arrow key interactions for token management
- **1st Degree Dependencies**:
  - `updateTokenDisplay()`
  - `checkTokenMax()`
- **2nd Degree Dependencies**: None
- **Used By**: Event listeners in `initializePlayerTokens()`

##### updateTokenDisplay(token, value)
- **Purpose**: Updates the display of a token with a new value
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `handleArrowKeys()`, `handleTokenButtonClick()`

##### checkTokenMax(token, total)
- **Purpose**: Checks if a player has reached the maximum token limit
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `handleArrowKeys()`, `handleTokenButtonClick()`

#### Card Inspection Functions (Lines 1051-1200)

##### updateInspector(card)
- **Purpose**: Updates the card inspector with details of the selected card
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `handleCardClick()`, `renderMainDeck()`

#### Fullscreen and Asset Management Functions (Lines 1201-1250)

##### getAssetPath(path)
- **Purpose**: Helper function to get asset path
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: Various functions that need to access assets

#### Card Data Definitions (Lines 1251-1500)

This section contains constant definitions for card data:
- `CARD_BACK_PATH`: Path to the card back image
- `CHARACTER_CARDS`: Array of character card definitions
- `OBJECTIVE_CARDS`: Array of objective card definitions
- `DECK_CARDS`: Object containing deck card definitions by type

These constants are used throughout the codebase to initialize the game state and render cards.

#### Dependencies in Lines 1001-1500

1. **Token Management Functions**:
   - `handleTokenClick()`, `handleArrowKeys()`, `updateTokenDisplay()`, and `checkTokenMax()` form a cohesive set of functions for token management
   - These functions have minimal dependencies on other functions

2. **Card Inspection Functions**:
   - `updateInspector()` is a self-contained function with no dependencies
   - It handles the complex UI logic for displaying card details

3. **Asset Management Functions**:
   - `getAssetPath()` is a simple utility function with no dependencies
   - It's used by various functions to access assets

4. **Card Data Definitions**:
   - The card data constants are used throughout the codebase
   - They define the structure and properties of all cards in the game

This analysis of lines 1001-1500 reveals a mix of UI interaction functions, utility functions, and data definitions. The code in this section is primarily focused on token management, card inspection, and defining the card data structure.

### Lines 1501-2000 Analysis

This section analyzes lines 1501-2000 of script.js, focusing on card data definitions and NPC card definitions.

#### Card Data Definitions (Lines 1501-1750)

This section continues the card data definitions from the previous section, focusing on item cards:
- `item`: Array of item card definitions, each with properties like `id`, `name`, `type`, `imageUrl`, and `faceUp`
- These item cards are used throughout the codebase to initialize the game state and render cards

#### NPC Card Definitions (Lines 1751-2000)

This section contains NPC card definitions:
- `NPC`: Array of NPC card definitions, each with properties like `id`, `name`, `type`, `imageUrl`, and `faceUp`
- These NPC cards are used throughout the codebase to initialize the game state and render cards

#### Dependencies in Lines 1501-2000

1. **Card Data Definitions**:
   - The item and NPC card definitions are used throughout the codebase
   - They define the structure and properties of all cards in the game

2. **No Function Definitions**:
   - This section does not contain any function definitions
   - It is purely focused on data definitions

This analysis of lines 1501-2000 reveals a continuation of card data definitions, specifically for item and NPC cards. The code in this section is primarily focused on defining the structure and properties of these cards, which are used throughout the codebase to initialize the game state and render cards.

### Lines 2001-2500 Analysis

This section analyzes lines 2001-2500 of script.js, focusing on card data definitions, image preloading, and deck initialization functions.

#### Card Data Definitions (Lines 2001-2250)

This section continues the card data definitions from the previous section, focusing on NPC and spell cards:
- `NPC`: Array of NPC card definitions, each with properties like `id`, `name`, `type`, `imageUrl`, and `faceUp`
- `spell`: Array of spell card definitions, each with properties like `id`, `name`, `type`, `imageUrl`, and `faceUp`
- These card definitions are used throughout the codebase to initialize the game state and render cards

#### Image Preloading and Card Data Loading Functions (Lines 2251-2350)

##### preloadImage(url)
- **Purpose**: Preloads an image from a URL
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `loadAllCards()`, `loadCardDataFromJson()`

##### loadCardDataFromJson()
- **Purpose**: Loads card data from a JSON file
- **1st Degree Dependencies**:
  - `getAssetPath()`
  - `preloadImage()`
- **2nd Degree Dependencies**: None
- **Used By**: `loadAllCards()`

#### Deck Initialization Functions (Lines 2351-2500)

##### loadAllCards()
- **Purpose**: Loads all card data and initializes the game state
- **1st Degree Dependencies**:
  - `preloadImage()`
  - `loadCardDataFromJson()`
  - `getAssetPath()`
  - `getDeckDistribution()`
  - `shuffleArray()`
  - `renderMainDeck()`
  - `renderMainDiscard()`
  - `renderAltDeck()`
  - `renderAltDiscard()`
  - `initializeAltDeckEventListeners()`
- **2nd Degree Dependencies**:
  - `createTestDeck()`
- **Used By**: `initializeDecks()`

##### initializeDecks()
- **Purpose**: Initializes all decks with loaded cards
- **1st Degree Dependencies**:
  - `loadAllCards()`
  - `getDeckDistribution()`
  - `shuffleArray()`
  - `renderMainDeck()`
  - `renderMainDiscard()`
  - `renderAltDeck()`
  - `renderAltDiscard()`
  - `initializeAltDeckEventListeners()`
- **2nd Degree Dependencies**:
  - `preloadImage()`
  - `loadCardDataFromJson()`
  - `getAssetPath()`
  - `createTestDeck()`
- **Used By**: `startGame()`

#### Dependencies in Lines 2001-2500

1. **Card Data Definitions**:
   - The NPC and spell card definitions are used throughout the codebase
   - They define the structure and properties of all cards in the game

2. **Image Preloading and Card Data Loading Functions**:
   - `preloadImage()` and `loadCardDataFromJson()` handle loading card data and images
   - These functions have minimal dependencies

3. **Deck Initialization Functions**:
   - `loadAllCards()` and `initializeDecks()` have significant dependencies
   - These functions handle loading and initializing the game state

This analysis of lines 2001-2500 reveals a mix of card data definitions, image preloading functions, and deck initialization functions. The code in this section is primarily focused on loading and initializing the game state.

### Lines 2501-3000 Analysis

This section analyzes lines 2501-3000 of script.js, focusing on deck rendering, event handling, and game initialization functions.

#### Deck Rendering Functions (Lines 2501-2650)

##### renderAltDeck()
- **Purpose**: Renders the alternate deck in the UI
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `initializeDecks()`, `loadAllCards()`

##### renderAltDiscard()
- **Purpose**: Renders the alternate discard pile in the UI
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `initializeDecks()`, `loadAllCards()`

#### Event Handling Functions (Lines 2651-2850)

##### initializeAltDeckEventListeners()
- **Purpose**: Initializes event listeners for the alternate deck
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `initializeDecks()`, `loadAllCards()`

##### handleAltDiscardDrop(event)
- **Purpose**: Handles dropping cards onto the alternate discard pile
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `initializeAltDeckEventListeners()`

#### Game Initialization Functions (Lines 2851-3000)

##### createTestDeck()
- **Purpose**: Creates a test deck for fallback when no real cards are found
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `initializeDecks()`, `loadAllCards()`

##### startGame()
- **Purpose**: Initializes the game with selected player count and character selections
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `initializeDecks()`, `loadAllCards()`

#### Dependencies in Lines 2501-3000

1. **Deck Rendering Functions**:
   - `renderAltDeck()` and `renderAltDiscard()` handle rendering the alternate deck and discard pile
   - These functions have minimal dependencies

2. **Event Handling Functions**:
   - `initializeAltDeckEventListeners()` and `handleAltDiscardDrop()` manage event interactions
   - These functions have minimal dependencies

3. **Game Initialization Functions**:
   - `createTestDeck()` and `startGame()` handle game setup and initialization
   - These functions have minimal dependencies

This analysis of lines 2501-3000 reveals a mix of deck rendering, event handling, and game initialization functions. The code in this section is primarily focused on managing the game state and user interactions.

### Lines 3001-3500 Analysis

This section analyzes lines 3001-3500 of script.js, focusing on game initialization, deck event handling, and card rendering functions.

#### Game Initialization Functions (Lines 3001-3150)

##### startGame()
- **Purpose**: Initializes the game with selected player count and character selections
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `initializeDecks()`, `loadAllCards()`

#### Deck Event Handling Functions (Lines 3151-3300)

##### initializeDeckEventListeners()
- **Purpose**: Initializes event listeners for the main deck and discard pile
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `startGame()`

#### Card Rendering Functions (Lines 3301-3500)

##### renderHands()
- **Purpose**: Renders the player hands in the UI
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `startGame()`

##### handleDragOver(event)
- **Purpose**: Handles drag over events for card interactions
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `initializeDeckEventListeners()`

##### createCardElement(card, isInspector = false)
- **Purpose**: Creates a card element for the UI
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `renderHands()`, `renderAltDeck()`, `renderAltDiscard()`

##### handleCardClick(event)
- **Purpose**: Handles card click events
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `createCardElement()`

#### Dependencies in Lines 3001-3500

1. **Game Initialization Functions**:
   - `startGame()` has significant dependencies, handling game setup and initialization
   - It relies on multiple functions to load card data, initialize decks, and render the game state

2. **Deck Event Handling Functions**:
   - `initializeDeckEventListeners()` manages event interactions for the main deck and discard pile
   - These functions have minimal dependencies

3. **Card Rendering Functions**:
   - `renderHands()`, `handleDragOver()`, `createCardElement()`, and `handleCardClick()` handle rendering and interactions
   - These functions have minimal dependencies

This analysis of lines 3001-3500 reveals a mix of game initialization, deck event handling, and card rendering functions. The code in this section is primarily focused on managing the game state and user interactions.

### Lines 3501-4000 Analysis

This section analyzes lines 3501-4000 of script.js, focusing on card interaction functions, game state management, and UI overlay functions.

#### Card Interaction Functions (Lines 3501-3650)

##### handleCardDoubleClick(event)
- **Purpose**: Handles card double-click events for flipping cards
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `createCardElement()`

##### handleCardDragStart(event)
- **Purpose**: Handles the start of card drag events
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `createCardElement()`

##### handleCardDragEnd(event)
- **Purpose**: Handles the end of card drag events
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `createCardElement()`

#### Game State Management Functions (Lines 3651-3800)

##### dealInitialCards(cardsPerPlayer)
- **Purpose**: Deals initial cards to all players
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `startGame()`

##### placeObjectiveCard(objectiveCard, slotIndex)
- **Purpose**: Places the objective card in the specified grid slot
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `startGame()`

#### UI Overlay Functions (Lines 3801-4000)

##### showAllCards()
- **Purpose**: Shows all cards in a popup overlay for selection
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `placeCardInNextEmptySlot()`

##### placeCardInNextEmptySlot(card)
- **Purpose**: Places a card in the next empty slot in the story grid
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `showAllCards()`

##### showAllObjectives()
- **Purpose**: Shows all objective cards in a popup overlay
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `placeCardInNextEmptySlot()`

#### Dependencies in Lines 3501-4000

1. **Card Interaction Functions**:
   - `handleCardDoubleClick()`, `handleCardDragStart()`, and `handleCardDragEnd()` manage card interactions
   - These functions have minimal dependencies

2. **Game State Management Functions**:
   - `dealInitialCards()` and `placeObjectiveCard()` handle game state management
   - These functions have minimal dependencies

3. **UI Overlay Functions**:
   - `showAllCards()`, `placeCardInNextEmptySlot()`, and `showAllObjectives()` manage UI overlays
   - These functions have minimal dependencies

This analysis of lines 3501-4000 reveals a mix of card interaction, game state management, and UI overlay functions. The code in this section is primarily focused on managing user interactions and game state.

### Lines 4001-4500 Analysis

This section analyzes lines 4001-4500 of script.js, focusing on UI overlay functions, settings menu functions, and objective card management functions.

#### UI Overlay Functions (Lines 4001-4150)

##### showAllObjectives()
- **Purpose**: Shows all objective cards in a popup overlay
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `placeCardInNextEmptySlot()`

#### Settings Menu Functions (Lines 4151-4300)

##### showSettingsMenu()
- **Purpose**: Shows settings menu with card browser options
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `showCardCollection()`

##### showCardCollection(cards, collectionTitle)
- **Purpose**: Shows a collection of cards in a grid view
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `showSettingsMenu()`

#### Objective Card Management Functions (Lines 4301-4500)

##### selectRandomObjective()
- **Purpose**: Selects a random objective card and displays it in the inspector
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `replaceCurrentObjective()`

##### replaceCurrentObjective(newObjectiveCard)
- **Purpose**: Replaces the current objective card in the game grid with a new objective card
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `selectRandomObjective()`

#### Dependencies in Lines 4001-4500

1. **UI Overlay Functions**:
   - `showAllObjectives()` manages displaying objective cards in a popup overlay
   - These functions have minimal dependencies

2. **Settings Menu Functions**:
   - `showSettingsMenu()` and `showCardCollection()` manage the settings menu and card collections
   - These functions have minimal dependencies

3. **Objective Card Management Functions**:
   - `selectRandomObjective()` and `replaceCurrentObjective()` handle objective card selection and replacement
   - These functions have minimal dependencies

This analysis of lines 4001-4500 reveals a mix of UI overlay, settings menu, and objective card management functions. The code in this section is primarily focused on managing user interactions and game state.

### Lines 4501-5000 Analysis

This section analyzes lines 4501-5000 of script.js, focusing on save and load game functions, notification functions, and card utility functions.

#### Save and Load Game Functions (Lines 4501-4650)

##### showSaveGameDialog()
- **Purpose**: Shows the save game dialog
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `saveGame()`

##### saveGame(saveName, saveType)
- **Purpose**: Saves the current game state
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `showSaveGameDialog()`

#### Notification Functions (Lines 4651-4750)

##### showNotification(message, type = 'info')
- **Purpose**: Shows a notification toast
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `saveGame()`, `showSaveGameDialog()`

#### Card Utility Functions (Lines 4751-5000)

##### findCardById(cardId)
- **Purpose**: Finds a card by its ID in all available card collections
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `saveGame()`

##### showLoadGameDialog()
- **Purpose**: Shows the load game dialog
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `loadGame()`

#### Dependencies in Lines 4501-5000

1. **Save and Load Game Functions**:
   - `showSaveGameDialog()` and `saveGame()` manage saving the game state
   - These functions have minimal dependencies

2. **Notification Functions**:
   - `showNotification()` manages displaying notifications
   - These functions have minimal dependencies

3. **Card Utility Functions**:
   - `findCardById()` and `showLoadGameDialog()` handle card utilities and loading
   - These functions have minimal dependencies

This analysis of lines 4501-5000 reveals a mix of save and load game functions, notification functions, and card utility functions. The code in this section is primarily focused on managing game state persistence and user notifications.

### Lines 5001-5500 Analysis

This section analyzes lines 5001-5500 of script.js, focusing on load game dialog functions, game loading functions, and debug utility functions.

#### Load Game Dialog Functions (Lines 5001-5250)

##### showLoadGameDialog()
- **Purpose**: Shows the load game dialog with browser saves and JSON paste options
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `loadGame()`

#### Game Loading Functions (Lines 5251-5400)

##### loadGame(saveDataJson)
- **Purpose**: Loads a game from save data
- **1st Degree Dependencies**:
  - `initializeBoardFromSave()`
  - `renderHands()`
  - `renderMainDeck()`
  - `renderMainDiscard()`
  - `renderAltDeck()`
  - `renderAltDiscard()`
  - `showNotification()`
- **2nd Degree Dependencies**:
  - `createCardElement()`
  - `handleDragOver()`
  - `handleDrop()`
  - `initializeDeckEventListeners()`
  - `handleCardClick()`
  - `handleCardDoubleClick()`
  - `handleCardDragStart()`
  - `handleCardDragEnd()`
- **Used By**: `showLoadGameDialog()`

##### initializeBoardFromSave(saveData)
- **Purpose**: Initializes the game board from save data
- **1st Degree Dependencies**:
  - `renderHands()`
  - `renderMainDeck()`
  - `renderMainDiscard()`
  - `renderAltDeck()`
  - `renderAltDiscard()`
  - `createCardElement()`
  - `handleDragOver()`
  - `handleDrop()`
  - `initializeDeckEventListeners()`
- **2nd Degree Dependencies**:
  - `handleCardClick()`
  - `handleCardDoubleClick()`
  - `handleCardDragStart()`
  - `handleCardDragEnd()`
- **Used By**: `loadGame()`

#### Debug Utility Functions (Lines 5401-5500)

##### showImageDebugWindow()
- **Purpose**: Shows a debug window with all image paths
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: None (debug function)

#### Dependencies in Lines 5001-5500

1. **Load Game Dialog Functions**:
   - `showLoadGameDialog()` manages displaying the load game dialog with browser saves and JSON paste options
   - This function has minimal dependencies

2. **Game Loading Functions**:
   - `loadGame()` and `initializeBoardFromSave()` handle loading game state from save data
   - These functions have significant dependencies on rendering and event handling functions

3. **Debug Utility Functions**:
   - `showImageDebugWindow()` is a debug utility function with no dependencies
   - This function is not used by other functions in the codebase

This analysis of lines 5001-5500 reveals a mix of load game dialog functions, game loading functions, and debug utility functions. The code in this section is primarily focused on managing game state loading and debugging.

### Lines 5501-6000 Analysis

This section analyzes lines 5501-6000 of script.js, focusing on debug utility functions, animation functions, game settings functions, and player management functions.

#### Debug Utility Functions (Lines 5501-5550)

##### showImageDebugWindow() (continued)
- **Purpose**: Shows a debug window with all image paths
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: None (debug function)

#### Animation Functions (Lines 5551-5650)

##### animateD20Roll()
- **Purpose**: Animates a D20 dice roll
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: None (event handler)

#### Game Settings Functions (Lines 5651-5750)

##### disableGameSettings(disabled)
- **Purpose**: Disables or enables game settings during gameplay
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `startGame()`, `loadGame()`

#### Player Management Functions (Lines 5751-5900)

##### updatePlayerCharacter(playerIndex, characterId)
- **Purpose**: Updates a player's character during gameplay
- **1st Degree Dependencies**:
  - `renderHands()`
  - `showNotification()`
- **2nd Degree Dependencies**:
  - `createCardElement()`
  - `handleCardClick()`
  - `handleCardDoubleClick()`
  - `handleCardDragStart()`
  - `handleCardDragEnd()`
- **Used By**: `updatePlayerName()`

##### drawCards(deckType)
- **Purpose**: Draws cards from the specified deck
- **1st Degree Dependencies**:
  - `createCardElement()`
  - `renderMainDeck()`
  - `renderAltDeck()`
  - `showNotification()`
- **2nd Degree Dependencies**:
  - `handleCardClick()`
  - `handleCardDoubleClick()`
  - `handleCardDragStart()`
  - `handleCardDragEnd()`
- **Used By**: None (event handler)

##### shuffleDiscardIntoDeck(deckType)
- **Purpose**: Shuffles the discard pile into the deck
- **1st Degree Dependencies**:
  - `shuffleArray()`
  - `renderMainDeck()`
  - `renderMainDiscard()`
  - `renderAltDeck()`
  - `renderAltDiscard()`
  - `showNotification()`
- **2nd Degree Dependencies**:
  - `createCardElement()`
  - `handleCardClick()`
  - `handleCardDoubleClick()`
  - `handleCardDragStart()`
  - `handleCardDragEnd()`
- **Used By**: None (event handler)

#### UI Management Functions (Lines 5901-6000)

##### updatePlayerSetupVisibility()
- **Purpose**: Shows/hides player setup sections based on player count
- **1st Degree Dependencies**:
  - `setPlayerNameDefaults()`
  - `updateAvailableCharacters()`
- **2nd Degree Dependencies**: None
- **Used By**: `initializeMenuInteractions()`

##### updatePlayerName(playerIndex, newName)
- **Purpose**: Updates a player's name in game state and UI
- **1st Degree Dependencies**:
  - `updatePlayerNameInUI()`
- **2nd Degree Dependencies**: None
- **Used By**: `updatePlayerCharacter()`

##### updatePlayerNameInUI(playerIndex)
- **Purpose**: Updates a player's name in the UI
- **1st Degree Dependencies**:
  - `renderHands()`
- **2nd Degree Dependencies**:
  - `createCardElement()`
  - `handleCardClick()`
  - `handleCardDoubleClick()`
  - `handleCardDragStart()`
  - `handleCardDragEnd()`
- **Used By**: `updatePlayerName()`

##### markFinalSceneSlot(slotIndex)
- **Purpose**: Marks the final scene slot with a label
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `placeObjectiveCard()`

##### loadInstructions()
- **Purpose**: Loads instructions for the game
- **1st Degree Dependencies**:
  - `checkAllInstructions()`
  - `loadCharacterSetup()`
- **2nd Degree Dependencies**: None
- **Used By**: `startGame()`

##### loadCharacterSetup()
- **Purpose**: Loads character setup in the instructions overlay
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `loadInstructions()`

#### Dependencies in Lines 5501-6000

1. **Debug and Animation Functions**:
   - `showImageDebugWindow()` and `animateD20Roll()` are utility functions with no dependencies
   - These functions are primarily used for debugging and UI enhancement

2. **Game Settings Functions**:
   - `disableGameSettings()` manages the state of game settings during gameplay
   - This function has minimal dependencies

3. **Player Management Functions**:
   - `updatePlayerCharacter()`, `drawCards()`, and `shuffleDiscardIntoDeck()` handle player and card management
   - These functions have significant dependencies on rendering and notification functions

4. **UI Management Functions**:
   - `updatePlayerSetupVisibility()`, `updatePlayerName()`, `updatePlayerNameInUI()`, and `markFinalSceneSlot()` manage UI elements
   - These functions have varying levels of dependencies

5. **Instructions Functions**:
   - `loadInstructions()` and `loadCharacterSetup()` handle loading game instructions
   - These functions have minimal dependencies

This analysis of lines 5501-6000 reveals a mix of debug utilities, animations, game settings, player management, and UI management functions. The code in this section is primarily focused on managing game settings, player interactions, and UI elements.

### Lines 6001-6500 Analysis

This section analyzes lines 6001-6500 of script.js, focusing on character setup functions, token management functions, and end game sequence functions.

#### Character Setup Functions (Lines 6001-6150)

##### loadCharacterSetup() (continued)
- **Purpose**: Loads character setup in the instructions overlay
- **1st Degree Dependencies**:
  - `handleTokenButtonClick()`
  - `updateTokenButtonStates()`
- **2nd Degree Dependencies**: None
- **Used By**: `loadInstructions()`

#### Token Management Functions (Lines 6151-6300)

##### handleTokenButtonClick(event)
- **Purpose**: Handles token button clicks in setup
- **1st Degree Dependencies**:
  - `updateTokenButtonStates()`
- **2nd Degree Dependencies**: None
- **Used By**: `loadCharacterSetup()`

##### updateTokenButtonStates(playerIndex)
- **Purpose**: Updates button enabled/disabled states based on token values
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `handleTokenButtonClick()`, `loadCharacterSetup()`

##### applyTokenSetup()
- **Purpose**: Applies token values to the game board
- **1st Degree Dependencies**:
  - `updatePlayerTokenDisplay()`
- **2nd Degree Dependencies**: None
- **Used By**: `setupInstructionsOverlay()`

##### updatePlayerTokenDisplay(playerIndex, tokenType, value)
- **Purpose**: Updates a player's token display with the given value
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `applyTokenSetup()`

#### Instructions Overlay Functions (Lines 6301-6350)

##### setupInstructionsOverlay()
- **Purpose**: Sets up the instructions overlay
- **1st Degree Dependencies**:
  - `loadInstructions()`
  - `applyTokenSetup()`
- **2nd Degree Dependencies**:
  - `updatePlayerTokenDisplay()`
- **Used By**: `startGame()`

#### End Game Sequence Functions (Lines 6351-6500)

##### checkAllInstructions()
- **Purpose**: Checks if all instruction checkboxes are checked
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `loadInstructions()`

##### initializeEndGameButton()
- **Purpose**: Initializes the end game button
- **1st Degree Dependencies**:
  - `showEndGameConfirmation()`
- **2nd Degree Dependencies**:
  - `startEndGameSequence()`
  - `displayEndGameScreen()`
  - `startSuperlativeVoting()`
- **Used By**: `startGame()`

##### showEndGameConfirmation()
- **Purpose**: Shows confirmation dialog for ending the game
- **1st Degree Dependencies**:
  - `startEndGameSequence()`
- **2nd Degree Dependencies**:
  - `displayEndGameScreen()`
  - `startSuperlativeVoting()`
- **Used By**: `initializeEndGameButton()`

##### startEndGameSequence()
- **Purpose**: Starts the end game sequence
- **1st Degree Dependencies**:
  - `displayEndGameScreen()`
  - `startSuperlativeVoting()`
- **2nd Degree Dependencies**:
  - `displayCharacterCards()`
- **Used By**: `showEndGameConfirmation()`

##### displayEndGameScreen()
- **Purpose**: Displays the end game screen with character cards
- **1st Degree Dependencies**:
  - `displayCharacterCards()`
- **2nd Degree Dependencies**: None
- **Used By**: `startEndGameSequence()`

##### displayCharacterCards()
- **Purpose**: Displays character cards on the end game screen
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `displayEndGameScreen()`

#### Dependencies in Lines 6001-6500

1. **Character Setup Functions**:
   - `loadCharacterSetup()` manages the character setup interface
   - This function has dependencies on token management functions

2. **Token Management Functions**:
   - `handleTokenButtonClick()`, `updateTokenButtonStates()`, `applyTokenSetup()`, and `updatePlayerTokenDisplay()` handle token management
   - These functions have minimal dependencies

3. **Instructions Overlay Functions**:
   - `setupInstructionsOverlay()` manages the instructions overlay
   - This function has dependencies on token management functions

4. **End Game Sequence Functions**:
   - `initializeEndGameButton()`, `showEndGameConfirmation()`, `startEndGameSequence()`, `displayEndGameScreen()`, and `displayCharacterCards()` handle the end game sequence
   - These functions have varying levels of dependencies

This analysis of lines 6001-6500 reveals a mix of character setup, token management, instructions overlay, and end game sequence functions. The code in this section is primarily focused on managing character setup, token management, and the end game sequence.

### Lines 7001-7275 Analysis

This section analyzes lines 7001-7275 of script.js, focusing on UI utility functions, notes management functions, and debugging functions.

#### UI Utility Functions (Lines 7001-7100)

##### addPngIcon(iconPath, elementId, options) (continued)
- **Purpose**: Adds a PNG icon to the UI
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: None (utility function)

#### Notes Management Functions (Lines 7101-7200)

##### toggleNotesTray(show)
- **Purpose**: Toggles the notes tray
- **1st Degree Dependencies**:
  - `saveNotesContent()`
- **2nd Degree Dependencies**: None
- **Used By**: None (event handler)

##### initializeNotesEditor()
- **Purpose**: Initializes the notes editor
- **1st Degree Dependencies**:
  - `updateNotesPlaceholder()`
  - `setupNotesToolbar()`
- **2nd Degree Dependencies**:
  - `updateToolbarButtonStates()`
- **Used By**: None (initialization function)

##### setupNotesToolbar()
- **Purpose**: Sets up the rich text editor toolbar
- **1st Degree Dependencies**:
  - `updateToolbarButtonStates()`
- **2nd Degree Dependencies**: None
- **Used By**: `initializeNotesEditor()`

##### updateToolbarButtonStates()
- **Purpose**: Updates the toolbar button states based on current selection
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `setupNotesToolbar()`

##### updateNotesPlaceholder()
- **Purpose**: Updates the placeholder attribute
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `initializeNotesEditor()`

##### saveNotesContent()
- **Purpose**: Saves notes content to localStorage
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: `toggleNotesTray()`, `saveGame()`

#### Rules Tray Functions (Lines 7201-7250)

##### toggleRulesTray(show)
- **Purpose**: Toggles the rules tray
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: None (event handler)

#### Game Save Functions (Lines 7251-7275)

##### saveGame(saveName, saveType)
- **Purpose**: Saves the game state
- **1st Degree Dependencies**:
  - `saveNotesContent()`
- **2nd Degree Dependencies**: None
- **Used By**: None (event handler)

#### Debugging Functions (Lines 7276-7275)

##### debugGitHubPagesHosting()
- **Purpose**: Debugs GitHub Pages hosting
- **1st Degree Dependencies**: None
- **2nd Degree Dependencies**: None
- **Used By**: None (debug function)

#### Dependencies in Lines 7001-7275

1. **UI Utility Functions**:
   - `addPngIcon()` is a utility function with no dependencies
   - This function is primarily used for UI enhancement

2. **Notes Management Functions**:
   - `toggleNotesTray()`, `initializeNotesEditor()`, `setupNotesToolbar()`, `updateToolbarButtonStates()`, `updateNotesPlaceholder()`, and `saveNotesContent()` handle notes management
   - These functions have varying levels of dependencies

3. **Rules Tray Functions**:
   - `toggleRulesTray()` manages the rules tray
   - This function has no dependencies

4. **Game Save Functions**:
   - `saveGame()` handles game state saving
   - This function has dependencies on notes management functions

5. **Debugging Functions**:
   - `debugGitHubPagesHosting()` is a debug function with no dependencies
   - This function is primarily used for debugging

This analysis of lines 7001-7275 reveals a mix of UI utilities, notes management, rules tray, game save, and debugging functions. The code in this section is primarily focused on managing UI elements, notes, and debugging.

## Summary Analysis and Optimization Recommendations

After analyzing the function dependencies across the entire codebase using both function-by-function analysis and line-by-line analysis, we can draw several important conclusions to guide future optimization efforts.

### High-Risk Functions (Complex Dependency Trees)

The following functions have extensive dependency trees and should be modified with extreme caution:

1. **`startGame()`**
   - Has the most complex dependency tree in the codebase
   - Directly calls 15+ other functions
   - Has 20+ second-degree dependencies
   - Modifies multiple aspects of the game state
   - Risk Level: **VERY HIGH**

2. **`loadGame()` and `initializeBoardFromSave()`**
   - Complex dependency chains involving rendering and event binding
   - Heavily coupled with the game state structure
   - Any changes to these functions could break save/load functionality
   - Risk Level: **HIGH**

3. **`renderMainDeck()`, `renderMainDiscard()`, `renderAltDeck()`, `renderAltDiscard()`**
   - Called by numerous functions throughout the codebase
   - Handle both rendering and event binding
   - Changes could affect multiple game systems
   - Risk Level: **HIGH**

4. **`createCardElement()`**
   - Used extensively throughout the codebase
   - Handles card creation, styling, and event binding
   - Called by almost all rendering functions
   - Risk Level: **HIGH**

5. **`handleDrop()` and `handleDiscardDrop()`**
   - Complex event handling with multiple dependencies
   - Directly modify game state
   - Affect core gameplay mechanics
   - Risk Level: **HIGH**

### Strategic Optimization Targets (High Impact Potential)

These functions represent "root" dependencies that, if optimized, would have significant positive effects throughout the codebase:

1. **`createCardElement()`**
   - Called by nearly every rendering function
   - Performance improvements here would cascade throughout the application
   - Potential Improvement: Separate rendering from event binding
   - Impact Level: **VERY HIGH**

2. **`shuffleArray()`**
   - Used in multiple game state initialization and manipulation functions
   - Optimizing for performance would improve load times and game responsiveness
   - Impact Level: **MEDIUM-HIGH**

3. **`findCardById()`**
   - Used throughout the codebase for card lookups
   - Optimization could significantly improve performance
   - Potential Improvement: Implement indexing or caching
   - Impact Level: **HIGH**

4. **`showNotification()`**
   - Called by many functions across the codebase
   - Standardizing notification handling would improve UX consistency
   - Impact Level: **MEDIUM**

5. **`renderHands()`**
   - Central to game state visualization
   - Optimizing this could significantly improve rendering performance
   - Impact Level: **HIGH**

### Functions with Circular Dependencies

The following functions exhibit circular dependencies that should be addressed:

1. **Card Rendering and Event Handling**
   - `createCardElement()` ↔ `handleCardClick()`/`handleCardDoubleClick()`/etc.
   - Recommendation: Separate rendering logic from event handling

2. **Deck Rendering and Interaction**
   - `renderMainDeck()`/`renderAltDeck()` ↔ `initializeDeckEventListeners()`
   - Recommendation: Implement a more modular event binding system

3. **Token Management**
   - `initializePlayerTokens()` ↔ `updateTokenDisplay()`/`checkTokenMax()`
   - Recommendation: Refactor token management into a self-contained module

### Global State Dependencies

Many functions rely on global state variables, creating implicit dependencies:

1. **Game State Variables**
   - `mainDeck`, `mainDiscard`, `altDeck`, `altDiscard`
   - `playerHands`, `playerCharacters`, `playerCount`, `playerNames`
   - Recommendation: Encapsulate related state in objects or implement a state management pattern

2. **UI State Variables**
   - `draggedCard`, `highlightedCard`, `isDragging`
   - Recommendation: Isolate UI state from game logic state

### Modularization Recommendations

Based on this analysis, here are recommended modularization targets:

1. **Card Management Module**
   - Extract card creation, rendering, and event handling
   - Functions: `createCardElement()`, `handleCardClick()`, etc.

2. **Deck Management Module**
   - Extract deck rendering and interaction logic
   - Functions: `renderMainDeck()`, `renderAltDiscard()`, etc.

3. **Game State Module**
   - Encapsulate game state variables and manipulation
   - Functions: `startGame()`, `resetGameState()`, etc.

4. **Player Management Module**
   - Extract player-related state and functions
   - Functions: `initializePlayerTokens()`, `updatePlayerCharacter()`, etc.

5. **UI Utilities Module**
   - Extract pure UI functions
   - Functions: `showNotification()`, `toggleNotesTray()`, etc.

6. **Save/Load Module**
   - Extract save/load functionality
   - Functions: `saveGame()`, `loadGame()`, etc.

### Dependency Reduction Strategy

To reduce the overall complexity of function dependencies, we recommend:

1. **Function Decomposition**
   - Split complex functions like `startGame()` into smaller, more focused functions
   - Example: Separate initialization, rendering, and event binding

2. **Dependency Injection**
   - Pass dependencies as parameters rather than relying on global state
   - Makes testing easier and dependencies more explicit

3. **Event-Driven Architecture**
   - Implement a simple pub/sub system to decouple event handling
   - Reduces direct function calls between components

4. **State Management Pattern**
   - Implement a centralized state store with controlled access
   - Reduces implicit dependencies through global state

By following these recommendations, we can significantly reduce the complexity of the codebase, making it more maintainable, testable, and easier to extend in the future. 