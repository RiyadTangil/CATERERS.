
import React, { useContext, useEffect, useState } from 'react';
import { Col, Nav, Tab } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSignOutAlt, faPlusCircle, faHome, faBars, faTasks, faUserCircle, faShoppingBag, faShoppingCart, faUserPlus, faUsers, faSearchDollar } from '@fortawesome/free-solid-svg-icons';
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';

const SideVarNav = () => {


  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const [isCaterers, setCaterers] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [customer, seCustomer] = useState(false);


  useEffect(() => {


    if (loggedInUser.typeOfPerson === "caterer") {
      setCaterers(true)
    }
    else if (loggedInUser.typeOfPerson === "admin") {
      setAdmin(true)
      setCaterers(true)
    }

    else if (loggedInUser.typeOfPerson === "customer") {

      seCustomer(true)
    }


  }, [loggedInUser])




  return (

    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Col >
        <Nav variant="pills" className="flex-column nav-container ">
          <Nav.Item>
            <Link to="/dashboard/Profile">  <FontAwesomeIcon icon={faUserCircle} /> Profile</Link>
          </Nav.Item>
          {/* <Nav.Item>
            <Link to="/dashboard/Book">
              <FontAwesomeIcon icon={faShoppingBag} />   Book</Link>
          </Nav.Item> */}
          <Nav.Item>
            <Link to="/dashboard/BookList"><FontAwesomeIcon icon={faShoppingCart} /> My Orders</Link>
          </Nav.Item>
          {loggedInUser.typeOfPerson === "caterer" && <>
            <Nav.Item>
              <Link to="/dashboard/add-food"><FontAwesomeIcon icon={faPlusCircle} /> Add Menu</Link>
            </Nav.Item>
            {/* <Nav.Item>
              <Link to="/dashboard/manage-category"><FontAwesomeIcon icon={faPlusCircle} /> Manage  Category</Link>
            </Nav.Item> */}
            <Nav.Item>
              <Link to="/dashboard/manage-food-menu"><FontAwesomeIcon icon={faTasks} /> Manage Food Menu</Link>
            </Nav.Item>


            <Nav.Item>
              <Link to="/dashboard/OrderList"><FontAwesomeIcon icon={faBars} /> Order List</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/support"><FontAwesomeIcon icon={faFacebookMessenger} /> Support</Link>
            </Nav.Item>
          </>
          }

          <Nav.Item>
            <Link to="/"><FontAwesomeIcon icon={faHome} /> Home page </Link>
          </Nav.Item>
        </Nav>
      </Col>

    </Tab.Container>
  );
};

export default SideVarNav;