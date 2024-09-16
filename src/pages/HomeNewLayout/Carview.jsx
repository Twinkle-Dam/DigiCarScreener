import React from "react";
import { formatDate } from "util/NumberFormatters";
import { useState, useEffect } from "react";
import { CAMERA_LIST } from "MockData/carsData";
import { Text, Heading } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { stopPatrol, startPatrol } from "store";
import GPSIcon from "components/GPS-top";
import CaptureSlider from "components/CaptureSlider";
import { LatestPatrolingDetail } from "./LatestPatrolingDetail";

export const Carview = ({ latestCaptureData }) => {
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
  const [chipOptions, setChipOptions] = React.useState(() => CAMERA_LIST);
  const [selectedChipOptions, setSelectedChipOptions] = React.useState([1]);

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
    <>
      {latestCaptureData ? (
        <div className="flex flex-col gap-4 bg-white px-5  items-center">
          <Heading
            size="headinglg"
            as="h1"
            className="!font-lato1 text-black-900 dark:text-white-a700 mt-2"
          >
            Active Patrol
          </Heading>
          <div className="flex flex-row">
            {/* CaptureSlider Component on the Left */}
            <CaptureSlider dataArray={latestCaptureData.Images} />

            {/* Heading Items on the Right */}
            <div className="flex-1 flex flex-col gap-1">
              <LatestPatrolingDetail
                label="Camera ID"
                detail={latestCaptureData?.CameraID}
              />
              <LatestPatrolingDetail
                label="License No/State"
                detail={
                  latestCaptureData?.LicensePlate && latestCaptureData?.State
                    ? `${latestCaptureData?.LicensePlate}/${latestCaptureData?.State}`
                    : "--"
                }
              />

              <LatestPatrolingDetail
                label=" Make/Model/Color"
                detail={
                  latestCaptureData?.CarModel &&
                  latestCaptureData?.CarMake &&
                  latestCaptureData?.CarColor
                    ? `${latestCaptureData?.CarMake}/${latestCaptureData?.CarModel}/${latestCaptureData?.CarColor}`
                    : "--"
                }
              />
              <LatestPatrolingDetail
                label=" Date & Time/GPS"
                detail={
                  latestCaptureData ? (
                    <div className="flex items-center gap-2">
                      <Text className="text-black-900 dark:text-black-900 whitespace-nowrap">
                        {formatDate(latestCaptureData?.DateTime)}
                      </Text>
                      <GPSIcon />
                    </div>
                  ) : (
                    "--"
                  )
                }
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-[20vh] items-center justify-center dark:text-white-a700">
          No data Captured! Start Patrolling.
        </div>
      )}
    </>
  );
};
