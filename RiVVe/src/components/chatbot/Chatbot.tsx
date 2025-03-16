import { Bot, MessageCircle, MinusIcon, X } from "lucide-react";
import { useState } from "react";

function Chatbot() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const User = localStorage.getItem("user");

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          <MessageCircle className="animate-pulse" />
        </button>
      )}

      {isOpen && (
        <div
          className={`bg-white rounded-2xl shadow-2xl w-[380px] ${
            isMinimized ? "h-14" : "h-[600px]"
          } 
        transition-all duration-300 ease-in-out transform`}
        >
          {/* head */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <Bot size={20} />
            <h1 className="text-white font-semibold">RiVVE ChatBot</h1>
            <div className="flex gap-2">
              <button
                className="rounded-md hover:bg-white/20 p-1 transition-colors duration-200"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                <MinusIcon size={19} />
              </button>
              <button
                className="rounded-md hover:bg-white/20 p-1 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[480px] overflow-y-auto p-4 space-y-4 bg-gray-50"></div>
        </div>
      )}
    </div>
  );
}
export default Chatbot;
