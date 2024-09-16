import { CAMERA_LIST } from "MockData/carsData";
import { Text, Img, Button, Heading, SelectBox, Input } from ".";
import { ReactTable } from "./ReactTable";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import { formatDate, formatGPSLocation } from "util/NumberFormatters";
import { useSelector } from "react-redux";
import GPSIcon from "components/GPS";

export default function ScanningTable() {
  const carData = useSelector((state) => {
    return state.cars.carData;
  });

  const tableColumns = React.useMemo(() => {
    const tableColumnHelper = createColumnHelper();
    return [
      tableColumnHelper.accessor("Images", {
        cell: (info) => (
          <div className="flex justify-center  align-middle ">
            <div className="w-full">
              <Img
                src={info.getValue()[0]}
                alt="Image"
                className="h-[26px] w-full object-contain md:h-auto"
              />
              <Text
                as="p"
                className="flex justify-center  align-middle  sm:pr-5"
              >
                {info?.row?.original?.CameraID}
              </Text>
            </div>
          </div>
        ),
        header: (info) => (
          <div className="flex h-full">
            <Heading
              as="h4"
              className="flex justify-center items-center font-bold border-r w-fill-available border-solid border-gray-300_01 bg-gray-100 pl-2.5 pr-1"
            >
              Thumbnail
            </Heading>
          </div>
        ),
        meta: { width: "22%" },
      }),

      tableColumnHelper.accessor("LicensePlate", {
        cell: (info) => {
          const { LicensePlate, StateName } = info.row.original;
          return (
            <Text className="flex justify-center text-center ">
              {LicensePlate}
              <br />
              {StateName}
              <br />
              {"POS:" + info?.row?.original?.Orientation}
            </Text>
          );
        },

        header: (info) => (
          <div className="flex">
            <Button className="flex h-[44px] w-fill-available flex-row items-center justify-center border-r border-solid border-gray-300_01 bg-gray-100 px-[7px] text-center text-[16px] font-semibold text-black-900">
              License/State
            </Button>
          </div>
        ),
        meta: { width: "22%" },
      }),

      tableColumnHelper.accessor("CarMake", {
        cell: (info) => {
          const { CarMake, CarModel, CarColor, BodyType, CarYear } =
            info.row.original;
          return (
            <Text className="flex justify-center text-center ">
              {CarMake}/{CarModel}
              <br />
              {BodyType}
              <br />
              {CarColor}/{CarYear}
            </Text>
          );
        },

        header: (info) => (
          <div className="flex  flex-1">
            <Heading
              as="h5"
              className="border-r w-fill-available flex  justify-center align-middle border-solid border-gray-300_01 bg-gray-100 py-3  sm:pr-5 whitespace-normal"
            >
              Make/Model/Color
            </Heading>
          </div>
        ),
        meta: { width: "22%" },
      }),

      tableColumnHelper.accessor("DateTime", {
        cell: (info) => (
          <Text className="w-full flex justify-center align-middle leading-4 whitespace-nowrap ">
            {formatDate(info.getValue())}
            <br />
            {formatGPSLocation(info?.row?.original?.GPSLocation)}
            <div className="flex whitespace-nowrap items-end text-xs ml-[-42px]">
              <GPSIcon />
            </div>
          </Text>
        ),
        header: (info) => (
          <div className="flex">
            <Heading
              as="h6"
              className="bg-gray-100 whitespace-nowrap py-3 w-fill-available"
            >
              Date & Time/GPS
            </Heading>
          </div>
        ),
        // meta: { width: "102px" },
      }),
    ];
  }, []);

  return (
    <div className="w-[80%]">
      {/* <Table /> */}
      <div className="flex gap-2.5 bg-white-a700 dark:bg-dark-700 md:mx-0 md:flex-col">
        <ReactTable
          size="xs"
          variant="striped"
          bodyProps={{ className: "max-h-10" }}
          headerProps={{
            className:
              "border-gray-300_01 border-t border-l border-r border-solid dark:border-dark-600 h-[32px]",
          }}
          cellProps={{
            className:
              "border-gray-300_01 border-t border-l border-r border-solid dark:border-dark-600",
          }}
          className="flex-1 md:px-5 sm:block sm:overflow-x-auto sm:whitespace-nowrap w-full h-full"
          columns={tableColumns}
          data={carData}
        />
      </div>
    </div>
  );
}
