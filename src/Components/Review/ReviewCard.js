import React from 'react';
import avatar from '../../images/santanu.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCommentDots, faShare, faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
const ReviewCard = (props) => {
    return (
        <div>
             <div className="card">
                        <div className=" p-2 d-flex  justify-content-between">

                            <div className="d-flex align-items-center ">
                                <div className="avatar d-flex justify-content-center align-items-center">
                                    <img src={avatar} alt="Avatar" className="img-fluid "></img>
                                </div>
                                <div className='d-flex flex-column    px-2'>
                                    <strong className="fw-normal text-capitalize">auditi som</strong>
                                    <small className="text-muted p-0 m-0">{"2"} reviews  <span>{"2"} follows</span></small>
                                </div>
                            </div>
                            <div>
                                <button type="button" className=" btn-sm btn primary-btn">Follow</button>

                            </div>

                        </div>
                        <div className="card-body pt-0 mt-0">
                            <div className="d-flex justify-content-start align-items-center">
                                
                            </div>
                            <div className="d-flex justify-content-start">
                            <p className={`card-title  p-1 ${props? "primary-bg": "bg-success"} text-white rounded-3`}> {"3"} <span > <FontAwesomeIcon className=" review-star " icon={faStar} /></span> </p>
                            <p className="card-title text-muted px-3">Delivered  </p>
                            <p className="card-title text-muted"> <small  className="text-muted " >{"yesterday"}</small></p>
                            </div>
                           
                            <div className="text-muted">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque nulla placeat est dolorem, accusantium illum! Quam quos cupiditate optio voluptate.</p>
                            </div>
                            <small className="text-muted fw-light  d-block">{"0"} Votes for helpful, {"0"} Comments</small>
                            <div className="d-flex justify-content-start pt-2">
                            <button className=" text-muted btn">  <span  className="text-muted px-1"> <FontAwesomeIcon  icon={faThumbsUp} /></span>Helpful </button>
                            <button className=" text-muted btn px-4">  <span className="text-muted px-1"> <FontAwesomeIcon  icon={faCommentDots} /></span> Comment </button>
                            <button className=" text-muted btn">  <span className="text-muted px-1" > <FontAwesomeIcon  icon={faShare} /></span> Share</button>
                            </div>
                        </div>
   
                    </div>
               
        </div>
    );
};

export default ReviewCard;