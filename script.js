<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="Content-Style-Type" content="text/css">
  <title></title>
  <meta name="Generator" content="Cocoa HTML Writer">
  <meta name="CocoaVersion" content="2575.5">
  <style type="text/css">
    p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica; -webkit-text-stroke: #000000}
    p.p2 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica; -webkit-text-stroke: #000000; min-height: 14.0px}
    span.s1 {font-kerning: none}
  </style>
</head>
<body>
<p class="p1"><span class="s1">// Your card data</span></p>
<p class="p1"><span class="s1">const deck = [</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>{</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>id: 1,</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>name: "Echoing Alley",</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>description: "Whispers follow you, echoing secrets—or leading to doom.",</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>imageUrl: "images/echoing_alley.jpg"</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>},</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>{</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>id: 2,</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>name: "Veiled Market",</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>description: "Hidden bargains, cursed treasures—every deal has a price.",</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>imageUrl: "images/veiled_market.jpg"</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>},</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>// ... Add as many as you want</span></p>
<p class="p1"><span class="s1">];</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">// Global state</span></p>
<p class="p1"><span class="s1">let playerCount = 1;</span></p>
<p class="p1"><span class="s1">let playerHands = []; // array of arrays</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">function shuffleArray(arr) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>for (let i = arr.length - 1; i &gt; 0; i--) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>const j = Math.floor(Math.random() * (i + 1));</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>[arr[i], arr[j]] = [arr[j], arr[i]];</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>}</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>return arr;</span></p>
<p class="p1"><span class="s1">}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">function startGame() {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>// Read number of players</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>playerCount = parseInt(document.getElementById("playerCount").value, 10);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>if (playerCount &lt; 1) playerCount = 1;</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>// Initialize empty hands</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>playerHands = [];</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>for (let i = 0; i &lt; playerCount; i++) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>playerHands.push([]);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>// Hide setup, show game area</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>document.getElementById("setup").style.display = "none";</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>document.getElementById("gameArea").style.display = "block";</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>// (Optional) Shuffle deck at game start</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>shuffleDeck();</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>// (Optional) Immediately deal some initial cards?</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>// dealCards(5);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>renderHands();</span></p>
<p class="p1"><span class="s1">}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">function shuffleDeck() {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>shuffleArray(deck);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>alert("Deck shuffled!");</span></p>
<p class="p1"><span class="s1">}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">function dealCards(cardsPerPlayer = 1) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>// For each player, draw `cardsPerPlayer` from the top of the deck (if available)</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>for (let p = 0; p &lt; playerCount; p++) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>for (let c = 0; c &lt; cardsPerPlayer; c++) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>if (deck.length &gt; 0) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>const card = deck.shift();</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>playerHands[p].push(card);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>} else {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>alert("No more cards in the deck!");</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>return;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>}</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>}</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>}</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>renderHands();</span></p>
<p class="p1"><span class="s1">}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">function rollD20() {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>const result = Math.floor(Math.random() * 20) + 1;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>document.getElementById("rollResult").textContent = "You rolled a " + result;</span></p>
<p class="p1"><span class="s1">}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">function renderHands() {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>const container = document.getElementById("playerHands");</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>container.innerHTML = ""; // Clear previous</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>// For each player, create a section</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>for (let p = 0; p &lt; playerCount; p++) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>const playerDiv = document.createElement("div");</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>playerDiv.className = "player-hand";</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>playerDiv.innerHTML = `&lt;h3&gt;Player ${p + 1}&lt;/h3&gt;`;</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>// For each card in that player’s hand, show a thumbnail</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>playerHands[p].forEach(card =&gt; {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>const cardDiv = document.createElement("div");</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>cardDiv.className = "card";</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>cardDiv.innerHTML = `</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>&lt;img src="${card.imageUrl}" alt="${card.name}" class="card-img" /&gt;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>&lt;h4&gt;${card.name}&lt;/h4&gt;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>&lt;p&gt;${card.description}&lt;/p&gt;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>`;</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>playerDiv.appendChild(cardDiv);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>});</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>container.appendChild(playerDiv);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>}</span></p>
<p class="p1"><span class="s1">}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">// Hook up DOM events</span></p>
<p class="p1"><span class="s1">window.addEventListener("DOMContentLoaded", () =&gt; {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>document.getElementById("startGameBtn").addEventListener("click", startGame);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>document.getElementById("shuffleBtn").addEventListener("click", shuffleDeck);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>document.getElementById("dealBtn").addEventListener("click", () =&gt; dealCards(1));</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>document.getElementById("rollDieBtn").addEventListener("click", rollD20);</span></p>
<p class="p1"><span class="s1">});</span></p>
</body>
</html>
