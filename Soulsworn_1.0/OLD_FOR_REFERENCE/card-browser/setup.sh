#!/bin/bash

# Create directories if they don't exist
mkdir -p card-browser/test

# Check if files exist and create them if they don't
echo "Setting up Card Browser test environment..."

# Start a simple HTTP server for testing
echo "Starting HTTP server on port 8000..."
echo "Please open http://localhost:8000/card-browser/test/ in your browser"
echo "Press Ctrl+C to stop the server"
python3 -m http.server || python -m SimpleHTTPServer

echo "Server stopped" 