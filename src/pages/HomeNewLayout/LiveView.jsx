import React from "react";
import { Suspense } from "react";
// import { CAMERA_LIST } from "MockData/carsData";
import { Helmet } from "react-helmet";
import { Button, Img, Heading, ChipView } from "../../components";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "../../components/Header";
import UserProfile from "../../components/UserProfile";
import ControlPanel from "./ControlPanel";
import HomepageRowNine from "components/ScanningTable";
import { CAMERA_LIST } from "MockData/carsData";
import { useSelector } from "react-redux";
import { AlarmNotification } from "./AlarmNotification";

export const LiveView = (props) => {
  const [chipOptions, setChipOptions] = React.useState(() => CAMERA_LIST);

  const [selectedChipOptions, setSelectedChipOptions] = React.useState([1]);
  const latestCaptureData = props.carData;
  const [isPatrolStarted, setIsPatrolStarted] = useState(false);
  const [carDataFromSocket, setCarDataFromSocket] = useState([]);
  const [ws, setWs] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3001");

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      console.log("Message from server:", event.data);
      const incomingData = JSON.parse(event.data);
      dispatch(startPatrol(incomingData));
    };
    setWs(socket);
    return () => {
      socket.close();
    };
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(startPatrol(carDataFromSocket));
  // }, [carDataFromSocket]);

  const togglePatrol = () => {
    setIsPatrolStarted(!isPatrolStarted);
  };
  const carData = useSelector((state) => {
    return state.cars.carData;
  });
  const newCarData = [...carData];

  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // Effect to handle class addition/removal
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  return (
    <div className="flex flex-col items-start gap-3 border border-solid border-gray-300_01 bg-white-a700 dark:bg-dark-700 p-2.5">
      <Heading
        size="headinglg"
        as="h2"
        className="mt-2 !font-lato1 dark:text-white-a700"
      >
        Live View - Camera {selectedChipOptions} (
        {chipOptions[selectedChipOptions - 1]?.cameraId})
      </Heading>
      <div className="flex gap-1 self-stretch sm:flex-col">
        <ChipView
          options={chipOptions}
          setOptions={setChipOptions}
          values={selectedChipOptions}
          setValues={setSelectedChipOptions}
          className={`flex flex-1 flex-wrap gap-y-2 gap-x-2 sm:self-stretch justify-evenly `}
        >
          {(option) => (
            <React.Fragment key={option.index}>
              {option.isSelected ? (
                <div
                  onClick={option.toggle}
                  className="flex items-center cursor-pointer border border-black bg-gradient rounded-full px-8 py-3 text-center font-lato1 text-[16px] font-semibold text-red dark:text-white transition-colors duration-200 ease-in-out gap-2"
                >
                  <div className="flex items-center justify-center w-2 h-2 rounded-full border-2 border-green-900 bg-green-900">
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  </div>
                  <span>{option.label}</span>
                </div>
              ) : (
                <div
                  onClick={option.toggle}
                  className="flex items-center cursor-pointer border border-black rounded-full px-8 py-3 text-center font-lato1 text-[16px] font-semibold text-red dark:text-white transition-colors duration-200 ease-in-out gap-2 dark:text-white-a700 "
                >
                  <div className="flex items-center justify-center w-2 h-2 rounded-full border-2 border-green-900 bg-green-900">
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  </div>
                  <span>{option.label}</span>
                </div>
              )}
            </React.Fragment>
          )}
        </ChipView>
        {/* <Img
        src="images/img_conf.svg"
        alt="Conf"
        className="h-[46px] w-[36px] sm:w-full"
      /> */}
      </div>

      <div className=" h-[230px] content-center self-stretch md:h-auto">
        <Img
          src={chipOptions[selectedChipOptions - 1]?.feed}
          alt="Image"
          className="mx-auto h-[230px] w-full flex-1 object-cover"
        />
        <div className="relative bottom-0 left-0 right-3 top-[-220px] mx-1 my-auto flex h-max flex-1 flex-col items-end gap-[60px] md:mx-0 sm:gap-[30px]">
          <Button className="flex h-[32px] w-[32px] items-center justify-center border border-solid border-black-900 bg-white-a700  px-1">
            <Img src="images/img_icon_hand.svg" />
          </Button>
          <div className="flex flex-col items-end self-stretch">
            <div className="flex w-[35px] flex-col items-center gap-1.5 border-[0.78px] border-solid border-black-900 dark:border-dark-700 bg-white-a700  py-1.5 md:w-full">
              <Img
                src="images/img_plus.svg"
                alt="Plus"
                className="h-[24px] w-[24px]"
              />
              <div className="h-px w-[20px] self-stretch bg-gray-300_01 dark:bg-dark-600" />
              <Img
                src="images/img_icon_minus.svg"
                alt="Iconminus"
                className="h-[18px] w-[18px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
