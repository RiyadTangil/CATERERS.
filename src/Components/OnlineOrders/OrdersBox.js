import React, { useContext } from 'react';
import { UserCard } from '../../App';
import FoodCard from '../FoodCard/FoodCard';

const OrdersBox = ({ navLink, categoryName, foodInfo }) => {
    const [cardItems, setCardItems] = useContext(UserCard);
    const handleCard = (food) => {
        const sameProduct = cardItems.find(pd => pd._id === food._id);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cardItems.filter(pd => pd._id !== food._id);
            newCart = [...others, sameProduct];
        }
        else {
            food.quantity = 1

            newCart = [...cardItems, food];
        }
        setCardItems(newCart);


    }
    return (
        <div id={`section-${navLink}`}>
            <h3 className="sticky-custom  text-m uted bg-white"> {categoryName} </h3>
            {foodInfo?.foods?.map((food, index) => <FoodCard key={index + 1} food={food} handleCard={handleCard}></FoodCard>)}
        </div>
    );
};

export default OrdersBox;