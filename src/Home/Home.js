import React, { useEffect } from "react";
import "./Home.css";
import first from "./first.png";
import second from "./second.png";
import third from "./third.png";
const Home = () => {
    
    useEffect(() => {
        document.title = "Home"
        {document.body.style.background = "linear-gradient(to right, rgb(189, 213, 221), rgb(240, 239, 239))"}
    },[]);

    return(
        <div style={{  textAlign: 'center', marginTop:80}}>
             <p  className="home-text">Simplify Your Invoicing</p>  
             <p  className="home-text">Make Legit Invoices in Minutes</p>  
             <div className="line"></div>
   
              <img src={first} className="firstimg" alt="My descriptive alt text" />
              
              <img src={second} className="secondimg" alt="My descriptive alt text" />
             
              <img src={third} className="thirdimg" alt="My descriptive alt text" />
              <span className="firstImgText">
                <h4 style={{fontFamilyamily:"unset"}}>
                Professional and Timely Invoices
                </h4>
                <p>
             Customers appreciate receiving clear, professional invoices promptly. This fosters trust and improves customer satisfaction.                </p>
              </span>
              <span className="secondImgText">
                <h4 style={{fontFamilyamily:"unset"}}>
                Reduced Manual Data Entry Errors
                </h4>
                <p>
                By automating data entry from sales orders or customer information systems, invoice applications eliminate the risk of human error that can occur with manual data entry.
                </p>
              </span>
              <span className="thirdImgText">
                <h4 style={{fontFamilyamily:"unset"}}>
                Simplified Record Keeping
                </h4>
                <p>
                All your invoices are stored electronically in a central location, making record-keeping and retrieval a breeze. No more scrambling through piles of paper.
                </p>
              </span>

       
        </div>
    )
}

export default Home;