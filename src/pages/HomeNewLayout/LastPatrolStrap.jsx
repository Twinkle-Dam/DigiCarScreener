import React from "react";
import { formatDate } from "util/NumberFormatters";
import GPSIcon from "components/GPS-top";
import { LatestPatrolingDetail } from "./LatestPatrolingDetail";
import { Text } from "components";

export const LastPatrolStrap = ({ latestCaptureData }) => {
  return (
    <div className="flex flex-col gap-[12px] w-[383px] h-[110px] font-manrope text-black-900_19 dark:text-white-a700  ">
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
        label="Make/Model/Color"
        detail={
          latestCaptureData?.CarModel &&
          latestCaptureData?.CarMake &&
          latestCaptureData?.CarColor
            ? `${latestCaptureData?.CarMake}/${latestCaptureData?.CarModel}/${latestCaptureData?.CarColor}`
            : "--"
        }
      />
      <LatestPatrolingDetail
        label="Date & Time/GPS"
        detail={
          latestCaptureData ? (
            <div className="flex items-start gap-1">
              <Text className="text-black-500 dark:text-white-a700 whitespace-nowrap">
                {formatDate(latestCaptureData?.DateTime)}
              </Text>
              {/* <GPSIcon /> */}
            </div>
          ) : (
            "--"
          )
        }
      />
    </div>
  );
};
