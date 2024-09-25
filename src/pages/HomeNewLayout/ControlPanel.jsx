import React, { useState, useEffect, useRef } from "react";
import { Heading } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { AlarmNotification } from "./AlarmNotification";
import { updateNotificationCount } from "notificationReducer";
import ScanningTable from "../../components/ScanningTableNew";
import { Carview } from "./Carview";

export default function ControlPanel({ carData }) {
  const dispatch = useDispatch();
  const [isPatrolStarted, setIsPatrolStarted] = useState(false);
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [alertColor, setAlertColor] = useState("bg-white-a700");
  const [isStartButtonEnabled, setIsStartButtonEnabled] = useState(true);
  const [isStopButtonEnabled, setIsStopButtonEnabled] = useState(false);
  const [isAlertButtonEnabled, setIsAlertButtonEnabled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const audioCtxRef = useRef(null);
  const beepIntervalRef = useRef(null);
  const colorIntervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const notificationCount = useSelector((state) => state.cars.carData);

  const toggleStartPatrol = () => {
    setIsPatrolStarted((prev) => !prev);
    setIsStartButtonEnabled((prev) => !prev);
    setIsStopButtonEnabled((prev) => !prev);

    if (!isPatrolStarted) {
      setTimeout(() => {
        dispatch(updateNotificationCount());
      }, 5000);
      timeoutRef.current = setTimeout(() => {
        setIsAlertButtonEnabled(true);
        startBeeping();
        startColorToggle();
        setIsAlertActive(true);
      }, 6000);
    } else {
      stopBeeping();
      stopColorToggle();
      clearTimeout(timeoutRef.current);
    }
  };

  const toggleStopPatrol = () => {
    setIsPatrolStarted(false);
    setIsStartButtonEnabled(true);
    setIsStopButtonEnabled(false);
    setIsAlertButtonEnabled(false);
    stopBeeping();
    stopColorToggle();
    clearTimeout(timeoutRef.current);
    setIsAlertActive(false); // Reset alert state
  };

  const startBeeping = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
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
        prevColor === "bg-red-500" ? "bg-yellow-600" : "bg-red-500"
      );
    };
    colorIntervalRef.current = setInterval(toggleColors, 1000);
  };

  const stopColorToggle = () => {
    if (colorIntervalRef.current) {
      clearInterval(colorIntervalRef.current);
      colorIntervalRef.current = null;
      setAlertColor("bg-white-a700");
    }
  };

  const handleAlertButtonClick = () => {
    if (isAlertActive) {
      stopBeeping();
      stopColorToggle();
      setIsAlertActive(false);
    }
    setIsAlertButtonEnabled(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    return () => {
      stopBeeping();
      stopColorToggle();
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="flex w-full h-screen">
      {/* Sidebar - Enforcement Tab */}
      <div className="flex flex-col items-center rounded-lg border dark:bg-slate-800 p-4 border-r border-gray-300 text-dark-700 dark:text-white-700 w-[10%] h-full shadow-lg">
        <img src="images/logoo.png" alt="Logo" className="mb-4" />
        
        <div className="mt-20 space-y-4">
          {/* Start Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={toggleStartPatrol}
              disabled={!isStartButtonEnabled}
              className={`p-4 w-[80px] h-[80px] border-2 border-gray-500 rounded-full shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 ${
                isPatrolStarted
                  ? "bg-[linear-gradient(180deg,_#FFAF2F_14.87%,_#9C6712_87.03%)]"
                  : "bg-[linear-gradient(180deg,_#1BD961_14.87%,_#024937_87.03%)]"
              } outline outline-[0.95px] outline-[rgba(222,222,222,1)`}
            >
              {isPatrolStarted ? "Pause" : "Start"}
            </button>
            <p className="mt-2 text-black">Start Patrol</p>
          </div>

          {/* Stop Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={toggleStopPatrol}
              disabled={!isStopButtonEnabled}
              className={`p-4 w-[80px] h-[80px] border-2 border-gray-500 rounded-full shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 ${
                isPatrolStarted
                  ? "bg-[linear-gradient(360deg,_#FF0000_0%,_#811325_100%)]"
                  : "bg-[linear-gradient(360deg,_#EEEEEE_0%,_#B4B4B4_100%)]"
              } outline outline-[0.95px] outline-[rgba(222,222,222,1)`}
            >
              Stop
            </button>
            <p className="mt-2 text-black">Stop Patrol</p>
          </div>

          {/* Alert Button */}
      {/* Alert Button */}
        <div className="relative flex flex-col items-center">
          <button
          onClick={handleAlertButtonClick}
          disabled={!isAlertButtonEnabled}
          className={`p-4 w-[80px] h-[80px] border-2 rounded-full shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 ${
          isAlertActive
          ? "bg-[linear-gradient(180deg,_#D6AB00_0%,_#FFEE7D_100%)] outline outline-[0.95px] outline-red-500"
          : "bg-[linear-gradient(180deg,_#D6AB00_0%,_#FFEE7D_100%)] outline outline-[0.95px] outline-[rgba(222,222,222,0.5)]"
        }`}
        >
        
        <img
          src="images/AlertIcon.svg" 
          alt="Alert"
          className="w-2/3 h-2/3 mx-auto"
        />
      
     
      </button>
      <p className="mt text-black">New Alert</p>
    </div>


          {/* Menu Button */}
          <div className="flex flex-col items-center relative">
            <button
              onClick={toggleMenu}
              className="mt-4 p-4 w-[80px] h-[80px] text-black"
            >
              <img src="images/MenuIcon.svg" alt="Menu" className="w-1/2 h-1/2 mx-auto" />
            </button>
            {isMenuOpen && (
              <div className="absolute right-[-180px] top-[-90px] bg-transparent shadow-lg rounded-md mt-2 p-2 z-10 w-48">
                <ul className="space-y-1 bg-blue-50 rounded-lg">
                  {/* Menu Items */}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full p-4 h-full">
        <div className="flex  space-x-2 h-[400px] ">
          <div className="flex flex-col rounded-lg  h-[90%] shadow-lg">
            <Carview latestCaptureData={carData} />
          </div>
          <div className="flex flex-col rounded-lg w-full h-[90%] shadow-lg">
            <AlarmNotification />
          </div>
        </div>

        {/* Patrol History with overflow handling */}
        <div className="flex flex-col border rounded-lg mb-0 h-full  p-2 shadow-lg">
        <Heading size="headinglg" as="h1" className="text-black  shadow-lg ">
          Patrol History
        </Heading>
        <hr />
        <ScanningTable />
        </div>
      </div>
    </div>
  );
}
