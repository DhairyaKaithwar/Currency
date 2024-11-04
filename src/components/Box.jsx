import React from "react";
import { useEffect,useState,useContext } from "react";
import './box.css';


function Box({val, str, chc, onChoiceChange, handleInput, readOnly=false, enterKey }) {
  const handleChoiceChange = (e) => {
    onChoiceChange(e.target.value);
  };
  const [valArr,setValArr]=useState([])
  
    

    useEffect(() => {
      const fetchCurrency=async()=>{
      const res = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json')
      const data = await res.json();
      setValArr(Object.keys(data));
      // console.log(Object.keys(data)) 
      } 
      fetchCurrency()
    }, [])
    
  

  return (
    <div className="flex p-3 rounded-lg bg-white w-80 m-3 border border-1 border-black border-opacity-55">
      <div className=" flex-1">
        <div className="">
          {str} {chc.toUpperCase()}
        </div>
        <input readOnly={readOnly} onKeyDown={enterKey} type="number" value={val} className="my-2 outline-none" onChange={(e)=>handleInput(e.target.value)}/>
      </div>
      <div className="flex flex-1 flex-col text-right">
        <div>Currency Type</div>
        <div>
          <select
            onChange={handleChoiceChange}
            value={chc}
            className="border border-1 text-black my-3 px-2 outline-none border-opacity-50 border-black rounded-md"
          >
            {valArr.map((ele)=><option value={ele}>{ele.toUpperCase()}</option>)}
            
          </select>
        </div>
      </div>
    </div>
  );
}

export default Box;
