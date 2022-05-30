import React, { useContext, useEffect, useState } from 'react';
import swal from 'sweetalert';
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { UserContext } from '../../../App';
import SideVarNav from '../SidvarNav/SideVarNav';
import axios from 'axios';
import './addFood.css';
import DashboardContainer from '../DashboardContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faGripHorizontal, faPlus, faRulerHorizontal } from '@fortawesome/free-solid-svg-icons';
import Items from './Items';
import AddItems from './AddItems';
import AddCategory from '../ManageCategory/AddCategory';
import CategoryWithFood from './CategoryWithFood';
import { Tab, Tabs } from 'react-bootstrap';
import ManageFoodMenu from '../ManageFoodMenu/ManageFoodMenu';

const AddFood = () => {
    const [info, setInfo] = useState({});
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [imgLink, setFile] = useState(null);
    const [editableFood, setEditableFood] = useState(null)
    const [reloadCategory, setReloadCategory] = useState(false)
    const [categories, setCategories] = useState([]);
    const handleBlur = e => {
        const newInfo = { ...info };
        newInfo[e.target.name] = e.target.value;
        console.log(newInfo)
        setInfo(newInfo);
    }


    useEffect(() => {
        fetch(`https://guarded-wave-53446.herokuapp.com/category/myFoods/${loggedInUser._id}`)
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [loggedInUser, reloadCategory])
    const [show, setShow] = useState(false);
    const onSubmit = (e) => {
        const loading = toast.loading('Please wait...!');
        e.preventDefault()
        fetch('https://guarded-wave-53446.herokuapp.com/foods', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/Json'
            },
            body: JSON.stringify({
                "img": imgLink,
                "name": info.name,
                "description": info.description,
                "price": info.price,
                "category": "test",
                "userId": loggedInUser._id,
                "produceAvailable": info.produceAvailable,
                "publishStatus": info.publishStatus,
                "catererId": info.category,
                "vat": info.vat,
            })

        })
            .then(response => response.json())
            .then(data => {
                toast.dismiss(loading);
                console.log(data);
                if (!data.error) {
                    setReloadCategory(true)
                    return swal("service Added", "service has been added successful.", "success");
                }
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            })
            .catch(error => {
                toast.dismiss(loading);
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            })
    }
    const handleDelete = (event, id) => {

        const loading = toast.loading('Please wait...!');
        fetch(`https://guarded-wave-53446.herokuapp.com/foods/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                toast.dismiss(loading);
                if (result) {
                    setReloadCategory(!reloadCategory)
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
    return (
        <DashboardContainer pageTitle={"Menu"}>
            {
                <>
                    <Tabs
                        defaultActiveKey="home"
                        transition={false}
                        id="noanim-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="home" title="Add Menu">

                            <AddCategory setReloadCategory={setReloadCategory} />
                            <div className="accordion px-2" id="accordionExample">
                                {categories.length > 0 ? categories.map((categorizedFoods, index) =>
                                    <CategoryWithFood
                                        categorizedFoods={categorizedFoods}
                                        index={index}
                                        handleDelete={handleDelete}
                                        handleEdit={handleEdit}
                                        setShow={setShow}
                                    />
                                ) : null}
                            </div>
                            <AddItems
                                show={show}
                                setShow={setShow}
                                imgLink={imgLink}
                                setFile={setFile}
                                handleBlur={handleBlur}
                                onSubmit={onSubmit}
                                categories={categories}
                            />
                        </Tab>
                        <Tab eventKey="profile" title="Manage Menu">
                            <ManageFoodMenu />
                        </Tab>

                    </Tabs>



                </>
            }
        </DashboardContainer >
    );
};

export default AddFood;