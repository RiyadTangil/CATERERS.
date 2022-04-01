import React, { useContext, useEffect, useState } from 'react';
import FoodDetails from '../FoodDetails/FoodDetails';
import { addToDatabaseCart } from '../../../utilities/databaseManager';
import { UserCard } from '../../../App';
const Foods = () => {
    const [cardItems, setCardItems] = useContext(UserCard);
    const [restaurants, setAllRestaurant] = useState([])
    useEffect(() => {
        fetch("http://localhost:5000/restaurant")
            .then(res => res.json())
            .then(data => setAllRestaurant(data))
    }, [])
 

    return (
        <section style={{ backgroundColor: "#E3E3E3" }} className="service-container">
            <div className="text-center pt-5">
                <h5 className="section-title">OUR SERVICES</h5>
                <h2>Services We Provide </h2>
            </div>
            <div className="d-flex justify-content-center pb-3  align-items-center">
                {restaurants.length < 1 ?
                    <div className="d-flex py-5 my-5 justify-content-center">
                        <div className="spinner-border text-success" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> :
                    <div className="w-75 row mt-5 g-2 ">
                        {
                            restaurants?.map(restaurant => <FoodDetails  restaurant={restaurant}  key={restaurant._id}></FoodDetails>)
                        }
                    </div>
                }
            </div>
        </section>
    );
};

export default Foods;