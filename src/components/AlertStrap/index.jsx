import { formatDate } from "util/NumberFormatters";
import { Text, Img } from "./..";
import React from "react";
import { AlertActionButton } from "components/AlertActionButton";

const ALERT_IMAGES = {
  High: "images/Vector.svg",  
  Medium: "images/AlertM.svg", 
  Low: "images/AlertL.svg",     
};

const ALERT_COLORS = {
  High: "text-black",    
  Medium: "text-black",  // Bold black for Medium
  Low: "text-black"      // Bold black for Low
};

export default function UserProfile({ ...props }) {
  console.log(props);
  const alertColor = ALERT_COLORS[props.AlertLevel] || ALERT_COLORS['Low'];

  return (
    <>
      {props.AlertLevel !== "None" && (
        <div
          {...props}
          className={`${props.className} flex items-start gap-2.5 flex-1 relative`}
        >
          <Img
            src={ALERT_IMAGES[props.AlertLevel] || ALERT_IMAGES['Low']} 
            alt="Alert Icon"
            className="mx-auto h-[16px] w-[16px]"
          />
          <div className="absolute right-[9.82px] top-[8.33px]" />
          <div className="flex flex-1 items-start gap-1.5 self-center pr-16">
            <Text as="p" className={`font-manrope font-bold `}>
            <span className="font-extrabold text-black-900">{props.AlertLevel}</span>
              {` ,${props.LicensePlate}, ${props.CarMake}/${props.CarModel}, ${props.State}`}
              <br />
              {`${props.CameraID} | ${formatDate(props.DateTime)}`}
            </Text>
            <div className="absolute right-6 flex gap-2 w-40">
              <AlertActionButton label="Report" className="bg-black-900 text-white-a700" />
              <AlertActionButton label="Resolve" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
