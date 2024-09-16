import React, { Suspense } from "react";
import { Helmet } from "react-helmet";
import { Button, Img, Heading, ChipView } from "../../components";
import Header from "../../components/Header";
import UserProfile from "../../components/UserProfile";
import Homepage from "./Homepage";
import ScanningTable from "../../components/ScanningTable";
import { CAMERA_LIST } from "MockData/carsData";
import { useSelector } from "react-redux";

export default function Home() {
  const carData = useSelector((state) => {
    return state.cars.carData;
  });
  const newCarData = [...carData];
  const [chipOptions, setChipOptions] = React.useState(() => CAMERA_LIST);
  const [selectedChipOptions, setSelectedChipOptions] = React.useState([1]);

  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // Effect to handle class addition/removal
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div>
      <Helmet>
        <title>Home page</title>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
      </Helmet>
      <div className="flex w-full flex-col items-center gap-1 bg-blue_gray-50 dark:bg-black-900">
        {" "}
        {/* Ensure the background color is also set for dark mode */}
        <Header />
        {/* Add Switch for Dark Mode */}
        {/* <div className="flex w-full justify-end p-4">
          <Switch value={isDarkMode} onChange={handleDarkModeToggle} />
        </div> */}
        <div className="mx-auto mb-1.5 flex w-full gap-1 self-stretch md:flex-col md:px-5">
          <div className="flex w-[50%] flex-col gap-1 md:w-full">
            <Homepage carData={newCarData[0]} />
            <ScanningTable />
          </div>
          <div className="flex w-[50%] flex-col gap-1 md:w-full">
            <div className="flex flex-col items-start gap-3 border border-solid border-gray-300_01 bg-white-a700 dark:bg-dark-700 p-2.5">
              <Heading
                size="headinglg"
                as="h2"
                className="mt-2 !font-lato1 dark:text-white-a700"
              >
                Live View - Camera {selectedChipOptions} (
                {chipOptions[selectedChipOptions - 1]?.cameraId})
              </Heading>
              <div className="flex gap-1 self-stretch sm:flex-col">
                <ChipView
                  options={chipOptions}
                  setOptions={setChipOptions}
                  values={selectedChipOptions}
                  setValues={setSelectedChipOptions}
                  className={`flex flex-1 flex-wrap gap-y-2 gap-x-2 sm:self-stretch justify-evenly `}
                >
                  {(option) => (
                    <React.Fragment key={option.index}>
                      {option.isSelected ? (
                        <div
                          onClick={option.toggle}
                          className="flex items-center cursor-pointer border border-black bg-gradient rounded-full px-8 py-3 text-center font-lato1 text-[16px] font-semibold text-red dark:text-white transition-colors duration-200 ease-in-out gap-2"
                        >
                          <div className="flex items-center justify-center w-2 h-2 rounded-full border-2 border-green-900 bg-green-900">
                            <div className="w-3 h-3 rounded-full bg-white"></div>
                          </div>
                          <span>{option.label}</span>
                        </div>
                      ) : (
                        <div
                          onClick={option.toggle}
                          className="flex items-center cursor-pointer border border-black rounded-full px-8 py-3 text-center font-lato1 text-[16px] font-semibold text-red dark:text-white transition-colors duration-200 ease-in-out gap-2 dark:text-white-a700 "
                        >
                          <div className="flex items-center justify-center w-2 h-2 rounded-full border-2 border-green-900 bg-green-900">
                            <div className="w-3 h-3 rounded-full bg-white"></div>
                          </div>
                          <span>{option.label}</span>
                        </div>
                      )}
                    </React.Fragment>
                  )}
                </ChipView>
                {/* <Img
                  src="images/img_conf.svg"
                  alt="Conf"
                  className="h-[46px] w-[36px] sm:w-full"
                /> */}
              </div>

              <div className=" h-[230px] content-center self-stretch md:h-auto">
                <Img
                  src={chipOptions[selectedChipOptions - 1]?.feed}
                  alt="Image"
                  className="mx-auto h-[230px] w-full flex-1 object-cover"
                />
                <div className="relative bottom-0 left-0 right-3 top-[-220px] mx-1 my-auto flex h-max flex-1 flex-col items-end gap-[60px] md:mx-0 sm:gap-[30px]">
                  <Button className="flex h-[32px] w-[32px] items-center justify-center border border-solid border-black-900 bg-white-a700  px-1">
                    <Img src="images/img_icon_hand.svg" />
                  </Button>
                  <div className="flex flex-col items-end self-stretch">
                    <div className="flex w-[35px] flex-col items-center gap-1.5 border-[0.78px] border-solid border-black-900 dark:border-dark-700 bg-white-a700  py-1.5 md:w-full">
                      <Img
                        src="images/img_plus.svg"
                        alt="Plus"
                        className="h-[24px] w-[24px]"
                      />
                      <div className="h-px w-[20px] self-stretch bg-gray-300_01 dark:bg-dark-600" />
                      <Img
                        src="images/img_icon_minus.svg"
                        alt="Iconminus"
                        className="h-[18px] w-[18px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 mt-3 flex flex-col gap-4 border border-solid dark:border-dark-600 bg-white-a700 dark:bg-dark-700 py-1 h-[48vh]">
              {/* Header Section */}
              <div className="mt-3 flex flex-wrap items-center">
                <Heading
                  size="headinglg"
                  as="h3"
                  className="!font-lato1 dark:text-white-a700"
                >
                  Alarms & Notifications
                </Heading>
                <Heading
                  size="headingxs"
                  as="h4"
                  className="ml-1 flex h-[20px] w-[20px] items-center justify-center self-start rounded-[10px] bg-black-900  text-center !font-lato1 tracking-[0.13px] text-white-a700 dark:bg-white-a700 dark:text-black-900"
                >
                  {carData.length &&
                    carData.filter((car) => car.AlertLevel !== "None").length}
                </Heading>
              </div>
              {carData.length > 0 ? (
                <div className="ml-1 flex flex-col items-end gap-1 md:ml-0">
                  <div className="relative h-[156px] self-stretch">
                    <div className="absolute bottom-0 left-0 right-0 top-0 my-auto ml-auto mr-1.5 flex flex-1 flex-col gap-2 border-solid border-gray-300_01 dark:border-dark-600 md:relative md:mr-0">
                      <Suspense fallback={<div>Loading feed...</div>}>
                        {carData.map((d, index) => (
                          <UserProfile
                            {...d}
                            key={"homepage" + index}
                            className="mr-4 md:mr-0 sm:flex-col"
                          />
                        ))}
                      </Suspense>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-[20vh] items-center justify-center dark:text-white-a700">
                  No data available.
                </div>
              )}
              <div className="tooltip-container">
                <Button
                  leftIcon={
                    <Img src="images/img_fi10273571.svg" alt="Fi 10273571" />
                  }
                  className="fixed bottom-4 right-4 flex h-[60px] w-[60px] items-center justify-center rounded-full border border-solid border-black-900 dark:border-dark-700 bg-gradient text-[14px] text-black-900 dark:text-white"
                >
                  <div className="tooltip-text whitespace-nowrap ">
                    <span className="m-2">Ask Me!</span>
                  </div>
                  {/* You can remove or keep the left icon depending on the design */}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
