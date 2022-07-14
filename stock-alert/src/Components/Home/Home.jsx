// import React from "react";
// import { useState } from "react";
// import { useRef } from "react";
// import "../Home/Home.css";
// import StockRender from "../StockRender/StockRender";
// const Home = () => {
//   const dummy = [
//     {
//       stockname: "Gimmick",
//       stockticker: "Gi",
//       stockprice: "100",
//     },
//     {
//       stockname: "Reliance",
//       stockticker: "Ril",
//       stockprice: "1000",
//     },
//     {
//       stockname: "Infosys",
//       stockticker: "Infy",
//       stockprice: "1422",
//     },
//   ];
//   const [stock, setStock] = useState("");
//   const searchItem = useRef("");
//   const searchWord = () => {
//     const item = searchItem.current.value;
//     const arr =  dummy.filter((dummy) => {
//       if (dummy.stockname.toLowerCase() === item.toLowerCase()) {
//         return dummy;
//       }
//     })
//     setStock(arr)
//     searchItem.current.value = "";
//   };
//   return (
//     <div className="center">
//       <div className="searchStock">
//         <input
//           className="searchItem2"
//           type="text"
//           ref={searchItem}
//           placeholder="Search for `Stock Name` "
//         />
//         <button className="searchItem3" onClick={searchWord}>
//           Search
//         </button>
//       </div>
//       {searchItem.current.value ===""  && <h1>`Search for valid companies`</h1>}
//       {Array.isArray(stock) &&
//         stock.map((stock, index) => {
//           return (
//             <StockRender
//               key={index}
//               stockname={stock.stockname}
//               stockticker={stock.stockticker}
//               stockprice={stock.stockprice}
//               stockalert={stock.stock}
//             />
//           );
//         })}
//     </div>
//   );
// };

// export default Home;
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import api from "../../Api/api";
import "./Home.css";

function Home() {
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
    {
      stockname: "Infosys",
      stockticker: "Infy",
      stockprice: "1422",
    },
  ];
  const [searchTerm, SetSearchTerm] = useState("");
  const [companylist, setCompanylist] = useState([]);
  const [autolist, setAutolist] = useState([]);

  
useEffect(()=>{
  fetchList()
},[])
  const fetchList = async()=>{
    await api.get("/companylist").then((response)=>{setCompanylist(response.data)})
  }
  const inSearch = (e) => {
    const value = e.target.value
    SetSearchTerm(value);
    const val = e.target.value.split(" ").join("").toLowerCase();
    const match = companylist.filter((company)=>{
      if( company.stockname.split(" ").join("").toLowerCase() ===val){
        console.log(company.stockname)
        return company
      }
    })
    console.log(match)
    setAutolist(match)
  };
  return (
    <div>
      <input
        className="searchItem2"
        type="text"
        placeholder="Search For `Stock Name"
        value={searchTerm}
        onChange={inSearch}
      />
      <div>
       {autolist && autolist.map((company,index)=>{
        return <div key={index}>{company.stockname}</div>
       })}
      </div>
    </div>
  );
}

export default Home;
