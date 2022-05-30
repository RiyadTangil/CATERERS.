import React from 'react';

const Items = ({ item, handleEdit, handleDelete }) => {
 
    return (
        <div className="d-flex justify-content-between item-container align-items-center border-bottom">
            <div className="d-flex justify-content-start   align-items-center">
                <span className="d-flex flex-column  ">
                    <span className="bars"></span>
                    <span className="bars"></span>
                </span>
                <h5 className=" ms-3"> {item.foodName}</h5>
            </div>
            <div className="d-flex    align-items-center">
                {/* <button onClick={() => handleEdit(item)} className="btn btn-danger me-2 delete-btn d-none" type="button" >
                    Edit
                </button> */}
                <button onClick={(e) => handleDelete(e, item._id)} className="btn btn-warning edit-btn d-none" type="button" >
                    delete
                </button>

                <p className="bg-light my-2 p-2 rounded-1 price-btn">${item.foodPrice}</p>
            </div>


        </div>
    );
};

export default Items;