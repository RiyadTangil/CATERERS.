import React, { useContext, useEffect, useState } from 'react';
import SideVarNav from '../SidvarNav/SideVarNav';
import swal from 'sweetalert';
import toast from 'react-hot-toast';
import EditModal from './EditModal';
import { UserContext } from '../../../App';
import MenuDetails from './MenuDetails';
import AddItems from '../AddFood/AddItems';
import DashboardContainer from '../DashboardContainer';
const ManageFoodMenu = () => {
    const [foods, setFoods] = useState([])
    const [editableFood, setEditableFood] = useState(null)
    const [show, setShow] = useState(false);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [imgLink, setFile] = useState(null);
    const [info, setInfo] = useState({});
    useEffect(() => {
        fetch(`http://localhost:5000/category/myFoods/${loggedInUser._id}`)
            .then(res => res.json())
            .then(data => setFoods(data))
    }, [loggedInUser,show])

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
    const handleEdit = (food) => {
        console.log(food)
        setShow(true)
        setFile(food?.foodImg)
        setEditableFood(food)
    }
    const handleBlur = e => {
        const newInfo = { ...info };
        newInfo[e.target.name] = e.target.value;
        console.log(newInfo)
        setInfo(newInfo);
    }
    const onSubmit = (e) => {
        const loading = toast.loading('Please wait...!');
        e.preventDefault()
        fetch(`http://localhost:5000/foods/${editableFood._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/Json'
            },
            body: JSON.stringify({
                "img": imgLink,
                "name": info.name,
                "description": info.description,
                "price": info.price,
                "category": info.category,
                "vat": info.vat,
                "produceAvailable": info.produceAvailable,
                "publishStatus": info.publishStatus,
            })

        })
            .then(response => response.json())
            .then(data => {
                toast.dismiss(loading);
                if (data) {
                    return swal("Menu Updated", "Menu has been added successful.", "success");
                }
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            })
            .catch(error => {
                toast.dismiss(loading);
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            })
        setShow(false);
    }


    return (
        // <div className="row">
        //     <SideVarNav />
        <DashboardContainer pageTitle={"Manage Caterer Menu"}>
            {
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

                        {foods.length > 0 ? foods.map((food, index) => <MenuDetails key={index + 1} foods={food} handleDelete={handleDelete} handleEdit={handleEdit} />): null}
                        <AddItems
                            show={show}
                            setShow={setShow}
                            imgLink={imgLink}
                            setFile={setFile}
                            handleBlur={handleBlur}
                            onSubmit={onSubmit}
                            categories={null}
                            editableFood={editableFood}
                        />

                    </table>
                </div>
            }
        </DashboardContainer>

        // </div>
    );
};

export default ManageFoodMenu;