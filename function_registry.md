# FUNCTION REGISTRY

**------READ-ONLY SECTION START------**

## Purpose
This registry documents all significant functions in the codebase, their purposes, parameters, return values, and crucially, their dependency relationships with other functions. This helps maintain code clarity and aids in understanding the impact of changes.

## Documentation Standards
1. Each function entry must include:
   - Function name and location
   - Creation/last modified timestamp
   - Purpose description
   - Parameters and return value
   - Function dependencies (calls to other functions)
   - Reverse dependencies (functions that call this function)
   - Usage context

2. Format entries consistently:
   ```
   ## functionName(param1, param2) → returnType
   - **File:** path/to/file.js
   - **Created:** YYYY-MM-DD
   - **Last Modified:** YYYY-MM-DD
   - **Purpose:** Brief description of what the function does
   
   ### Parameters:
   - `param1` (type): Description
   - `param2` (type): Description
   
   ### Returns:
   - (returnType): Description of return value
   
   ### Dependencies:
   - **Calls:** otherFunction1(), otherFunction2()
   - **Uses State:** stateVariable1, stateVariable2
   
   ### Called By:
   - parentFunction1()
   - parentFunction2()
   
   ### Notes:
   - Any additional information, edge cases, or special considerations
   ```

3. Group functions by file/module
4. Maintain the dependency relationships when functions are modified
5. Update both direct function entries and any entries that list the function as a dependency
6. Include a "Function Impact Map" for core functions that visualizes dependency chains

**------READ-ONLY SECTION END------**

# FUNCTIONS BY FILE

## js/state.js

### moveCard(sourceType, sourceId, targetType, targetId) → boolean
- **File:** js/state.js
- **Created:** 2025-04-01
- **Last Modified:** 2025-04-09
- **Purpose:** Moves a card from a source location to a target location in the game state

### Parameters:
- `sourceType` (string): Type of source location ('hand', 'slot', 'character', 'mutable')
- `sourceId` (string): ID of the source location
- `targetType` (string): Type of target location ('hand', 'slot', 'character', 'mutable', 'discard')
- `targetId` (string): ID of the target location

### Returns:
- (boolean): True if move was successful, false otherwise

### Dependencies:
- **Calls:** None directly
- **Uses State:** GameState.players, GameState.boardSlots

### Called By:
- handleCardDrop() in js/main.js

### Notes:
- Handles multiple types of card movements in the game
- Manages state updates when cards are moved between different zones

## js/components/Card.js

### createCardElement(cardId, manifestKey, slotId) → HTMLElement
- **File:** js/components/Card.js  
- **Created:** 2025-04-01
- **Last Modified:** 2025-04-09
- **Purpose:** Creates a card DOM element with proper styling and data attributes

### Parameters:
- `cardId` (string): Visual ID of the card (e.g., "mirrorSnap")
- `manifestKey` (string): Key used in state arrays (e.g., "spell_6")
- `slotId` (string): ID of the slot this card belongs to (optional)

### Returns:
- (HTMLElement): The created card DOM element

### Dependencies:
- **Calls:** None directly
- **Uses State:** None directly, relies on card-manifest.json indirectly

### Called By:
- renderPlayerHand() in js/components/PlayerHand.js
- renderCharacterSlot() in js/components/CharacterSlot.js
- renderStoryGrid() in js/components/StoryGrid.js
- renderGameBoard() in js/components/GameBoard.js

### Notes:
- Sets up drag functionality for cards
- Ensures correct data is passed during drag operations
- Critical for drag-and-drop card functionality

## js/main.js

### setupEventListeners() → void
- **File:** js/main.js
- **Created:** 2025-04-01
- **Last Modified:** 2025-04-11
- **Purpose:** Sets up global event listeners for drag-and-drop using event delegation attached to the main game container (#game-container). Handles drag start, drag over, and drop events for cards and slots efficiently.

### Parameters:
- None

### Returns:
- (void)

### Dependencies:
- **Calls:** moveCard(), renderGameBoard()
- **Uses State:** None directly

### Called By:
- Initial setup in js/main.js

### Notes:
- Uses event delegation on `#game-container` for efficiency.
- Handles `dragstart`, `dragover`, and `drop` events.
- Parses JSON data from transfer during drag operations.
- Updates the game state and re-renders after successful moves.
- Identifies event targets using `event.target.closest()`.

## js/utils.js

### createSlotElement(slotId, slotType, playerId, coords) → HTMLElement
- **File:** js/utils.js
- **Created:** 2025-04-11
- **Last Modified:** 2025-04-10
- **Purpose:** Creates a standard slot DOM element with appropriate classes and data attributes.

### Parameters:
- `slotId` (string): The unique ID for the slot.
- `slotType` (string): The type of slot (e.g., 'hand', 'grid', 'character', 'deck', 'discard', 'mutable').
- `playerId` (string|null): The player ID ('player1', 'player2') if applicable, otherwise null.
- `coords` (object): An object with X and Y coordinates for positioning (used for validation).

### Returns:
- (HTMLElement): The created slot DOM element.

### Dependencies:
- **Calls:** None
- **Uses State:** None

### Called By:
- renderPlayerHand() in js/components/PlayerHand.js
- renderStoryGrid() in js/components/StoryGrid.js
- renderCharacterSlot() in js/components/CharacterSlot.js
- renderDeckPile() in js/components/DeckPile.js
- renderGameBoard() in js/components/GameBoard.js

### Notes:
- Throws error if required parameters are missing.
- Adds `.game-slot` class and type-specific class (e.g., `.hand-slot`).
- Adds `data-player-id` and `data-slot-type` attributes.

### positionElement(element, coords) → void
- **File:** js/utils.js
- **Created:** 2025-04-11
- **Last Modified:** 2025-04-10
- **Purpose:** Applies absolute positioning to a DOM element based on coordinates.

### Parameters:
- `element` (HTMLElement): The DOM element to position.
- `coords` (object): An object with numeric `X` and `Y` coordinates.

### Returns:
- (void)

### Dependencies:
- **Calls:** None
- **Uses State:** None

### Called By:
- renderPlayerHand() in js/components/PlayerHand.js
- renderStoryGrid() in js/components/StoryGrid.js
- renderCharacterSlot() in js/components/CharacterSlot.js
- renderDeckPile() in js/components/DeckPile.js
- renderGameBoard() in js/components/GameBoard.js

### Notes:
- Throws error if parameters are invalid.
- Uses `coords.X` and `coords.Y` (uppercase).

### handleElementError(message, fallback) → any
- **File:** js/utils.js
- **Created:** 2025-04-11
- **Last Modified:** 2025-04-10
- **Purpose:** Logs an error message and optionally returns a fallback value.

### Parameters:
- `message` (string): The error message to log.
- `fallback` (any, optional): Fallback value to return (defaults to null).

### Returns:
- (any): The provided fallback value.

### Dependencies:
- **Calls:** None
- **Uses State:** None

### Called By:
- renderPlayerHand() in js/components/PlayerHand.js
- renderStoryGrid() in js/components/StoryGrid.js
- renderCharacterSlot() in js/components/CharacterSlot.js
- renderDeckPile() in js/components/DeckPile.js
- renderGameBoard() in js/components/GameBoard.js

### Notes:
- Currently logs to console.error.

## js/components/GameBoard.js

### renderGameBoard() → void
- **File:** js/components/GameBoard.js
- **Created:** 2025-04-01
- **Last Modified:** 2025-04-10
- **Purpose:** Renders the complete game board by orchestrating calls to individual component renderers and handling mutable slots.

### Parameters:
- None

### Returns:
- (void)

### Dependencies:
- **Calls:** 
    - getState() in js/state.js
    - renderPlayerHand() in js/components/PlayerHand.js
    - renderCharacterSlot() in js/components/CharacterSlot.js
    - renderStoryGrid() in js/components/StoryGrid.js
    - renderDeckPile() in js/components/DeckPile.js
    - createSlotElement() in js/utils.js
    - positionElement() in js/utils.js
    - createCardElement() in js/components/Card.js
    - handleElementError() in js/utils.js
- **Uses State:** GameState.boardSlots, GameState.uiCoordinates, GameState.allCards

### Called By:
- Initial setup in js/main.js
- drop event handler in js/main.js

### Notes:
- Clears previous dynamic elements (.game-slot, .card-image) before rendering.
- Renders player hands, character slots, story grid, deck piles by calling respective functions.
- Renders mutable slots directly using utility functions.

<!-- Add new function entries ABOVE this line -->