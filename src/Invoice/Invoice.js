import React, { useState, useRef, useEffect } from "react";
import { Button, Col, Container, Form, FormGroup, Input, Row } from 'reactstrap';
import { Link } from "react-router-dom";
import ReactToPrint from 'react-to-print';
import axios from "axios";
import base_url from "../api/bootapi";
import Select from "react-select";
import './Invoice.css';
import Table from "./Table";
import logo from './LOGOARK.png'; 
//capital for componet or it wont get imported

const Invoice = () => {
    //For Loading Customer And Product Data
    useEffect(() => {
        document.title = "Invoice"
        getAllCustomers();
        getAllProducts();
        { document.body.style.background = "linear-gradient(to right, rgb(189, 213, 221), rgb(240, 239, 239))" }
    }, []);

    //For Customer
    const [customerOptions, setCustomerOptions] = useState([]);
    const [customerAddress, setCustomerAddress] = useState('Ahmedabad');
    const [customer, setCustomers] = useState([]);

    const getAllCustomers = () => {
        axios.get(`${base_url}/getAllCustomers`).then(
            response => {
                const options = response.data.map(customer => ({
                    value: customer.customerId,
                    label: customer.customerName,
                    customer
                }));
                setCustomerOptions(options);
            }
        );
    };

    //Get called on change
    const handleSelectChangeCustomer = (selectedOptions) => {
        setCustomers(selectedOptions);
        setCustomerAddress(selectedOptions.customer.customerAddress)
    };

    //For Product
    const [productOptions, setProductOptions] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const getAllProducts = () => {
        axios.get(`${base_url}/getAllProducts`).then(
            response => {
                const options = response.data.map(product => ({
                    value: product.productId,
                    label: product.productName,
                    product
                }));
                setProductOptions(options);
            }
        );
    };

    //Get called on product change
    const handleSelectChangeProduct = (selectedOptions) => {
        setSelectedProducts(selectedOptions);
    };

    //This is for setting parameters 
    const [billerName, setBillerName] = useState('Aditya Kandalkar')
    const [billerLocation, setBillerLocation] = useState('Ahmedabad')
    const [billerPhone, setBillerPhone] = useState('952-182-55')
    const [billerWebsite, setBillerWebsite] = useState('www.adityakandalkar.com')
    const [billerMail, setBillerMail] = useState('ww@gmail.com')
    const [InvoiceNo, setInvoiceNo] = useState('01')
    const [InvoiceDate, setInvoiceDate] = useState('2024-01-01')
    const [InvoiceDue, setInvoiceDue] = useState('2024-01-01')

    //For quantity
    const [productQuantities, setProductQuantities] = useState({});
    const [productAmounts, setProductAmounts] = useState({});
    const [productQuant, setProductQuant] = useState({});

    const handleQuantityChange = (event, productId) => {
        const { value } = event.target;
        setProductQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId
            ]: value
        }));
    };

    const handleSubmitQuantity = (event, productId, productCost,productTax) => {
        event.preventDefault();
        const quantity = productQuantities[productId] || 0; 
        setProductQuant((productCost) => ({
            ...productCost,
            [productId]: quantity
        }));
        // Calculate amount and update productAmounts state
        const totalAmount =(parseInt(productCost) +parseInt(productCost)*parseInt(productTax)/100)* parseInt(quantity)
        setProductAmounts((prevAmounts) => ({
            ...prevAmounts,
            [productId]: totalAmount
        }));
        // Clear input field after submission
        setProductQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: ""
        }));
        console.log(totalAmount);
    };

    //To Calculate Bill Total Amount
    const total = Object.values(productAmounts).reduce((acc, curr) => acc + curr, 0);

    //This is for react to print
    const componentRef = useRef();

    const productData = selectedProducts.map(item => ({
        productName: item.product.productName,
        productDetails: item.product.productDetails,
        productCost: item.product.productCost,
        productTax: item.product.productTax,
        productTaxType: item.product.productTaxType,
        productQuantity: productQuant[item.product.productId]
    }))
    //Raises alert if prpoperty is null
    const [flag, setFlag] = useState(0);

    const firstMethod = () => {
        console.log("Date" + InvoiceDate);
        if (!InvoiceDate && InvoiceDue === 'undefined' || !InvoiceDate && InvoiceDue === null) {
            console.log("here also");
            alert("Select Invoice Date");
        }
        if (!customer || !customer.customer || customer.customer.customerName === undefined) {
            console.log("here also");
            alert("Select Customer Name");
        } else {
            setFlag(1);
        }
    };

    const secondMethod = () => {
        const data = ({
            customerName: customer.customer.customerName,
            customerAddress: customer.customer.customerAddress,
            billerName: billerName,
            billerMail: billerMail,
            billerLocation: billerLocation,
            billerPhone: billerPhone,
            billerWebsite: billerWebsite,
            billProduct: productData,
            billerTotal: total,
            InvoiceDate: InvoiceDate,
            InvoiceDue: InvoiceDue,
            InvoiceNo: 1

        });
        axios.post(`${base_url}/sendData`, data)
            .then((response) => {

                console.log('Response:', data);
            })
            .catch((error) => {

                console.error('Error:', error);
            });
    };

    const postInvoiceData = () => {
        firstMethod();
        if (flag === 1) {
            secondMethod();
        }
    }

    return (

        <div>
            <h1 style={{ fontFamily: 'unset', fontSize: '2.8vw', textAlign: 'center', color: '#2c3a42', fontWeight: 'bold' }}>Invoice</h1>
            <Container className="fullscreeninvo">
                <Row className='mt-3'>
                    <Col md={5} style={{backgroundColor: "#40434E", color: '#F0efef', paddingLeft: '15px', paddingRight: '15px', borderRight: '5px solid #FD5424' }}>
                        {/*taking input and showing Biller*/}
                        <div style={{ fontWeight: 'bold', textAlign: 'center', marginTop: '5px', fontSize: '19px' }}>INPUTS</div>
                        <Form>
                            <FormGroup style={{ color: '#F0efef' }}>
                                Biller Name:   <Input type="text" value={billerName} required onChange={(e) => setBillerName(e.target.value)}></Input>
                                Biller Location:   <Input type="text" value={billerLocation} required onChange={(e) => setBillerLocation(e.target.value)}></Input>
                                Invoice No:   <Input type="text" value={InvoiceNo} required onChange={(e) => setInvoiceNo(e.target.value)}></Input>
                                Invoice Date:   <Input type="Date" value={InvoiceDate} required onChange={(e) => setInvoiceDate(e.target.value)}></Input>
                                Invoice Due:   <Input type="Date" value={InvoiceDue} required onChange={(e) => setInvoiceDue(e.target.value)}></Input>
                                Biller Email:   <Input type="mail" value={billerMail} onChange={(e) => setBillerMail(e.target.value)}></Input>
                                Biller Phone:   <Input type="text" value={billerPhone} required onChange={(e) => setBillerPhone(e.target.value)}></Input>
                                Biller Website:   <Input type="text" value={billerWebsite} onChange={(e) => setBillerWebsite(e.target.value)}></Input>
                            </FormGroup>
                        </Form>

                        <div style={{ color: '#F0efef' }}>
                            Customer Info:

                            <Select
                                options={customerOptions}
                                value={customer}
                                required
                                onChange={handleSelectChangeCustomer}
                                isMulti={false}
                                styles={{
                                    menu: (provided) => ({
                                        ...provided,
                                        backgroundColor: '#F0EFEF',
                                        color: 'black',
                                    }),
                                }}
                            />

                            <Link to="/addcustomers">
                                <Button style={{  whiteSpace: 'nowrap' ,color: '#F0efef', marginTop: 10, marginLeft: '18.8vw', position: 'relative', textAlign:'center'}}>Add Customer</Button>
                            </Link>

                            <div style={{ color: '#F0efef' }}>
                                Product Info:
                                <Select
                                    options={productOptions}
                                    value={selectedProducts}
                                    onChange={handleSelectChangeProduct}
                                    isMulti={true}
                                    styles={{
                                        menu: (provided) => ({
                                            ...provided,
                                            backgroundColor: '#F0EFEF', // Background color of the dropdown menu
                                            color: 'black', // Text color of the dropdown menu
                                        }),
                                    }}
                                />
                                <div>
                                    {selectedProducts.map((option) => (
                                        <div key={option.value}>
                                            <div>Name: {option.product.productName}</div>
                                            <div>Product Cost: {option.product.productCost}</div>
                                            <form onSubmit={(event) => handleSubmitQuantity(event, option.product.productId,option.product.productCost,option.product.productTax)}>
                                                <label>
                                                    Product Quantity:
                                                    <input
                                                        type="number"
                                                        value={productQuantities[option.product.productId] || ""}
                                                        onChange={(event) => handleQuantityChange(event, option.product.productId)}
                                                    />
                                                </label>
                                                <button type="submit">Submit</button>
                                            </form>
                                            <div>Product Amount: {(productQuantities[option.product.productId] || 0) * parseInt(option.product.productCost)}</div>
                                            {/* {productAmounts[option.product.productCost]} */}
                                        </div>
                                    ))}
                                </div>
                                <Link to="/addproducts">
                                    <Button style={{ whiteSpace: 'nowrap' , color: '#F0efef', marginTop: 10, marginLeft: '19.5vw', position: 'relative' }}>Add Product</Button>
                                </Link>
                            </div>
                            {/*add product button*/}
                            <div style={{ marginBottom: 10, marginLeft: "11vw" }}>
                                {/*react to print function*/}
                                <ReactToPrint trigger={() => <Button style={{ fontWeight: "bold", color: '#F0efef', width: "5vw", height: "2.85vw", margin: 2, alignContent: 'center' }} >Print</Button>}
                                    content={() => componentRef.current}
                                />
                            </div>
                            <Button style={{ fontWeight: 'bold', color: '#F0efef', width: "5vw", height: "2.85vw", margin: 2, alignContent: 'center' }} onClick={postInvoiceData}>Save</Button>
                        </div>
                    </Col>
                    <Col md={7} style={{ backgroundColor: '#F0EFEF', color: 'black', border: '2px solid #ccc' }}>
                        <div ref={componentRef}>

                            <h2 className="invoice-head">INVOICE</h2> <img src={logo} className="image" alt="My descriptive alt text" />
                            <h3 className="biller-name" style={{ color: 'black', fontSize: '20px', fontWeight: 'bold' }}>{billerName}</h3>
                            <p className="biller-location" style={{ color: 'black', fontSize: '10px', fontWeight: 'light' }}>{billerLocation}</p>
                            <h3 className="customer-name" style={{ color: 'black', fontSize: '20px', fontWeight: 'bold' }}>{customer.label}</h3>
                            <p className="customer-location" style={{ color: 'black', fontSize: '10px', fontWeight: 'light' }}>{customerAddress}</p>
                            <p className="Invoice-no">Invoice No: {InvoiceNo}</p>
                            <p className="Invoice-date" >Invoice Date: {InvoiceDate}</p>
                            <p className="Invoice-due" >Invoice Due Date: {InvoiceDue}</p>

                            <Table selectedProducts={selectedProducts}
                                productAmounts={productAmounts}
                                productQuant={productQuant}
                            />

                            <h4 className="total">
                                Rs.{total}
                            </h4>

                            {/*Footer */}
                            <div className="fotter">
                                <span className="fotter-firstL-Isuuer"> Isuuer Name: </span> <span className="fotter-firstL-IsuuerText" >{billerName}</span>
                                <span className="fotter-firstL-Email"> Email: </span> <span className="fotter-firstL-EmailText" >{billerMail}</span>
                                <span className="fotter-firstL-Phone"> Phone: </span> <span className="fotter-firstL-PhoneText" >{billerPhone}</span>
                                <span className="fotter-secondL-Website"> Website: <a className="fotter-secondL-WebsiteText" href={billerWebsite} target="_blank" rel="noopenner noreferrer">{billerWebsite}</a></span>
                            </div>
                        </div>
                    </Col>

                </Row>
            </Container>
            <Container className="smallscreeninvo">
                <div style={{ textAlign: 'center', marginTop: 80 }}>
                    <p className="home-text">Make window fullscreen</p>
                    <p className="home-text">Apllication won't be visible due to size issue</p>
                </div>
            </Container>

        </div>



    )
}

export default Invoice;
