import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './foodDetails.css'
import food from '../../../images/food-img.jpg'
import { useHistory } from 'react-router-dom';
const FoodDetails = ({ restaurant, handleCard }) => {
    let history = useHistory();
    console.log(restaurant)
    return (
        <div className="col-md-4 col-sm-6">
            <div onClick={() => history.push(`/restaurant/${restaurant.user._id}`)} className="card rest-card" >
                <img style={{ height: '200px' }} src={restaurant.foodImg || food} className="card-img-top" alt="..."></img>
                <div className="card-body">
                    <h4 className="card-text fw-bold text-warning text-capitalize">{restaurant?.user?.shopName}</h4>
 
                        <h6 className="card-text fw-bold text-capitalize  text-success"> Contact {restaurant?.user?.shopPhone||"Caterer Name"}</h6>

                        <h6 className="card-text fw-bold text-warning"> {"Rating -4.8"}</h6>
               
                    {/* <div className="py-2 ">
                        <button onClick={() => handleCard(restaurant)} className="btn  submitButton">
                            <span className="card-btn ">  Add to card</span>
                            <div className="SubmitButton__horizontal"></div>
                            <div className="submitButton__vertical"></div>
                        </button>
                    </div> */}
                </div>
            </div>

        </div >
    );
};

export default FoodDetails;