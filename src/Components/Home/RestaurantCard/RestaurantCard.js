import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './restaurantCard.css'
import food from '../../../images/food-img.jpg'
import heart from '../../../images/heart-solid.svg'
import heartLess from '../../../images/heart-regular.svg'
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
const RestaurantCard = ({ restaurant, handleCard, index }) => {
    let history = useHistory();
    const [toggleHeart, setToggleHeart] = useState(1)
    // const handleRoute = (e, id) => {
    //     if (e.target.id !== "heart") {
    //         console.log(id);
    //         history.push(`/restaurant/${id}`)
    //     }
    // }
    // const endDate = new Date(restaurant.date);
    // console.log(endDate,restaurant?.user?.shopName)
    return (

        <div className="col-md-4 p-1 col-sm-6 position-relative">
            <div
                onClick={() => history.push(`/restaurant/${restaurant.user._id}`)}
                className="card rest-card" >
                <div className="card ">
                    <img src={restaurant?.user?.shopImg || food} className="card-img-top" alt="..."></img>
                    <div className="card-body  pb-0">
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className="card-text   text-capitalize">{restaurant?.user?.shopName}</h5>
                            <h6 className="card-text  p-2 bg-light rounded-circle "> {restaurant.user?.rating}</h6>
                        </div>
                        <img onClick={(e) => setToggleHeart(toggleHeart + 1)} src={toggleHeart % 2 == 0 ? heart : heartLess} style={{ height: "18px" }} className="img-fluid heart position-absolute top-0 end-0 mt-2 me-2" alt="..."></img>
                        <p className="text-muted"> <FontAwesomeIcon className="text-success" icon={faTicketAlt} /> $0.99 Delivery Fee • 20–30 min</p>

                    </div>
                </div>
            </div>

        </div >
    );
};

export default RestaurantCard;
{/* <img style={{ height: '200px' }} src={restaurant?.user?.shopImg || food} className="card-img-top" alt="..."></img>
<div className="card-body">
    <h4 className="card-text fw-bold text-warning text-capitalize">{restaurant?.user?.shopName}</h4>

    <h6 className="card-text fw-bold text-capitalize  text-success"> Contact {restaurant?.user?.shopPhone || "Caterer Name"}</h6>

    <h6 className="card-text fw-bold text-warning"> {"Rating -4.8"}</h6>
</div> */}