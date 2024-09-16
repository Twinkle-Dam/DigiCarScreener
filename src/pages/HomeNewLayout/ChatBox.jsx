import { Button, Img } from "components";
import React from "react";

export const ChatBox = () => {
  return (
    <div className="tooltip-container">
      <Button
        leftIcon={<Img src="images/Tooltip_new.png" alt="Fi 10273571" />}
        className=" rounded-xl flex h-[10rem] w-[8rem] items-center justify-center  border border-solid border-black-900 dark:border-dark-700 bg-gradient text-[14px] text-black-900 dark:text-white"
      >
        <div className="tooltip-text whitespace-nowrap ">
          <span className="m-2">Interact!</span>
        </div>
      </Button>
    </div>
  );
};
