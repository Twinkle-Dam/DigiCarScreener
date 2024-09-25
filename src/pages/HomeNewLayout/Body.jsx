import React from "react";
import ControlPanel from "./ControlPanel";

export const Body = ({ newCarData }) => {
  return (
    <div className="flex flex-col gap-1 md:w-full md:flex-col">
      <div className="flex flex-col gap-2  bg-white-a700 p-1 dark:bg-dark-700 dark:border-dark-600">
        {/* <div className="flex flex-col border border-3 gap-2 border-gray-300 dark:border-dark-600 ml-2 mr-2 rounded-lg"> */}
        <ControlPanel carData={newCarData[0]} />
        {/* </div> */}
      </div>
      {/* <div className="flex flex-col gap-2 border border-solid bg-white-a700 p-1 dark:bg-dark-700 dark:border-dark-600"> */}
        {/* <div className="border border-3 gap-2 border-gray-300 dark:border-dark-600 ml-2 mr-2 rounded-lg"> */}
        {/* <Carview latestCaptureData={newCarData[0]} /> */}
        {/* <div className="flex flex-row m-4  gap-2.5  bg-white-a700 dark:bg-dark-700 dark:border-dark-600"> */}
          {/* <ScanningTableNew /> */}
          {/* <ChatBox /> */}
          {/* </div> */}
        {/* </div> */}
      {/* </div> */}
    </div>
  );
};
