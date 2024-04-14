import React, { useEffect, useState } from "react";
import axios from 'axios';
import base_url from "../api/bootapi";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";
import './Product.css';


const Allproducts = () => {

  useEffect(() => {
    getAllProductsFromServer();
    {document.body.style.background = "linear-gradient(to right, rgb(189, 213, 221), rgb(240, 239, 239))"}
   }, [])

 const getAllProductsFromServer = () => {

  axios.get(`${base_url}/getAllProducts`)
    .then(response => {
      console.log(response.data);
      setProducts(response.data);
    })
    .catch(error => {
      if (error.response) {
        // The request was made, but the server responded with an error status code
        console.error('Server responded with an error:', error.response.data);
      } else if (error.request) {
        // The request was made, but no response was received
        console.error('No response received from the server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }
    });
};

const [products, setProducts] = useState([]);

const updateProduct = (productId) => {
  const updatedProducts = products.filter(products => products.productId !== productId);
  setProducts(updatedProducts);
};

const deleteProduct=(id) => {

  axios.delete(`${base_url}/deleteProduct/${id}`).then(response => {
      console.log(response.data);
    //  update(id);
    })
    .catch(error => {
      if (error.response) {
        // The request was made, but the server responded with an error status code
        console.error('Server responded with an error:', error.response.data);
      } else if (error.request) {
        // The request was made, but no response was received
        console.error('No response received from the server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }
    });
}

  return (
    <div>
      
      <h1 style={{fontFamily:'unset', fontSize:'2.8vw',textAlign:'center',color:'#2c3a42',fontWeight:'bold'}}>
        All Products
      </h1>
      
      <Container className="fullscreenpro" style={{textAlign:'center'}}>
          <Link to="/addproducts">
            <Button color='success' className="my-3"  style={{fontFamily:'unset', fontSize:'18px',textAlign:'center',color:'#F0EFEF',fontWeight:'bold',display:'inline-block'}}>Add product</Button>
          </Link>
    

        <table className="simple-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Deatils</th>
            <th>Tax</th>
            <th>Tax Type</th>
            <th>Cost</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            products != null ? products.map((productsDetails) => <tr>
              <td>{productsDetails.productId}</td>
              <td>{productsDetails.productName}</td>
              <td>{productsDetails.productDetails}</td>
              <td>{productsDetails.productTax}</td>
              <td>{productsDetails.productTaxType}</td>
              <td>{productsDetails.productCost}</td>
              <td><Button style={{color:'#F0EFEF' ,backgroundColor:'#fd5424',border:'none', fontSize:'12px',fontWeight:'bold'}} onClick={()=>{
                        deleteProduct(productsDetails.productId)
                        updateProduct(productsDetails.productId)
                     }}>
                         Delete
                     </Button></td>
            </tr>) : "No Data"
          }
        </tbody>
      </table>
      </Container>
      <Container className="smallscreenpro">
      <div style={{ textAlign: 'center', marginTop: 80 }}>
                    <p className="home-text">Make window fullscreen</p>
                    <p className="home-text">Apllication won't be visible due to size issue</p>
                </div>
      </Container>
    </div>
  )
}

export default Allproducts;