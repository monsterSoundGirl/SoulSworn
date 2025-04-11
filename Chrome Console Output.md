# Chrome Console Output

## 2025-04-11, 10:47 AM

DEBUG: SoulSworn application initializing...
state.js:455 [Refactor] Initialized new GameState.cardSlots with 72 null entries.
state.js:481 [Compatibility] Prepared old deck IDs: Main 44, Alt 33
state.js:512 [Refactor] Initialized and shuffled new decks: Main 44 objects, Alt 33 objects.
main.js:28 DEBUG: Game state initialized.
main.js:29 DEBUG: GameState after init: {allCards: {…}, uiCoordinates: {…}, cardSlots: {…}, mainDeck: Array(44), mainDiscard: Array(0), …}
main.js:32 DEBUG: Drawing initial hands...
state.js:568 [drawCard] Player 1 attempting to draw 5 cards from mainDeck.
state.js:601 [drawCard] Player 1 drew card item_23 to slot PLAYER1_HAND1
state.js:601 [drawCard] Player 1 drew card item_2 to slot PLAYER1_HAND2
state.js:601 [drawCard] Player 1 drew card item_11 to slot PLAYER1_HAND3
state.js:601 [drawCard] Player 1 drew card item_31 to slot PLAYER1_HAND4
state.js:601 [drawCard] Player 1 drew card spell_3 to slot PLAYER1_HAND5
state.js:614 [drawCard] Player 1 finished drawing 5 cards.
state.js:568 [drawCard] Player 2 attempting to draw 5 cards from mainDeck.
state.js:601 [drawCard] Player 2 drew card item_29 to slot PLAYER2_HAND1
state.js:601 [drawCard] Player 2 drew card item_10 to slot PLAYER2_HAND2
state.js:601 [drawCard] Player 2 drew card item_12 to slot PLAYER2_HAND3
state.js:601 [drawCard] Player 2 drew card spell_2 to slot PLAYER2_HAND4
state.js:601 [drawCard] Player 2 drew card item_1 to slot PLAYER2_HAND5
state.js:614 [drawCard] Player 2 finished drawing 5 cards.
state.js:568 [drawCard] Player 3 attempting to draw 5 cards from mainDeck.
state.js:601 [drawCard] Player 3 drew card item_20 to slot PLAYER3_HAND1
state.js:601 [drawCard] Player 3 drew card item_21 to slot PLAYER3_HAND2
state.js:601 [drawCard] Player 3 drew card item_18 to slot PLAYER3_HAND3
state.js:601 [drawCard] Player 3 drew card item_4 to slot PLAYER3_HAND4
state.js:601 [drawCard] Player 3 drew card spell_12 to slot PLAYER3_HAND5
state.js:614 [drawCard] Player 3 finished drawing 5 cards.
state.js:568 [drawCard] Player 4 attempting to draw 5 cards from mainDeck.
state.js:601 [drawCard] Player 4 drew card item_27 to slot PLAYER4_HAND1
state.js:601 [drawCard] Player 4 drew card spell_9 to slot PLAYER4_HAND2
state.js:601 [drawCard] Player 4 drew card item_3 to slot PLAYER4_HAND3
state.js:601 [drawCard] Player 4 drew card item_15 to slot PLAYER4_HAND4
state.js:601 [drawCard] Player 4 drew card item_17 to slot PLAYER4_HAND5
state.js:614 [drawCard] Player 4 finished drawing 5 cards.
main.js:37 DEBUG: Initial hands drawn.
main.js:39 DEBUG: Player1 hand: []
main.js:40 DEBUG: Player2 hand: []
main.js:53 DEBUG: Calling renderGameBoard()...
GameBoard.js:57 DEBUG: renderGameBoard started
GameBoard.js:67 DEBUG: Clearing existing elements from game container
GameBoard.js:69 DEBUG: Found 0 elements to remove
GameBoard.js:74 DEBUG: Rendering player hands
PlayerHand.js:48 DEBUG: renderPlayerHand called for player 1
PlayerHand.js:68 DEBUG: Found 5 hand slots for player1 in cardSlots: (5) ['PLAYER1_HAND1', 'PLAYER1_HAND2', 'PLAYER1_HAND3', 'PLAYER1_HAND4', 'PLAYER1_HAND5']
PlayerHand.js:79 DEBUG: Rendering hand slot PLAYER1_HAND1
PlayerHand.js:85 DEBUG: Coords for PLAYER1_HAND1: {W: 80, H: 144, X: 408, Y: 32, LABEL: 'PLAYER1_HAND1'}
PlayerHand.js:92 DEBUG: Card for slot PLAYER1_HAND1, cardData from cardSlots: {id: 'item_23', name: 'ricetteDiFamiglia', imageUrl: 'assets/jpg/cards/item/items_ricetteDiFamiglia.jpg', type: 'item', faceUp: true}
PlayerHand.js:104 DEBUG: Calling renderSlotWithCard for PLAYER1_HAND1
renderUtils.js:157 DEBUG: renderSlotWithCard for PLAYER1_HAND1, type=hand, playerId=player1
renderUtils.js:167 DEBUG: Successfully created and styled slot PLAYER1_HAND1
renderUtils.js:180 renderSlotWithCard: Missing manifestKey for card item_23 in slot PLAYER1_HAND1. Card will not be draggable.
renderSlotWithCard @ renderUtils.js:180
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:75
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:183 DEBUG: Rendering card for slot PLAYER1_HAND1: item_23 (manifestKey: undefined)
utils.js:106 Error: renderCardElement: Missing manifestKey for card item_23 in slot PLAYER1_HAND1
handleElementError @ utils.js:106
validateRenderData @ renderUtils.js:68
renderCardElement @ renderUtils.js:101
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:75
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:102 Missing manifestKey for card in slot PLAYER1_HAND1. This is required for drag operations.
renderCardElement @ renderUtils.js:102
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:75
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:191 DEBUG: Failed to render card item_23 into slot PLAYER1_HAND1
renderSlotWithCard @ renderUtils.js:191
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:75
(anonymous) @ main.js:54Understand this errorAI
utils.js:106 Error: renderSlotWithCard: Failed to render card item_23 into slot PLAYER1_HAND1. Slot created but card failed.
handleElementError @ utils.js:106
renderSlotWithCard @ renderUtils.js:192
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:75
(anonymous) @ main.js:54Understand this errorAI
PlayerHand.js:117 DEBUG: Successfully created hand slot element for PLAYER1_HAND1
PlayerHand.js:122 DEBUG: Appended hand slot element PLAYER1_HAND1 to game container
PlayerHand.js:79 DEBUG: Rendering hand slot PLAYER1_HAND2
PlayerHand.js:85 DEBUG: Coords for PLAYER1_HAND2: {W: 80, H: 144, X: 496, Y: 32, LABEL: 'PLAYER1_HAND2'}
PlayerHand.js:92 DEBUG: Card for slot PLAYER1_HAND2, cardData from cardSlots: {id: 'item_2', name: 'atlantianDisc', imageUrl: 'assets/jpg/cards/item/items_atlantianDisc.jpg', type: 'item', faceUp: true}
PlayerHand.js:104 DEBUG: Calling renderSlotWithCard for PLAYER1_HAND2
renderUtils.js:157 DEBUG: renderSlotWithCard for PLAYER1_HAND2, type=hand, playerId=player1
renderUtils.js:167 DEBUG: Successfully created and styled slot PLAYER1_HAND2
renderUtils.js:180 renderSlotWithCard: Missing manifestKey for card item_2 in slot PLAYER1_HAND2. Card will not be draggable.
renderSlotWithCard @ renderUtils.js:180
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:75
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:183 DEBUG: Rendering card for slot PLAYER1_HAND2: item_2 (manifestKey: undefined)
utils.js:106 Error: renderCardElement: Missing manifestKey for card item_2 in slot PLAYER1_HAND2
handleElementError @ utils.js:106
validateRenderData @ renderUtils.js:68
renderCardElement @ renderUtils.js:101
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:75
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:102 Missing manifestKey for card in slot PLAYER1_HAND2. This is required for drag operations.
renderCardElement @ renderUtils.js:102
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:75
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:191 DEBUG: Failed to render card item_2 into slot PLAYER1_HAND2
renderSlotWithCard @ renderUtils.js:191
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:75
(anonymous) @ main.js:54Understand this errorAI
utils.js:106 Error: renderSlotWithCard: Failed to render card item_2 into slot PLAYER1_HAND2. Slot created but card failed.
handleElementError @ utils.js:106
renderSlotWithCard @ renderUtils.js:192
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:75
(anonymous) @ main.js:54Understand this errorAI
PlayerHand.js:117 DEBUG: Successfully created hand slot element for PLAYER1_HAND2
PlayerHand.js:122 DEBUG: Appended hand slot element PLAYER1_HAND2 to game container
PlayerHand.js:79 DEBUG: Rendering hand slot PLAYER1_HAND3
PlayerHand.js:85 DEBUG: Coords for PLAYER1_HAND3: {W: 80, H: 144, X: 584, Y: 32, LABEL: 'PLAYER1_HAND3'}
PlayerHand.js:92 DEBUG: Card for slot PLAYER1_HAND3, cardData from cardSlots: {id: 'item_11', name: 'diabloSauce', imageUrl: 'assets/jpg/cards/item/items_diabloSauce.jpg', type: 'item', faceUp: true}
PlayerHand.js:104 DEBUG: Calling renderSlotWithCard for PLAYER1_HAND3
renderUtils.js:157 DEBUG: renderSlotWithCard for PLAYER1_HAND3, type=hand, playerId=player1
renderUtils.js:167 DEBUG: Successfully created and styled slot PLAYER1_HAND3
renderUtils.js:180 renderSlotWithCard: Missing manifestKey for card item_11 in slot PLAYER1_HAND3. Card will not be draggable.
renderSlotWithCard @ renderUtils.js:180
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:75
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:183 DEBUG: Rendering card for slot PLAYER1_HAND3: item_11 (manifestKey: undefined)
utils.js:106 Error: renderCardElement: Missing manifestKey for card item_11 in slot PLAYER1_HAND3
handleElementError @ utils.js:106
validateRenderData @ renderUtils.js:68
renderCardElement @ renderUtils.js:101
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:75
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:102 Missing manifestKey for card in slot PLAYER1_HAND3. This is required for drag operations.
renderCardElement @ renderUtils.js:102
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:75
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:191 DEBUG: Failed to render card item_11 into slot PLAYER1_HAND3
renderSlotWithCard @ renderUtils.js:191
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:75
(anonymous) @ main.js:54Understand this errorAI
utils.js:106 Error: renderSlotWithCard: Failed to render card item_11 into slot PLAYER1_HAND3. Slot created but card failed.
handleElementError @ utils.js:106
renderSlotWithCard @ renderUtils.js:192
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:75
(anonymous) @ main.js:54Understand this errorAI
PlayerHand.js:117 DEBUG: Successfully created hand slot element for PLAYER1_HAND3
PlayerHand.js:122 DEBUG: Appended hand slot element PLAYER1_HAND3 to game container
PlayerHand.js:79 DEBUG: Rendering hand slot PLAYER1_HAND4
PlayerHand.js:85 DEBUG: Coords for PLAYER1_HAND4: {W: 80, H: 144, X: 672, Y: 32, LABEL: 'PLAYER1_HAND4'}
PlayerHand.js:92 DEBUG: Card for slot PLAYER1_HAND4, cardData from cardSlots: {id: 'item_31', name: 'vampireKey', imageUrl: 'assets/jpg/cards/item/items_vampireKey.jpg', type: 'item', faceUp: true}
PlayerHand.js:104 DEBUG: Calling renderSlotWithCard for PLAYER1_HAND4
renderUtils.js:157 DEBUG: renderSlotWithCard for PLAYER1_HAND4, type=hand, playerId=player1
renderUtils.js:167 DEBUG: Successfully created and styled slot PLAYER1_HAND4
renderUtils.js:180 renderSlotWithCard: Missing manifestKey for card item_31 in slot PLAYER1_HAND4. Card will not be draggable.
renderSlotWithCard @ renderUtils.js:180
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:75
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:183 DEBUG: Rendering card for slot PLAYER1_HAND4: item_31 (manifestKey: undefined)
utils.js:106 Error: renderCardElement: Missing manifestKey for card item_31 in slot PLAYER1_HAND4
handleElementError @ utils.js:106
validateRenderData @ renderUtils.js:68
renderCardElement @ renderUtils.js:101
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:75
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:102 Missing manifestKey for card in slot PLAYER1_HAND4. This is required for drag operations.
renderCardElement @ renderUtils.js:102
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:75
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:191 DEBUG: Failed to render card item_31 into slot PLAYER1_HAND4
renderSlotWithCard @ renderUtils.js:191
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:75
(anonymous) @ main.js:54Understand this errorAI
utils.js:106 Error: renderSlotWithCard: Failed to render card item_31 into slot PLAYER1_HAND4. Slot created but card failed.
handleElementError @ utils.js:106
renderSlotWithCard @ renderUtils.js:192
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:75
(anonymous) @ main.js:54Understand this errorAI
PlayerHand.js:117 DEBUG: Successfully created hand slot element for PLAYER1_HAND4
PlayerHand.js:122 DEBUG: Appended hand slot element PLAYER1_HAND4 to game container
PlayerHand.js:79 DEBUG: Rendering hand slot PLAYER1_HAND5
PlayerHand.js:85 DEBUG: Coords for PLAYER1_HAND5: {W: 80, H: 144, X: 760, Y: 32, LABEL: 'PLAYER1_HAND5'}
PlayerHand.js:92 DEBUG: Card for slot PLAYER1_HAND5, cardData from cardSlots: {id: 'spell_3', name: 'ghostWalk', imageUrl: 'assets/jpg/cards/spell/spells_ghostWalk.jpg', type: 'spell', faceUp: true}
PlayerHand.js:104 DEBUG: Calling renderSlotWithCard for PLAYER1_HAND5
renderUtils.js:157 DEBUG: renderSlotWithCard for PLAYER1_HAND5, type=hand, playerId=player1
renderUtils.js:167 DEBUG: Successfully created and styled slot PLAYER1_HAND5
renderUtils.js:180 renderSlotWithCard: Missing manifestKey for card spell_3 in slot PLAYER1_HAND5. Card will not be draggable.
renderSlotWithCard @ renderUtils.js:180
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:75
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:183 DEBUG: Rendering card for slot PLAYER1_HAND5: spell_3 (manifestKey: undefined)
utils.js:106 Error: renderCardElement: Missing manifestKey for card spell_3 in slot PLAYER1_HAND5
handleElementError @ utils.js:106
validateRenderData @ renderUtils.js:68
renderCardElement @ renderUtils.js:101
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:75
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:102 Missing manifestKey for card in slot PLAYER1_HAND5. This is required for drag operations.
renderCardElement @ renderUtils.js:102
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:75
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:191 DEBUG: Failed to render card spell_3 into slot PLAYER1_HAND5
renderSlotWithCard @ renderUtils.js:191
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:75
(anonymous) @ main.js:54Understand this errorAI
utils.js:106 Error: renderSlotWithCard: Failed to render card spell_3 into slot PLAYER1_HAND5. Slot created but card failed.
handleElementError @ utils.js:106
renderSlotWithCard @ renderUtils.js:192
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:75
(anonymous) @ main.js:54Understand this errorAI
PlayerHand.js:117 DEBUG: Successfully created hand slot element for PLAYER1_HAND5
PlayerHand.js:122 DEBUG: Appended hand slot element PLAYER1_HAND5 to game container
PlayerHand.js:129 DEBUG: renderPlayerHand completed for player 1
PlayerHand.js:48 DEBUG: renderPlayerHand called for player 2
PlayerHand.js:68 DEBUG: Found 5 hand slots for player2 in cardSlots: (5) ['PLAYER2_HAND1', 'PLAYER2_HAND2', 'PLAYER2_HAND3', 'PLAYER2_HAND4', 'PLAYER2_HAND5']
PlayerHand.js:79 DEBUG: Rendering hand slot PLAYER2_HAND1
PlayerHand.js:85 DEBUG: Coords for PLAYER2_HAND1: {W: 80, H: 144, X: 1024, Y: 32, LABEL: 'PLAYER2_HAND1'}
PlayerHand.js:92 DEBUG: Card for slot PLAYER2_HAND1, cardData from cardSlots: {id: 'item_29', name: 'theGodSpike', imageUrl: 'assets/jpg/cards/item/items_theGodSpike.jpg', type: 'item', faceUp: true}
PlayerHand.js:104 DEBUG: Calling renderSlotWithCard for PLAYER2_HAND1
renderUtils.js:157 DEBUG: renderSlotWithCard for PLAYER2_HAND1, type=hand, playerId=player2
renderUtils.js:167 DEBUG: Successfully created and styled slot PLAYER2_HAND1
renderUtils.js:180 renderSlotWithCard: Missing manifestKey for card item_29 in slot PLAYER2_HAND1. Card will not be draggable.
renderSlotWithCard @ renderUtils.js:180
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:76
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:183 DEBUG: Rendering card for slot PLAYER2_HAND1: item_29 (manifestKey: undefined)
utils.js:106 Error: renderCardElement: Missing manifestKey for card item_29 in slot PLAYER2_HAND1
handleElementError @ utils.js:106
validateRenderData @ renderUtils.js:68
renderCardElement @ renderUtils.js:101
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:76
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:102 Missing manifestKey for card in slot PLAYER2_HAND1. This is required for drag operations.
renderCardElement @ renderUtils.js:102
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:76
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:191 DEBUG: Failed to render card item_29 into slot PLAYER2_HAND1
renderSlotWithCard @ renderUtils.js:191
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:76
(anonymous) @ main.js:54Understand this errorAI
utils.js:106 Error: renderSlotWithCard: Failed to render card item_29 into slot PLAYER2_HAND1. Slot created but card failed.
handleElementError @ utils.js:106
renderSlotWithCard @ renderUtils.js:192
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:76
(anonymous) @ main.js:54Understand this errorAI
PlayerHand.js:117 DEBUG: Successfully created hand slot element for PLAYER2_HAND1
PlayerHand.js:122 DEBUG: Appended hand slot element PLAYER2_HAND1 to game container
PlayerHand.js:79 DEBUG: Rendering hand slot PLAYER2_HAND2
PlayerHand.js:85 DEBUG: Coords for PLAYER2_HAND2: {W: 80, H: 144, X: 1112, Y: 32, LABEL: 'PLAYER2_HAND2'}
PlayerHand.js:92 DEBUG: Card for slot PLAYER2_HAND2, cardData from cardSlots: {id: 'item_10', name: 'devilsContract', imageUrl: 'assets/jpg/cards/item/items_devilsContract.jpg', type: 'item', faceUp: true}
PlayerHand.js:104 DEBUG: Calling renderSlotWithCard for PLAYER2_HAND2
renderUtils.js:157 DEBUG: renderSlotWithCard for PLAYER2_HAND2, type=hand, playerId=player2
renderUtils.js:167 DEBUG: Successfully created and styled slot PLAYER2_HAND2
renderUtils.js:180 renderSlotWithCard: Missing manifestKey for card item_10 in slot PLAYER2_HAND2. Card will not be draggable.
renderSlotWithCard @ renderUtils.js:180
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:76
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:183 DEBUG: Rendering card for slot PLAYER2_HAND2: item_10 (manifestKey: undefined)
utils.js:106 Error: renderCardElement: Missing manifestKey for card item_10 in slot PLAYER2_HAND2
handleElementError @ utils.js:106
validateRenderData @ renderUtils.js:68
renderCardElement @ renderUtils.js:101
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:76
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:102 Missing manifestKey for card in slot PLAYER2_HAND2. This is required for drag operations.
renderCardElement @ renderUtils.js:102
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:76
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:191 DEBUG: Failed to render card item_10 into slot PLAYER2_HAND2
renderSlotWithCard @ renderUtils.js:191
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:76
(anonymous) @ main.js:54Understand this errorAI
utils.js:106 Error: renderSlotWithCard: Failed to render card item_10 into slot PLAYER2_HAND2. Slot created but card failed.
handleElementError @ utils.js:106
renderSlotWithCard @ renderUtils.js:192
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:76
(anonymous) @ main.js:54Understand this errorAI
PlayerHand.js:117 DEBUG: Successfully created hand slot element for PLAYER2_HAND2
PlayerHand.js:122 DEBUG: Appended hand slot element PLAYER2_HAND2 to game container
PlayerHand.js:79 DEBUG: Rendering hand slot PLAYER2_HAND3
PlayerHand.js:85 DEBUG: Coords for PLAYER2_HAND3: {W: 80, H: 144, X: 1200, Y: 32, LABEL: 'PLAYER2_HAND3'}
PlayerHand.js:92 DEBUG: Card for slot PLAYER2_HAND3, cardData from cardSlots: {id: 'item_12', name: 'dragonBoots', imageUrl: 'assets/jpg/cards/item/items_dragonBoots.jpg', type: 'item', faceUp: true}
PlayerHand.js:104 DEBUG: Calling renderSlotWithCard for PLAYER2_HAND3
renderUtils.js:157 DEBUG: renderSlotWithCard for PLAYER2_HAND3, type=hand, playerId=player2
renderUtils.js:167 DEBUG: Successfully created and styled slot PLAYER2_HAND3
renderUtils.js:180 renderSlotWithCard: Missing manifestKey for card item_12 in slot PLAYER2_HAND3. Card will not be draggable.
renderSlotWithCard @ renderUtils.js:180
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:76
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:183 DEBUG: Rendering card for slot PLAYER2_HAND3: item_12 (manifestKey: undefined)
utils.js:106 Error: renderCardElement: Missing manifestKey for card item_12 in slot PLAYER2_HAND3
handleElementError @ utils.js:106
validateRenderData @ renderUtils.js:68
renderCardElement @ renderUtils.js:101
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:76
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:102 Missing manifestKey for card in slot PLAYER2_HAND3. This is required for drag operations.
renderCardElement @ renderUtils.js:102
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:76
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:191 DEBUG: Failed to render card item_12 into slot PLAYER2_HAND3
renderSlotWithCard @ renderUtils.js:191
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:76
(anonymous) @ main.js:54Understand this errorAI
utils.js:106 Error: renderSlotWithCard: Failed to render card item_12 into slot PLAYER2_HAND3. Slot created but card failed.
handleElementError @ utils.js:106
renderSlotWithCard @ renderUtils.js:192
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:76
(anonymous) @ main.js:54Understand this errorAI
PlayerHand.js:117 DEBUG: Successfully created hand slot element for PLAYER2_HAND3
PlayerHand.js:122 DEBUG: Appended hand slot element PLAYER2_HAND3 to game container
PlayerHand.js:79 DEBUG: Rendering hand slot PLAYER2_HAND4
PlayerHand.js:85 DEBUG: Coords for PLAYER2_HAND4: {W: 80, H: 144, X: 1288, Y: 32, LABEL: 'PLAYER2_HAND4'}
PlayerHand.js:92 DEBUG: Card for slot PLAYER2_HAND4, cardData from cardSlots: {id: 'spell_2', name: 'borrowVisage', imageUrl: 'assets/jpg/cards/spell/spells_borrowVisage.jpg', type: 'spell', faceUp: true}
PlayerHand.js:104 DEBUG: Calling renderSlotWithCard for PLAYER2_HAND4
renderUtils.js:157 DEBUG: renderSlotWithCard for PLAYER2_HAND4, type=hand, playerId=player2
renderUtils.js:167 DEBUG: Successfully created and styled slot PLAYER2_HAND4
renderUtils.js:180 renderSlotWithCard: Missing manifestKey for card spell_2 in slot PLAYER2_HAND4. Card will not be draggable.
renderSlotWithCard @ renderUtils.js:180
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:76
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:183 DEBUG: Rendering card for slot PLAYER2_HAND4: spell_2 (manifestKey: undefined)
utils.js:106 Error: renderCardElement: Missing manifestKey for card spell_2 in slot PLAYER2_HAND4
handleElementError @ utils.js:106
validateRenderData @ renderUtils.js:68
renderCardElement @ renderUtils.js:101
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:76
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:102 Missing manifestKey for card in slot PLAYER2_HAND4. This is required for drag operations.
renderCardElement @ renderUtils.js:102
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:76
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:191 DEBUG: Failed to render card spell_2 into slot PLAYER2_HAND4
renderSlotWithCard @ renderUtils.js:191
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:76
(anonymous) @ main.js:54Understand this errorAI
utils.js:106 Error: renderSlotWithCard: Failed to render card spell_2 into slot PLAYER2_HAND4. Slot created but card failed.
handleElementError @ utils.js:106
renderSlotWithCard @ renderUtils.js:192
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:76
(anonymous) @ main.js:54Understand this errorAI
PlayerHand.js:117 DEBUG: Successfully created hand slot element for PLAYER2_HAND4
PlayerHand.js:122 DEBUG: Appended hand slot element PLAYER2_HAND4 to game container
PlayerHand.js:79 DEBUG: Rendering hand slot PLAYER2_HAND5
PlayerHand.js:85 DEBUG: Coords for PLAYER2_HAND5: {W: 80, H: 144, X: 1376, Y: 32, LABEL: 'PLAYER2_HAND5'}
PlayerHand.js:92 DEBUG: Card for slot PLAYER2_HAND5, cardData from cardSlots: {id: 'item_1', name: 'amberSin', imageUrl: 'assets/jpg/cards/item/items_amberSin.jpg', type: 'item', faceUp: true}
PlayerHand.js:104 DEBUG: Calling renderSlotWithCard for PLAYER2_HAND5
renderUtils.js:157 DEBUG: renderSlotWithCard for PLAYER2_HAND5, type=hand, playerId=player2
renderUtils.js:167 DEBUG: Successfully created and styled slot PLAYER2_HAND5
renderUtils.js:180 renderSlotWithCard: Missing manifestKey for card item_1 in slot PLAYER2_HAND5. Card will not be draggable.
renderSlotWithCard @ renderUtils.js:180
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:76
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:183 DEBUG: Rendering card for slot PLAYER2_HAND5: item_1 (manifestKey: undefined)
utils.js:106 Error: renderCardElement: Missing manifestKey for card item_1 in slot PLAYER2_HAND5
handleElementError @ utils.js:106
validateRenderData @ renderUtils.js:68
renderCardElement @ renderUtils.js:101
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:76
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:102 Missing manifestKey for card in slot PLAYER2_HAND5. This is required for drag operations.
renderCardElement @ renderUtils.js:102
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:76
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:191 DEBUG: Failed to render card item_1 into slot PLAYER2_HAND5
renderSlotWithCard @ renderUtils.js:191
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:76
(anonymous) @ main.js:54Understand this errorAI
utils.js:106 Error: renderSlotWithCard: Failed to render card item_1 into slot PLAYER2_HAND5. Slot created but card failed.
handleElementError @ utils.js:106
renderSlotWithCard @ renderUtils.js:192
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:76
(anonymous) @ main.js:54Understand this errorAI
PlayerHand.js:117 DEBUG: Successfully created hand slot element for PLAYER2_HAND5
PlayerHand.js:122 DEBUG: Appended hand slot element PLAYER2_HAND5 to game container
PlayerHand.js:129 DEBUG: renderPlayerHand completed for player 2
PlayerHand.js:48 DEBUG: renderPlayerHand called for player 3
PlayerHand.js:68 DEBUG: Found 5 hand slots for player3 in cardSlots: (5) ['PLAYER3_HAND1', 'PLAYER3_HAND2', 'PLAYER3_HAND3', 'PLAYER3_HAND4', 'PLAYER3_HAND5']
PlayerHand.js:79 DEBUG: Rendering hand slot PLAYER3_HAND1
PlayerHand.js:85 DEBUG: Coords for PLAYER3_HAND1: {W: 80, H: 144, X: 408, Y: 912, LABEL: 'PLAYER3_HAND1'}
PlayerHand.js:92 DEBUG: Card for slot PLAYER3_HAND1, cardData from cardSlots: {id: 'item_20', name: 'marinersFlask', imageUrl: 'assets/jpg/cards/item/items_marinersFlask.jpg', type: 'item', faceUp: true}
PlayerHand.js:104 DEBUG: Calling renderSlotWithCard for PLAYER3_HAND1
renderUtils.js:157 DEBUG: renderSlotWithCard for PLAYER3_HAND1, type=hand, playerId=player3
renderUtils.js:167 DEBUG: Successfully created and styled slot PLAYER3_HAND1
renderUtils.js:180 renderSlotWithCard: Missing manifestKey for card item_20 in slot PLAYER3_HAND1. Card will not be draggable.
renderSlotWithCard @ renderUtils.js:180
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:78
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:183 DEBUG: Rendering card for slot PLAYER3_HAND1: item_20 (manifestKey: undefined)
utils.js:106 Error: renderCardElement: Missing manifestKey for card item_20 in slot PLAYER3_HAND1
handleElementError @ utils.js:106
validateRenderData @ renderUtils.js:68
renderCardElement @ renderUtils.js:101
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:78
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:102 Missing manifestKey for card in slot PLAYER3_HAND1. This is required for drag operations.
renderCardElement @ renderUtils.js:102
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:78
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:191 DEBUG: Failed to render card item_20 into slot PLAYER3_HAND1
renderSlotWithCard @ renderUtils.js:191
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:78
(anonymous) @ main.js:54Understand this errorAI
utils.js:106 Error: renderSlotWithCard: Failed to render card item_20 into slot PLAYER3_HAND1. Slot created but card failed.
handleElementError @ utils.js:106
renderSlotWithCard @ renderUtils.js:192
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:78
(anonymous) @ main.js:54Understand this errorAI
PlayerHand.js:117 DEBUG: Successfully created hand slot element for PLAYER3_HAND1
PlayerHand.js:122 DEBUG: Appended hand slot element PLAYER3_HAND1 to game container
PlayerHand.js:79 DEBUG: Rendering hand slot PLAYER3_HAND2
PlayerHand.js:85 DEBUG: Coords for PLAYER3_HAND2: {W: 80, H: 144, X: 496, Y: 912, LABEL: 'PLAYER3_HAND2'}
PlayerHand.js:92 DEBUG: Card for slot PLAYER3_HAND2, cardData from cardSlots: {id: 'item_21', name: 'oracle8Ball', imageUrl: 'assets/jpg/cards/item/items_oracle8Ball.jpg', type: 'item', faceUp: true}
PlayerHand.js:104 DEBUG: Calling renderSlotWithCard for PLAYER3_HAND2
renderUtils.js:157 DEBUG: renderSlotWithCard for PLAYER3_HAND2, type=hand, playerId=player3
renderUtils.js:167 DEBUG: Successfully created and styled slot PLAYER3_HAND2
renderUtils.js:180 renderSlotWithCard: Missing manifestKey for card item_21 in slot PLAYER3_HAND2. Card will not be draggable.
renderSlotWithCard @ renderUtils.js:180
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:78
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:183 DEBUG: Rendering card for slot PLAYER3_HAND2: item_21 (manifestKey: undefined)
utils.js:106 Error: renderCardElement: Missing manifestKey for card item_21 in slot PLAYER3_HAND2
handleElementError @ utils.js:106
validateRenderData @ renderUtils.js:68
renderCardElement @ renderUtils.js:101
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:78
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:102 Missing manifestKey for card in slot PLAYER3_HAND2. This is required for drag operations.
renderCardElement @ renderUtils.js:102
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:78
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:191 DEBUG: Failed to render card item_21 into slot PLAYER3_HAND2
renderSlotWithCard @ renderUtils.js:191
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:78
(anonymous) @ main.js:54Understand this errorAI
utils.js:106 Error: renderSlotWithCard: Failed to render card item_21 into slot PLAYER3_HAND2. Slot created but card failed.
handleElementError @ utils.js:106
renderSlotWithCard @ renderUtils.js:192
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:78
(anonymous) @ main.js:54Understand this errorAI
PlayerHand.js:117 DEBUG: Successfully created hand slot element for PLAYER3_HAND2
PlayerHand.js:122 DEBUG: Appended hand slot element PLAYER3_HAND2 to game container
PlayerHand.js:79 DEBUG: Rendering hand slot PLAYER3_HAND3
PlayerHand.js:85 DEBUG: Coords for PLAYER3_HAND3: {W: 80, H: 144, X: 584, Y: 912, LABEL: 'PLAYER3_HAND3'}
PlayerHand.js:92 DEBUG: Card for slot PLAYER3_HAND3, cardData from cardSlots: {id: 'item_18', name: 'hollowCoin', imageUrl: 'assets/jpg/cards/item/items_hollowCoin.jpg', type: 'item', faceUp: true}
PlayerHand.js:104 DEBUG: Calling renderSlotWithCard for PLAYER3_HAND3
renderUtils.js:157 DEBUG: renderSlotWithCard for PLAYER3_HAND3, type=hand, playerId=player3
renderUtils.js:167 DEBUG: Successfully created and styled slot PLAYER3_HAND3
renderUtils.js:180 renderSlotWithCard: Missing manifestKey for card item_18 in slot PLAYER3_HAND3. Card will not be draggable.
renderSlotWithCard @ renderUtils.js:180
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:78
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:183 DEBUG: Rendering card for slot PLAYER3_HAND3: item_18 (manifestKey: undefined)
utils.js:106 Error: renderCardElement: Missing manifestKey for card item_18 in slot PLAYER3_HAND3
handleElementError @ utils.js:106
validateRenderData @ renderUtils.js:68
renderCardElement @ renderUtils.js:101
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:78
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:102 Missing manifestKey for card in slot PLAYER3_HAND3. This is required for drag operations.
renderCardElement @ renderUtils.js:102
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:78
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:191 DEBUG: Failed to render card item_18 into slot PLAYER3_HAND3
renderSlotWithCard @ renderUtils.js:191
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:78
(anonymous) @ main.js:54Understand this errorAI
utils.js:106 Error: renderSlotWithCard: Failed to render card item_18 into slot PLAYER3_HAND3. Slot created but card failed.
handleElementError @ utils.js:106
renderSlotWithCard @ renderUtils.js:192
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:78
(anonymous) @ main.js:54Understand this errorAI
PlayerHand.js:117 DEBUG: Successfully created hand slot element for PLAYER3_HAND3
PlayerHand.js:122 DEBUG: Appended hand slot element PLAYER3_HAND3 to game container
PlayerHand.js:79 DEBUG: Rendering hand slot PLAYER3_HAND4
PlayerHand.js:85 DEBUG: Coords for PLAYER3_HAND4: {W: 80, H: 144, X: 672, Y: 912, LABEL: 'PLAYER3_HAND4'}
PlayerHand.js:92 DEBUG: Card for slot PLAYER3_HAND4, cardData from cardSlots: {id: 'item_4', name: 'bloodCandle', imageUrl: 'assets/jpg/cards/item/items_bloodCandle.jpg', type: 'item', faceUp: true}
PlayerHand.js:104 DEBUG: Calling renderSlotWithCard for PLAYER3_HAND4
renderUtils.js:157 DEBUG: renderSlotWithCard for PLAYER3_HAND4, type=hand, playerId=player3
renderUtils.js:167 DEBUG: Successfully created and styled slot PLAYER3_HAND4
renderUtils.js:180 renderSlotWithCard: Missing manifestKey for card item_4 in slot PLAYER3_HAND4. Card will not be draggable.
renderSlotWithCard @ renderUtils.js:180
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:78
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:183 DEBUG: Rendering card for slot PLAYER3_HAND4: item_4 (manifestKey: undefined)
utils.js:106 Error: renderCardElement: Missing manifestKey for card item_4 in slot PLAYER3_HAND4
handleElementError @ utils.js:106
validateRenderData @ renderUtils.js:68
renderCardElement @ renderUtils.js:101
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:78
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:102 Missing manifestKey for card in slot PLAYER3_HAND4. This is required for drag operations.
renderCardElement @ renderUtils.js:102
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:78
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:191 DEBUG: Failed to render card item_4 into slot PLAYER3_HAND4
renderSlotWithCard @ renderUtils.js:191
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:78
(anonymous) @ main.js:54Understand this errorAI
utils.js:106 Error: renderSlotWithCard: Failed to render card item_4 into slot PLAYER3_HAND4. Slot created but card failed.
handleElementError @ utils.js:106
renderSlotWithCard @ renderUtils.js:192
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:78
(anonymous) @ main.js:54Understand this errorAI
PlayerHand.js:117 DEBUG: Successfully created hand slot element for PLAYER3_HAND4
PlayerHand.js:122 DEBUG: Appended hand slot element PLAYER3_HAND4 to game container
PlayerHand.js:79 DEBUG: Rendering hand slot PLAYER3_HAND5
PlayerHand.js:85 DEBUG: Coords for PLAYER3_HAND5: {W: 80, H: 144, X: 760, Y: 912, LABEL: 'PLAYER3_HAND5'}
PlayerHand.js:92 DEBUG: Card for slot PLAYER3_HAND5, cardData from cardSlots: {id: 'spell_12', name: 'wallFlower', imageUrl: 'assets/jpg/cards/spell/spells_wallFlower.jpg', type: 'spell', faceUp: true}
PlayerHand.js:104 DEBUG: Calling renderSlotWithCard for PLAYER3_HAND5
renderUtils.js:157 DEBUG: renderSlotWithCard for PLAYER3_HAND5, type=hand, playerId=player3
renderUtils.js:167 DEBUG: Successfully created and styled slot PLAYER3_HAND5
renderUtils.js:180 renderSlotWithCard: Missing manifestKey for card spell_12 in slot PLAYER3_HAND5. Card will not be draggable.
renderSlotWithCard @ renderUtils.js:180
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:78
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:183 DEBUG: Rendering card for slot PLAYER3_HAND5: spell_12 (manifestKey: undefined)
utils.js:106 Error: renderCardElement: Missing manifestKey for card spell_12 in slot PLAYER3_HAND5
handleElementError @ utils.js:106
validateRenderData @ renderUtils.js:68
renderCardElement @ renderUtils.js:101
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:78
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:102 Missing manifestKey for card in slot PLAYER3_HAND5. This is required for drag operations.
renderCardElement @ renderUtils.js:102
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:78
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:191 DEBUG: Failed to render card spell_12 into slot PLAYER3_HAND5
renderSlotWithCard @ renderUtils.js:191
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:78
(anonymous) @ main.js:54Understand this errorAI
utils.js:106 Error: renderSlotWithCard: Failed to render card spell_12 into slot PLAYER3_HAND5. Slot created but card failed.
handleElementError @ utils.js:106
renderSlotWithCard @ renderUtils.js:192
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:78
(anonymous) @ main.js:54Understand this errorAI
PlayerHand.js:117 DEBUG: Successfully created hand slot element for PLAYER3_HAND5
PlayerHand.js:122 DEBUG: Appended hand slot element PLAYER3_HAND5 to game container
PlayerHand.js:129 DEBUG: renderPlayerHand completed for player 3
PlayerHand.js:48 DEBUG: renderPlayerHand called for player 4
PlayerHand.js:68 DEBUG: Found 5 hand slots for player4 in cardSlots: (5) ['PLAYER4_HAND1', 'PLAYER4_HAND2', 'PLAYER4_HAND3', 'PLAYER4_HAND4', 'PLAYER4_HAND5']
PlayerHand.js:79 DEBUG: Rendering hand slot PLAYER4_HAND1
PlayerHand.js:85 DEBUG: Coords for PLAYER4_HAND1: {W: 80, H: 144, X: 1024, Y: 912, LABEL: 'PLAYER4_HAND1'}
PlayerHand.js:92 DEBUG: Card for slot PLAYER4_HAND1, cardData from cardSlots: {id: 'item_27', name: 'spiritFlask', imageUrl: 'assets/jpg/cards/item/items_spiritFlask.jpg', type: 'item', faceUp: true}
PlayerHand.js:104 DEBUG: Calling renderSlotWithCard for PLAYER4_HAND1
renderUtils.js:157 DEBUG: renderSlotWithCard for PLAYER4_HAND1, type=hand, playerId=player4
renderUtils.js:167 DEBUG: Successfully created and styled slot PLAYER4_HAND1
renderUtils.js:180 renderSlotWithCard: Missing manifestKey for card item_27 in slot PLAYER4_HAND1. Card will not be draggable.
renderSlotWithCard @ renderUtils.js:180
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:79
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:183 DEBUG: Rendering card for slot PLAYER4_HAND1: item_27 (manifestKey: undefined)
utils.js:106 Error: renderCardElement: Missing manifestKey for card item_27 in slot PLAYER4_HAND1
handleElementError @ utils.js:106
validateRenderData @ renderUtils.js:68
renderCardElement @ renderUtils.js:101
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:79
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:102 Missing manifestKey for card in slot PLAYER4_HAND1. This is required for drag operations.
renderCardElement @ renderUtils.js:102
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:79
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:191 DEBUG: Failed to render card item_27 into slot PLAYER4_HAND1
renderSlotWithCard @ renderUtils.js:191
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:79
(anonymous) @ main.js:54Understand this errorAI
utils.js:106 Error: renderSlotWithCard: Failed to render card item_27 into slot PLAYER4_HAND1. Slot created but card failed.
handleElementError @ utils.js:106
renderSlotWithCard @ renderUtils.js:192
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:79
(anonymous) @ main.js:54Understand this errorAI
PlayerHand.js:117 DEBUG: Successfully created hand slot element for PLAYER4_HAND1
PlayerHand.js:122 DEBUG: Appended hand slot element PLAYER4_HAND1 to game container
PlayerHand.js:79 DEBUG: Rendering hand slot PLAYER4_HAND2
PlayerHand.js:85 DEBUG: Coords for PLAYER4_HAND2: {W: 80, H: 144, X: 1112, Y: 912, LABEL: 'PLAYER4_HAND2'}
PlayerHand.js:92 DEBUG: Card for slot PLAYER4_HAND2, cardData from cardSlots: {id: 'spell_9', name: 'sociopathicMutter', imageUrl: 'assets/jpg/cards/spell/spells_sociopathicMutter.jpg', type: 'spell', faceUp: true}
PlayerHand.js:104 DEBUG: Calling renderSlotWithCard for PLAYER4_HAND2
renderUtils.js:157 DEBUG: renderSlotWithCard for PLAYER4_HAND2, type=hand, playerId=player4
renderUtils.js:167 DEBUG: Successfully created and styled slot PLAYER4_HAND2
renderUtils.js:180 renderSlotWithCard: Missing manifestKey for card spell_9 in slot PLAYER4_HAND2. Card will not be draggable.
renderSlotWithCard @ renderUtils.js:180
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:79
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:183 DEBUG: Rendering card for slot PLAYER4_HAND2: spell_9 (manifestKey: undefined)
utils.js:106 Error: renderCardElement: Missing manifestKey for card spell_9 in slot PLAYER4_HAND2
handleElementError @ utils.js:106
validateRenderData @ renderUtils.js:68
renderCardElement @ renderUtils.js:101
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:79
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:102 Missing manifestKey for card in slot PLAYER4_HAND2. This is required for drag operations.
renderCardElement @ renderUtils.js:102
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:79
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:191 DEBUG: Failed to render card spell_9 into slot PLAYER4_HAND2
renderSlotWithCard @ renderUtils.js:191
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:79
(anonymous) @ main.js:54Understand this errorAI
utils.js:106 Error: renderSlotWithCard: Failed to render card spell_9 into slot PLAYER4_HAND2. Slot created but card failed.
handleElementError @ utils.js:106
renderSlotWithCard @ renderUtils.js:192
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:79
(anonymous) @ main.js:54Understand this errorAI
PlayerHand.js:117 DEBUG: Successfully created hand slot element for PLAYER4_HAND2
PlayerHand.js:122 DEBUG: Appended hand slot element PLAYER4_HAND2 to game container
PlayerHand.js:79 DEBUG: Rendering hand slot PLAYER4_HAND3
PlayerHand.js:85 DEBUG: Coords for PLAYER4_HAND3: {W: 80, H: 144, X: 1200, Y: 912, LABEL: 'PLAYER4_HAND3'}
PlayerHand.js:92 DEBUG: Card for slot PLAYER4_HAND3, cardData from cardSlots: {id: 'item_3', name: 'blackGuitar', imageUrl: 'assets/jpg/cards/item/items_blackGuitar.jpg', type: 'item', faceUp: true}
PlayerHand.js:104 DEBUG: Calling renderSlotWithCard for PLAYER4_HAND3
renderUtils.js:157 DEBUG: renderSlotWithCard for PLAYER4_HAND3, type=hand, playerId=player4
renderUtils.js:167 DEBUG: Successfully created and styled slot PLAYER4_HAND3
renderUtils.js:180 renderSlotWithCard: Missing manifestKey for card item_3 in slot PLAYER4_HAND3. Card will not be draggable.
renderSlotWithCard @ renderUtils.js:180
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:79
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:183 DEBUG: Rendering card for slot PLAYER4_HAND3: item_3 (manifestKey: undefined)
utils.js:106 Error: renderCardElement: Missing manifestKey for card item_3 in slot PLAYER4_HAND3
handleElementError @ utils.js:106
validateRenderData @ renderUtils.js:68
renderCardElement @ renderUtils.js:101
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:79
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:102 Missing manifestKey for card in slot PLAYER4_HAND3. This is required for drag operations.
renderCardElement @ renderUtils.js:102
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:79
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:191 DEBUG: Failed to render card item_3 into slot PLAYER4_HAND3
renderSlotWithCard @ renderUtils.js:191
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:79
(anonymous) @ main.js:54Understand this errorAI
utils.js:106 Error: renderSlotWithCard: Failed to render card item_3 into slot PLAYER4_HAND3. Slot created but card failed.
handleElementError @ utils.js:106
renderSlotWithCard @ renderUtils.js:192
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:79
(anonymous) @ main.js:54Understand this errorAI
PlayerHand.js:117 DEBUG: Successfully created hand slot element for PLAYER4_HAND3
PlayerHand.js:122 DEBUG: Appended hand slot element PLAYER4_HAND3 to game container
PlayerHand.js:79 DEBUG: Rendering hand slot PLAYER4_HAND4
PlayerHand.js:85 DEBUG: Coords for PLAYER4_HAND4: {W: 80, H: 144, X: 1288, Y: 912, LABEL: 'PLAYER4_HAND4'}
PlayerHand.js:92 DEBUG: Card for slot PLAYER4_HAND4, cardData from cardSlots: {id: 'item_15', name: 'gildedCross', imageUrl: 'assets/jpg/cards/item/items_gildedCross.jpg', type: 'item', faceUp: true}
PlayerHand.js:104 DEBUG: Calling renderSlotWithCard for PLAYER4_HAND4
renderUtils.js:157 DEBUG: renderSlotWithCard for PLAYER4_HAND4, type=hand, playerId=player4
renderUtils.js:167 DEBUG: Successfully created and styled slot PLAYER4_HAND4
renderUtils.js:180 renderSlotWithCard: Missing manifestKey for card item_15 in slot PLAYER4_HAND4. Card will not be draggable.
renderSlotWithCard @ renderUtils.js:180
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:79
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:183 DEBUG: Rendering card for slot PLAYER4_HAND4: item_15 (manifestKey: undefined)
utils.js:106 Error: renderCardElement: Missing manifestKey for card item_15 in slot PLAYER4_HAND4
handleElementError @ utils.js:106
validateRenderData @ renderUtils.js:68
renderCardElement @ renderUtils.js:101
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:79
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:102 Missing manifestKey for card in slot PLAYER4_HAND4. This is required for drag operations.
renderCardElement @ renderUtils.js:102
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:79
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:191 DEBUG: Failed to render card item_15 into slot PLAYER4_HAND4
renderSlotWithCard @ renderUtils.js:191
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:79
(anonymous) @ main.js:54Understand this errorAI
utils.js:106 Error: renderSlotWithCard: Failed to render card item_15 into slot PLAYER4_HAND4. Slot created but card failed.
handleElementError @ utils.js:106
renderSlotWithCard @ renderUtils.js:192
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:79
(anonymous) @ main.js:54Understand this errorAI
PlayerHand.js:117 DEBUG: Successfully created hand slot element for PLAYER4_HAND4
PlayerHand.js:122 DEBUG: Appended hand slot element PLAYER4_HAND4 to game container
PlayerHand.js:79 DEBUG: Rendering hand slot PLAYER4_HAND5
PlayerHand.js:85 DEBUG: Coords for PLAYER4_HAND5: {W: 80, H: 144, X: 1376, Y: 912, LABEL: 'PLAYER4_HAND5'}
PlayerHand.js:92 DEBUG: Card for slot PLAYER4_HAND5, cardData from cardSlots: {id: 'item_17', name: 'heartOfStone', imageUrl: 'assets/jpg/cards/item/items_heartOfStone.jpg', type: 'item', faceUp: true}
PlayerHand.js:104 DEBUG: Calling renderSlotWithCard for PLAYER4_HAND5
renderUtils.js:157 DEBUG: renderSlotWithCard for PLAYER4_HAND5, type=hand, playerId=player4
renderUtils.js:167 DEBUG: Successfully created and styled slot PLAYER4_HAND5
renderUtils.js:180 renderSlotWithCard: Missing manifestKey for card item_17 in slot PLAYER4_HAND5. Card will not be draggable.
renderSlotWithCard @ renderUtils.js:180
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:79
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:183 DEBUG: Rendering card for slot PLAYER4_HAND5: item_17 (manifestKey: undefined)
utils.js:106 Error: renderCardElement: Missing manifestKey for card item_17 in slot PLAYER4_HAND5
handleElementError @ utils.js:106
validateRenderData @ renderUtils.js:68
renderCardElement @ renderUtils.js:101
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:79
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:102 Missing manifestKey for card in slot PLAYER4_HAND5. This is required for drag operations.
renderCardElement @ renderUtils.js:102
renderSlotWithCard @ renderUtils.js:185
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:79
(anonymous) @ main.js:54Understand this errorAI
renderUtils.js:191 DEBUG: Failed to render card item_17 into slot PLAYER4_HAND5
renderSlotWithCard @ renderUtils.js:191
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:79
(anonymous) @ main.js:54Understand this errorAI
utils.js:106 Error: renderSlotWithCard: Failed to render card item_17 into slot PLAYER4_HAND5. Slot created but card failed.
handleElementError @ utils.js:106
renderSlotWithCard @ renderUtils.js:192
(anonymous) @ PlayerHand.js:105
renderPlayerHand @ PlayerHand.js:78
renderGameBoard @ GameBoard.js:79
(anonymous) @ main.js:54Understand this errorAI
PlayerHand.js:117 DEBUG: Successfully created hand slot element for PLAYER4_HAND5
PlayerHand.js:122 DEBUG: Appended hand slot element PLAYER4_HAND5 to game container
PlayerHand.js:129 DEBUG: renderPlayerHand completed for player 4
GameBoard.js:82 DEBUG: Rendering character slots
CharacterSlot.js:81 DEBUG: No card for slot PLAYER1_CHARCARD (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for PLAYER1_CHARCARD, type=character, playerId=player1
renderUtils.js:167 DEBUG: Successfully created and styled slot PLAYER1_CHARCARD
renderUtils.js:195 DEBUG: No card data for slot PLAYER1_CHARCARD, creating empty slot
CharacterSlot.js:81 DEBUG: No card for slot PLAYER2_CHARCARD (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for PLAYER2_CHARCARD, type=character, playerId=player2
renderUtils.js:167 DEBUG: Successfully created and styled slot PLAYER2_CHARCARD
renderUtils.js:195 DEBUG: No card data for slot PLAYER2_CHARCARD, creating empty slot
CharacterSlot.js:81 DEBUG: No card for slot PLAYER3_CHARCARD (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for PLAYER3_CHARCARD, type=character, playerId=player3
renderUtils.js:167 DEBUG: Successfully created and styled slot PLAYER3_CHARCARD
renderUtils.js:195 DEBUG: No card data for slot PLAYER3_CHARCARD, creating empty slot
CharacterSlot.js:81 DEBUG: No card for slot PLAYER4_CHARCARD (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for PLAYER4_CHARCARD, type=character, playerId=player4
renderUtils.js:167 DEBUG: Successfully created and styled slot PLAYER4_CHARCARD
renderUtils.js:195 DEBUG: No card data for slot PLAYER4_CHARCARD, creating empty slot
GameBoard.js:90 DEBUG: Rendering story grid
StoryGrid.js:56 DEBUG: Found 40 story grid slots in cardSlots: (40) ['GRID1', 'GRID2', 'GRID3', 'GRID4', 'GRID5', 'GRID6', 'GRID7', 'GRID8', 'GRID9', 'GRID10', 'GRID11', 'GRID12', 'GRID13', 'GRID14', 'GRID15', 'GRID16', 'GRID17', 'GRID18', 'GRID19', 'GRID20', 'GRID21', 'GRID22', 'GRID23', 'GRID24', 'GRID25', 'GRID26', 'GRID27', 'GRID28', 'GRID29', 'GRID30', 'GRID31', 'GRID32', 'GRID33', 'GRID34', 'GRID35', 'GRID36', 'GRID37', 'GRID38', 'GRID39', 'GRID40']
StoryGrid.js:77 DEBUG: No card for slot GRID1 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID1, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID1
renderUtils.js:195 DEBUG: No card data for slot GRID1, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID2 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID2, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID2
renderUtils.js:195 DEBUG: No card data for slot GRID2, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID3 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID3, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID3
renderUtils.js:195 DEBUG: No card data for slot GRID3, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID4 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID4, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID4
renderUtils.js:195 DEBUG: No card data for slot GRID4, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID5 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID5, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID5
renderUtils.js:195 DEBUG: No card data for slot GRID5, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID6 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID6, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID6
renderUtils.js:195 DEBUG: No card data for slot GRID6, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID7 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID7, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID7
renderUtils.js:195 DEBUG: No card data for slot GRID7, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID8 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID8, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID8
renderUtils.js:195 DEBUG: No card data for slot GRID8, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID9 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID9, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID9
renderUtils.js:195 DEBUG: No card data for slot GRID9, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID10 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID10, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID10
renderUtils.js:195 DEBUG: No card data for slot GRID10, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID11 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID11, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID11
renderUtils.js:195 DEBUG: No card data for slot GRID11, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID12 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID12, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID12
renderUtils.js:195 DEBUG: No card data for slot GRID12, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID13 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID13, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID13
renderUtils.js:195 DEBUG: No card data for slot GRID13, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID14 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID14, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID14
renderUtils.js:195 DEBUG: No card data for slot GRID14, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID15 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID15, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID15
renderUtils.js:195 DEBUG: No card data for slot GRID15, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID16 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID16, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID16
renderUtils.js:195 DEBUG: No card data for slot GRID16, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID17 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID17, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID17
renderUtils.js:195 DEBUG: No card data for slot GRID17, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID18 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID18, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID18
renderUtils.js:195 DEBUG: No card data for slot GRID18, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID19 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID19, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID19
renderUtils.js:195 DEBUG: No card data for slot GRID19, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID20 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID20, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID20
renderUtils.js:195 DEBUG: No card data for slot GRID20, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID21 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID21, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID21
renderUtils.js:195 DEBUG: No card data for slot GRID21, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID22 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID22, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID22
renderUtils.js:195 DEBUG: No card data for slot GRID22, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID23 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID23, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID23
renderUtils.js:195 DEBUG: No card data for slot GRID23, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID24 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID24, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID24
renderUtils.js:195 DEBUG: No card data for slot GRID24, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID25 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID25, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID25
renderUtils.js:195 DEBUG: No card data for slot GRID25, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID26 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID26, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID26
renderUtils.js:195 DEBUG: No card data for slot GRID26, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID27 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID27, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID27
renderUtils.js:195 DEBUG: No card data for slot GRID27, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID28 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID28, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID28
renderUtils.js:195 DEBUG: No card data for slot GRID28, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID29 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID29, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID29
renderUtils.js:195 DEBUG: No card data for slot GRID29, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID30 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID30, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID30
renderUtils.js:195 DEBUG: No card data for slot GRID30, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID31 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID31, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID31
renderUtils.js:195 DEBUG: No card data for slot GRID31, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID32 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID32, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID32
renderUtils.js:195 DEBUG: No card data for slot GRID32, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID33 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID33, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID33
renderUtils.js:195 DEBUG: No card data for slot GRID33, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID34 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID34, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID34
renderUtils.js:195 DEBUG: No card data for slot GRID34, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID35 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID35, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID35
renderUtils.js:195 DEBUG: No card data for slot GRID35, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID36 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID36, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID36
renderUtils.js:195 DEBUG: No card data for slot GRID36, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID37 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID37, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID37
renderUtils.js:195 DEBUG: No card data for slot GRID37, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID38 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID38, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID38
renderUtils.js:195 DEBUG: No card data for slot GRID38, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID39 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID39, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID39
renderUtils.js:195 DEBUG: No card data for slot GRID39, creating empty slot
StoryGrid.js:77 DEBUG: No card for slot GRID40 (empty slot in cardSlots)
renderUtils.js:157 DEBUG: renderSlotWithCard for GRID40, type=storyGrid, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot GRID40
renderUtils.js:195 DEBUG: No card data for slot GRID40, creating empty slot
GameBoard.js:94 DEBUG: Rendering deck piles
renderUtils.js:157 DEBUG: renderSlotWithCard for DECK, type=deckDraw, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot DECK
renderUtils.js:195 DEBUG: No card data for slot DECK, creating empty slot
DeckPile.js:103 Rendering card back for main deck
renderUtils.js:157 DEBUG: renderSlotWithCard for DISCARD, type=deckDiscard, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot DISCARD
renderUtils.js:195 DEBUG: No card data for slot DISCARD, creating empty slot
renderUtils.js:157 DEBUG: renderSlotWithCard for ALTDECK, type=deckDraw, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot ALTDECK
renderUtils.js:195 DEBUG: No card data for slot ALTDECK, creating empty slot
DeckPile.js:103 Rendering card back for alt deck
renderUtils.js:157 DEBUG: renderSlotWithCard for ALTDISCARD, type=deckDiscard, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot ALTDISCARD
renderUtils.js:195 DEBUG: No card data for slot ALTDISCARD, creating empty slot
GameBoard.js:99 DEBUG: Rendering mutable slots
renderUtils.js:157 DEBUG: renderSlotWithCard for MUTABLE1, type=mutable, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot MUTABLE1
renderUtils.js:195 DEBUG: No card data for slot MUTABLE1, creating empty slot
renderUtils.js:157 DEBUG: renderSlotWithCard for MUTABLE2, type=mutable, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot MUTABLE2
renderUtils.js:195 DEBUG: No card data for slot MUTABLE2, creating empty slot
renderUtils.js:157 DEBUG: renderSlotWithCard for MUTABLE3, type=mutable, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot MUTABLE3
renderUtils.js:195 DEBUG: No card data for slot MUTABLE3, creating empty slot
renderUtils.js:157 DEBUG: renderSlotWithCard for MUTABLE4, type=mutable, playerId=null
renderUtils.js:167 DEBUG: Successfully created and styled slot MUTABLE4
renderUtils.js:195 DEBUG: No card data for slot MUTABLE4, creating empty slot
GameBoard.js:141 DEBUG: renderGameBoard completed
main.js:55 DEBUG: renderGameBoard() completed.
cardBack.jpg:1 
            
            
           GET http://localhost:8003/assets/jpg/cards/cardBack.jpg 404 (File not found)