import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import api from "../../Api/api";
import "./lertRender.css";

const AlertRender = (props) => {
  const [hover, setHover] = useState(false);
  const [target, setTarget] = useState(props.target);
  const [edit, setEdit] = useState(false);
  const editAlrt = useRef(props.target);

  useEffect(() => {
    return setEdit(false);
  }, [hover]);
  const updateTarget = async () => {
    if (editAlrt.current.value !== "") {
      setTarget(editAlrt.current.value);
      const val = {
        id: props.stockticker,
        name: props.stockname,
        price: editAlrt.current.value,
      };
      await api.put(`/alert/${props.stockticker}`, val).then((response) => {
        console.log(response);
      });
      setEdit(false);
    } else setEdit(false);
  };
  const hidden = () => {
    if (!hover) return "hidden";
    else return "nothidden";
  };
  return (
    <div className="hoverboard"
    onClick={()=>{setHover(true)}}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <ul className="alertcard">
        <li className="alertcardli1">{props.index}</li>
        <li className="alertcardli">Stock Name : {props.stockname}</li>
        <li className="alertcardli">Stock Ticker : {props.stockticker}</li>
        <li className="alertcardli">Target : {target}</li>
        <button
          onClick={() => {
            setEdit(true);
          }}
          className={hidden()}
        >
          Edit
        </button>
      </ul>
      <div>
      {edit && (
        <div>
          <div>Stock Name : {props.stockname}</div>{" "}
          <div className="edittor">
            <input type="number" ref={editAlrt} />
            <button onClick={updateTarget}>Update</button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default AlertRender;
