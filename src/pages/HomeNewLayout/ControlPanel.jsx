import React, { useState, useEffect, useRef } from "react";
import { Heading } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { AlarmNotification } from "./AlarmNotification";
import { updateNotificationCount } from "notificationReducer";
import ScanningTable from "../../components/ScanningTableNew";
import { Carview } from "./Carview";
import Menu from "./Menu";

export default function ControlPanel({ carData }) {
  const dispatch = useDispatch();
  const [isPatrolStarted, setIsPatrolStarted] = useState(false);
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [alertColor, setAlertColor] = useState("bg-white-a700");
  const [isStartButtonEnabled, setIsStartButtonEnabled] = useState(true);
  const [isStopButtonEnabled, setIsStopButtonEnabled] = useState(false);
  const [isAlertButtonEnabled, setIsAlertButtonEnabled] = useState(false);

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
    setIsAlertActive(false);
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

  useEffect(() => {
    return () => {
      stopBeeping();
      stopColorToggle();
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="flex w-full h-screen md:flex-wrap font-manrope">
      {/* Sidebar - Enforcement Tab */}
      <div className="flex flex-col justify-between dark:bg-slate-800 p-4 border-r border-gray-300 w-[10%]  shadow-lg md:w-1/2">
        <div>
          <img src="images/logoo.png" alt="Logo" />
        </div>
        <div className="space-y-4 flex flex-col gap-4">
          {/* Start Button */}
          <div className="flex flex-col items-center mb-4">
            <div
              className={`border-2 border-gray-200 rounded-full p-1 ${
                isAlertActive ? "border-4" : ""
              }`}
            >
              <div
                className={` rounded-full transition-all duration-300 ease-in-out ${
                  isAlertActive
                    ? "border-4"
                    : "border-4 border-[rgba(222,222,222,0.5)]"
                } w-[91px] h-[91px] flex items-center justify-center`}
              >
                <button
                  onClick={toggleStartPatrol}
                  disabled={!isStartButtonEnabled}
                  className={`p-4 w-[80px] h-[80px] border border-gray-500 rounded-full shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105
                     ${
                       isPatrolStarted
                         ? "bg-[linear-gradient(180deg,_#FFAF2F_14.87%,_#9C6712_87.03%)]"
                         : "bg-[linear-gradient(180deg,_#1BD961_14.87%,_#024937_87.03%)]"
                     }`}
                >
                  {isPatrolStarted ? "Pause" : "Start"}
                </button>
              </div>
            </div>
            <p className="font-manrope text-[12px] font-medium leading-[20px] tracking-[0.01em] text-left dark:text-white-a700">
              Start Patrol
            </p>
          </div>
          {/* Stop Button */}
          <div className="flex flex-col items-center mb-4">
            <div
              className={`border-2 border-gray-200 rounded-full p-1 ${
                isAlertActive ? "border-4" : ""
              }`}
            >
              <div
                className={` rounded-full transition-all duration-300 ease-in-out ${
                  isAlertActive
                    ? "border-4"
                    : "border-4 border-[rgba(222,222,222,0.5)]"
                } w-[91px] h-[91px] flex items-center justify-center`}
              >
                <button
                  onClick={toggleStopPatrol}
                  disabled={!isStopButtonEnabled}
                  className={`p-4 w-[80px] h-[80px] border-2 border-gray-500 rounded-full shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 ${
                    isPatrolStarted
                      ? "bg-[linear-gradient(360deg,_#FF0000_0%,_#811325_100%)]"
                      : "bg-[linear-gradient(360deg,_#EEEEEE_0%,_#B4B4B4_100%)]"
                  }`}
                >
                  Stop
                </button>
              </div>
            </div>
            <p className="font-manrope text-[12px] dark:text-white-a700 font-medium leading-[20px] tracking-[0.01em] text-left">
              Stop Patrol
            </p>
          </div>
          {/* Alert Button */}
          <div className="flex flex-col items-center mb-4">
            <div
              className={`border-2 border-gray-200 rounded-full p-1 ${
                isAlertActive ? "border-red-400" : ""
              }`}
            >
              <div
                className={` rounded-full transition-all duration-300 ease-in-out ${
                  isAlertActive
                    ? "border-4 border-red-200"
                    : "border-4 border-[rgba(222,222,222,0.5)]"
                } w-[91px] h-[91px] flex items-center justify-center`}
              >
                <button
                  onClick={handleAlertButtonClick}
                  disabled={!isAlertButtonEnabled}
                  className={`p-2 w-[80px] h-[80px] border-2 rounded-full shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 ${
                    isAlertActive
                      ? "bg-[linear-gradient(180deg,_#D6AB00_0%,_#FFEE7D_100%)]"
                      : "bg-[linear-gradient(180deg,_#D6AB00_0%,_#FFEE7D_100%)]"
                  }`}
                >
                  <img
                    src="images/AlertIcon.svg"
                    alt="Alert"
                    className="w-1/3 h-1/3 mx-auto"
                  />
                </button>
              </div>
            </div>
            <p className="font-manrope text-[12px] dark:text-white-a700 font-medium leading-[20px] tracking-[0.01em] text-left whitespace-nowrap">
              Alerts & Notifications
            </p>
          </div>
        </div>
        <Menu />
      </div>

      {/* Main Content */}
      <div
        style={{ backgroundColor: "rgb(237 237 237)" }}
        className="p-4 w-full"
      >
        <div className="flex sm:flex-col md:flex-col justify-between lg:flex-row h-auto md:space-y-0 md:space-x-2 gap-6">
          <div
            style={{ backgroundColor: "white" }}
            className="flex-[1_1_33%] md:flex-[1_1_33%] flex-col rounded-lg w-auto shadow-lg"
          >
            <Carview latestCaptureData={carData} />
          </div>

          <div
            style={{ backgroundColor: "white" }}
            className="flex-[1_1_66%] md:flex-[2_1_66%] flex-col rounded-lg shadow-lg"
          >
            <AlarmNotification />
          </div>
        </div>

        {/* Patrol History with overflow handling */}
        <div className="h-[49%] relative flex flex-col border rounded-lg mt-4 p-4 shadow-lg bg-white-a700 dark:bg-dark-700"
        >
          <Heading size="headinglg" as="h1" className="text-black dark:text-white-a700">
            Patrol History
            <hr className="border-black-700 my-2" />
          </Heading>
          <ScanningTable />
        </div>
      </div>
    </div>
  );
}
