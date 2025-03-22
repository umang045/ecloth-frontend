class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleHello = () => {
    const message = this.createChatBotMessage("Hello! How can I help you?");
    this.updateChatbotState(message);
  };

  handleHelp = () => {
    const message = this.createChatBotMessage(
      "Sure! I can help you with queries related to our website."
    );
    this.updateChatbotState(message);
  };

  handleCloth = () => {
    const message = this.createChatBotMessage(
      "We have a wide variety of clothes available. What type of cloth are you looking for?"
    );
    this.updateChatbotState(message);
  };

  handleUnknown = () => {
    const message = this.createChatBotMessage(
      "I'm not sure how to respond to that. Can you ask something else?"
    );
    this.updateChatbotState(message);
  };

  updateChatbotState = (message) => {
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };
}

export default ActionProvider;
