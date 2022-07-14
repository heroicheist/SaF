import React from "react";
import api from "../../Api/api";
import { useEffect } from "react";
import { useState } from "react";
import AlertRender from "./AlertRender";
import './Alert.css'

const Alert = () => {
  const [alerts, setAlerts] = useState([]);
  useEffect(() => {
    getAlerts();
  }, []);
  const getAlerts = async () => {
    await api
      .get("/alert")
      .then((response) =>{
       const alrt =  response.data.map((alert) => ({
          stockticker: `${alert.id}`,
          stockname: `${alert.name}`,
          target: `${alert.price}`,
        }))
        setAlerts([...alrt])
      }
      )
  };
  return (
    <div >
      <h1>Your Upcoming Alerts</h1>
      <div className="divAlerts">
      {alerts.length <= 0 && <h1>No Alerts</h1>}
      {alerts.map((alerts, index) => (
        <AlertRender
          key={index}
          index={index+1}
          stockticker={alerts.stockticker}
          stockname={alerts.stockname}
          target={alerts.target}
        />
      ))}
      </div>
    </div>
  );
};

export default Alert;
