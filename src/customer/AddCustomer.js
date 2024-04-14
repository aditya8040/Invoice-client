import React, { useEffect, useState } from 'react';
import { Button, Container, Form, FormGroup, Input } from 'reactstrap';
import base_url from '../api/bootapi';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './coustomer.css';

const AddCustomer=()=>{

    //For Loading Customer And Product Data
    useEffect(() => {
        document.title = "Add customer"
        document.body.style.background = "linear-gradient(to right, rgb(189, 213, 221), rgb(240, 239, 239))";
    }, []);

   const[customer, setcustomer] = useState([]);

    const handelForm=(e)=>{
        postData(customer)
        e.preventDefault();
    }

    const clearData = () => {
        window.location.reload();
      };

    const postData=(data)=>{
        axios.post(`${base_url}/addCustomer`,data).then(response => {
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
    }

return(

    <Form onSubmit={handelForm} style={{marginTop:'25px'}}>
        <FormGroup>
            <lable for='name' class='textfield'>Customer Name</lable>
            <Input type='text'
            placeholder='Enter Customer Name'
            id='name'
             onChange={(e)=>{           
                    setcustomer({...customer,customerName:e.target.value})
             }}
            />
        </FormGroup>
        <FormGroup>
            <lable for='mail' class='textfield'>Email</lable>
            <Input type='text'
            placeholder='Enter Email'
            id='mail'
            onChange={(e)=>{
                setcustomer({...customer,customerMail:e.target.value})
            }}
            />
        </FormGroup>
        <FormGroup>
            <lable for='phone' class='textfield'>Phone</lable>
            <Input type='number'
            placeholder='Enter Phone'
            id='phone'
            onChange={(e)=>{
                setcustomer({...customer,customerPhone:e.target.value})
            }}
            />
        </FormGroup>
        <FormGroup>
            <lable for='address' class='textfield'>Address</lable>
            <Input type='text'
            placeholder='Enter Address'
            id='address'
            onChange={(e)=>{
                setcustomer({...customer,customerAddress:e.target.value})
            }}
            />
        </FormGroup>
        <Container>
            <Button type='submit' color='success' className='m-3' onClick={clearData}>ADD</Button>
            <Link to="/customers"><Button type='button'color='warning'>View Customer</Button></Link>
            
        </Container>
    </Form>
)
}
export default AddCustomer;