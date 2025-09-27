import { AgentMailClient } from "agentmail";
import "dotenv/config"; // loads .env file

async function main() {
  // Initialize the client
  const client = new AgentMailClient({
    apiKey: process.env.AGENTMAIL_API_KEY,
  });

  // Create an inbox
  console.log("Creating inbox...");
  const inbox = await client.inboxes.create(); // domain is optional
  console.log("Inbox created successfully!");
  console.log(inbox);

  // Send an email from the new inbox
  console.log("Sending email...");
  await client.inboxes.messages.send(inbox.inbox_id, {
    to: "n8martin2025@gmail.com",
    subject: "Hello from AgentMail!",
    text: "This is my first email sent with the AgentMail API.",
  });
  console.log("Email sent successfully!");
}

main();

