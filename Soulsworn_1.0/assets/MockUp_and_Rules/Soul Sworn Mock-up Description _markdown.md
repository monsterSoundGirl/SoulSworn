## Soul Sworn Mock-up Description
### Orientation

#### Over-all Behavior

This game isn’t like many other apps. There aren’t a great number of constraints because it’s meant to mimic a physical card game but allowing remote play. It’s a role-playing game that relies heavily on player improvisation, and even the rules can change to allow for strong story flow. We want players to be able to move cards at will, place cards back into the pile, reshuffle the deck, look through the deck, etc. This could require pop-up windows for certain experiences. Some windows we may want visible to all players, some visible to only the player taking the action, and players may need to see private windows concurrently.

We’ll have the ability to click-drag cards into different slots, right-click to bring up pop-up window actions. Double-click to flip a card over. This can be done on any card, no restrictions, unless the card is in a player’s hand (this is a protected area accessible only to the player). If you can do it in the real-world, you can do it in the app world.

#### Layout

- The board resolution is roughly set at 1920 x 1200, 72 dpi. 
- All playing cards have a 2x3 aspect ratio.
- The center of the board is the “story grid” where cards are played.
-  There are four player “hand” arrangements, two above the story grid and two below.
- On the left of the story grid is an oversized “inspector” area to see, one at a time, huge versions of any visible card that has been highlighted.
- On the immediate right of the story grid is a column of “mutable” card slots, usable for any type of card the players wish to keep there. 
- To the right of the mutable column are (top): the main “deck and discard” piles, (middle): a big ring around a “20-side die”, (bottom): the “alt deck and alt discard” piles.
- In the upper left corner is a “menu” icon.
- In the upper right corner is a “settings” icon.
- In the bottom right corner is the “turn-timer dashboard”.
- In the bottom left corner is the Soul Sworn logo.

### Specifics

#### Story Area

This area is set out in a grid of card slots of 4 rows and 10 columns. Cards played in this space can be moved around freely. Any card placed in this area is face-down unless the player who played the card double-clicks to flip it upright. 

#### Player Hands

The player hand arrangements are rows of 6 card slots. Player are dealt a hand of 5 playing cards, but the left-most card is their character card. There is a column of three numbers to the left of the character card slot. These numbers are “attribute value” token tabs. (Top-to-bottom: Rational, Emotional, Physical). Every character card has a required allocation of 3-4 tokens based on character-job strengths. As players can use up to 7 total tokens, any remaining tokens can be distributed across the attributes. Players can click on a token tab to increment, double-click to decrement (no negative numbers). While character cards are always face-up, players can only see their own hand face-up. All other player hands appear face-down.

#### Inspector

The inspector, very simply, is the large version of the card, zoomed into a 4x. When a player clicks on any face-up card, that card is highlighted with a purple ring and then appears in the inspector. Its y-dimension matches the 4-slot column y-dimension of the story grid.

#### Mutable Column

This is basically 4 free spaces to place cards that would be handy to isolate and expose to all players. For example, if players decide to draw personal sub-objectives (on top of the all-player objective), they could lay out here. In future iterations, I’ll likely employ a magic card system outside the cantrips naturally available on character cards. A long duration spell in play for each character might be played in the mutable slots until the spell terminates.

#### Deck and Discard

This is a standard deck and discard. Double-click to flip the top card on the pile. Click-drag to player hands (or wherever). If a card is upside-down, it remains upside down until double-clicked. Right-click to select options such as looking through the deck or reshuffling.

#### 20-side die

In the UI, this is just an illustration of a blue, 20-sided die. Functionally, click to “roll” the die. The number object sitting on the graphic will randomly change between 1 and 20. For a 1 (a critical fail), the die graphic will turn red. For a 20 (a critical success), the die will turn green. If you double-click, the numbers will change randomly for a few seconds and settle on the final number.

#### Alt Deck and Discard

The alt deck-discard can be determine in the setup. It could be objective cards, character cards, NPC cards, Monster cards… really any card class can be assigned to the alt deck. Functionally, it behaves the same as the primary deck-discard.

#### Menu

The menu could be drop-down or pop-up and is private per player. I’ll be hosting the project on my Wix site which is pw protected but only for entry. (I’ll handle that part). Upon entry, users encounters all the game setup parameters, a secret phrase, and a phrase box. Each player is assigned a unique, random secret phrase on entry. They can give this secret to their friends, and their friends can enter this into the phrase box to join the instance in which the haver-of-the-secret-phrase is automatically the only one that can set game parameters and launch the instance. The other users just wait to join. Because chat is handled outside the app through any old service, the game instance is running according to the secret phrase. 

#### Settings

I can’t think of what to put in settings. So let’s have this access point built, but we’ll leave it empty and hide it for now.

#### Turn-Timer Dashboard

The turn-timer, when used, helps to ensure rounds move along. In the center of the small block is a large-font countdown timer in the format mm:ss. Above that is a small grey mm:ss where the max time can be set, and a “set” button next to it. Below the timer are two large buttons: a “reset” button to ensure the countdown is paused and displays the max time, and a “go/pause” button that toggles between a running countdown and a paused countdown.