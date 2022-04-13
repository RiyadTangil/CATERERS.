import React from 'react';

const Items = ({item}) => {

    return (
        <div className="d-flex justify-content-between align-items-center border-bottom">
            <div className="d-flex justify-content-start   align-items-center">
                <span className="d-flex flex-column  ">
                    <span className="bars"></span>
                    <span className="bars"></span>
                </span>
                <h5 className=" ms-3"> {item.foodName}</h5>
            </div>
            <p style={{width:"50px"}} className="bg-light my-2 p-2 rounded-1">${item.foodPrice}</p>
        </div>
    );
};

export default Items;