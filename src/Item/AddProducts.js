import React, { useEffect, useState } from 'react';
import { Button, Container, Form, FormGroup, Input } from 'reactstrap';
import base_url from '../api/bootapi';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddProduct = () => {
    const [product, setProduct] = useState({});

    useEffect(() => {
        document.body.style.background = "linear-gradient(to right, rgb(189, 213, 221), rgb(240, 239, 239))";
    }, []);

    const handelForm = (e) => {
        postData(product);
        e.preventDefault();
    };

    const clearData = () => {
        window.location.reload();
    };

    const postData = (data) => {
        axios.post(`${base_url}/addProduct`, data)
            .then(response => {
                console.log(response.data);
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
        <Form onSubmit={handelForm} style={{ marginTop: '25px' }}>
            <FormGroup>
                <label htmlFor='Pname' className='textfield'>Product Name</label>
                <Input type='text' placeholder='Enter Product Name' id='Pname'
                    onChange={(e) => setProduct({ ...product, productName: e.target.value })}
                />
            </FormGroup>
            <FormGroup>
                <label htmlFor='Pdetails' className='textfield'>Product Details</label>
                <Input type='text' placeholder='Enter Product details' id='Pdetails'
                    onChange={(e) => setProduct({ ...product, productDetails: e.target.value })}
                />
            </FormGroup>
            <FormGroup>
                <label htmlFor='Ptax' className='textfield'>Product Tax</label>
                <Input type='text' placeholder='Enter Product Tax' id='Ptax'
                    onChange={(e) => setProduct({ ...product, productTax: e.target.value })}
                />
            </FormGroup>
            <FormGroup>
                <label htmlFor='Ptaxtype' className='textfield'>Product Tax Type</label>
                <Input type='select' id='Ptaxtype' onChange={(e) => setProduct({ ...product, productTaxType: e.target.value })}>
                    <option value="">Select Product Tax Type</option>
                    <option value="IGST">IGST</option>
                    <option value="SGST">SGST</option>
                </Input>
            </FormGroup>

            <FormGroup>
                <label htmlFor='Pcost' className='textfield'>Product Cost</label>
                <Input type='number' placeholder='Enter cost' id='Pcost'
                    onChange={(e) => setProduct({ ...product, productCost: e.target.value })}
                />
            </FormGroup>
            <Container>
                <Button type='submit' color='success' className='m-3' onClick={clearData}>ADD</Button>
                <Link to="/products">
                    <Button type='button' color='warning'>View Product</Button>
                </Link>
            </Container>
        </Form>

    );
};

export default AddProduct;
