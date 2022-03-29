
import React, { useContext, useEffect, useState } from 'react';
import { Col, Nav, Tab } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSignOutAlt, faPlusCircle, faHome, faBars, faTasks, faUserCircle, faShoppingBag, faShoppingCart, faUserPlus, faUsers, faSearchDollar } from '@fortawesome/free-solid-svg-icons';
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';

const SideVarNav = () => {


  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const [isCaterers, setCaterers] = useState(false);


  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return false;
    }
    const decodedToken = jwt_decode(token);
    const { name, email, picture, userType, user_id } = decodedToken;
    const newSignedInUser = { name: name, email: email, img: picture, userType: userType, user_id: user_id }
    setLoggedInUser(newSignedInUser)
    if (userType === "caterer") {
      setCaterers(true)
    }

  }, [])




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
          {/* <Nav.Item>
            <Link to="/dashboard/Review"><FontAwesomeIcon icon={faSearchDollar} /> Review</Link>
          </Nav.Item> */}
          {/* <Nav.Item>
            <Link to="/dashboard/BookList"><FontAwesomeIcon icon={faShoppingCart} /> Book list</Link>
          </Nav.Item> */}
          {isCaterers && <div>
            <Nav.Item>
              <Link to="/dashboard/add-food"><FontAwesomeIcon icon={faPlusCircle} /> Add Menu</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/dashboard/add-category"><FontAwesomeIcon icon={faPlusCircle} /> Add  Category</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/dashboard/OrderList"><FontAwesomeIcon icon={faBars} /> Order List</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/dashboard/manageService"><FontAwesomeIcon icon={faTasks} /> Manage Services</Link>
            </Nav.Item>
          </div>
          }



          <Nav.Item>
            <Link to="/"><FontAwesomeIcon icon={faHome} /> Home page</Link>
          </Nav.Item>
        </Nav>
      </Col>

    </Tab.Container>
  );
};

export default SideVarNav;