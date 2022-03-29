import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext, UserOrder } from '../../../App';
import './foodDetails.css'

const FoodDetails = ({ food, handleCard }) => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        fetch('https://morning-thicket-61908.herokuapp.com/isAdmin', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => setIsAdmin(data));

    }, [])


    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [order, setOrder] = useContext(UserOrder)

    return (

        <div className="col-md-4 col-sm-6">
            <div class="card" >
                <img style={{ height: '200px' }} src="https://img.freepik.com/free-photo/concept-indian-cuisine-baked-chicken-wings-legs-honey-mustard-sauce-serving-dishes-restaurant-black-plate-indian-spices-wooden-table-background-image_127425-18.jpg?size=626&ext=jpg" class="card-img-top" alt="..."></img>
                <div class="card-body">
                    <h4 class="card-text fw-bold text-warning text-capitalize">{food.foodName}</h4>
                    <div class="d-flex justify-content-between">
                        <h6 class="card-text fw-bold text-capitalize ">{food.category}</h6>
                        <h6 class="card-text fw-bold text-warning">{4.89}</h6>
                    </div>
                    <div className="py-2 ">
                        <button onClick={() => handleCard(food)} className="btn  submitButton">
                            <span className="card-btn ">  Add to card</span>
                            <div className="SubmitButton__horizontal"></div>
                            <div className="submitButton__vertical"></div>
                        </button>
                       
                    </div>
                </div>
            </div>
        
        </div >
    );
};

export default FoodDetails;