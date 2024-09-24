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
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu visibility

  const audioCtxRef = useRef(null);
  const beepIntervalRef = useRef(null);
  const colorIntervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const notificationTimerRef = useRef(null);

  const notificationCount = useSelector((state) => state.cars.carData);

  // Start patrol logic
  const toggleStartPatrol = () => {
    setIsPatrolStarted(true);
    setIsStartButtonEnabled(false);
    setIsStopButtonEnabled(true);
    setTimeout(() => {
      dispatch(updateNotificationCount());
    }, 5000);
    timeoutRef.current = setTimeout(() => {
      setIsAlertButtonEnabled(true);
      startBeeping();
      startColorToggle();
      setIsAlertActive(true);
    }, 6000);
  };

  // Stop patrol logic
  const toggleStopPatrol = () => {
    setIsStartButtonEnabled(true);
    setIsStopButtonEnabled(false);
    setIsAlertButtonEnabled(false);
    stopBeeping();
    stopColorToggle();
    clearTimeout(timeoutRef.current);
    clearTimeout(notificationTimerRef.current);
  };

  // Start beeping sound when alert is active
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

  // Stop beeping sound
  const stopBeeping = () => {
    if (beepIntervalRef.current) {
      clearInterval(beepIntervalRef.current);
      beepIntervalRef.current = null;
    }
  };

  // Start color toggle
  const startColorToggle = () => {
    setAlertColor("bg-red-500");
    const toggleColors = () => {
      setAlertColor((prevColor) =>
        prevColor === "bg-red-500" ? "bg-yellow-600" : "bg-red-500"
      );
    };
    colorIntervalRef.current = setInterval(toggleColors, 1000);
  };

  // Stop color toggle
  const stopColorToggle = () => {
    if (colorIntervalRef.current) {
      clearInterval(colorIntervalRef.current);
      colorIntervalRef.current = null;
      setAlertColor("bg-white-a700");
    }
  };

  // Handle alert button click
  const handleAlertButtonClick = () => {
    if (isAlertActive) {
      stopBeeping();
      stopColorToggle();
      setIsAlertActive(false);
    }
    setIsAlertButtonEnabled(false);
  };

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      stopBeeping();
      stopColorToggle();
      clearTimeout(timeoutRef.current);
      clearTimeout(notificationTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full h-full rounded-lg p-4 flex">
      {/* Sidebar - Enforcement Tab */}
      <div className="flex flex-col items-center rounded-lg border dark:bg-slate-800 p-4 border-r border-gray-300 text-dark-700 dark:text-white-700 w-1/6 transition-transform transform hover:scale-105 shadow-lg">
        <img src="images/logoo.png" alt="Logo" className="mb-4" />

        <Heading size="headinglg" as="h1" className="text-black">
          Enforcement Tab
        </Heading>
        <div className="mt-6 space-y-4">
          {/* Start Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={toggleStartPatrol}
              disabled={!isStartButtonEnabled}
              className={`p-4 w-[80px] h-[80px] bg-green-500 text-white rounded-full shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 ${
                !isStartButtonEnabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-2xl active:scale-95"
              }`}
            >
              Start
            </button>
            <p className="mt-2 text-black">Start Patrol</p>
          </div>

          {/* Stop Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={toggleStopPatrol}
              disabled={!isStopButtonEnabled}
              className={`p-4 w-[80px] h-[80px] bg-red-500 text-white rounded-full shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 ${
                !isStopButtonEnabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-2xl active:scale-95"
              }`}
            >
              Stop
            </button>
            <p className="mt-2 text-black">Stop Patrol</p>
          </div>

          {/* Alert Button */}
          <div className="relative flex flex-col items-center">
            {isAlertActive && (
              <div
                className={`absolute rounded-full border border-black ${
                  isAlertActive ? "border-yellow-600" : "border-transparent"
                } h-[90px] w-[90px]`}
                style={{ zIndex: -1 }}
              />
            )}
            <button
              onClick={handleAlertButtonClick}
              disabled={!isAlertButtonEnabled}
              className={`p-4 w-[80px] h-[80px] ${
                isAlertActive ? "bg-yellow-600" : "bg-yellow-300"
              } text-white rounded-full shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 ${
                !isAlertButtonEnabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-3xl active:scale-95"
              }`}
            >
              {isAlertActive ? (
                <img
                  src="images/img_alertyellow.png"
                  alt="Alert"
                  className="w-1/2 h-1/2 mx-auto"
                />
              ) : (
                <h2 className="text-xs font-bold">Alert</h2>
              )}
            </button>
            <p className="mt-2 text-black">New Alert</p>
          </div>

          {/* Menu Button */}
          <div className="flex flex-col items-center relative">
            <button
              onClick={toggleMenu}
              className="mt-4 p-4 w-[80px] h-[80px] text-black"
            >
              <img src="images/menuItem.png" alt="Menu" className="w-1/2 h-1/2 mx-auto" />
            </button>
            {isMenuOpen && (
              <div className="absolute right-[-180px] top-[-50px] bg-transparent shadow-lg rounded-md mt-2 p-2 z-10 w-48">
                <ul className="space-y-1 bg-pink-100">
                  <li className="border-b py-1">Chatbot</li>
                  <li className="border-b py-1">Dark Theme</li>
                  <li className="border-b py-1">Profile</li>
                  <li className="border-b py-1">Settings</li>
                  <li className="py-1">Logout</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-full p-4">
        <div className="flex justify-between space-x-4 w-1/2">
          <div className="flex flex-col rounded-lg w-3/5 transition-transform transform hover:scale-105 shadow-lg">
            <Carview latestCaptureData={carData} />
          </div>
          <div className="flex flex-col rounded-lg w-2/5 transition-transform transform hover:scale-105 shadow-lg">
            <AlarmNotification />
          </div>
        </div>

        {/* Patrol History with overflow handling */}
        <Heading size="headinglg" as="h1" className="text-black mt-4">
          Patrol History
        </Heading>
        <ScanningTable />
      </div>
    </div>
  );
}
