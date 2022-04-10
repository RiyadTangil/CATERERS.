import React, { useContext, useEffect, useState } from 'react';

import RestaurantDetails from '../RestaurantDetails/RestaurantDetails';
const Restaurants = ({ searchText }) => {
    const [restaurants, setAllRestaurant] = useState([])
    const [searchedRestaurants, setSearchedRestaurants] = useState([])
    useEffect(() => {
        fetch("http://localhost:5000/restaurant")
            .then(res => res.json())
            .then(data => setAllRestaurant(data))
    }, [])

    useEffect(() => {
        const matchedRestaurants = restaurants.filter(restaurant => restaurant.user?.shopName.toLowerCase().includes(searchText.toLowerCase()))
        // const filteredRestaurants = restaurant?.foods?.filter(foodItem => .user?.shopName.toLowerCase().includes(searchText.toLowerCase()))
        // restaurants(filteredRestaurants)
        setSearchedRestaurants(matchedRestaurants)
        console.log(matchedRestaurants);

    }, [searchText])
    return (
        <section style={{ backgroundColor: "#E3E3E3" }} className="service-container">
            <div className="text-center pt-5">
                <h5 className="section-title">OUR SERVICES</h5>
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
                            searchText.length > 0 ?
                                searchedRestaurants?.map(restaurant => <RestaurantDetails restaurant={restaurant} key={restaurant._id}></RestaurantDetails>) :
                                restaurants?.map(restaurant => <RestaurantDetails restaurant={restaurant} key={restaurant._id}></RestaurantDetails>)
                        }
                    </div>
                }
            </div>
        </section>
    );
};

export default Restaurants;