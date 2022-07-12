import React from "react";
import { useState } from "react";
import { useRef } from "react";

function StockRender(props) {
  const alert = useRef("");
  const [setAlert, setSetAlert] = useState(false);
  return (
    <div>
      <ul>
        <li>Stock Name : {props.stockname}</li>
        <li>Stock Ticker : {props.stockticker}</li>
        <li>Stock Price : {props.stockprice}</li>
        {!setAlert && alert.current.value >0 && <div><li>Alert Price : {alert.current.value}</li></div>}
        {!setAlert && (
          <li>
            <button
              onClick={() => {
                setSetAlert(true);
              }}
            >
              Set Alert
            </button>
          </li>
        )}
        
        {setAlert && (
          <div>
            <li>Target</li>
            <li>
              <input type="number" ref={alert} placeholder="Price" />
            </li>
            <li>
              <button
                onClick={() => {
                  setSetAlert(false);
                }}
              >
                Set Trigger
              </button>
            </li>
          </div>
        )}
      </ul>
    </div>
  );
}

export default StockRender;
