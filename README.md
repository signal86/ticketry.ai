# Ticketry.AI 🎫

**Turn Emails Into Actionable Tickets—Automatically.**

Ticketry.AI is the fastest way to bridge business requests and developer action. Just send an email—Ticketry.AI’s AI engine instantly analyzes, follows up for missing info, and creates structured, ready-to-work tickets for your dev team. No more lost requests, endless clarification, or context switching. Get from "I need this" to "It’s in the backlog" in minutes, not days.

---

## 🚀 Why Ticketry.AI?
- **Zero learning curve:** Business users just email as usual—no new tools, no training.
- **AI-powered clarity:** Gemini AI extracts, validates, and follows up for all required details.
- **No more missing info:** Every ticket is complete before it hits your backlog.
- **Instant feedback:** Users get confirmation and status updates automatically.
- **Seamless for devs:** Tickets are structured, classified, and ready to work—no more hunting for context.

---

## 🛠️ How It Works
1. **Email Intake:** Business users send requests to `ticketry.ai@agentmail.to`.
2. **AI Analysis:** Google Gemini reviews the thread, classifies the request, and checks for missing info.
3. **Smart Follow-up:** If details are missing, Ticketry.AI emails the user for specifics.
4. **Ticket Creation:** Complete requests are auto-converted into MongoDB tickets.
5. **Web Dashboard:** Devs manage, claim, and resolve tickets in a modern Next.js app.

---

## ✨ Key Features

### For Business Users
- **Email-Only Interface:** No portals, no forms—just email.
- **Automatic Follow-ups:** AI asks for missing info, so you don’t have to.
- **Instant Confirmation:** Know your request is received and processed.

### For Developers
- **Structured Tickets:** Every ticket has title, description, context, and status.
- **Smart Classification:** Feature vs. bug detection, technical validation.
- **Full Lifecycle:** Track tickets from Unclaimed → Claimed → Resolved.
- **API Access:** REST endpoints for integration and automation.

---

## 🏗️ Technical Stack
- **Frontend:** Next.js 15, React 19, Auth0
- **Backend:** Node.js, Express.js (for webhook/email processing)
- **AI:** Google Gemini 2.5 Flash
- **Email:** AgentMail
- **Database:** MongoDB Atlas
- **Deployment:** Node/Express (backend)

---

## ⚡ Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Google Gemini API key
- AgentMail account
- Auth0 account (for authentication)

### Installation
1. **Clone the repo:**
   ```bash
   git clone <repository-url>
   cd ticketry.ai
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   Create a `.env` file in the root with the following (replace with your actual values):
   ```env
   # AgentMail (email intake)
   AGENTMAIL_API_KEY=your_agentmail_api_key
   SAMPLE_EMAIL_ADDRESS=your_test_email_address

   # MongoDB Atlas
   DATABASE_ADMIN_USERNAME=your_mongodb_username
   DATABASE_ADMIN_PASSWORD=your_mongodb_password

   # Google Gemini (AI)
   GEMINI_API_KEY=your_gemini_api_key

   # Auth0 (authentication)
   NEXT_PUBLIC_AUTH0_KEY=your_auth0_client_id
   AUTH0_DOMAIN=your_auth0_domain
   AUTH0_CLIENT_ID=your_auth0_client_id
   AUTH0_CLIENT_SECRET=your_auth0_client_secret
   AUTH0_SECRET=your_auth0_secret
   APP_BASE_URL=http://localhost:3000/
   AUTH0_SCOPE="openid profile email read:shows"
   AUTH0_AUDIENCE=https://your_auth0_domain/api/v2/
   ```
   **Descriptions:**
   - `AGENTMAIL_API_KEY`: API key for AgentMail email service
   - `SAMPLE_EMAIL_ADDRESS`: (optional) for testing email intake
   - `DATABASE_ADMIN_USERNAME`/`DATABASE_ADMIN_PASSWORD`: MongoDB Atlas credentials
   - `GEMINI_API_KEY`: Google Gemini API key for AI analysis
   - `NEXT_PUBLIC_AUTH0_KEY`, `AUTH0_CLIENT_ID`: Auth0 client ID (frontend/backend)
   - `AUTH0_DOMAIN`: Your Auth0 domain
   - `AUTH0_CLIENT_SECRET`: Auth0 client secret
   - `AUTH0_SECRET`: Random string for session encryption
   - `APP_BASE_URL`: Base URL for your app (usually http://localhost:3000/ in dev)
   - `AUTH0_SCOPE`, `AUTH0_AUDIENCE`: Auth0 API scopes and audience

4. **Run the web app:**
   ```bash
   npm run dev
   # Visit http://localhost:3000
   ```
5. **Start email processing:**
   ```bash
   node ticketProcessorFixed.js --continuous
   # Or use ./run_email_check.sh
   ```

---

## 📚 API Reference (Key Endpoints)

### Tickets
- `GET /api/[project]/tickets` — List all tickets for a project
- `GET /api/[project]/tickets/[id]` — Get ticket details
- `PUT /api/[project]/tickets/[id]/claim` — Claim a ticket (body: `{ userEmail }`)
- `PUT /api/[project]/tickets/[id]/complete` — Mark ticket as complete (body: `{ userEmail }`)

### Projects
- `POST /api/[project]/invite_member` — Invite a member (body: `{ userEmail }`)

### Webhook
- `POST /api/webhook/email-received` — (Express backend) Trigger email processing from AgentMail

#### Example: Claim a Ticket
```http
PUT /api/myproject/tickets/123/claim
Content-Type: application/json
{
  "userEmail": "dev@company.com"
}
```

---

## 🖼️ Typical Workflow
1. **User emails:** "The login button is broken on Safari."
2. **AI analyzes:** Detects bug, checks for steps to reproduce, environment, etc.
3. **If info missing:** AI emails user: "Can you provide browser version and steps to reproduce?"
4. **User replies:** Info is added to thread.
5. **Ticket created:** Complete, structured, and ready for devs.
6. **Dev claims ticket:** Status updates, user notified.

**Ticketry.AI** — Where business communication meets developer productivity. 🚀
