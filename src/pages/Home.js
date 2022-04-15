import React, { useState } from 'react';
import Header from '../Components/Home/Header/Header';
import Restaurants from '../Components/Home/Restaurants/Restaurants';
import Footer from '../Components/Share/Footer/Footer/Footer';
import NavBar from '../Components/Share/NavBar/NavBar';
const Home = () => {
    const [searchText, setSearchResult] = useState("");
    return (
        <>
            <NavBar setSearchResult={setSearchResult} />
            {/* <Header /> */}
            <Restaurants searchText={searchText} />
            <Footer />
        </>
    );
};

export default Home;