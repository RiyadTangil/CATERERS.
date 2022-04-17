import React, { useContext, useEffect, useState } from 'react';
import "./restaurant.css"
import Form from "react-bootstrap/Form";
import RestaurantCard from '../RestaurantCard/RestaurantCard';
const Restaurants = ({ searchText }) => {
    const [restaurants, setAllRestaurant] = useState([])
    const [searchedRestaurants, setSearchedRestaurants] = useState([])
    const [toggleHeart, setToggleHeart] = useState(false)
    const radioValue = ["Picked for you (default)", "Highest Rated", "Most Reviewed", "Most Recent"];
    const uberEat = ["Deals", "Best overall"];
    const dollars = ["$", "$$ ", "$$$", "$$$$"];
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
        <section className="restaurant-container pt-5">
            {restaurants.length < 1 ?
                <div className="d-flex py-5 my-5 justify-content-center">
                    <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div> :
                < >

                    <div className="row g-2 mt-6 pt-5">
                        <div className="col-md-3 bg-light sidebar-container ">
                            <ul className="sidebar-container px-3 ">
                                <li className="address">“1237 Aird St”
                                    200+ results for "1237 Aird St"</li>
                                <li className="text-decoration-underline">Clear All</li>

                                <div className="accordion" id="accordionPanelsStayOpenExample">
                                    <div className="accordion-item border-0">
                                        <h2 className="accordion-header my-from" id="panelsStayOpen-headingOne">
                                            <button className="accordion-button  my-from" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                                Sort
                                            </button>
                                        </h2>
                                        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                                            <div className="accordion-body ">
                                                <Form>
                                                    {radioValue.map((type, index) => (
                                                        <div key={`inline-${index}`} className="mb-3">
                                                            <Form.Check
                                                                inline
                                                                label={type}
                                                                checked
                                                                name="group1"
                                                                type={"radio"}
                                                                id={`inline-${index}`}
                                                            />


                                                        </div>
                                                    ))}
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item border-0">
                                        <h2 className="accordion-header my-from" id="panelsStayOpen-headingTwo">
                                            <button className="accordion-button collapsed my-from" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                            From Uranium
                                            </button>
                                        </h2>
                                        <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                                            <div className="accordion-body">
                                                <Form>
                                                    {uberEat.map((type, index) => (
                                                        <div key={`inline-${index}`} className="mb-3">
                                                            <Form.Check
                                                                inline
                                                                label={type}

                                                                name="group1"
                                                                type={"switch"}
                                                                id={`inline-${index}`}
                                                            />


                                                        </div>
                                                    ))}
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item border-0">
                                        <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                                            <button className="accordion-button my-from collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                                Price Range
                                            </button>
                                        </h2>
                                        <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                                            <div className=" mt-3 row">
                                                {dollars.map((dollar, index) => <p className="col-md-3 text-center circle-rounded  bg-light">{dollar}</p>)}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ul>


                        </div>
                        <div className="col-md-9 ">
                            <div className="row g-2 ms-2">
                                {
                                    searchText.length > 0 ?
                                        searchedRestaurants?.map((restaurant, index) => <RestaurantCard restaurant={restaurant} toggleHeart={toggleHeart} setToggleHeart={setToggleHeart} index={index + 1} key={restaurant._id}></RestaurantCard>) :
                                        restaurants?.map((restaurant, index) => <RestaurantCard restaurant={restaurant} toggleHeart={toggleHeart} setToggleHeart={setToggleHeart} index={index + 1} key={restaurant._id}></RestaurantCard>)
                                }
                            </div>
                        </div>
                    </div>
                </>
            }

        </section>
    );
};

export default Restaurants;