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

  useEffect(() => {
    fetchList();
  }, []);
  useEffect(()=>{
    let inpt = document.getElementById("searchTerm")
  inpt.addEventListener('keydown' , (e)=>{if(e.keyCode ===13){console.log(e.target.value)}})
  return ()=> inpt.removeEventListener
  },[searchTerm])
  const fetchList = async () => {
    await api.get("/companylist").then((response) => {
      // console.log(response.data.map((res)=>res.stockname.split(" ").join("").toUpperCase()))
      setCompanylist(response.data.map((res) => res.stockname));
    });
  };
  
  const inSearch = (e) => {
    const value = e.target.value;
    SetSearchTerm(value);
    const match = companylist.filter((companylist) => {
      const regex = new RegExp(`${searchTerm}`, "ig");
      return companylist.match(regex);
    });
    setAutolist(match);
  };
  return (
    <div className="searchStock">
      <input
        id="searchTerm"
        className="searchItem2"
        type="text"
        placeholder="Search For `Stock Name"
        value={searchTerm}
        onChange={inSearch}
      />
      <div>
        {autolist.length>0 &&
          autolist.map((company, index) => {
            if (index < 7)
              return (
                <div
                  className="autocomplete"
                  onClick={() => SetSearchTerm(company)}
                  key={index}
                >
                  {company}
                </div>
              );
          })}
      </div>
    </div>
  );
}

export default Home;
