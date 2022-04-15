import React, { useContext, useEffect, useState } from 'react';
// import FoodCard from '../FoodCard/FoodCard';
import './OnlineOrders.css'
import Scrollspy from 'react-scrollspy'
import OrdersBox from './OrdersBox';
import { useParams } from 'react-router-dom';

import { ChatContext } from '../../App';
import SupportEngine from '../SupportEngine';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
const RestaurantVerticalNav = ({ searchText }) => {
    const [chatId, setChatId] = useContext(ChatContext);
    const [foodInfos, setFoodInfo] = useState([])
    const [searchFood, setSearchFood] = useState([])
    const [categories, setCategories] = useState([])
    const [tab, setTab] = useState(categories[0])
    const { id } = useParams();
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(getRestaurantList());
    // }, [dispatch]);


    useEffect(() => {
        fetch(`http://localhost:5000/category/foodByCategory/${id}`)
            .then(res => res.json())
            .then(data => {
                setFoodInfo(data?.data)
                console.log(data?.user);
                const category = data?.data?.map(food => food.categoryName)
                setCategories(category)
                const newChatId = {
                    privetId: data?.user?.privetId,
                    projectId: data?.user?.projectId
                };
                setChatId(newChatId)

            })

    }, [])
    const handleClick = (activeTab) => {
        setTab(activeTab)
    }
    useEffect(() => {
        const newArray = []
        foodInfos?.map(foodList => {
            foodList?.foods?.filter(foodItem => {
                if (foodItem?.foodName.toLowerCase().includes(searchText)) {
                    newArray.push(foodItem)
                }
            })
        })
        setSearchFood(newArray)
    }, [searchText])
    return (
        <div className='row  ' >
            <div className='d-flex   '>
                <div className="col-md-3 bg-light d-none mt-5 d-md-block border-end ">
                    <Scrollspy
                        className="scrollspy sticky-custom list-unstyled" items={['section-1', 'section-2', 'section-3', 'section-4', 'section-5', 'section-6', 'section-7', 'section-8', 'section-9', 'section-10']}
                        currentClassName="isCur">

                        {categories?.map((category, index) => {
                            return (<li
                                key={index + 1}
                                onClick={() => handleClick(category)}
                            >
                                <a href={`#section-${index + 1}`}>
                                    <h5
                                        className={tab === category ? "isCurrent" : ""}
                                    >{category}
                                    </h5>
                                </a>
                            </li>
                            )
                        })}

                    </Scrollspy>
                </div>
                {
                    chatId.privetId &&
                    <div className="support">
                        <SupportEngine />
                    </div>
                }

                <div className="col-md-6 col-sm-12  ">
                    {searchFood.length > 0 ?
                        <OrdersBox searchFood={searchFood} /> : foodInfos.map((foodInfo, index) =>
                            <OrdersBox
                                key={index + 1}
                                navLink={index + 1}
                                categoryName={foodInfo.categoryName}
                                foodInfo={foodInfo}
                            ></OrdersBox>)}
                </div>
                <div className="col-md-3 col-sm-12   ">
                    <div className="order-card">
                        <h5 className="p-3 fw-bold">Your Order</h5>
                        <p className="delivery-car d-flex  justify-content-center"> <FontAwesomeIcon className="fs-4 me-2" icon={faCar} /> deliver is now free</p>
                        <div className="d-flex p-3 justify-content-between">
                            <p>  Food & Beverage Subtotal</p>
                            <p>  $18.00</p>
                        </div>
                        <p className="text-center checkout">  Checkout  </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RestaurantVerticalNav;