import { useForm } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import socket from "../socket";
import ChatMessages from "./ChatMessages";

const PromptArea = ({messages , setMessages}) => {
  const { register, handleSubmit, reset } = useForm();
  

  const PromptHandler = ({ prompt }) => {
    if (!prompt.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: prompt }]);
    socket.emit("ai-message", prompt);
    reset();
  };

  useEffect(() => {
    socket.on("ai-message-response", (response) => {
      setMessages((prev) => [...prev, { role: "model", text: response }]);
    });

    return () => socket.off("ai-message-response");
  }, []);


  return (
    <div className=" h-fit flex flex-col ">
      <form
        onSubmit={handleSubmit(PromptHandler)}
        className="flex w-1/2 mx-auto mb-5 items-center h-18 px-4 py-3 gap-4 mt-10 border rounded-xl"
      >
        <input
          {...register("prompt")}
          className="flex-1 h-18 px-3 py-2 outline-none"
          type="text"
          placeholder="Ask me anything..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 active:scale-95 cursor-pointer"
        >
          <i className="ri-send-plane-fill text-xl"></i> Send
        </button>
      </form>
    </div>
  );
};

export default PromptArea;
