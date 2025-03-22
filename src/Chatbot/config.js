import { createChatBotMessage } from "react-chatbot-kit";

const botName = "Cloth Bot";

const config = {
  botName: botName,
  initialMessages: [
    createChatBotMessage(`Hi! I'm ${botName}. How can I assist you today?`),
  ],
};

export default config;
