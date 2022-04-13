import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import RestaurantInfo from '../Components/RestaurantInfo/RestaurantInfo';
import RestaurantNavbar from '../Components/RestaurantNavbar/RestaurantNavbar';
import NavBar from '../Components/Share/NavBar/NavBar';

const RestaurantDetails = () => {
    const [searchText, setSearchResult] = useState("");
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div >
            <NavBar setSearchResult={setSearchResult}/>
            <RestaurantInfo setSearchResult={setSearchResult}></RestaurantInfo>
            <RestaurantNavbar searchText={searchText}></RestaurantNavbar>
        </div>
    );
};

export default RestaurantDetails;