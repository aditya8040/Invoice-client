import React, { useEffect, useState } from "react";
import axios from 'axios';
import base_url from "../api/bootapi";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";
import './table.css';


const AllCustomers = () => {

  useEffect(() => {
    getAllCoursesFromServer();
    { document.body.style.background = "linear-gradient(to right, rgb(189, 213, 221), rgb(240, 239, 239))" }
  }, [])

  const getAllCoursesFromServer = () => {

    axios.get(`${base_url}/getAllCustomers`)
      .then(response => {
        console.log(response.data);
        setCustomers(response.data);
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

  
  const deleteCustomer=(id) => {
 
    axios.delete(`${base_url}/deleteCustomer/${id}`).then(response => {
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

  const [customers, setCustomers] = useState([]);

  const updateCustomer = (customerId) => {
    const updatedCustomers = customers.filter(customer => customer.customerId !== customerId);
    setCustomers(updatedCustomers);
  };

  return (
    <div>

      <h1 style={{ fontFamily: 'unset', fontSize: '2.8vw', textAlign: 'center', color: '#2c3a42', fontWeight: 'bold' }}>
        All Customers
      </h1>

      <Container className="fullscreenpro" style={{ textAlign: 'center' }}>
        <Link to="/addcustomers">
          <Button color='success' className="my-3" style={{ fontFamily: 'unset', fontSize: '18px', textAlign: 'center', color: '#F0EFEF', fontWeight: 'bold', display: 'inline-block' }}>Add customer</Button>
        </Link>
      

      <table className="simple-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            customers != null ? customers.map((CustomerDetails) => <tr>
              <td>{CustomerDetails.customerId}</td>
              <td>{CustomerDetails.customerName}</td>
              <td>{CustomerDetails.customerPhone}</td>
              <td>{CustomerDetails.customerMail}</td>
              <td>{CustomerDetails.customerAddress}</td>
              <td><Button style={{color:'#F0EFEF' ,backgroundColor:'#fd5424',border:'none', fontSize:'12px',fontWeight:'bold'}} onClick={()=>{
                        deleteCustomer(CustomerDetails.customerId)
                        updateCustomer(CustomerDetails.customerId)
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

export default AllCustomers;