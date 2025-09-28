const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const { AgentMailClient } = require("agentmail");
const { GoogleGenAI } = require("@google/genai");
const { postNewItem } = require("./mongoTicketWriter");
const fs = require('fs').promises;

class TicketProcessor {
  constructor() {
    const { AGENTMAIL_API_KEY, GEMINI_API_KEY } = process.env;
    
    if (!AGENTMAIL_API_KEY) throw new Error("Missing AGENTMAIL_API_KEY in .env");
    if (!GEMINI_API_KEY) throw new Error("Missing GEMINI_API_KEY in .env");
    
    this.agentMail = new AgentMailClient({ apiKey: AGENTMAIL_API_KEY });
    this.gemini = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    this.inboxId = "ticketry.ai@agentmail.to";
    this.emailStatesFile = path.join(__dirname, 'email_states.json');
  }

  // Load email states from file
  async loadEmailStates() {
    try {
      const data = await fs.readFile(this.emailStatesFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return {};
    }
  }

  // Save email states to file
  async saveEmailStates(emailStates) {
    await fs.writeFile(this.emailStatesFile, JSON.stringify(emailStates, null, 2));
  }

  // Generate a unique key for email thread
  generateThreadKey(email) {
    const baseSubject = email.subject.replace(/^(Re:|Fwd?:)\s*/i, '').trim().toLowerCase();
    return `${email.from}|||${baseSubject}`;
  }

  // Compile thread content into a single context
  compileThreadContent(thread) {
    let fullContext = "";
    
    for (const email of thread) {
      fullContext += `--- Email from ${email.createdAt} ---\n`;
      fullContext += `Subject: ${email.subject}\n`;
      fullContext += `Content: ${email.text}\n\n`;
    }
    
    return fullContext.trim();
  }

  // Analyze email with Gemini
  async analyzeEmailWithGemini(threadContent, userEmail) {
    const prompt = `
Analyze this email thread to determine if it's a valid software ticket request:

Email Thread:
${threadContent}

User Email: ${userEmail}

Instructions:
1. First, determine if this is a legitimate software/technical ticket (feature request or bug report)
   - Valid: Feature requests, bug reports, technical issues with software/hardware
   - Invalid: HR issues, personal matters, casual conversations, non-technical requests

2. If INVALID, respond with exactly: 
   {"valid": false, "reason": "not_technical"}

3. If VALID, determine the ticket type:
   - "feature": New feature or enhancement request
   - "bug": Bug report or technical issue

4. For FEATURE requests, check if it includes:
   - Clear description of what feature is needed
   - Why it's needed (use case/business justification)
   - Specific enough that a developer could understand and implement

5. For BUG reports, check if it includes:
   - Steps to reproduce the issue
   - What product/system is affected
   - Expected vs actual behavior
   - Environment details (browser, OS, etc. if relevant)

6. Respond in this JSON format:
{
  "valid": true,
  "type": "feature|bug",
  "complete": true|false,
  "title": "Brief title for the ticket",
  "description": "General description",
  "additionalDetails": "All detailed information",
  "missingInfo": ["list of missing required information if incomplete"]
}

If incomplete, list exactly what information is needed.
`;

    try {
      const response = await this.gemini.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const analysisText = response.text.trim();
      console.log("Gemini Analysis:", analysisText);
      
      // Extract JSON from response - handle both plain JSON and markdown code blocks
      let jsonText = analysisText;
      
      // Remove markdown code block if present
      const codeBlockMatch = analysisText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (codeBlockMatch) {
        jsonText = codeBlockMatch[1].trim();
      }
      
      // Find JSON object
      const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No valid JSON found in Gemini response");
      }
      
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error("Error analyzing with Gemini:", error);
      return { valid: false, reason: "analysis_error" };
    }
  }

  // Send follow-up email requesting more information
  async sendFollowUpEmail(userEmail, subject, missingInfo) {
    const questions = missingInfo.map(info => `• ${info}`).join('\n');
    
    const emailContent = `Hi,

Thank you for your ticket submission. To help us process your request effectively, we need a bit more information:

${questions}

Please reply to this email with the additional details, and we'll create your ticket right away.

Best regards,
Ticketry.ai Support Team`;

    try {
      await this.agentMail.inboxes.messages.send(this.inboxId, {
        to: userEmail,
        subject: `Re: ${subject}`,
        text: emailContent,
      });
      console.log(`Follow-up email sent to ${userEmail}`);
    } catch (error) {
      console.error("Error sending follow-up email:", error);
    }
  }

  // Send rejection email for non-technical requests
  async sendRejectionEmail(userEmail, subject) {
    const emailContent = `Hi,

Thank you for reaching out. However, this doesn't appear to be a technical support request or software-related ticket.

For non-technical matters, please contact HR directly.

Best regards,
Ticketry.ai Support Team`;

    try {
      await this.agentMail.inboxes.messages.send(this.inboxId, {
        to: userEmail,
        subject: `Re: ${subject}`,
        text: emailContent,
      });
      console.log(`Rejection email sent to ${userEmail}`);
    } catch (error) {
      console.error("Error sending rejection email:", error);
    }
  }

  // Send confirmation email that ticket was created
  async sendConfirmationEmail(userEmail, subject, ticketId) {
    const emailContent = `Hi,

Great news! We've successfully created your ticket.

Ticket ID: ${ticketId}
Subject: ${subject}

Your request is now in our system and will be reviewed by our team. You'll receive updates as we work on your ticket.

Best regards,
Ticketry.ai Support Team`;

    try {
      await this.agentMail.inboxes.messages.send(this.inboxId, {
        to: userEmail,
        subject: `Re: ${subject} - Ticket Created`,
        text: emailContent,
      });
      console.log(`Confirmation email sent to ${userEmail} for ticket ${ticketId}`);
    } catch (error) {
      console.error("Error sending confirmation email:", error);
    }
  }

  // Create ticket in MongoDB
  async createTicket(title, email, description, additionalDetails) {
    try {
      const result = await postNewItem(title, email, description, additionalDetails, 0);
      
      if (result.success) {
        console.log(`Ticket created successfully: ${result.itemId}`);
        return result.itemId;
      } else {
        console.error("Failed to create ticket:", result.error);
        return null;
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
      return null;
    }
  }

  // Process new emails with follow-up handling
  async processNewEmails() {
    try {
      console.log("Checking for new emails...");
      
      // Load email states
      const emailStates = await this.loadEmailStates();
      
      // Fetch recent messages
      const result = await this.agentMail.inboxes.messages.list(this.inboxId, { limit: 50 });
      const messages = result.messages || [];
      
      if (messages.length === 0) {
        console.log("No messages found.");
        return;
      }
      
      // Filter out system emails and get user emails only
      const userEmails = messages.filter(msg => !msg.from.includes('ticketry.ai@agentmail.to'));
      
      // Group emails by thread
      const threadMap = new Map();
      
      for (const email of userEmails) {
        const threadKey = this.generateThreadKey(email);
        if (!threadMap.has(threadKey)) {
          threadMap.set(threadKey, []);
        }
        threadMap.get(threadKey).push(email);
      }
      
      console.log(`Found ${threadMap.size} email threads to check`);
      
      let threadsProcessed = 0;
      
      for (const [threadKey, threadEmails] of threadMap) {
        // Sort emails in thread by date (oldest first)
        threadEmails.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        const latestEmail = threadEmails[threadEmails.length - 1];
        
        // Get current state of this thread
        const currentState = emailStates[threadKey];
        
        // Determine if we should process this thread
        let shouldProcess = false;
        let reason = "";
        
        if (!currentState) {
          // Brand new thread
          shouldProcess = true;
          reason = "new thread";
        } else if (currentState.status === 'awaiting_info') {
          // Check if there are new emails since we asked for more info
          const lastProcessedTime = new Date(currentState.processedAt);
          const hasNewReplies = threadEmails.some(email => 
            new Date(email.createdAt) > lastProcessedTime
          );
          
          if (hasNewReplies) {
            shouldProcess = true;
            reason = "new reply to follow-up question";
          }
        } else if (['rejected', 'ticket_created', 'skipped', 'error'].includes(currentState.status)) {
          // These are final states - don't reprocess unless there are significantly new emails
          shouldProcess = false;
          reason = `already completed with status: ${currentState.status}`;
        }
        
        if (!shouldProcess) {
          console.log(`Skipping thread ${threadKey}: ${reason}`);
          continue;
        }
        
        console.log(`\n--- Processing thread: ${latestEmail.from} (${reason}) ---`);
        console.log(`Subject: ${latestEmail.subject}`);
        console.log(`Emails in thread: ${threadEmails.length}`);
        
        // Compile thread content
        const threadContent = this.compileThreadContent(threadEmails);
        
        // Analyze with Gemini
        const analysis = await this.analyzeEmailWithGemini(threadContent, latestEmail.from);
        
        if (!analysis.valid) {
          if (analysis.reason === "not_technical") {
            console.log("Non-technical request - sending rejection email");
            await this.sendRejectionEmail(latestEmail.from, latestEmail.subject);
            emailStates[threadKey] = {
              status: 'rejected',
              reason: 'not_technical',
              processedAt: new Date().toISOString(),
              emailCount: threadEmails.length
            };
          } else {
            console.log("Invalid analysis - skipping");
            emailStates[threadKey] = {
              status: 'skipped',
              reason: 'analysis_error',
              processedAt: new Date().toISOString(),
              emailCount: threadEmails.length
            };
          }
        } else if (!analysis.complete) {
          console.log("Incomplete ticket - requesting more information");
          await this.sendFollowUpEmail(latestEmail.from, latestEmail.subject, analysis.missingInfo);
          emailStates[threadKey] = {
            status: 'awaiting_info',
            missingInfo: analysis.missingInfo,
            processedAt: new Date().toISOString(),
            emailCount: threadEmails.length
          };
        } else {
          console.log("Complete ticket - creating ticket");
          const ticketId = await this.createTicket(
            analysis.title,
            latestEmail.from,
            analysis.description,
            analysis.additionalDetails
          );
          
          if (ticketId) {
            await this.sendConfirmationEmail(latestEmail.from, latestEmail.subject, ticketId);
            emailStates[threadKey] = {
              status: 'ticket_created',
              ticketId: ticketId,
              processedAt: new Date().toISOString(),
              emailCount: threadEmails.length
            };
          } else {
            emailStates[threadKey] = {
              status: 'error',
              reason: 'ticket_creation_failed',
              processedAt: new Date().toISOString(),
              emailCount: threadEmails.length
            };
          }
        }
        
        threadsProcessed++;
      }
      
      // Save updated states
      await this.saveEmailStates(emailStates);
      
      console.log(`\nProcessing complete! Handled ${threadsProcessed} threads.`);
      
    } catch (error) {
      console.error("Error processing emails:", error);
    }
  }
}

// Main execution function
async function main() {
  const processor = new TicketProcessor();
  await processor.processNewEmails();
}

// Continuous execution function for long-running processes
async function runContinuous(intervalMs = 15000) {
  const processor = new TicketProcessor();
  
  console.log(`🚀 Starting continuous email processing (checking every ${intervalMs/1000} seconds)...`);
  console.log(`⚠️  Note: Very short intervals (1-5 seconds) may hit API rate limits`);
  
  while (true) {
    try {
      const startTime = Date.now();
      console.log('🔄 Checking for new emails...');
      await processor.processNewEmails();
      const processingTime = Date.now() - startTime;
      console.log(`✅ Email check complete in ${processingTime}ms. Waiting ${intervalMs/1000} seconds...`);
      
      // If processing took longer than the interval, warn the user
      if (processingTime > intervalMs) {
        console.log(`⚠️  Processing took ${processingTime}ms (longer than ${intervalMs}ms interval)`);
      }
      
      await new Promise(resolve => setTimeout(resolve, intervalMs));
    } catch (error) {
      console.error('❌ Error in email processing:', error);
      console.log('⏳ Waiting 60 seconds before retry...');
      await new Promise(resolve => setTimeout(resolve, 60000));
    }
  }
}

// Export for use in other modules
module.exports = { TicketProcessor, runContinuous };

// Run if executed directly
if (require.main === module) {
  // Check for --continuous flag
  const isContinuous = process.argv.includes('--continuous');
  const intervalArg = process.argv.find(arg => arg.startsWith('--interval='));
  const interval = intervalArg ? parseInt(intervalArg.split('=')[1]) * 1000 : 15000;
  
  if (isContinuous) {
    runContinuous(interval).catch(console.error);
  } else {
    main().catch(console.error);
  }
}
