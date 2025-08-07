import { useEffect, useRef } from "react";

const ChatMessages = ({ messages }) => {
    const bottomRef = useRef(null);

    useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col w-[60%] mx-auto gap-4 p-4 px-6 max-h-[77vh] overflow-y-auto ">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`max-w-[55%] px-4 py-2 rounded-xl text-sm ${
            msg.role === "user"
              ? "bg-blue-500 text-white self-end"
              : "bg-gray-300 text-black self-start"
          }`}
        >
          {msg.text}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;
