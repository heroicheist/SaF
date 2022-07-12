import React from "react";
import api from "../../Api/api";
import { useEffect } from "react";
import { useState } from "react";
import AlertRender from "./AlertRender";

const Alert = () => {
  const [alerts, setAlerts] = useState([]);
  useEffect(() => {
    getAlerts();
  }, []);
  const getAlerts = async () => {
    await api
      .get("/alert")
      .then((response) =>
        response.data.map((alert) => ({
          stockticker: `${alert.id}`,
          stockname: `${alert.name}`,
          target: `${alert.price}`,
        }))
      )
      .then((response) => {
        if (response) setAlerts(response);
      });
  };
  return (
    <div>
      <div>Your Upcoming Alerts</div>
      {alerts.length <= 0 && <h1>No Alerts</h1>}
      {alerts.map((alerts, index) => {
        <AlertRender
          key={index}
          stockticker={alerts.stockticker}
          stockname={alerts.stockname}
          target={alerts.target}
        />;
      })}
    </div>
  );
};

export default Alert;
