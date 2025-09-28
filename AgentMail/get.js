require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const { AgentMailClient } = require("agentmail");

async function main() {
  const { AGENTMAIL_API_KEY } = process.env;
  const inboxId = "ticketry.ai@agentmail.to";

  if (!AGENTMAIL_API_KEY) {
    console.error("Missing AGENTMAIL_API_KEY in .env");
    process.exit(1);
  }

  const client = new AgentMailClient({ apiKey: AGENTMAIL_API_KEY });

  try {
    console.log("Fetching messages from inbox:", inboxId);

    const result = await client.inboxes.messages.list(inboxId, { limit: 10 });

    const items = result.messages || [];

    if (items.length === 0) {
      console.log("No messages found in this inbox yet.");
    } else {
      console.log(`Found ${items.length} messages:`);
      for (const msg of items) {
        console.log("----");
        console.log("From:", msg.from);
        console.log("To:", msg.to.join(", "));
        console.log("Subject:", msg.subject);
        console.log("Text:", msg.text);
        console.log("Received at:", msg.createdAt);
      }
    }
  } catch (err) {
    console.error("Error while fetching messages:", err.message);
    if (err.response) {
      console.error("Response status:", err.response.status);
      console.error("Response data:", err.response.data);
    }
  }
}

main();
