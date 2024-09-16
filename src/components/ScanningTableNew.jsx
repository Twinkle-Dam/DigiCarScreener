import { CAMERA_LIST } from "MockData/carsData";
import { Text, Img, Button, Heading } from ".";
import { ReactTable } from "./ReactTable";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import { formatDate, formatGPSLocation } from "util/NumberFormatters";
import { useSelector } from "react-redux";
import GPSIcon from "components/GPS";

export default function ScanningTable() {
  const carData = useSelector((state) => state.cars.carData);

  const tableColumns = React.useMemo(() => {
    const tableColumnHelper = createColumnHelper();
    return [
      // Thumbnail Column
      tableColumnHelper.accessor("Images", {
        cell: (info) => (
          <div className="flex justify-center align-middle">
            <div className="w-full">
              <Img
                src={info.getValue()[0]}
                alt="Image"
                className="h-[26px] w-full object-contain md:h-auto"
              />
              <Text as="p" className="flex justify-center align-middle sm:pr-5">
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
            
            </Heading>
          </div>
        ),
        meta: { width: "15%" },
      }),
      // tableColumnHelper.accessor("LicensePlate", {
      //   cell: (info) => {
      //     const { LicensePlate, StateName } = info.row.original;
      //     return (
      //       <Text className="flex justify-center text-center ">
      //         {LicensePlate}
      //         <br />
      //         {StateName}
      //         <br />
      //         {"POS:" + info?.row?.original?.Orientation}
      //       </Text>
      //     );
      //   },

      //   header: (info) => (
      //     <div className="flex">
      //       <Button className="flex h-[44px] w-fill-available flex-row items-center justify-center border-r border-solid border-gray-300_01 bg-gray-100 px-[7px] text-center text-[16px] font-semibold text-black-900">
      //         License/State
      //       </Button>
      //     </div>
      //   ),
      //   meta: { width: "22%" },
      // }),

      // Date & Time Column
      tableColumnHelper.accessor("DateTime", {
        cell: (info) => (
          <Text className="w-full flex justify-center align-middle leading-4 whitespace-nowrap">
            {formatDate(info.getValue())}
          </Text>
        ),
        header: (info) => (
          <div className="flex">
            <Heading
              as="h6"
              className="bg-gray-100 whitespace-nowrap py-3 w-fill-available"
            >
              Date & Time
            </Heading>
          </div>
        ),
        meta: { width: "20%" },
      }),

      // Make Column
      tableColumnHelper.accessor("CarMake", {
        cell: (info) => (
          <Text className="flex justify-center text-center">
            {info.getValue()}
          </Text>
        ),
        header: (info) => (
          <div className="flex">
            <Heading
              as="h5"
              className="border-r w-fill-available flex justify-center align-middle border-solid border-gray-300_01 bg-gray-100 py-3 sm:pr-5 whitespace-normal"
            >
              Make
            </Heading>
          </div>
        ),
        meta: { width: "15%" },
      }),

      // Model Column
      tableColumnHelper.accessor("CarModel", {
        cell: (info) => (
          <Text className="flex justify-center text-center">
            {info.getValue()}
          </Text>
        ),
        header: (info) => (
          <div className="flex">
            <Heading
              as="h5"
              className="border-r w-fill-available flex justify-center align-middle border-solid border-gray-300_01 bg-gray-100 py-3 sm:pr-5 whitespace-normal"
            >
              Model
            </Heading>
          </div>
        ),
        meta: { width: "15%" },
      }),

      // Year Column
      tableColumnHelper.accessor("CarYear", {
        cell: (info) => (
          <Text className="flex justify-center text-center">
            {info.getValue()}
          </Text>
        ),
        header: (info) => (
          <div className="flex">
            <Heading
              as="h5"
              className="border-r w-fill-available flex justify-center align-middle border-solid border-gray-300_01 bg-gray-100 py-3 sm:pr-5 whitespace-normal"
            >
              Year
            </Heading>
          </div>
        ),
        meta: { width: "15%" },
      }),

      // Color Column
      tableColumnHelper.accessor("CarColor", {
        cell: (info) => (
          <Text className="flex justify-center text-center">
            {info.getValue()}
          </Text>
        ),
        header: (info) => (
          <div className="flex">
            <Heading
              as="h5"
              className="border-r w-fill-available flex justify-center align-middle border-solid border-gray-300_01 bg-gray-100 py-3 sm:pr-5 whitespace-normal"
            >
              Color
            </Heading>
          </div>
        ),
        meta: { width: "15%" },
      }),

      // Type Column
      tableColumnHelper.accessor("BodyType", {
        cell: (info) => (
          <Text className="flex justify-center text-center">
            {info.getValue() || "--"}
          </Text>
        ),
        header: (info) => (
          <div className="flex">
            <Heading
              as="h5"
              className="border-r w-fill-available flex justify-center align-middle border-solid border-gray-300_01 bg-gray-100 py-3 sm:pr-5 whitespace-normal"
            >
              Type
            </Heading>
          </div>
        ),
        meta: { width: "15%" },
      }),

      // Location Column
      tableColumnHelper.accessor("Location", {
        cell: (info) => (
          <Text className="flex justify-center items-center text-center p-2 truncate">
            <div>{formatGPSLocation(info?.row?.original?.GPSLocation)}</div>
            <div className="flex whitespace-nowrap items-end text-xs">
              <GPSIcon />
            </div>
          </Text>
        ),
        header: (info) => (
          <div className="flex">
            <Heading
              as="h5"
              className="border-r w-fill-available flex justify-center align-middle border-solid border-gray-300_01 bg-gray-100 py-3 sm:pr-5 whitespace-normal"
            >
              Location
            </Heading>
          </div>
        ),
        meta: { width: "15%" },
      }),
    ];
  }, []);

  return (
    <div className="w-[90%]">
      {/* <Table /> */}
      <div className="flex gap-2.5 bg-white-a700 dark:bg-dark-700 md:mx-0 md:flex-col">
        <ReactTable
          size="xs"
          variant="striped"
          bodyProps={{ className: "max-h-4" }}
          headerProps={{
            className:
              "rounded-lg border-gray-300_01 border-t border-l border-r border-solid dark:border-dark-600 h-[32px]",
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
