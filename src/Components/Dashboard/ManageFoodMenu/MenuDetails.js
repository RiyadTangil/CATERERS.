import React from 'react';
const MenuDetails = ({ foods, handleDelete, handleEdit }) => {
    return (
        <tbody>
            {foods?.foods?.map((food, index) =>
                <tr className="border shadow-sm p-2 my-3 rounded-2" key={index + 1}>
                    <td>{index + 1}</td>
                    <td> <img src={food.foodImg} style={{ height: "60px" }} alt="..."></img></td>
                    <td>{food.foodName}</td>
                    <td> ${food.foodPrice}</td>
                    <td>  <button className="btn btn-warning" onClick={() => handleEdit(food)} type="button" >
                        Edit
                    </button></td>
                    <td onClick={(e) => handleDelete(e, food._id)} >
                        <button className="btn btn-danger" type="button" >
                            delete
                        </button>
                    </td>
                </tr>
            )
            }
        </tbody>
    );
};

export default MenuDetails;