import { formatDate } from "util/NumberFormatters";
import React, { useState, useEffect } from "react";
import { Text, Heading } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { stopPatrol, startPatrol } from "store";
import GPSIcon from "components/GPS-top";
import CaptureSlider from "components/CaptureSlider";
import { carData } from "MockData/carsData";
import { AlarmNotification } from "./AlarmNotification";
import { LiveView } from "./LiveView";
import { Carview } from "./Carview";

export default function ControlPanel() {
  const [isPatrolStarted, setIsPatrolStarted] = useState(false);
  const [isPatrolStopped, setIsPatrolStopped] = useState(false); // For stop button
  const [isAlertActive, setIsAlertActive] = useState(false); // For alert button

  const dispatch = useDispatch();

  const toggleStartPatrol = () => {
    setIsPatrolStarted(!isPatrolStarted);
    setIsPatrolStopped(false); // Reset stop
  };

  const toggleStopPatrol = () => {
    setIsPatrolStopped(!isPatrolStopped);
    setIsPatrolStarted(false); // Reset start
  };

  const toggleAlert = () => {
    setIsAlertActive(!isAlertActive);
  };

  return (
    <>
      {/* Centered Heading */}
      <div className="flex flex-col items-center">
        <Heading
          size="headinglg"
          as="h1"
          className="!font-lato1 text-black-900 dark:text-white-a700 mt-2"
        >
          Enforcement Tab
        </Heading>
      </div>
      {/* Button Section */}
      <div className="flex items-center justify-evenly gap-10">
        {/* Start Button */}
        <button
          onClick={toggleStartPatrol}
          className="flex items-center justify-center border border-solid border-black-900 p-4 w-[100px] h-[100px] dark:border-dark-600 bg-white-a700 rounded-full"
        >
          {isPatrolStarted ? (
            <img
              src="images/play.png"
              alt="Start Icon"
              className="h-[24px] w-[24px]"
            />
          ) : (
            <h2 className="!font-lato1 uppercase tracking-[-0.27px]">Start</h2>
          )}
        </button>

        {/* Stop Button */}
        <button
          onClick={toggleStopPatrol}
          className="flex items-center justify-center border border-solid border-black-900 p-4 w-[100px] h-[100px] dark:border-dark-600 bg-white-a700 rounded-full"
        >
          {isPatrolStopped ? (
            <img
              src="images/img_icon_pause.svg"
              alt="Stop Icon"
              className="h-[24px] w-[24px]"
            />
          ) : (
            <h2 className="!font-lato1 uppercase tracking-[-0.27px]">Stop</h2>
          )}
        </button>

        {/* Alert Button */}
        <button
          onClick={toggleAlert}
          className="flex items-center justify-center border border-solid border-black-900 p-4 w-[100px] h-[100px] dark:border-dark-600 bg-white-a700 rounded-full"
        >
          {isAlertActive ? (
            <img
              src="images/alert_icon.png" // Use your alert icon path here
              alt="Alert Icon"
              className="h-[24px] w-[24px]"
            />
          ) : (
            <h2 className="!font-lato1 uppercase tracking-[-0.27px]">Alert</h2>
          )}
        </button>
      </div>
      <AlarmNotification />
    </>
  );
}
