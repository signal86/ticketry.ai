#!/bin/bash
# Run the email processor continuously in a single process
# This avoids the overhead of restarting Node.js and reloading .env on every iteration

# Usage: ./run_email_check.sh [interval_seconds]
# Default interval: 30 seconds
INTERVAL=${1:-30}

echo "🚀 Starting TicketryAI email processor..."
echo "📧 Checking for emails every $INTERVAL seconds"
echo "🛑 Press Ctrl+C to stop"
echo ""

# Run in continuous mode with custom interval
node ticketProcessorFixed.js --continuous --interval=$INTERVAL
