import { useEffect, useState } from "react";
import "./index.css";
import curr_img from "./assets/curr.jpg";
import Box from "./components/Box";

function App() {
  const [firstChoice, setFirstChoice] = useState("usd");
  const [secondChoice, setSecondChoice] = useState("inr");
  const [firstAns, setFirstAns] = useState(1);
  const [secondAns, setSecondAns] = useState(0);

  const fetchChoice = async (choice) => {
    const res = await fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${choice}.json`
    );
    const data = await res.json();
    return data;
  };

  const enterKey=(e)=>{
    if (e.key === "Enter") {
      setAns();
    }
  }


  const setAns = async () => {
    const data = await fetchChoice(firstChoice);
    const valArr = data[firstChoice];
    const secondVal = valArr[secondChoice];
    console.log(valArr);
    console.log(secondVal);
    setSecondAns((firstAns * secondVal).toFixed(2));
  };

  // Use useEffect to update the second answer when choices change
  useEffect(() => {
    setAns();
  }, [firstChoice, secondChoice]);

  // Taking input from the first Box component
  const handleChange = (value) => {
    setFirstAns(value);
  };

  // Swap the currencies
  const handleConvert = () => {
    // value
    const tempVal= firstAns;
    setFirstAns(secondAns);
    setSecondAns(tempVal);
    // Currency
    const tempCurr = firstChoice;
    setFirstChoice(secondChoice);
    setSecondChoice(tempCurr);
  };

  console.log("first", firstChoice);
  console.log("second", secondChoice);

  return (
    <div
      className="hello bg-red-900 w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${curr_img})` }}
    >
      <div className="bg-white py-6 px-1 bg-opacity-40 shadow-xl shadow-black rounded-xl">
        <Box
          enterKey={enterKey}
          handleInput={handleChange}
          val={firstAns}
          str="From"
          chc={firstChoice}
          onChoiceChange={setFirstChoice}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <button
            className="bg-red-500 outline-none text-white px-3 py-1 mx-2 rounded-lg z-10"
            onClick={handleConvert}
          >
            Swap
          </button>
          <button
            className="bg-red-500 outline-none text-white px-2 py-1 mx-2 rounded-lg z-10"
            onClick={setAns}
          >
            Convert
          </button>
        </div>
        <Box
          readOnly="true"
          val={secondAns}
          str="To"
          chc={secondChoice}
          onChoiceChange={setSecondChoice}
          handleInput={() => {}}
        />
      </div>
    </div>
  );
}

export default App;
