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
                        <button onClick={() => handleCard(food._id)} className="btn  submitButton">
                            <span className="card-btn ">  Add to card</span>
                            <div className="SubmitButton__horizontal"></div>
                            <div className="submitButton__vertical"></div>
                        </button>
                       
                    </div>
                </div>
            </div>
            {/* <div style={{ paddingBottom: "80px" }}>
                <div >
                    <div >
                        <div style={{ backgroundColor: "white", borderRadius: "10px", height: "370px" }} className=" text-center  shadow p-4">
                            <img style={{ height: '50px' }} src={`data:image/png;base64,${food.image.img}`} alt="" />
                            <img style={{ height: '200px' }} className="img-fluid" src="https://img.freepik.com/free-photo/concept-indian-cuisine-baked-chicken-wings-legs-honey-mustard-sauce-serving-dishes-restaurant-black-plate-indian-spices-wooden-table-background-image_127425-18.jpg?size=626&ext=jpg" alt="" />
                            <h6 className="my-2 ">{food.name}</h6>
                            <h6 className="my-2">${food.price}</h6>

                            <p className="text-secondary">Lorem ipsum dolor Lorem, i</p>
                            <button onClick={() => handleCard(food._id)} className="btn text-light submitButton">
                                <span className="text-black">  Buy now</span>
                                <div className="SubmitButton__horizontal"></div>
                                <div className="submitButton__vertical"></div>
                            </button>
                        </div>
                    </div >

                </div >
            </div > */}
        </div >
    );
};

export default FoodDetails;