import React from "react";
import { ListGroup } from "reactstrap";
import { Link } from "react-router-dom";
import './sideMenu.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBox, faFileAlt, faInfoCircle, faList } from '@fortawesome/free-solid-svg-icons';



const SideMenu = () => {
    return (
        <ListGroup className="sidebar"  style={{borderTopLeftRadius:0,borderBottomLeftRadius:0}}>
      <Link id="sideItem" className='list-group-item list-group-item-action' tag='a' to='/' style={{marginTop:20}} action>
        <FontAwesomeIcon icon={faHome}  style={{ marginRight: 12 }}/> Home
      </Link>
      <Link id="sideItem" className='list-group-item list-group-item-action' tag='a' to='/customers' action>
        <FontAwesomeIcon icon={faUsers} style={{ marginRight: 7 }} /> Customers
      </Link>
      <Link id="sideItem" className='list-group-item list-group-item-action' tag='a' to='/products' action>
        <FontAwesomeIcon icon={faBox}  style={{ marginRight: 16 }}/> Products
      </Link>
      <Link id="sideItem" className='list-group-item list-group-item-action' tag='a' to='/invoice' action>
        <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: 18 }}/> Invoice
      </Link>
      <Link id="sideItem" className='list-group-item list-group-item-action' tag='a' to='/InvoiceList' action>
        <FontAwesomeIcon icon={faList} style={{ marginRight: 13 }}/> Invoice List
      </Link>
      <Link id="sideItem" className='list-group-item list-group-item-action' tag='a' to='/' action>
        <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: 13 }}/> About
      </Link>
    </ListGroup>

    );
};

export default SideMenu;
