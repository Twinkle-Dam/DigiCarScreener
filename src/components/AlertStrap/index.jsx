import { formatDate } from "util/NumberFormatters";
import { Text, Img } from "./..";
import React from "react";
import { AlertActionButton } from "components/AlertActionButton";

const ALERT_IMAGES = {
  High: "images/img_alertred.png",  
  Medium: "images/img_alertyellow.png", 
  Low: "images/img_alertblack.png",     
};

export default function UserProfile({ ...props }) {
  console.log(props);
  return (
    <>
      {props.AlertLevel !== "None" && (
        <div
          {...props}
          className={`${props.className} flex items-start gap-2.5 flex-1 relative`}
        >
          <Img
            src={ALERT_IMAGES[props.AlertLevel] || ALERT_IMAGES['Low']} // Fallback to Low if AlertLevel is not recognized
            alt="Alert Icon"
            className="mx-auto h-[16px] w-[16px]"
          />
          <div className="absolute right-[9.82px] top-[8.33px] m-auto h-[4px] w-[4px] rounded-sm bg-red-a700" />
          <div className="flex flex-1 items-start gap-1.5 self-center pr-16">
            <Text as="p" className="!font-medium text-blue_gray-900">
              {`${props.AlertLevel}, ${props.LicensePlate}, ${props.CarMake}/${props.CarModel}, ${props.State} `}
              {`${props.CameraID} | ${formatDate(props.DateTime)}`}
            </Text>
            <div className="absolute bottom-2 right-2 flex justify-between w-40 rounded-[0.40rem]">
              <AlertActionButton label="Report" />
              <AlertActionButton label="Resolve" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
