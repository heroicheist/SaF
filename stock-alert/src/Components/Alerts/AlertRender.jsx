import React from 'react';

const  AlertRender = (props) =>{
    return (
        <div>
            <ul>
                <li>Stock Name : {props.stockname}</li>
                <li>Stock Ticker : {props.stockticker}</li>
                <li>Target : {props.target}</li>
            </ul>
        </div>
    );
}

export default AlertRender;