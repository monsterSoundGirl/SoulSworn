// eventSystem.js

const EventSystem = (() => {
    const events = {}; // Stores event names and their listeners
    const eventLog = []; // Optional: Log events for debugging
    const MAX_LOG_SIZE = 100;

    // Function to log events
    function logEvent(eventName, data) {
        if (eventLog.length >= MAX_LOG_SIZE) {
            eventLog.shift(); // Remove the oldest event
        }
        eventLog.push({ timestamp: new Date(), eventName, data });
        // console.log(`[Event] ${eventName}:`, data); // Optional: Log to console
    }

    // Subscribe to an event
    // listener: function(data) { ... }
    function subscribe(eventName, listener) {
        if (!events[eventName]) {
            events[eventName] = [];
        }
        if (!events[eventName].includes(listener)) {
             events[eventName].push(listener);
        }
        // Return an unsubscribe function for convenience
        return () => unsubscribe(eventName, listener);
    }

    // Unsubscribe from an event
    function unsubscribe(eventName, listener) {
        if (!events[eventName]) {
            return; // No listeners for this event
        }

        const index = events[eventName].indexOf(listener);
        if (index > -1) {
            events[eventName].splice(index, 1);
        }

        // Clean up if no listeners remain
        if (events[eventName].length === 0) {
            delete events[eventName];
        }
    }

    // Publish an event to all subscribers
    function publish(eventName, data = {}) {
        logEvent(eventName, data);

        if (!events[eventName]) {
            return; // No listeners for this event
        }

        // Call listeners asynchronously to prevent blocking
        // Make a copy of listeners array in case unsubscribe is called within a listener
        const listeners = [...events[eventName]];
        listeners.forEach(listener => {
            try {
                // Use setTimeout to make the call asynchronous
                setTimeout(() => listener(data), 0);
            } catch (error) {
                console.error(`Error in event listener for ${eventName}:`, error);
            }
        });
    }

    // Get the event log (for debugging)
    function getLog() {
        return [...eventLog];
    }

    // Clear the event log
    function clearLog() {
        eventLog.length = 0;
    }

    // Public API
    return {
        subscribe,
        unsubscribe,
        publish,
        getLog,      // Expose for debugging/monitoring
        clearLog     // Expose for debugging/monitoring
    };
})();

// Example Usage (can be removed or kept for testing):
// function handlePlayerUpdate(data) {
//     console.log('Player updated:', data);
// }
// const unsubscribePlayerUpdate = EventSystem.subscribe('player:updated', handlePlayerUpdate);

// function handleCardDrawn(data) {
//     console.log('Card drawn:', data);
// }
// EventSystem.subscribe('card:drawn', handleCardDrawn);

// document.addEventListener('DOMContentLoaded', () => {
//     setTimeout(() => {
//         EventSystem.publish('player:updated', { playerId: 1, name: 'Gandalf' });
//     }, 1000);

//     setTimeout(() => {
//         EventSystem.publish('card:drawn', { cardId: 'monster_ghoul', deck: 'main' });
//     }, 2000);

//     setTimeout(() => {
//         unsubscribePlayerUpdate(); // Unsubscribe from player updates
//         console.log('Unsubscribed from player updates');
//         EventSystem.publish('player:updated', { playerId: 2, name: 'Frodo' }); // This won't be logged by handlePlayerUpdate
//     }, 3000);

//     setTimeout(() => {
//         console.log('Event Log:', EventSystem.getLog());
//     }, 4000);
// }); 