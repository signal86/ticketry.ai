const express = require('express');
const { TicketProcessor } = require('./ticketProcessorFixed');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Webhook endpoint for AgentMail
app.post('/api/webhook/email-received', async (req, res) => {
  try {
    console.log('🔔 Webhook triggered - New email received!');
    console.log('Webhook payload:', JSON.stringify(req.body, null, 2));
    
    // Process emails whenever webhook is triggered
    const processor = new TicketProcessor();
    await processor.processNewEmails();
    
    res.status(200).json({ 
      success: true, 
      message: 'Email processing triggered successfully',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error processing webhook:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Health check endpoint for the webhook
app.get('/api/webhook/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'ticketryai-email-webhook',
    timestamp: new Date().toISOString() 
  });
});

module.exports = app;
