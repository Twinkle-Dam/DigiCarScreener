import React from "react";
import AlertStrap from "../../components/AlertStrap";
import { CAMERA_LIST } from "MockData/carsData";
import { useSelector } from "react-redux";
import { Text } from "components";

export const AlarmNotification = () => {
  const carData = useSelector((state) => {
    return state.cars.carData;
  });

  const notificationCount = useSelector((state) => {
    return state.notifications.notificationCount;
  });

  const [chipOption, setChipOptions] = React.useState(() => CAMERA_LIST);
  const [selectedChipOptions, setSelectedChipOptions] = React.useState([1]);

  return (
    <div className="p-4 flex flex-col gap-1 top-1 w-[750px] h-[334.08px] border border-solid dark:border-dark-600 rounded-lg  bg-white-a700 dark:bg-dark-700 py-2">
      {/* Header Section */}
      <div className="mt-1 flex justify-between items-center">
        <div className="flex items-center gap-1">
          <h3 className="text-lg font-lato1 dark:text-white-a700">
            Alarms & Notifications
          </h3>
          <h4 className="flex h-[30px] w-[30px] items-center justify-center rounded-[10px] bg-black-900 text-center font-lato1 text-white-a700 dark:bg-white-a700 dark:text-black-900">
            {notificationCount}
          </h4>
        </div>
        <Text className="text-gray-400 text-[0.8em] mt-1 text-right">
          (No Alerts or Changes to Alert with details of the LPR and Alert Type during violation)
        </Text>
      </div>

      {/* Horizontal Rule */}
      <hr className="my-2 border-gray-300 dark:border-gray-600" />

      {/* Scrollable Content Section */}
      <div className="relative flex-1 h-[250px] overflow-y-auto p-2 mt-2">
        {carData.length > 0 ? (
          <div className="flex flex-col gap-1">
            {carData.map((d, index) => (
              <AlertStrap
                {...d}
                key={"homepage" + index}
                className="mb-[10px]"
              />
            ))}
          </div>
        ) : (
          <div className="flex h-[150px] items-center justify-center dark:text-white-a700">
            No data available.
          </div>
        )}
      </div>
    </div>
  );
};
