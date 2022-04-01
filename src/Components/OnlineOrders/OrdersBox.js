import React from 'react';
import FoodCard from '../FoodCard/FoodCard';

const OrdersBox = ({ navLink,categoryName, foodInfo }) => {
    return (
        <div id={`section-${navLink}`}>
            <h3 className="sticky-custom  text-m uted bg-white"> {categoryName} </h3>
            {foodInfo?.foods?.map((food, index) => <FoodCard key={index + 1} food={food}></FoodCard>)}
        </div>
    );
};

export default OrdersBox;