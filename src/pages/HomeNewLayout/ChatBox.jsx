import { Button, Img } from "components";
import React from "react";

export const ChatBox = () => {
  return (
    <div className="tooltip-container">
      <Button
        leftIcon={<Img src="images/Tooltip_new.png" alt="Fi 10273571" />}
        className="fixed bottom-4 right-4 flex h-[8rem] w-[7rem] items-center justify-center rounded-lg border border-solid border-black-900 dark:border-dark-700 bg-gradient text-[14px] text-black-900 dark:text-white"
      >
        <div className="tooltip-text whitespace-nowrap ">
          <span className="m-2">Interact!</span>
        </div>
        {/* You can remove or keep the left icon depending on the design */}
      </Button>
    </div>
  );
};
