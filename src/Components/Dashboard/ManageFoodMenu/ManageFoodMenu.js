import React, { useContext, useEffect, useState } from 'react';
import SideVarNav from '../SidvarNav/SideVarNav';
import swal from 'sweetalert';
import toast from 'react-hot-toast';
import EditModal from './EditModal';
import { UserContext } from '../../../App';
import MenuDetails from './MenuDetails';
const ManageFoodMenu = () => {
    const [foods, setFoods] = useState([])
    const [editId, setEditId] = useState(null)
    const [show, setShow] = useState(false);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    useEffect(() => {
        fetch(`http://localhost:5000/category/foodByCategory/${loggedInUser.user_id}`)
            .then(res => res.json())
            .then(data => setFoods(data))
    }, [show])

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
        setShow(true)
        setEditId(id)
    }


    return (
        <div className="row">
            <SideVarNav />
            <div className="col-md-9 mt-5 ">  <h5 className="text-brand">All Service</h5>
                <div>
                    <table className="table table-borderless">
                        <thead >
                            <tr>
                                <th className="text-secondary text-left" scope="col">Sr No</th>
                                <th className="text-secondary" scope="col">Food Img</th>
                                <th className="text-secondary" scope="col">Food Name</th>

                                <th className="text-secondary" scope="col">price</th>
                                <th className="text-secondary" scope="col">edit</th>
                                <th className="text-secondary" scope="col">action</th>
                            </tr>
                        </thead>

                {foods?.map((food, index) => <MenuDetails key={index + 1} foods={food} handleDelete={handleDelete} handleEdit={handleEdit} />)}
                <EditModal show={show} editId={editId} setShow={setShow} />

                    </table>
                </div>

            </div>
        </div>
    );
};

export default ManageFoodMenu;