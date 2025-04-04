# Objective 1: Code Modularization

## Overview
The first objective is to split the monolithic `script.js` (7275 lines) into logical modules to improve maintainability, readability, and code organization.

## Target Modules
1. `cardManager.js`
2. `gameState.js`
3. `uiManager.js`
4. `playerManager.js`
5. `tokenSystem.js`
6. `saveSystem.js`
7. `eventHandlers.js`

## Implementation Strategy

### Phase 1: Analysis and Planning
1. Identify all functions and variables related to each module
2. Map dependencies between modules
3. Create interface definitions for each module
4. Plan the order of module extraction

### Phase 2: Module Extraction
For each module:
1. Create new file
2. Move related functions and variables
3. Update imports/exports
4. Test functionality
5. Update main script.js

### Phase 3: Integration
1. Update main script.js to use new modules
2. Test full application functionality
3. Fix any integration issues
4. Document new module structure

## Module-Specific Implementation Details

### 1. cardManager.js
Variables to move:
- `mainDeck`, `mainDiscard`, `altDeck`, `altDiscard`
- `draggedCard`, `highlightedCard`, `isDragging`
- `CARD_TYPES`, `NON_DECK_TYPES`

Functions to move:
- `shuffleArray()`
- `getDeckDistribution()`
- `removeCardFromSource()`
- `findCardById()`
- `drawCards()`
- `dealInitialCards()`
- `showAllCards()`

### 2. gameState.js
Variables to move:
- `gameStarted`
- `playerCount`
- `playerNames`
- `storyCards`
- `objectiveCard`

Functions to move:
- `startGame()`
- `resetGameState()`
- `startEndGameSequence()`
- `displayEndGameScreen()`
- `startSuperlativeVoting()`
- `nextSuperlative()`
- `recordVote()`

### 3. uiManager.js
Variables to move:
- `playerAwards`
- `currentSuperlativeIndex`

Functions to move:
- `showNotification()`
- `displayCharacterCards()`
- `displayAward()`
- `initializeGameBoard()`
- `updatePlayerSetupVisibility()`
- `resetSetupScreen()`

### 4. playerManager.js
Variables to move:
- `playerCharacters`
- `playerHands`

Functions to move:
- `setPlayerNameDefaults()`
- `initializeCardTypeDropdowns()`
- `updatePlayerCharacter()`
- `updateAvailableCharacters()`

### 5. tokenSystem.js
Variables to move:
- `MAX_TOKENS`
- `playerTokens`
- `selectedToken`

Functions to move:
- `initializePlayerTokens()`
- `updateTokenDisplay()`

### 6. saveSystem.js
Functions to move:
- `loadInstructions()`
- Any localStorage related functions
- State persistence functions

### 7. eventHandlers.js
Functions to move:
- `initializeDeckEventListeners()`
- `handleDragOver()`
- `handleDrop()`
- `handleDiscardDrop()`
- All event listener setup functions

## Dependencies Between Modules
1. cardManager.js
   - Depends on: gameState.js (for player count)
   - Used by: eventHandlers.js, uiManager.js

2. gameState.js
   - Depends on: playerManager.js, cardManager.js
   - Used by: all other modules

3. uiManager.js
   - Depends on: gameState.js, cardManager.js
   - Used by: eventHandlers.js

4. playerManager.js
   - Depends on: gameState.js
   - Used by: cardManager.js, uiManager.js

5. tokenSystem.js
   - Depends on: gameState.js
   - Used by: uiManager.js

6. saveSystem.js
   - Depends on: gameState.js
   - Used by: uiManager.js

7. eventHandlers.js
   - Depends on: all other modules
   - Used by: uiManager.js

## Success Criteria
- All code successfully moved to appropriate modules
- No functionality regressions
- Clear module interfaces
- Proper dependency management
- Maintained game functionality
- Improved code organization

## Risk Assessment
- High: Breaking existing functionality during extraction
- Medium: Module dependency conflicts
- Low: Performance impact

## Dependencies
- None (this is the first objective)

## Timeline
Estimated time: 2-3 days
- Day 1: Analysis and planning
- Day 2: Module extraction
- Day 3: Integration and testing

## Next Steps
1. Begin detailed analysis of script.js
2. Create function dependency map
3. Start with least dependent module first (tokenSystem.js)
4. Proceed with extraction one module at a time 

## Second Pass Evaluation

After a fresh analysis of the codebase, I've identified the following functions and variables for each module:

### 1. cardManager.js
Variables:
- `mainDeck`, `mainDiscard`, `altDeck`, `altDiscard` (deck data)
- `draggedCard`, `highlightedCard`, `isDragging` (card interaction state)
- `CARD_TYPES`, `NON_DECK_TYPES` (card type definitions)
- `cardData` (card data structure)

Functions:
- `shuffleArray()` (utility for shuffling decks)
- `getDeckSelections()` (gets current deck selections)
- `getDeckDistribution()` (gets deck distribution configuration)
- `removeCardFromSource()` (removes card from its source)
- `findCardById()` (finds a card by ID in all collections)
- `drawCards()` (draws cards from specified deck)
- `dealInitialCards()` (deals initial cards to players)
- `showAllCards()` (shows all cards in an overlay)
- `showAllObjectives()` (shows all objective cards)
- `showCardCollection()` (shows a collection of cards)
- `createCardElement()` (creates a card DOM element)
- `renderMainDeck()`, `renderMainDiscard()`, `renderAltDeck()`, `renderAltDiscard()` (renders deck elements)
- `placeObjectiveCard()` (places objective card in grid)
- `markFinalSceneSlot()` (marks final scene slot)

### 2. gameState.js
Variables:
- `gameStarted` (game state flag)
- `playerCount` (number of players)
- `playerNames` (array of player names)
- `gameState` (game state object)
- `playerAwards` (player awards)
- `currentSuperlativeIndex` (current superlative index)

Functions:
- `startGame()` (starts a new game)
- `resetGameState()` (resets game state)
- `startEndGameSequence()` (starts end game sequence)
- `displayEndGameScreen()` (displays end game screen)
- `startSuperlativeVoting()` (starts superlative voting)
- `nextSuperlative()` (moves to next superlative)
- `recordVote()` (records a vote for a player)
- `showEndGameConfirmation()` (shows end game confirmation)
- `updatePlayerName()` (updates player name)

### 3. uiManager.js
Variables:
- None identified in this pass

Functions:
- `showNotification()` (shows notification toast)
- `displayCharacterCards()` (displays character cards)
- `displayAward()` (displays award)
- `initializeGameBoard()` (initializes game board)
- `updatePlayerSetupVisibility()` (updates player setup visibility)
- `resetSetupScreen()` (resets setup screen)
- `showSettingsMenu()` (shows settings menu)
- `toggleNotesTray()` (toggles notes tray)
- `toggleRulesTray()` (toggles rules tray)
- `initializeNotesEditor()` (initializes notes editor)
- `disableGameSettings()` (disables game settings)
- `updatePlayerNameInUI()` (updates player name in UI)
- `updateInspector()` (updates card inspector)
- `checkTokenMax()` (checks token maximum)
- `updateTokenButtonStates()` (updates token button states)

### 4. playerManager.js
Variables:
- `playerCharacters` (player character assignments)
- `playerHands` (player hands)

Functions:
- `setPlayerNameDefaults()` (sets default player names)
- `initializeCardTypeDropdowns()` (initializes card type dropdowns)
- `updatePlayerCharacter()` (updates player character)
- `updateAvailableCharacters()` (updates available characters)
- `renderHands()` (renders player hands)
- `initializePlayerHands()` (initializes player hands)

### 5. tokenSystem.js
Variables:
- `MAX_TOKENS` (maximum tokens)
- `playerTokens` (player tokens)
- `selectedToken` (selected token)

Functions:
- `initializePlayerTokens()` (initializes player tokens)
- `updateTokenDisplay()` (updates token display)
- `handleTokenClick()` (handles token click)
- `handleArrowKeys()` (handles arrow key interactions)
- `handleTokenButtonClick()` (handles token button clicks)

### 6. saveSystem.js
Functions:
- `loadInstructions()` (loads instructions)
- `showSaveGameDialog()` (shows save game dialog)
- `showLoadGameDialog()` (shows load game dialog)
- `saveGameState()` (saves game state)
- `loadGameState()` (loads game state)
- `initializeBoardFromSave()` (initializes board from save)
- `checkAllInstructions()` (checks all instructions)

### 7. eventHandlers.js
Functions:
- `initializeDeckEventListeners()` (initializes deck event listeners)
- `initializeAltDeckEventListeners()` (initializes alt deck event listeners)
- `handleDragOver()` (handles drag over)
- `handleDrop()` (handles drop)
- `handleDiscardDrop()` (handles discard drop)
- `handleCardClick()` (handles card click)
- `handleCardDoubleClick()` (handles card double click)
- `handleCardDragStart()` (handles card drag start)
- `handleCardDragEnd()` (handles card drag end)
- `initializeMenuInteractions()` (initializes menu interactions)
- `initializeAltDeckCheckboxes()` (initializes alt deck checkboxes)
- `initializeEndGameButton()` (initializes end game button)
- `animateD20Roll()` (animates d20 roll)
- `selectRandomObjective()` (selects random objective)
- `shuffleDiscardIntoDeck()` (shuffles discard into deck)

### Additional Considerations
- The `DOMContentLoaded` event listener setup should be moved to a new `init.js` file
- Card rendering functions have significant DOM manipulation that could be separated
- Event handlers are tightly coupled with UI elements and game state
- Some functions like `initializeGameBoard()` call functions from multiple modules
- The `cardData` structure is used across multiple modules and should be moved to a separate config file

### Revised Module Dependencies
1. cardManager.js
   - Depends on: gameState.js, playerManager.js
   - Used by: eventHandlers.js, uiManager.js, gameState.js

2. gameState.js
   - Depends on: playerManager.js, cardManager.js
   - Used by: all other modules

3. uiManager.js
   - Depends on: gameState.js, cardManager.js, playerManager.js, tokenSystem.js
   - Used by: eventHandlers.js

4. playerManager.js
   - Depends on: gameState.js
   - Used by: cardManager.js, uiManager.js, gameState.js

5. tokenSystem.js
   - Depends on: gameState.js
   - Used by: uiManager.js, playerManager.js

6. saveSystem.js
   - Depends on: gameState.js, cardManager.js, playerManager.js
   - Used by: uiManager.js

7. eventHandlers.js
   - Depends on: all other modules
   - Used by: uiManager.js

8. init.js (new)
   - Depends on: all other modules
   - Used by: none (entry point) 

## Third Pass Evaluation

After a comprehensive analysis of the entire script.js file (7270 lines), I've identified the following functions and variables for each module:

### 1. cardManager.js
Variables:
- `mainDeck`, `mainDiscard`, `altDeck`, `altDiscard` (deck data)
- `draggedCard`, `highlightedCard`, `isDragging` (card interaction state)
- `CARD_TYPES`, `NON_DECK_TYPES` (card type definitions)
- `cardData` (card data structure)

Functions:
- `shuffleArray()` (utility for shuffling decks)
- `getDeckSelections()` (gets current deck selections)
- `getDeckDistribution()` (gets deck distribution configuration)
- `removeCardFromSource()` (removes card from its source)
- `findCardById()` (finds a card by ID in all collections)
- `drawCards()` (draws cards from specified deck)
- `dealInitialCards()` (deals initial cards to players)
- `showAllCards()` (shows all cards in an overlay)
- `showAllObjectives()` (shows all objective cards)
- `showCardCollection()` (shows a collection of cards)
- `createCardElement()` (creates a card DOM element)
- `renderMainDeck()`, `renderMainDiscard()`, `renderAltDeck()`, `renderAltDiscard()` (renders deck elements)
- `placeObjectiveCard()` (places objective card in grid)
- `markFinalSceneSlot()` (marks final scene slot)
- `shuffleDiscardIntoDeck()` (shuffles discard pile back into deck)

### 2. gameState.js
Variables:
- `gameStarted` (game state flag)
- `playerCount` (number of players)
- `playerNames` (array of player names)
- `gameState` (game state object)
- `playerAwards` (player awards)
- `currentSuperlativeIndex` (current superlative index)
- `storyCards` (story cards array)
- `objectiveCard` (objective card object)

Functions:
- `startGame()` (starts a new game)
- `resetGameState()` (resets game state)
- `startEndGameSequence()` (starts end game sequence)
- `displayEndGameScreen()` (displays end game screen)
- `startSuperlativeVoting()` (starts superlative voting)
- `nextSuperlative()` (moves to next superlative)
- `recordVote()` (records a vote for a player)
- `showEndGameConfirmation()` (shows end game confirmation)
- `updatePlayerName()` (updates player name)
- `selectRandomObjective()` (selects a random objective card)

### 3. uiManager.js
Variables:
- None identified in this pass

Functions:
- `showNotification()` (shows notification toast)
- `displayCharacterCards()` (displays character cards)
- `displayAward()` (displays award)
- `initializeGameBoard()` (initializes game board)
- `updatePlayerSetupVisibility()` (updates player setup visibility)
- `resetSetupScreen()` (resets setup screen)
- `showSettingsMenu()` (shows settings menu)
- `toggleNotesTray()` (toggles notes tray)
- `toggleRulesTray()` (toggles rules tray)
- `initializeNotesEditor()` (initializes notes editor)
- `disableGameSettings()` (disables game settings)
- `updatePlayerNameInUI()` (updates player name in UI)
- `updateInspector()` (updates card inspector)
- `checkTokenMax()` (checks token maximum)
- `updateTokenButtonStates()` (updates token button states)
- `animateD20Roll()` (animates d20 roll)

### 4. playerManager.js
Variables:
- `playerCharacters` (player character assignments)
- `playerHands` (player hands)

Functions:
- `setPlayerNameDefaults()` (sets default player names)
- `initializeCardTypeDropdowns()` (initializes card type dropdowns)
- `updatePlayerCharacter()` (updates player character)
- `updateAvailableCharacters()` (updates available characters)
- `renderHands()` (renders player hands)
- `initializePlayerHands()` (initializes player hands)
- `updatePlayerName()` (updates player name)

### 5. tokenSystem.js
Variables:
- `MAX_TOKENS` (maximum tokens)
- `playerTokens` (player tokens)
- `selectedToken` (selected token)

Functions:
- `initializePlayerTokens()` (initializes player tokens)
- `updateTokenDisplay()` (updates token display)
- `handleTokenClick()` (handles token click)
- `handleArrowKeys()` (handles arrow key interactions)
- `handleTokenButtonClick()` (handles token button clicks)
- `checkTokenMax()` (checks token maximum)
- `updateTokenButtonStates()` (updates token button states)

### 6. saveSystem.js
Functions:
- `loadInstructions()` (loads instructions)
- `showSaveGameDialog()` (shows save game dialog)
- `showLoadGameDialog()` (shows load game dialog)
- `saveGameState()` (saves game state)
- `loadGameState()` (loads game state)
- `initializeBoardFromSave()` (initializes board from save)
- `checkAllInstructions()` (checks all instructions)

### 7. eventHandlers.js
Functions:
- `initializeDeckEventListeners()` (initializes deck event listeners)
- `initializeAltDeckEventListeners()` (initializes alt deck event listeners)
- `handleDragOver()` (handles drag over)
- `handleDrop()` (handles drop)
- `handleDiscardDrop()` (handles discard drop)
- `handleCardClick()` (handles card click)
- `handleCardDoubleClick()` (handles card double click)
- `handleCardDragStart()` (handles card drag start)
- `handleCardDragEnd()` (handles card drag end)
- `initializeMenuInteractions()` (initializes menu interactions)
- `initializeAltDeckCheckboxes()` (initializes alt deck checkboxes)
- `initializeEndGameButton()` (initializes end game button)
- `handleEscKey()` (handles escape key press)

### 8. init.js (new)
Functions:
- `DOMContentLoaded` event listener setup
- `initializeGame()` (initializes the game)
- `debugGitHubPagesHosting()` (debugs GitHub Pages hosting)

### Additional Considerations
- The `DOMContentLoaded` event listener setup should be moved to a new `init.js` file
- Card rendering functions have significant DOM manipulation that could be separated
- Event handlers are tightly coupled with UI elements and game state
- Some functions like `initializeGameBoard()` call functions from multiple modules
- The `cardData` structure is used across multiple modules and should be moved to a separate config file
- The `CHARACTER_CARDS`, `OBJECTIVE_CARDS`, and `DECK_CARDS` constants should be moved to a separate config file
- The `createPlaceholderSVG()` function should be moved to a utility module

### Revised Module Dependencies
1. cardManager.js
   - Depends on: gameState.js, playerManager.js
   - Used by: eventHandlers.js, uiManager.js, gameState.js, saveSystem.js

2. gameState.js
   - Depends on: playerManager.js, cardManager.js
   - Used by: all other modules

3. uiManager.js
   - Depends on: gameState.js, cardManager.js, playerManager.js, tokenSystem.js
   - Used by: eventHandlers.js, init.js

4. playerManager.js
   - Depends on: gameState.js
   - Used by: cardManager.js, uiManager.js, gameState.js, saveSystem.js

5. tokenSystem.js
   - Depends on: gameState.js
   - Used by: uiManager.js, playerManager.js

6. saveSystem.js
   - Depends on: gameState.js, cardManager.js, playerManager.js
   - Used by: uiManager.js, init.js

7. eventHandlers.js
   - Depends on: all other modules
   - Used by: uiManager.js, init.js

8. init.js (new)
   - Depends on: all other modules
   - Used by: none (entry point)

9. config.js (new)
   - Depends on: none
   - Used by: all other modules

10. utils.js (new)
    - Depends on: none
    - Used by: all other modules 