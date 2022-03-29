import React, { useContext, useEffect, useState } from 'react';
import FoodDetails from '../FoodDetails/FoodDetails';
import { addToDatabaseCart } from '../../../utilities/databaseManager';
import { UserCard } from '../../../App';
const Services = () => {
    const [cardItems, setCardItems] = useContext(UserCard);
    const [allFood, setAllFood] = useState([])
    useEffect(() => {
        fetch("http://localhost:5000/foods")
            .then(res => res.json())
            .then(data => setAllFood(data))
    }, [])
    const addTOLocalStorage = (id) => {
        addToDatabaseCart(id)
    }
    const handleCard = (id) => {
        const previousItems = [...cardItems, id]
        setCardItems(previousItems)

    }
    return (
        <section style={{ backgroundColor: "#E3E3E3" }} className="service-container">
            <div className="text-center pt-5">
                <h5 className="section-title">OUR SERVICES</h5>
                <h2>Services We Provide </h2>
            </div>
            <div className="d-flex justify-content-center pb-3  align-items-center">
                {allFood.length < 1 ?
                    <div className="d-flex py-5 my-5 justify-content-center">
                        <div className="spinner-border text-success" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> :
                    <div className="w-75 row mt-5 ">
                        {
                            allFood.map(food => <FoodDetails addTOLocalStorage={addTOLocalStorage} food={food} handleCard={handleCard} key={food.name}></FoodDetails>)
                        }
                    </div>
                }
            </div>
        </section>
    );
};

export default Services;