import React from "react";
import { useState } from "react";
import { useRef } from "react";
import "../Home/Home.css";
import StockRender from "../StockRender/StockRender";
const Home = () => {
  const dummy = [
    {
      stockname: "Gimmick",
      stockticker: "Gi",
      stockprice: "100",
    },
    {
      stockname: "Reliance",
      stockticker: "Ril",
      stockprice: "1000",
    },
  ];
  const [stock, setStock] = useState("");
  const searchItem = useRef("");
  const searchWord = () => {
    const item = searchItem.current.value;
    const arr =  dummy.filter((dummy) => {
      if (dummy.stockname.toLowerCase() === item.toLowerCase()) {
        console.log(dummy);
        return dummy;
      } 
    })
    setStock(arr)
    console.log(arr);
    searchItem.current.value = "";
  };
  return (
    <div className="center">
      <div className="searchStock">
        <input
          className="searchItem2"
          type="text"
          ref={searchItem}
          placeholder="Search for `Stock Name` "
        />
        <button className="searchItem3" onClick={searchWord}>
          Search
        </button>
      </div>
      {searchItem.current.value ===""  && <h1>`Search for valid companies`</h1>}
      {Array.isArray(stock) &&
        stock.map((stock, index) => {
          return (
            <StockRender
              key={index}
              stockname={stock.stockname}
              stockticker={stock.stockticker}
              stockprice={stock.stockprice}
              stockalert={stock.stock}
            />
          );
        })}
    </div>
  );
};

export default Home;
