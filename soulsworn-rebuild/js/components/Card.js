/**
 * Creates an HTML element representing a single card.
 * @param {object} card - The card object from GameState.allCards.
 *                          Expected structure: { id: string, type: string, imageUrl: string }
 * @returns {HTMLImageElement} An image element representing the card.
 */
export function createCardElement(card) {
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

  const cardElement = document.createElement('img');
  cardElement.src = card.imageUrl;
  cardElement.alt = card.id; // Use card ID as alt text
  cardElement.title = `${card.type}: ${card.id}`; // Tooltip
  cardElement.classList.add('card-image'); // For styling
  cardElement.dataset.cardId = card.id; // Store card ID for later reference
  cardElement.dataset.cardType = card.type; // Store card type

  // Make cards draggable (basic setup for Phase 4)
  cardElement.draggable = true;
  cardElement.addEventListener('dragstart', (event) => {
    console.log(`Drag Start: ${card.id}`);
    // Pass the card ID with the drag event
    event.dataTransfer.setData('text/plain', card.id);
    // Optional: Set a drag image (can be the card itself or a custom one)
    // event.dataTransfer.setDragImage(cardElement, 0, 0);
  });

  return cardElement;
} 