import { Button, Img } from "components";
import React from "react";

export const ChatBox = () => {
  return (
    <Button
      leftIcon={<Img src="images/Tooltip_new.png" alt="Fi 10273571" />}
      className=" bottom-100 rounded-xl object-fit  right-3 flex h-[20rem] w-[13rem] items-center justify-center  border border-solid border-black-900 dark:border-dark-700 bg-gradient text-[14px] text-black-900 dark:text-white"
    >
      <div className="tooltip-text whitespace-nowrap ">
        <span className="m-2">Ask Me!</span>
      </div>
    </Button>
  );
};
