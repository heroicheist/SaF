import React from "react";
import api from "../../Api/api";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function StockRender(props) {
  const alert = useRef("");
  const [setAlert, setSetAlert] = useState(false);
  const [existingAlert, setExistingAlert] = useState("");

  useEffect(() => {
    getAlert();
  }, []);
  const getAlert = async () => {
    await api.get(`/alert/${props.stockticker}`).then((response) => {
      setExistingAlert(response.data.price);
    });
  };
  const setAlertApi = async () => {
    const stockAlert = {
      id: props.stockticker,
      name: props.stockname,
      price: alert.current.value,
    };
    setSetAlert(false);
    await api.post("/alert", stockAlert).then((response) => {
      console.log(response);
    });
  };
  return (
    <div>
      <ul>
        <li>Stock Name : {props.stockname}</li>
        <li>Stock Ticker : {props.stockticker}</li>
        <li>Stock Price : {props.stockprice}</li>
        {existingAlert > 0 && (
          <div>
            <li>Alert Price : {existingAlert}</li>
            <Link to="/alerts">
              <button>Edit Alert</button>
            </Link>
          </div>
        )}
        {!setAlert && alert.current.value > 0 && (
          <div>
            {existingAlert <= 0 && <li>Alert Price : {alert.current.value}</li>}
          </div>
        )}
        {existingAlert <= 0 && !setAlert && (
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

        {existingAlert <= 0 && setAlert && (
          <div>
            <li>Target</li>
            <li>
              <input type="number" ref={alert} placeholder="Price" />
            </li>
            <li>
              <button onClick={setAlertApi}>Set Trigger</button>
            </li>
          </div>
        )}
      </ul>
    </div>
  );
}

export default StockRender;
