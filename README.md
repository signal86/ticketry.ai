# TicketryAI 🎫

**AI-Powered Email Ticket Management System**

TicketryAI bridges the gap between business stakeholders and development teams by automatically converting email requests into structured, actionable tickets. No more back-and-forth emails, no more missing information, no more context switching.

## 🎯 The Problem We Solve

**For Business People:**
- Just send an email - no need to learn complex ticketing systems
- No forms to fill out or fields to remember
- Natural conversation flow with automatic follow-ups

**For Developers:**
- Get complete, structured tickets with all necessary information
- No more hunting down missing details or clarifying requirements
- Focus on building, not on information gathering

## ✨ How It Works

1. **📧 Email Intake**: Business stakeholders send emails to `ticketry.ai@agentmail.to`
2. **🤖 AI Analysis**: Google Gemini analyzes the email content and thread context
3. **📋 Smart Processing**: System determines if it's a valid technical ticket (feature/bug)
4. **🔄 Follow-up**: If information is missing, AI automatically requests specific details
5. **✅ Ticket Creation**: Complete tickets are automatically created in MongoDB
6. **📱 Web Dashboard**: Development team manages tickets through the web interface

## 🚀 Key Features

### For Business Users
- **Email-Only Interface**: Just send emails like you normally would
- **Intelligent Follow-ups**: System asks for missing information automatically
- **Instant Feedback**: Get confirmation when tickets are created
- **No Learning Curve**: Works with any email client

### For Development Teams
- **Structured Tickets**: All tickets include title, description, and complete context
- **Smart Classification**: Automatic feature vs. bug detection
- **Complete Information**: AI ensures all necessary details are captured
- **Status Tracking**: Full ticket lifecycle management (Unclaimed → Claimed → Resolved)

### AI-Powered Intelligence
- **Context Understanding**: Analyzes entire email threads, not just individual messages
- **Technical Validation**: Distinguishes between technical tickets and general correspondence
- **Information Extraction**: Pulls relevant details and formats them properly
- **Quality Assurance**: Ensures tickets have sufficient information before creation

## 🛠️ Technical Stack

- **Frontend**: Next.js 15, React 19, Auth0 authentication
- **Backend**: Node.js, Express.js
- **AI**: Google Gemini 2.5 Flash
- **Email**: AgentMail service
- **Database**: MongoDB Atlas
- **Deployment**: Vercel-ready

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account
- Google Gemini API key
- AgentMail account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ticketryai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file with:
   ```env
   AGENTMAIL_API_KEY=your_agentmail_api_key
   GEMINI_API_KEY=your_gemini_api_key
   DATABASE_ADMIN_USERNAME=your_mongodb_username
   DATABASE_ADMIN_PASSWORD=your_mongodb_password
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Start email processing**
   ```bash
   # In a separate terminal
   node ticketProcessorFixed.js
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📧 Email Processing

### Webhook Mode (Recommended)
Set up the webhook endpoint `/api/webhook/email-received` with AgentMail for real-time processing.

### Polling Mode
Run the email processor continuously with configurable intervals:

```bash
# Default: 15-second intervals
node ticketProcessorFixed.js --continuous

# Custom interval (e.g., 30 seconds)
node ticketProcessorFixed.js --continuous --interval=30

# Using shell script (defaults to 30 seconds)
./run_email_check.sh

# Custom interval with shell script
./run_email_check.sh 15
```

## 🎯 Use Cases

- **Feature Requests**: "I need a dark mode toggle for the mobile app"
- **Bug Reports**: "The login button doesn't work on Safari"
- **Enhancements**: "Can we add export functionality to the reports?"
- **Technical Issues**: "The API is returning 500 errors for user data"

## 🔄 Workflow Example

1. **Business User** emails: *"Hey, the app crashes when I try to upload large files"*
2. **AI Analysis** determines this is a bug report but needs more details
3. **System** automatically replies: *"Thanks for reporting this bug. To help us fix it quickly, could you provide: • Steps to reproduce the crash • What file size causes the issue • Your device/browser information"*
4. **User** replies with additional details
5. **System** creates a complete ticket with all information
6. **Developer** receives a structured ticket ready for investigation

## 🚀 Deployment

### Vercel (Frontend)
```bash
npm run build
# Deploy to Vercel
```

### Backend Services
- Deploy webhook server to handle email processing
- Set up MongoDB Atlas for ticket storage
- Configure AgentMail webhook endpoints

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for details.

## 📄 License

This project is licensed under the MIT License.

---

**TicketryAI** - Where business communication meets developer productivity. 🚀
