import React, { useEffect, useState } from 'react';
import SideVarNav from '../Dashboard/SidvarNav/SideVarNav';
import swal from 'sweetalert';
import toast from 'react-hot-toast';
import MangesServiceDetails from './MenuDetails';
import { Button, Modal } from 'react-bootstrap';
import EditModal from './EditModal';
const ManageFoodMenu = () => {
    const [foods, setFoods] = useState([])
    const[editId,setEditId] = useState(null)
    const [show, setShow] = useState(false);
    const containerStyle = {
        backgroundColor: "#F4FDFB",
        border: '1px solid red'
    }
    useEffect(() => {
        fetch("http://localhost:5000/foods")
            .then(res => res.json())
            .then(data => setFoods(data))
    }, [])

    const handleDelete = (event, id) => {
        const loading = toast.loading('Please wait...!');
        fetch(`http://localhost:5000/foods/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                toast.dismiss(loading);
                if (result) {
                    event.target.parentNode.parentNode.style.display = 'none';
                    return swal("Services deleted ", "Services deleted successfully", "success");

                }
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            })
            .catch(error => {
                toast.dismiss(loading);
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            })

    }
    const handleEdit = (id) => {
        console.log(id);
        setShow(true)
        setEditId(id)
    }
    return (
        <div className="row">
            <SideVarNav></SideVarNav>
            <div className="col-md-9 mt-5 ">  <h5 className="text-brand">All Service</h5>
                <div>
                    <table className="table table-borderless">
                        <thead >
                            <tr>
                                <th className="text-secondary text-left" scope="col">Sr No</th>
                                <th className="text-secondary" scope="col">Food Name</th>
                                <th className="text-secondary" scope="col">description</th>
                                <th className="text-secondary" scope="col">price</th>
                                <th className="text-secondary" scope="col">edit</th>
                                <th className="text-secondary" scope="col">action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foods.map((food, index) =>
                                <tr className="border shadow-sm p-2 my-3 rounded-2">
                                    <td>{index + 1}</td>
                                    <td>{food.foodName}</td>
                                    <td>{food.foodDescription}</td>
                                    <td> ${food.foodPrice}</td>
                                    <td>  <button class="btn btn-warning" onClick={() => handleEdit(food._id)} type="button" >
                                        Edit
                                    </button></td>
                                    <td onClick={(e) => handleDelete(e, food._id)} >
                                        <button class="btn btn-danger" type="button" >
                                            delete
                                        </button>
                                    </td>
                                </tr>
                            )
                            }
                        </tbody>
                    </table>
                </div>

                <EditModal show={show} editId={editId} setShow={setShow} />


            </div>
        </div>
    );
};

export default ManageFoodMenu;