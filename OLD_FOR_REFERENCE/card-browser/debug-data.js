/**
 * Debug utility for card browser component
 * This file will help diagnose issues with card data loading
 */

document.addEventListener('DOMContentLoaded', async () => {
  const output = document.getElementById('debug-output');
  if (!output) return;
  
  try {
    // Load card data
    const response = await fetch('../../assets/card-data.json');
    const cardData = await response.json();
    
    // Display card data structure
    output.innerHTML += `<h3>Card Data Structure</h3>`;
    output.innerHTML += `<pre>${JSON.stringify(cardData, null, 2)}</pre>`;
    
    // Display card counts by type
    output.innerHTML += `<h3>Card Counts by Type</h3>`;
    const deck = cardData.deck || {};
    
    const types = ['location', 'NPC', 'item', 'spell', 'monster'];
    
    output.innerHTML += `<ul>`;
    types.forEach(type => {
      const cards = deck[type] || [];
      output.innerHTML += `<li><strong>${type}:</strong> ${cards.length} cards</li>`;
      
      // List the first few cards of each type
      if (cards.length > 0) {
        output.innerHTML += `<ul>`;
        cards.slice(0, 3).forEach(card => {
          output.innerHTML += `<li>${card.name} (${card.id}) - Image: ${card.imageUrl}</li>`;
        });
        if (cards.length > 3) {
          output.innerHTML += `<li>... and ${cards.length - 3} more</li>`;
        }
        output.innerHTML += `</ul>`;
      }
    });
    output.innerHTML += `</ul>`;
    
    // Check for image loading issues
    output.innerHTML += `<h3>Image Load Test</h3>`;
    output.innerHTML += `<div id="image-test"></div>`;
    
    const imageTest = document.getElementById('image-test');
    for (const type of types) {
      const cards = deck[type] || [];
      if (cards.length > 0) {
        const card = cards[0];
        const imgContainer = document.createElement('div');
        imgContainer.style.margin = '10px';
        imgContainer.style.padding = '10px';
        imgContainer.style.border = '1px solid #333';
        imgContainer.style.borderRadius = '4px';
        
        const img = document.createElement('img');
        img.src = `../../${card.imageUrl}`;
        img.alt = card.name;
        img.style.maxWidth = '200px';
        img.style.maxHeight = '300px';
        
        const label = document.createElement('p');
        label.textContent = `${type}: ${card.name}`;
        
        img.onerror = () => {
          label.textContent = `${type}: ${card.name} - ERROR LOADING IMAGE`;
          label.style.color = 'red';
        };
        
        imgContainer.appendChild(img);
        imgContainer.appendChild(label);
        imageTest.appendChild(imgContainer);
      }
    }
    
  } catch (error) {
    output.innerHTML += `<div class="error">Error loading card data: ${error.message}</div>`;
    console.error('Error loading card data:', error);
  }
}); 