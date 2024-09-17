import React, { useState, useEffect, useRef } from "react";
import { Heading } from "../../components";
import { useSelector } from "react-redux";
import { AlarmNotification } from "./AlarmNotification";

export default function ControlPanel() {
  const [isPatrolStarted, setIsPatrolStarted] = useState(false);
  const [isPatrolStopped, setIsPatrolStopped] = useState(false);
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [alertColor, setAlertColor] = useState("bg-white-a700");
  const audioCtxRef = useRef(null);
  const beepIntervalRef = useRef(null);
  const colorIntervalRef = useRef(null);
  const prevNotificationCountRef = useRef(0); // Ref to keep track of previous count

  const alarmCount = useSelector((state) => state.alarmCount);
  const notificationCount = useSelector((state) => state.notificationCount);

  const toggleStartPatrol = () => {
    setIsPatrolStarted(!isPatrolStarted);
    setIsPatrolStopped(false);
  };

  const toggleStopPatrol = () => {
    setIsPatrolStopped(!isPatrolStopped);
    setIsPatrolStarted(false);
  };

  const toggleAlert = () => {
    if (isAlertActive) {
      stopBeeping();
      stopColorToggle();
    } else {
      if (notificationCount > prevNotificationCountRef.current) {
        startBeeping();
        startColorToggle();
      }
    }
    setIsAlertActive(!isAlertActive);
  };

  const startBeeping = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }
    const startBeep = () => {
      const oscillator = audioCtxRef.current.createOscillator();
      const gainNode = audioCtxRef.current.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtxRef.current.destination);

      oscillator.frequency.value = 880;
      oscillator.type = "square";
      gainNode.gain.value = 0.7;

      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
      }, 300);
    };

    beepIntervalRef.current = setInterval(startBeep, 1000);
  };

  const stopBeeping = () => {
    if (beepIntervalRef.current) {
      clearInterval(beepIntervalRef.current);
      beepIntervalRef.current = null;
    }
  };

  const startColorToggle = () => {
    setAlertColor("bg-red-500");
    const toggleColors = () => {
      setAlertColor((prevColor) =>
        prevColor === "bg-red-500" ? "bg-blue-500" : "bg-red-500"
      );
    };
    colorIntervalRef.current = setInterval(toggleColors, 1000);
  };

  const stopColorToggle = () => {
    if (colorIntervalRef.current) {
      clearInterval(colorIntervalRef.current);
      colorIntervalRef.current = null;
    }
  };

  // Effect to handle notification count increase
  useEffect(() => {
    if (notificationCount > prevNotificationCountRef.current) {
      if (!isAlertActive) {
        startBeeping();
        startColorToggle();
      }
      prevNotificationCountRef.current = notificationCount; // Update previous count
    }
  }, [notificationCount]);

  useEffect(() => {
    return () => {
      stopBeeping();
      stopColorToggle();
    };
  }, []);

  return (
    <>
      {/* Centered Heading */}
      <div className="flex flex-col items-center heading-bar">
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
            <h2 className="!font-lato1 uppercase tracking-[-0.27px] control-button-text">
              Start
            </h2>
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
            <h2 className="!font-lato1 uppercase tracking-[-0.27px] control-button-text">
              Stop
            </h2>
          )}
        </button>

        {/* Alert Button */}
        <button
          onClick={toggleAlert}
          className={`flex items-center justify-center border border-solid border-black-900 p-4 w-[100px] h-[100px] dark:border-dark-600 ${alertColor} rounded-full`} // Dynamic color
        >
          {isAlertActive ? (
            <img
              src="images/alert.png"
              alt="Alert Icon"
              className="h-[24px] w-[24px]"
            />
          ) : (
            <h2 className="!font-lato1 uppercase tracking-[-0.27px] control-button-text">
              Alert
            </h2>
          )}
        </button>
      </div>
      <AlarmNotification />
    </>
  );
}
