const { GoogleGenAI } = require("@google/genai");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in your .env file");
}

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few words",
  });

  console.log(response.text);
}

main();
