
import { Row, Col, Container } from "reactstrap";
import SideMenu from './Menu/sideMenu';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Home from './Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import AllCustomers from './customer/AllCustomers';
import AddCustomer from './customer/AddCustomer';
import AddProduct from './Item/AddProducts';
import Allproducts from './Item/AllProducts';
import Invoice from './Invoice/Invoice';
import InvoiceList from './InvoiceList/InvoiceList';
import InvoicePrint from './InvoiceList/InvoicePrint';

function App() {
  return (
    
    <div style={{margin:0}}>
    
      <Router>
        <Container className='fullscreen'>
          <Row>
            <Col md={4} sm={4} xs={6} lg={4} xl={2}>
              <SideMenu/>
            </Col>
            <Col md={8} sm={8} xs={6} lg={8} xl={10}>
              <Routes>
                <Route path="/" Component={Home} exact />
                <Route path="/customers" Component={AllCustomers} exact />
                <Route path="/addcustomers" Component={AddCustomer} exact />
                <Route path="/products" Component={Allproducts} exact />
                <Route path="/addproducts" Component={AddProduct} exact />
                <Route path="/invoice" Component={Invoice} exact />
                <Route path="/invoiceList" Component={InvoiceList} exact />
                <Route path="/invoicePrint" Component={InvoicePrint} exact />
              </Routes>
            </Col>
          </Row>
        </Container>
        <Container className='smallscreen'>

        </Container>
      </Router>
    </div>
  );
}

export default App;
