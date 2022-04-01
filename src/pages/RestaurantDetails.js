import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import RestaurantInfo from '../Components/RestaurantInfo/RestaurantInfo';
import RestaurantNavbar from '../Components/RestaurantNavbar/RestaurantNavbar';
import NavBar from '../Components/Share/NavBar/NavBar';

const RestaurantDetails = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div >
            <NavBar />
            <RestaurantInfo></RestaurantInfo>
            <RestaurantNavbar></RestaurantNavbar>
        </div>
    );
};

export default RestaurantDetails;