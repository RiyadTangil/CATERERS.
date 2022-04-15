import React from 'react';
import foodImg from '../../images/food-img.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCommentDots, faShare, faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import "./foodCard.css";
const FoodCard = ({ food, handleCard }) => {

    return (
        <div>
            <div className=" shadow food-card-container mb-3" >
                <div className="row g-0">
                    <div className="col-md-3">
                        <img src={food?.foodImg || foodImg} className="img-fluid rounded" alt="..."></img>
                    </div>
                    <div className="col-md-9">

                        <div className="d-flex justify-content-between">
                            <div>
                                <h6 className="card-title">{food?.foodName}</h6>
                                <p className="card-text"> <span className="text-warning" > <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} /></span><small className="text-muted">{"117"} votes</small></p>
                                <strong className="card-text text-muted">$ {food?.foodPrice}</strong>

                            </div>
                            <div>
                                <div >
                                    <button onClick={() => handleCard(food)} className="btn primary-btn">
                                        add <span>+</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;