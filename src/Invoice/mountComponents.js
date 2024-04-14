import React, { useEffect, useState } from "react";
import { Button, Container, Form, FormGroup, Input} from 'reactstrap';
import { Link } from "react-router-dom";
import axios from "axios";
import base_url from "../api/bootapi";
import Select from "react-select";


const MountComponets = () => {
    useEffect(() => {
        document.title = "Invoice"
        getAllCustomers();
        getAllProducts();
    }, []);

    //For Customer
    const [selectedItem, setSelectedItem] = useState('');
    const handleSelectChange = (e) => {
        setSelectedItem(e.target.value);
    }
    const [customer, setCustomers] = useState([]);
    const getAllCustomers = () => {
        axios.get(`${base_url}/getAllCustomers`).then(
            response => {
                console.log(response.data);
                setCustomers(response.data)
            }
        )
    }

    //For Product
    const [products, setProducts] = useState([]);
    const [productOptions, setProductOptions] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const getAllProducts = () => {
        axios.get(`${base_url}/getAllProducts`).then(
            response => {
                console.log(response.data);
                setProducts(response.data);
                const options = response.data.map(product => ({
                    value: product.productId, // Use a unique identifier as value
                    label: product.productName, // Use product name as label
                    product // Store the entire product object
                }));
                setProductOptions(options);
            }
        );
    };
    const handleSelectChangeProduct = (selectedOptions) => {
        setSelectedProducts(selectedOptions);
    };
    return (<div>
        <b>Customer Info:</b>
        <Form>
            <FormGroup>
                <Input type="select" value={selectedItem} onChange={handleSelectChange}>
                    <option value="">Select customer...</option>
                    {customer.map((c) => (
                        <option key={c.customerId} value={c.customerName}>{c.customerName}</option>
                    ))}
                </Input>
            </FormGroup>
        </Form>
        {/*taking input and showing*/}
        {/*add customer button*/}
        <Container>
            <Link to="/addcustomers">
                <Button color='primary' className="m-2 mb-4">Add Customer</Button>
            </Link>
        </Container>
        {/*add customer button*/}
        <b>Product Info:</b>
        {/*taking input and showing for product*/}
        <div>
            <Select
                options={productOptions}
                value={selectedProducts}
                onChange={handleSelectChangeProduct}
                isMulti={true}
            />
            <div>
                {selectedProducts.map((option) => (
                    <div key={option.value}>
                        <div>ID: {option.product.productId}</div>
                        <div>Name: {option.product.productName}</div>
                        <div>Cost: {option.product.productCost}</div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    )

}

export default MountComponets;