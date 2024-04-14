import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from 'react-router-dom';
import { Button, Col, Row } from "reactstrap";
import base_url from "../api/bootapi";
import ReactToPrint from "react-to-print";
import './invoicePrint.css';
function InvoicePrint() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const [Bill, setBill] = useState([]);

    const componentRef = useRef();

    const billId = params.get('param1');

    useEffect(() => {
        document.title = "Invoice Print";
        getFileById(billId);
        document.body.style.background = "linear-gradient(to right, rgb(189, 213, 221), rgb(240, 239, 239))";
    }, []);

    const getFileById = (billId) => {
        axios.get(`${base_url}/getBillById/${billId}`)
            .then(response => {
                console.log("upper: " + response.data);
                setBill(response.data)
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
        <div>
            <Row>
                <Col style={{ backgroundColor: '#F0EFEF', color: 'black', border: '2px solid #ccc', height: '150vh' }}>
                    <div ref={componentRef}>


                        <center><h2>INVOICE</h2></center>
                        {Bill ? (
                            <div>
                                <h3 className="biller-name" style={{ color: 'black', fontSize: '20px', fontWeight: 'bold' }}>{Bill.billerName}</h3>
                                <p className="biller-location" style={{ color: 'black', fontSize: '10px', fontWeight: 'light' }}>{Bill.billerLocation}</p>
                                <h3 className="customer-name" style={{ color: 'black', fontSize: '20px', fontWeight: 'bold' }}>{Bill.customerName}</h3>
                                <p className="customer-location" style={{ color: 'black', fontSize: '10px', fontWeight: 'light' }}>{Bill.customerAddress}</p>
                                <p className="Invoice-no-print">Invoice No: {Bill.InvoiceNo}</p>
                                <p className="Invoice-date" >Invoice Date: {Bill.InvoiceDate}</p>
                                <p className="Invoice-due" >Invoice Due Date: {Bill.InvoiceDue}</p>



                                <table width="97%" className="mb-10" style={{marginLeft:12}}>
                                    <thead>
                                        <tr className="Table-header">
                                            <td>Description</td>
                                            <td>Price</td>
                                            <td>Discount</td>
                                            <td>Qty</td>
                                            <td>Net Amount</td>
                                            <td>Tax Rate</td>
                                            <td>Tax Type</td>
                                            <td>Tax Amount</td>
                                            <td>Total Amount</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Bill.billProduct ? (
                                            Bill.billProduct.map(product => (
                                                <tr className="Table-item">
                                                    <td>{product.productName}</td>
                                                    <td>{product.productCost}</td>
                                                    <td>{product.productCost}</td>
                                                    <td>{product.productQuantity}</td>
                                                    <td>{product.productQuantity * product.productCost}</td>
                                                    <td>{product.productTax}</td>
                                                    <td>{product.productTaxType}</td>
                                                    <td>{(product.productQuantity*product.productCost)*(product.productTax)/100}</td>
                                                    <td>{((product.productQuantity*product.productCost)*(product.productTax))/100+(product.productQuantity*product.productCost)}</td>
                                                </tr>
                                            ))) : (
                                            <li>No products available</li>
                                        )}
                                    </tbody>
                                </table>

                                <h4 className="total">
                                    Rs.{Bill.billerTotal}
                                </h4>

                            </div>) : (
                            <p>No Bill data available</p>
                        )
                        }

                        {/*Footer */}
                        <div className="fotter">
                            <span className="fotter-firstL-Isuuer"> Isuuer Name: </span> <span className="fotter-firstL-IsuuerText" >{Bill.billerName}</span>
                            <span className="fotter-firstL-Email"> Email: </span> <span className="fotter-firstL-EmailText" >{Bill.billerMail}</span>
                            <span className="fotter-firstL-Phone"> Phone: </span> <span className="fotter-firstL-PhoneText" >{Bill.billerPhone}</span>
                            <span className="fotter-secondL-Website"> Website: <a className="fotter-secondL-WebsiteText" href={Bill.billerWebsite} target="_blank" rel="noopenner noreferrer">{Bill.billerWebsite}</a></span>
                        </div>
                    </div>
                </Col>
                <div style={{ paddingLeft: 500 }}>
                    <ReactToPrint trigger={() => <Button style={{ width: "5vw", height: "2.85vw", margin: 2, alignContent: 'center' }} >print</Button>}
                        content={() => componentRef.current}
                    />
                </div>
            </Row>
        </div>
    );
}

export default InvoicePrint;