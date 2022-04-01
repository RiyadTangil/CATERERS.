import React, { useEffect, useState } from 'react';
// import FoodCard from '../FoodCard/FoodCard';
import './OnlineOrders.css'
import Scrollspy from 'react-scrollspy'
import OrdersBox from './OrdersBox';
import { useParams } from 'react-router-dom';
const RestaurantVerticalNav = () => {

    const [foodInfos, setFoodInfo] = useState([])
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
                setFoodInfo(data)
                const category = data?.map(food => food.categoryName)
                setCategories(category)
                console.log(data)
            })
        // console.log(data)
    }, [])
    const handleClick = (activeTab) => {
        setTab(activeTab)
    }
    return (
        <div className='row'>
            <div className='d-flex justify-content-between'>
                <div className="col-md-3 d-none d-md-block border-end">
                    <Scrollspy
                        className="scrollspy sticky-custom list-unstyled" items={['section-1', 'section-2', 'section-3', 'section-4', 'section-5', 'section-6', 'section-7', 'section-8', 'section-9', 'section-10']}
                        currentClassName="isCur">
                        {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(navLink => {
                            return (<li ><a href={`#section-${navLink}`}><h5 >Most loved Combos</h5></a></li>)
                        })} */}
                        {categories?.map((category, index) => {
                            return (<li key={index + 1} onClick={() => handleClick(category)} ><a href={`#section-${index + 1}`}><h5 className={tab===category?"isCurrent":""} >{category}</h5></a></li>)
                        })}

                    </Scrollspy>
                </div>

                <div className="col-md-9 col-sm-12 ps-3">
                    {foodInfos.map((foodInfo, index) => <OrdersBox navLink={index + 1} categoryName={foodInfo.categoryName} foodInfo={foodInfo}></OrdersBox>)}
                </div>

            </div>
        </div>
    );
};

export default RestaurantVerticalNav;