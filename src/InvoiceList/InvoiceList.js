import React, { useState, useEffect } from 'react';
import base_url from '../api/bootapi';
import axios from 'axios';
import { Link } from 'react-router-dom';

function InvoiceList() {
  const [Bills, setBills] = useState([]);

  useEffect(() => {
    document.title = "Invoice List";
    getAllFiles();
    document.body.style.background = "linear-gradient(to right, rgb(189, 213, 221), rgb(240, 239, 239))";
  }, []);

  const getAllFiles = () => {
    axios.get(`${base_url}/getAllBills`)
      .then(response => {
        console.log(response.data);
        setBills(response.data);
      })
      .catch(error => {
        if (error.response) {
          console.error('Server responded with an error:', error.response.data);
        } else if (error.request) {
          console.error('No response received from the server');
        } else {
          console.error('Error setting up the request:', error.message);
        }
      });
  };

  return (
    <><div>
      <h1 style={{ fontFamily: 'unset', fontSize: '2.8vw', textAlign: 'center', color: '#2c3a42', fontWeight: 'bold' }}>Invoice List</h1>
      
      <table className="simple-table">
        <thead>
          <tr>
            <th>Invoice Id</th>
            <th>Invoice Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Bills.length > 0 ? (
            Bills.map(invoice => (
              <tr key={invoice.InvoiceId}>
                <td>{invoice.InvoiceNo}</td>
                <td>{invoice.InvoiceDate}</td>
                <td>
                <Link to={`/invoicePrint?param1=${invoice.billId}`}>Go to Invoice Print</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No Data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
      </>
  );
}

export default InvoiceList;
