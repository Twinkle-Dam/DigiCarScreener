import { formatDate } from "util/NumberFormatters";
import { Text, Img } from "./..";
import React from "react";

export default function UserProfile({ ...props }) {
  console.log(props);
  return (
    <>
      {props.AlertLevel !== "None" && (
        <div
          {...props}
          className={`${props.className} flex items-start gap-2.5 flex-1`}
        >
          <div className="relative h-[30px] w-[8%] content-center rounded-[14px] bg-gradient p-1.5">
            <Img
              src="images/img_icon_notification.svg"
              alt="Image"
              className="mx-auto h-[16px] w-[16px] "
            />
            <div className="absolute right-[9.82px] top-[8.33px] m-auto h-[4px] w-[4px] rounded-sm bg-red-a700" />
          </div>
          <div className="flex flex-1 flex-col items-start gap-1.5 self-center">
            <Text as="p" className="font-medium text-blue_gray-900">
              {`${props.AlertLevel}, ${props.LicensePlate}, ${props.CarMake}/${props.CarModel}, ${props.State}`}
            </Text>
            <Text
              size="textxs"
              as="p"
              className="font-manrope tracking-[0.13px]"
            >
              {`${props.CameraID} |  ${formatDate(props.DateTime)}`}
            </Text>
          </div>
        </div>
      )}
    </>
  );
}
