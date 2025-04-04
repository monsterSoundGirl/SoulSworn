// utils.js - Utility functions for SoulSworn

/**
 * Shuffles an array in place using the Fisher-Yates algorithm
 * @param {Array} arr - The array to shuffle
 * @returns {Array} - The shuffled array (same reference as input)
 */
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Find a card by its ID in all available card collections
 * @param {string} cardId - The ID of the card to find
 * @returns {Object|null} - The card object if found, or null if not found
 */
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