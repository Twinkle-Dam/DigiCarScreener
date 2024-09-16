import { formatDate } from "util/NumberFormatters";
import React, { useState, useEffect, useRef } from "react";
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
  const [alertColor, setAlertColor] = useState("bg-white-a700"); // Initial button color

  const dispatch = useDispatch();
  const audioCtxRef = useRef(null); // Reference for the audio context
  const beepIntervalRef = useRef(null); // Reference for the beep interval

  // Mocked counts for alarm and notification (replace with real data)
  // const alarmCount = 2; // Example count for alarms
  const notificationCount = 2; // Example count for notifications

  const toggleStartPatrol = () => {
    setIsPatrolStarted(!isPatrolStarted);
    setIsPatrolStopped(false); // Reset stop
  };

  const toggleStopPatrol = () => {
    setIsPatrolStopped(!isPatrolStopped);
    setIsPatrolStarted(false); // Reset start
  };

  const toggleAlert = () => {
    if (!isAlertActive && notificationCount > 1) {
      // Start alert with toggling and sound only if counts are greater than 1
      startBeeping();
      startColorToggle();
      setIsAlertActive(true);
    } else if (isAlertActive) {
      // Stop alert with toggling and sound
      stopBeeping();
      stopColorToggle();
      setIsAlertActive(false);
      setAlertColor("bg-white-a700"); // Reset color
    }
  };

  // Function to start the beep sound
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

      oscillator.frequency.value = 880; // Set frequency for the beep
      oscillator.type = "square"; // Set waveform type for a distinct sound
      gainNode.gain.value = 0.7; // Set volume level

      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
      }, 300); // Beep duration (300ms)
    };

    // Beep every second
    beepIntervalRef.current = setInterval(startBeep, 1000);
  };

  // Function to stop the beep sound
  const stopBeeping = () => {
    if (beepIntervalRef.current) {
      clearInterval(beepIntervalRef.current);
      beepIntervalRef.current = null;
    }
  };

  // Function to start the alert button color toggle
  const startColorToggle = () => {
    setAlertColor("bg-red-500"); // Start with red color
    beepIntervalRef.current = setInterval(() => {
      setAlertColor((prevColor) =>
        prevColor === "bg-red-500" ? "bg-blue-500" : "bg-red-500"
      );
    }, 1000); // Toggle every second
  };

  // Function to stop the alert button color toggle
  const stopColorToggle = () => {
    if (beepIntervalRef.current) {
      clearInterval(beepIntervalRef.current);
    }
  };

  useEffect(() => {
    return () => {
      // Clean up beep and color toggle on unmount
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
            <h2 className="!font-lato1 uppercase tracking-[-0.27px] control-button-text">Start</h2>
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
            <h2 className="!font-lato1 uppercase tracking-[-0.27px] control-button-text">Stop</h2>
          )}
        </button>

        {/* Alert Button */}
        <button
          onClick={toggleAlert}
          className={`flex items-center justify-center border border-solid border-black-900 p-4 w-[100px] h-[100px] dark:border-dark-600 ${alertColor} rounded-full`} // Dynamic color
        >
          {isAlertActive ? (
            <img
              src="images/alert_icon.png" // Use your alert icon path here
              alt="Alert Icon"
              className="h-[24px] w-[24px]"
            />
          ) : (
            <h2 className="!font-lato1 uppercase tracking-[-0.27px] control-button-text">Alert</h2>
          )}
        </button>
      </div>
      <AlarmNotification />
    </>
  );
}
