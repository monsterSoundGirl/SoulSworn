/**
 * Creates an HTML element representing a single card.
 * @param {object} card - The card object from GameState.allCards.
 *                          Expected structure: { id: string, type: string, imageUrl: string }
 * @param {string} manifestKey - The key used for this card in GameState.allCards (e.g., 'item_1', 'spell_6').
 * @param {string} slotId - The ID of the board slot this card is currently in.
 * @returns {HTMLImageElement} An image element representing the card.
 */
export function createCardElement(card, manifestKey, slotId) {
  if (!card || !card.id || !card.imageUrl) {
    console.error('Invalid card data provided to createCardElement:', card);
    // Return a placeholder or throw an error, depending on desired handling
    const errorDiv = document.createElement('div');
    errorDiv.textContent = 'Error: Invalid Card';
    errorDiv.style.color = 'red';
    errorDiv.style.border = '1px solid red';
    errorDiv.style.padding = '10px';
    errorDiv.style.width = '70px'; // Approx card width
    errorDiv.style.height = '100px'; // Approx card height
    return errorDiv;
  }
  // Removed the warning about missing slotId, as it's expected for non-draggable elements like deck backs
  // if (!slotId) {
  //  console.warn('Missing slotId for card:', card.id, '- Drag source may not be identified.');
  // }

  const cardElement = document.createElement('img');
  cardElement.src = card.imageUrl;
  cardElement.alt = card.id; // Use card ID as alt text
  cardElement.title = `${card.type}: ${card.id}`; // Tooltip
  cardElement.classList.add('card-image'); // For styling
  cardElement.dataset.cardId = card.id; // Store card ID for later reference
  cardElement.dataset.cardType = card.type; // Store card type

  // Make cards draggable ONLY if they have a manifestKey and are in a valid slot
  if (manifestKey && slotId) {
    cardElement.draggable = true;
    cardElement.addEventListener('dragstart', (event) => {
      // Store both cardId (using the manifest key) and origin slotId
      const dragData = {
        cardId: manifestKey, // Use the manifest key, which matches hand/deck arrays
        originSlotId: slotId // Use the passed slotId
      };
      event.dataTransfer.setData('application/json', JSON.stringify(dragData));
      console.log(`Drag Start: Card Key ${manifestKey} (id: ${card.id}) from Slot ${slotId}`);
    });
  } // End conditional draggable setup

  return cardElement;
} 