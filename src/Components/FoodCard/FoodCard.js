import React from 'react';
import foodImg from '../../images/food-img.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCommentDots, faShare, faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const FoodCard = ({ food, handleCard }) => {
    return (
        <div>
            <div class="card mb-3" style={{ maxwidth: "540px" }}>
                <div class="row g-0">
                    <div class="col-md-3">
                        <img src={food.foodImg || foodImg} class="img-fluid rounded" alt="..."></img>
                    </div>
                    <div class="col-md-9">
                        <div class="card-body">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h6 class="card-title">{food.foodName}</h6>
                                    <p class="card-text"> <span className="text-warning" > <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} /></span><small class="text-muted">{"117"} votes</small></p>
                                    <strong class="card-text text-muted">$ {food.foodPrice}</strong>

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
        </div>
    );
};

export default FoodCard;