
import React, { useContext, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { UserCard } from '../../../App';
import cross from '../../../images/xmark-solid (2).svg';
const Card = ({ show, setShow }) => {
    const handleClose = () => setShow(false);
    const [cardItems, setCardItems] = useContext(UserCard);
    const handleShow = () => setShow(true);
    const handleRemoveItem=(id)=>{
        const newCardItems = cardItems.filter(item=>item.Id!==id)
        setCardItems(newCardItems)
    }
    console.log(cardItems);
    return (
        <>
            <Offcanvas placement={'end'} show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>cad info</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div class="card border-0 mb-3">
                        {cardItems.map((items, index) => (
                            <div class="row  shadow my-2 g-0" key={index}>
                                <div class="col-md-4">
                                    <img src="https://img.freepik.com/free-photo/concept-indian-cuisine-baked-chicken-wings-legs-honey-mustard-sauce-serving-dishes-restaurant-black-plate-indian-spices-wooden-table-background-image_127425-18.jpg?size=626&ext=jpg" class="img-fluid rounded-start" alt="..."></img>
                                </div>
                                <div class="col-md-8">


                                    <div class="card-body d-flex justify-content-between align-content-center">
                                        <h5 class="card-title">{items.foodName}</h5>
                                        <img onClick={()=>handleRemoveItem(items.Id)} style={{ height: "30px",cursor: "pointer" }} src={cross} class="img-fluid rounded-start" alt="..."></img>

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