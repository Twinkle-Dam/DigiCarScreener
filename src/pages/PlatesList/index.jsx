import React, { useState, useEffect } from "react";
import Header from "../../components/Header";

const PlatesList = () => {
  const [plates, setPlates] = useState([]);
  const [plateInput, setPlateInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedPlates = localStorage.getItem("licensePlates");
    if (storedPlates && storedPlates !== "[]") {
      setPlates(JSON.parse(storedPlates));
    } else {
      const defaultPlates = ["DEF1234", "BCD4567"];
      saveToLocalStorage(defaultPlates);
    }
  }, []);

  const isValidUSALicensePlate = (plate) => {
    const regex = /^[A-Z0-9]{1,7}$/i;
    return regex.test(plate);
  };

  const saveToLocalStorage = (updatedPlates) => {
    localStorage.setItem("licensePlates", JSON.stringify(updatedPlates));
  };

  const handleAddOrUpdate = () => {
    if (!plateInput) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return;
    }

    if (!isValidUSALicensePlate(plateInput)) {
      setErrorMessage("Invalid License Plate. Only alphanumeric, up to 7 characters.");
      return;
    }
    setErrorMessage("");

    if (plates?.includes(plateInput) && editingIndex === null) {
      setErrorMessage("License Plate already exists in the list.");
      return;
    }

    let updatedPlates;
    if (editingIndex !== null) {
      updatedPlates = [...plates];
      updatedPlates[editingIndex] = plateInput;
      setEditingIndex(null);
    } else {
      updatedPlates = [...plates, plateInput];
    }

    setPlates(updatedPlates);
    saveToLocalStorage(updatedPlates);
    setPlateInput("");
  };

  const handleEdit = (index) => {
    setPlateInput(plates[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedPlates = plates.filter((_, i) => i !== index);
    setPlates(updatedPlates);
    saveToLocalStorage(updatedPlates);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex w-full h-[100vh] flex-col items-center gap-1 bg-blue_gray-50 dark:bg-black-900">
      {/* Sidebar */}
      <aside className="w-64 h-full dark:bg-slate-700 bg-slate-300 text-dark p-5 shadow-lg fixed top-0 left-0 z-50 rounded-r-lg">
        <div className="flex items-center mb-5">
          <img src="images/logoo.png" alt="Logo" className="w-10 h-10 mr-2" />
          <h2 className="text-xl text-black-900 dark:text-white-a700">James Murphy</h2>
        </div>
        <hr />
        <ul className="list-none p-0">
          <li className="py-3 cursor-pointer hover:bg-gray-700 rounded-md">
            <a href="#" className="no-underline text-black-900 dark:text-white-a700">Dashboard</a>
          </li>
          <li className="py-3 cursor-pointer hover:bg-gray-700 rounded-md">
            <a href="#" className="text-black-900 dark:text-white-a700 no-underline">About</a>
          </li>
          <li className="py-3 cursor-pointer hover:bg-gray-700 rounded-md">
            <a href="#" className="text-black-900 dark:text-white-a700 no-underline">Help</a>
          </li>
        </ul>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow ml-64 p-5 mt-0">
        <Header />
        <div className="mt-10">
          <h1 className="text-center text-4xl font-bold dark:text-white-a700 text-black-800">Admin Portal</h1>
          <h2 className="text-center text-2xl dark:text-white-a700 text-gray-800">Predefined List Management</h2>
          <div className="mb-5 flex items-center">
            <input
              type="text"
              value={plateInput}
              onChange={(e) => setPlateInput(e.target.value.toUpperCase())}
              placeholder="Enter License Plate"
              className=" dark:border-white-a700 rounded-lg p-2 mr-2 dark:text-white-a700 text-dark-700"
            />
            <button
              onClick={handleAddOrUpdate}
              className="bg-green-500 text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-green-600 relative"
            >
              {editingIndex !== null ? "Update" : "Add"}
            </button>
            {errorMessage && <p className="text-red-600 ml-4">{errorMessage}</p>}

            {/* Alert Loader */}
            {showAlert && (
              <div className="absolute top-25 right-4 bg-blue-200 text-white-800 p-2 rounded-lg transition-transform duration-500 transform translate-x-2">
                Please enter a value
              </div>
            )}
          </div>

          <table className="w-full border-separate border-2 text-center ">
            <thead>
              <tr>
                <th className="bg-gray-700 text-white p-3  dark:text-white-a700">License Plate</th>
                <th className="bg-gray-700 text-white p-3 dark:text-white-a700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {plates?.map((plate, index) => (
                <tr key={index}>
                  <td className={`p-3 ${isDarkMode ? 'border-white' : 'border-black'} text-black-900 dark:text-white-a700`}>
                    {plate}
                  </td>
                  <td className={`p-3 ${isDarkMode ? 'border-white' : 'border-black'} text-black-900 dark:text-white-a700`}>
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-blue-500 text-white py-1 px-2 rounded-lg mr-2 transition duration-300 hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 text-white py-1 px-2 rounded-lg transition duration-300 hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlatesList;
