
import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, FormControl, Nav, Navbar, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import accounting from "../../../images/accounts.png"
import Popup from 'reactjs-popup';
import { UserCard, UserContext } from '../../../App';
import loginImg from '../../../images/man.png'
import mylogo from '../../../images/myLogo.jpg'
import "./NavBar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import Card from './Card';
const NavBar = ({ setSearchResult }) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [show, setShow] = useState(false);
    const [cardItems, setCardItems] = useContext(UserCard);
    const handleLogOut = () => {
        sessionStorage.removeItem('token');
        setLoggedInUser({})
    }



    return (
        <div>
            <Navbar fixed="top" style={{ backgroundColor: "rgb(0, 156, 134)" }} collapseOnSelect expand="lg" variant="dark">
                <Navbar.Brand href="/">
                    <img style={{ width: "40px", height: "50px", marginLeft: "20px" }} src={mylogo} alt="" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto align-items-center ">
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                onChange={(e) => setSearchResult(e.target.value)}
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                        </Form>
                        <Link className="px-2 mx-3 text-light text-decoration-none" to="/dashboard/profile">menu</Link>
                        {/* {loggedInUser.typeOfPerson === "caterer" && <Link className="px-2 mx-3 text-light text-decoration-none" to="/dashboard/profile">menu</Link>} */}
                        <Card show={show} setShow={setShow} cardItems={cardItems} />
                        <p className="px-2 pt-3 mx-3 text-light text-decoration-none" onClick={() => setShow(true)}>
                            <FontAwesomeIcon icon={faCartArrowDown} /><span className="selected-card">{cardItems.length}</span></p>
                        <Nav className=" text-light text-decoration-none p-0 m-0" >
                            {
                                loggedInUser.email ?
                                    <Popup trigger={
                                        <div className=" mr-5">
                                            <img style={{ width: '40px' }} className="profile-image rounded-circle p-1" src={loggedInUser.img || loginImg} alt="" />
                                        </div>
                                    }
                                        position="bottom">
                                        <div className="bg-white p-3 text-center">

                                            <img style={{ height: '150px', width: '150px' }} className="profile-image rounded-circle p-1 border" src={loggedInUser.img || loginImg} alt="profile-image" />

                                            <p className="text-dark m-0 "><strong>{loggedInUser.name}</strong></p>
                                            <p className="text-dark m-0"><small>{loggedInUser.email}</small></p>
                                            <div className='d-flex flex-column '>
                                                <Link className="d-block mb-2  main-bg " size="sm" to="/dashboard/profile"> my profile</Link>
                                                {/* <Button >
                                                    my profile
                                                </Button> */}
                                                <Button className="d-block  main-bg " size="sm">
                                                    my orders
                                                </Button>
                                                {loggedInUser.typeOfPerson === "caterer" &&
                                                    <Button className="d-block mt-2 main-bg" size="sm">
                                                        my menu
                                                    </Button>}
                                            </div>
                                            <button onClick={handleLogOut} className="btn btn-outline-danger w-100 mt-4">Log Out?</button>
                                        </div>
                                    </Popup>

                                    :
                                    <Link className="px-2  mx-3 text-light text-decoration-none" to="/login">Login</Link>
                            }
                        </Nav>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default NavBar;