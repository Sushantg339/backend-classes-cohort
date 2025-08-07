import { useState, useEffect } from "react";
import PromptArea from "./PromptArea";
import Welcome from "./Welcome";
import ChatMessages from "./ChatMessages"; // Assuming you already have this

const ChatArea = () => {
  const [messages, setMessages] = useState([]);

  return (
    <div className="h-full w-[90%] flex flex-col justify-between">
      <div className="flex-grow overflow-y-auto">
        {messages.length === 0 ? (
          <Welcome />
        ) : (
          <ChatMessages messages={messages} />
        )}
      </div>
      <PromptArea messages={messages} setMessages={setMessages} />
    </div>
  );
};

export default ChatArea;
