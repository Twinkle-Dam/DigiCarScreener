import React from "react";
import { formatDate } from "util/NumberFormatters";
import GPSIcon from "components/GPS-top";
import { LatestPatrolingDetail } from "./LatestPatrolingDetail";
import { Text } from "components";

export const LastPatrolStrap = ({ latestCaptureData }) => {
  return (
    <div className="flex flex-col gap-[16px] w-[383px] h-[110px] font-manrope">
      <LatestPatrolingDetail
        label={<span className="font-semibold text-[14px] leading-[19.12px]">Camera ID</span>}
        detail={latestCaptureData?.CameraID}
      />
      <LatestPatrolingDetail
        label={<span className="font-semibold text-[14px] leading-[19.12px]">License No/State</span>}
        detail={
          latestCaptureData?.LicensePlate && latestCaptureData?.State
            ? `${latestCaptureData?.LicensePlate}/${latestCaptureData?.State}`
            : "--"
        }
      />
      <LatestPatrolingDetail
        label={<span className="font-semibold text-[14px] leading-[19.12px]">Make/Model/Color</span>}
        detail={
          latestCaptureData?.CarModel &&
          latestCaptureData?.CarMake &&
          latestCaptureData?.CarColor
            ? `${latestCaptureData?.CarMake}/${latestCaptureData?.CarModel}/${latestCaptureData?.CarColor}`
            : "--"
        }
      />
      <LatestPatrolingDetail
        label={<span className="font-semibold text-[14px] leading-[19.12px]">Date & Time/GPS</span>}
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
