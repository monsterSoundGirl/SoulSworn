// Mapping for singular to plural card type prefixes used in asset paths
const cardTypePathMapping = {
    'item': 'items',
    'spell': 'spells',
    'character': 'characters', // Assuming 'character' might also need pluralization
    'unit': 'units',         // Adding common potential types
    'hero': 'heroes'
    // Add other mappings as needed based on your asset structure
};

/**
 * Transforms the image URL to use the correct pluralized path based on card type.
 * Handles potential inconsistencies like 'item/item_X' vs 'items/items_X'.
 * @param {string} originalUrl - The original image URL from card data.
 * @param {string} cardType - The type of the card (e.g., 'item', 'spell').
 * @returns {string} The transformed image URL.
 */
function transformImageUrl(originalUrl) {
    // Note: Path transformation was removed (Fix for KI-002).
    // The image URLs provided in the card manifest (e.g., from GameState.allCards)
    // are now assumed to be correct and directly usable. This function remains
    // as a placeholder in case future path adjustments are needed.
    return originalUrl;
}

/**
 * Creates an HTML element representing a single card image.
 *
 * This function generates an `<img>` element for a card, sets its source, alt text,
 * and adds necessary data attributes for identification and styling.
 * It also makes the card draggable if it's associated with a specific manifest key
 * and placed in a valid slot, embedding drag data (manifest key and origin slot ID).
 *
 * @param {object} card - The card data object. Expected properties:
 *   @prop {string} id - The unique identifier of the card (e.g., "Item Card 1").
 *   @prop {string} type - The type of the card (e.g., "item", "spell").
 *   @prop {string} imageUrl - The direct URL to the card's image asset.
 * @param {string} manifestKey - The key representing this card instance in the game state
 *                               (e.g., 'item_1', 'spell_6'). This key is crucial for
 *                               tracking the card in arrays like player hands or decks
 *                               and is used as the `cardId` in drag events.
 * @param {string} slotId - The ID of the DOM element (slot) where this card is being placed.
 *                          Used to identify the origin slot during drag operations.
 * @returns {HTMLImageElement | HTMLDivElement} An `<img>` element representing the card,
 *                                              or a `<div>` placeholder on error.
 */
export function createCardElement(card, manifestKey, slotId) {
  // Basic validation for the card object structure
  if (!card || typeof card !== 'object' || !card.id || !card.imageUrl || !card.type) {
    console.error('Invalid or incomplete card data provided to createCardElement:', card);
    // Return a placeholder div to avoid breaking the layout entirely
    const errorDiv = document.createElement('div');
    errorDiv.textContent = 'Error: Card Data Invalid';
    errorDiv.className = 'card-error-placeholder'; // Assign a class for potential styling
    errorDiv.style.color = 'red';
    errorDiv.style.border = '1px solid red';
    errorDiv.style.width = '70px'; // Match typical card dimensions
    errorDiv.style.height = '100px';
    errorDiv.style.display = 'inline-block'; // Ensure it takes space
    errorDiv.title = `Invalid Card Data: ${JSON.stringify(card)}`;
    return errorDiv;
  }

  const cardElement = document.createElement('img');
  // Use the provided imageUrl directly (paths should be correct in the manifest)
  cardElement.src = card.imageUrl;
  cardElement.alt = card.id; // Use the descriptive card ID for accessibility
  cardElement.title = `${card.type}: ${card.id}`; // Tooltip showing type and ID
  cardElement.classList.add('card-image'); // Base class for styling

  // Add data attributes for easy identification in the DOM and event handling
  cardElement.dataset.cardId = card.id; // The actual card identifier (e.g., "Item Card 1")
  cardElement.dataset.manifestKey = manifestKey; // The key used in game state (e.g., "item_1")
  cardElement.dataset.cardType = card.type;
  cardElement.dataset.originSlotId = slotId; // Store original slot

  // Cards are only draggable if they have a manifestKey (represent a specific instance)
  // and are being placed within a known slot.
  if (manifestKey && slotId) {
    cardElement.draggable = true;
    cardElement.addEventListener('dragstart', (event) => {
      // We MUST use manifestKey as cardId here, as it's the identifier used in game state arrays (hands, decks).
      // card.id is just descriptive metadata.
      const dragData = {
        cardId: manifestKey,      // Critical: Use the state management key
        originSlotId: slotId      // The slot the drag started from
      };
      event.dataTransfer.setData('application/json', JSON.stringify(dragData));
      // Optional: Add visual feedback for drag start
      // cardElement.classList.add('dragging');
    });

    // Optional: Clean up visual feedback on drag end
    // cardElement.addEventListener('dragend', (event) => {
    //   cardElement.classList.remove('dragging');
    // });

  } else {
    // If no manifestKey or slotId, it shouldn't be draggable (e.g., a card shown in a gallery)
    cardElement.draggable = false;
  }

  return cardElement;
} 