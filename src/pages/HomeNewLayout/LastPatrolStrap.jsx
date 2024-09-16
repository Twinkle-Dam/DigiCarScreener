import React from "react";
import { LatestPatrolingDetail } from "./LatestPatrolingDetail";
import { formatDate } from "util/NumberFormatters";
import GPSIcon from "components/GPS-top";

export const LastPatrolStrap = ({ latestCaptureData }) => {
  return (
    <div className="flex-1 flex flex-col gap-4">
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
  );
};
