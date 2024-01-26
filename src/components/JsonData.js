import { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

const JsonData = () => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    axios
      .get(
        "https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users",
        config
      )
      .then((res) => {
        setData(res.data);
        saveDataAsJson(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const saveDataAsJson = (data) => {
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    saveAs(blob, "apiData.json");
  };

  return (
    <>
      <button onClick={fetchData}>SaveFile</button>
      {data}
    </>
  );
};

export default JsonData;
