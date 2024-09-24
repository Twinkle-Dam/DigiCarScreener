import { CAMERA_LIST } from "MockData/carsData";
import { Text, Img, Button, Heading } from ".";
import React from "react";
import { formatDate, formatGPSLocation } from "util/NumberFormatters";
import { useSelector } from "react-redux";
import GPSIcon from "components/GPS";

const STRAP_ARRAY = [
  { label: 'License Plate', dataColumn: 'LicensePlate' },
  { label: 'State', dataColumn: 'State' },
  { label: 'Make', dataColumn: 'CarMake' },
  { label: 'Model', dataColumn: 'CarModel' },
  { label: 'Year', dataColumn: 'CarYear' },
  { label: 'Color', dataColumn: 'CarColor' },
  { label: 'Location', dataColumn: 'GPSLocation' }
];

export default function ScanningTable() {
  const carData = useSelector((state) => state.cars.carData);

  return (
    <div className="w-[100%]">
      <div className="flex flex-col gap-3 bg-white-a700 dark:bg-dark-700 md:flex-col overflow-y-auto max-h-[300px]">
        {carData.map((car, index) => (
          <div key={index} className="flex items-start border border-gray-300 dark:border-dark-600 rounded-lg p-2">
            {/* Display the image first */}
            <div className="flex-shrink-0 mr-2">
              <Img
                src={car.Images[0]} 
                alt={`Car Image`}
                className="h-[50px] w-[100px] object-cover rounded-lg" 
              />
            </div>
            {/* Render Camera ID and DateTime at the top left */}
            <div className="flex flex-col flex-grow">
              <div className="flex mb-1">
                <Text className="text-black-900 dark:text-white-a700 mr-2">
                  {car.CameraID || '--'}
                </Text>
                <Text className="text-black-900 dark:text-white-a700">
                  {formatDate(car.DateTime) || '--'}
                </Text>
              </div>
              {/* Render other data columns with headings */}
              <div className="flex flex-row justify-between">
                {STRAP_ARRAY.map(({ label, dataColumn }) => (
                  <div key={dataColumn} className="mb-1">
                    <Heading as="h6" className="text-gray-500 dark:text-gray-400">{label}</Heading>
                    <Text className="text-black-900 dark:text-white-a700">
                      {dataColumn === "GPSLocation" ? formatGPSLocation(car[dataColumn]) : 
                       car[dataColumn] || '--'}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
