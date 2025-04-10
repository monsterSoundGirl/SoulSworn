# Multiplayer Implementation Education

## Server Types and Their Uses

### Static Server
- Serves files as-is from a directory
- No processing or logic on the server
- Like a file system accessible over HTTP
- Good for serving game assets, development, and testing

### Application Server
- Can process requests and generate responses
- Can run business logic
- Can interact with databases
- Can handle user sessions
- Required for multiplayer functionality

## Multiplayer Implementation for SoulSworn

### Core Requirements
1. Session management
2. State synchronization
3. Event broadcasting
4. Minimal shared data storage

### Player Instance System
- Players assigned unique "instance codes"
- Friends can join using instance code
- Up to 4 players per instance
- Player hands remain hidden to others
- Notes tray remains private
- All other controls accessible to all players

### Recommended Framework
Node.js with Socket.IO
- Built for real-time communication
- Easy to implement
- Well-documented
- Large community support

### Hosting Options
1. Heroku
   - Easy to deploy
   - Free tier available
   - Good for small to medium applications

2. DigitalOcean
   - More control
   - Better for scaling
   - Starts at $5/month

3. AWS
   - Most flexible
   - Can be complex
   - Pay-as-you-go pricing

4. Railway
   - Modern platform
   - Easy deployment
   - Good free tier

## Data Flow Example
```
Player 1 Browser                    Server                    Player 2 Browser
    |                                |                            |
    |--- Create Instance ----------->|                            |
    |<---- Instance Code ------------|                            |
    |                                |                            |
    |                                |<---- Join Instance --------|
    |                                |                            |
    |--- Play Card ----------------->|                            |
    |                                |--- Broadcast Update ------>|
    |<---- State Update -------------|                            |
```

## Key Implementation Features

### Instance Management
```javascript
// Generate unique instance code
function generateInstanceCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}
```

### State Synchronization
```javascript
// Client-side
socket.on('state-update', (update) => {
    // Update local game state
    updateGameState(update);
});
```

### Player Management
```javascript
// Server-side
const gameInstance = {
    instanceCode: 'ABC123',
    players: [],
    gameState: {},
    maxPlayers: 4
};
``` 