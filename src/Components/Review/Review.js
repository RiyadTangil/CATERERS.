import React from 'react';
import './Review.css'
import ReviewCard from './ReviewCard';

const Review = (props) => {
    return (
        <div>
            <div className="row">
                {/* <div className="col-md-8"> */}
                    <h5 className="py-3">Gopal Mistanna Bhandar Reviews</h5>
               

                        <div className=" d-flex align-items-center justify-content-between">
                           <div className="mx-2">
                                <select className="form-select " id="floatingSelectGrid" aria-label="Floating label select example">
                                    <option selected value="1"> All Reviews </option>
                                    <option value="2">Popular</option>
                                    <option value="3">Bloggers</option>
                                    <option value="4">My Reviews</option>
                                    <option value="5">Followings</option>
                                 

                                </select>
                            </div>
                            <div className="mx-2">
                                <select className="form-select" id="floatingSelectGrid" aria-label="Floating label select example">
                                    <option selected value="1">News First</option>
                                    <option value="2">Oldest First</option>
                                    <option value="3">Height Rated</option>
                                    <option value="4">Lowest Rated</option>
                                </select>
                            </div>

                        </div>

                    {[1, 2, 3, 4, 5, 6,].map(review => <ReviewCard></ReviewCard>)}
                </div>
                <div className="col-md-4"></div>
            {/* </div> */}

        </div>
    );
};

export default Review;