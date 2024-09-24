import { Button, Img } from "components";
import { object } from "prop-types";
import React from "react";

export const ChatBox = () => {
  return (
    <div className="tooltip-container">
      <Button
      className="fixed bottom-4 right-4 flex h-[4rem] w-[7rem] items-center justify-center rounded-lg shadow-lg border border-solid border-black-900 dark:border-dark-700 bg-gradient-to-b from-gray-500 to-gray-700 text-[14px] text-white dark:text-white"
      style={{
      backgroundImage: 'url("images/chatbot.png")', 
      backgroundSize: 'contain',                   
      backgroundPosition: 'right',                
      backgroundRepeat: 'no-repeat',               
      borderRadius: '12px',                        
       }}
      >
     <div className="tooltip-text absolute bottom-[4.5rem] whitespace-nowrap bg-white text-black p-2 rounded-lg shadow-md">
      <span className="m-2">Interact!</span>
        </div>
      </Button>
    </div>
  );
};