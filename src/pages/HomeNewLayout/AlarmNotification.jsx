import React from "react";
import AlertStrap from "../../components/AlertStrap";
import { CAMERA_LIST } from "MockData/carsData";
import { useSelector } from "react-redux";
import { Text } from "components";

export const AlarmNotification = () => {
  const carData = useSelector((state) => {
    return state.cars.carData;
  });
  const newCarData = [...carData];
  const [chipOptions, setChipOptions] = React.useState(() => CAMERA_LIST);
  const [selectedChipOptions, setSelectedChipOptions] = React.useState([1]);
  return (
    <div className="p-4 flex flex-col gap-1 border border-solid dark:border-dark-600 rounded-lg m m-4 bg-white-a700 dark:bg-dark-700 py-1 h-[130px]">
      {/* Header Section */}
      <div className="mt-1 flex flex-wrap items-center">
        <h3 className="text-lg font-lato1 dark:text-white-a700">
          Alarms & Notifications
        </h3>
        <h4 className="ml-1 flex h-[30px] w-[30px] items-center justify-center rounded-[10px] bg-black-900 text-center font-lato1 text-white-a700 dark:bg-white-a700 dark:text-black-900">
          {carData.length &&
            carData.filter((car) => car.AlertLevel !== "None").length}
        </h4>
      </div>
      <Text className="text-gray-400 text-[0.7em]">
        Status: No Alerts Changes to Alert with details of the LPR and Alert
        Type during violation
      </Text>
      {/* Scrollable Content Section */}
      <div className="relative flex-1 h-[10vh] overflow-y-auto  p-2">
        {carData.length > 0 ? (
          <div className="ml-1 flex flex-col items-end gap-1">
            <div className="relative self-stretch">
              <React.Suspense fallback={<div>Loading feed...</div>}>
                {carData.map((d, index) => (
                  <AlertStrap
                    {...d}
                    key={"homepage" + index}
                    className="mr-4 md:mr-0 sm:flex-col"
                  />
                ))}
              </React.Suspense>
            </div>
          </div>
        ) : (
          <div className="flex h-[20vh] items-center justify-center dark:text-white-a700">
            No data available.
          </div>
        )}
      </div>
    </div>
  );
};
