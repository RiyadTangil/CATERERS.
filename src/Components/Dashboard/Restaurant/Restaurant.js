import React from 'react';
import { useParams } from 'react-router-dom';

const Restaurant = () => {
    const {id}=useParams()
    return (
        <div>
            <h1>this is my restaurant{id}</h1>
        </div>
    );
};

export default Restaurant;