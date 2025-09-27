require("dotenv").config();
const { AgentMailClient } = require("agentmail");

async function main() {
  const { AGENTMAIL_API_KEY, SAMPLE_EMAIL_ADDRESS } = process.env;

  if (!AGENTMAIL_API_KEY) {
    console.error("Missing AGENTMAIL_API_KEY in .env");
    process.exit(1);
  }
  if (!SAMPLE_EMAIL_ADDRESS) {
    console.error("Missing SAMPLE_EMAIL_ADDRESS in .env");
    process.exit(1);
  }

  const client = new AgentMailClient({ apiKey: AGENTMAIL_API_KEY });

  try {
    // use the existing inbox id from your AgentMail dashboard
    const inboxId = "ticketry.ai@agentmail.to";

    console.log("Sending email from inbox:", inboxId);
    const response = await client.inboxes.messages.send(inboxId, {
      to: SAMPLE_EMAIL_ADDRESS,
      subject: "Hello from AgentMail!",
      text: "This is my first email sent with the AgentMail API.",
    });

    console.log("Email sent successfully!");
    console.log("Send response:", response);
  } catch (err) {
    console.error("Error while sending:", err.message);
    if (err.response) {
      console.error("Response status:", err.response.status);
      console.error("Response data:", err.response.data);
    }
  }
}

main();

