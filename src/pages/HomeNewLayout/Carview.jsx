import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startPatrol } from "store";
import CaptureSlider from "components/CaptureSlider";
import { LastPatrolStrap } from "./LastPatrolStrap";
import { Heading } from "../../components";

export const Carview = ({ latestCaptureData }) => {
  const [ws, setWs] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3001");
    
    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      const incomingData = JSON.parse(event.data);
      dispatch(startPatrol(incomingData));
    };

    setWs(socket);
    return () => {
      socket.close();
    };
  }, [dispatch]);

  const carData = useSelector((state) => state.cars.carData);

  return (
    <div className="flex flex-col bg-white w-full h-full p-4 rounded-lg shadow-lg">
      <Heading size="headinglg" as="h1" className="text-black mb-4">
        Active Patrol
        <hr className="m-2 border-gray-300 dark:border-gray-600" />
      </Heading>
     
      {latestCaptureData ? (
        <div className="flex flex-col gap-4">
          <CaptureSlider dataArray={latestCaptureData.Images} />
          <LastPatrolStrap latestCaptureData={latestCaptureData} />
        </div>
      ) : (
        <div className="flex h-[20vh] items-center justify-center text-black">
          No data Captured! Start Patrolling.
        </div>
      )}
    </div>
  );
};
