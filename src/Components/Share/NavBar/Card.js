
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserCard } from '../../../App';
import cross from '../../../images/xmark-solid (2).svg';
const Card = ({ show, setShow }) => {
    const handleClose = () => setShow(false);
    const [cardItems, setCardItems] = useContext(UserCard);
    const handleShow = () => setShow(true);
    const handleRemoveItem = (id) => {
        const newCardItems = cardItems.filter(item => item._id !== id)
        setCardItems(newCardItems)
    }
    const handleAddItem = (id) => {
        const newCardItems = cardItems.filter(item => {
            if (item._id === id) {
                item.quantity += 1
            }
            return item
        })
        setCardItems(newCardItems)
    }
    const handleMinusItem = (id) => {
        const newCardItems = cardItems.filter(item => {
            if (item._id === id && item.quantity > 1) {
                item.quantity -= 1
            }
            return item
        })
        setCardItems(newCardItems)
        setCardItems(newCardItems)
    }
    const total = cardItems.reduce((total, prd) => total + (prd.foodPrice * prd.quantity), 0)

    return (
        <>
            <Offcanvas placement={'end'} show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>

                    <div className="shadow-sm w-100 mt-4 p-2">
                        <h5>Cart subtotal= <span className="fw-bold text-success">{cardItems.length}</span> item : $<span className="fw-bold text-success">{total}</span></h5>
                        <div className="d-flex justify-content-center">
                            <Link to={"/dashboard/book"} >
                                <button type="button" className="btn main-bg btn-sm">Proceed to checkout</button>
                            </Link>
                        </div>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="card border-0 mb-3">
                        {cardItems.map((items, index) => (
                            <div className="row  shadow my-2 g-0" key={index}>
                                <div className="col-md-4">
                                    <img src={items.foodImg} className="img-fluid rounded-start" alt="..."></img>
                                </div>
                                <div className="col-md-8">


                                    <div className="card-body d-flex justify-content-between align-content-center">
                                        <div>
                                            <div>
                                                <h5 className="card-title">{items.foodName}</h5>
                                                <small>Total: <strong> {items.quantity}</strong>✖ $ <strong>{items.foodPrice}</strong>= {items.quantity * items.foodPrice}</small>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <button type="button" onClick={() => handleMinusItem(items._id)} className="btn btn-warning btn-sm"><FontAwesomeIcon icon={faMinus} /></button>
                                                <button type="button" onClick={() => handleAddItem(items._id)} className="btn btn-success btn-sm"><FontAwesomeIcon icon={faPlus} /></button>
                                            </div>
                                        </div>
                                        <img onClick={() => handleRemoveItem(items._id)} style={{ height: "30px", cursor: "pointer" }} src={cross} className="img-fluid rounded-start" alt="..."></img>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default Card;