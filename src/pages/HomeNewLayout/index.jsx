import React, { Suspense } from "react";
import { Helmet } from "react-helmet";
import { Button, Img, Heading, ChipView } from "../../components";
import Header from "../../components/Header";
import UserProfile from "../../components/UserProfile";
import Homepage from "./ControlPanel";
import ScanningTableNew from "../../components/ScanningTableNew";
import { CAMERA_LIST } from "MockData/carsData";
import { useSelector } from "react-redux";
import { Body } from "./Body";

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
    <>
      <Helmet>
        <title>Home page</title>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
      </Helmet>
      <div className="flex w-full flex-col items-center gap-1 bg-blue_gray-50 dark:bg-black-900">
        {/* Ensure the background color is also set for dark mode */}
        <Header />
        {/* Add Switch for Dark Mode */}
        {/* <div className="flex w-full justify-end p-4">
          <Switch value={isDarkMode} onChange={handleDarkModeToggle} />
        </div> */}
        <Body newCarData={newCarData} />
      </div>
    </>
  );
}
