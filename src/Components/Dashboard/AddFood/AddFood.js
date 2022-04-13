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
const containerStyle = {
    backgroundColor: "#F4FDFB",

}
const AddFood = () => {
    const [info, setInfo] = useState({});
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [imgLink, setFile] = useState(null);
    const [reloadCategory, setReloadCategory] = useState(false)
    const [categories, setCategories] = useState([]);
    const handleBlur = e => {
        const newInfo = { ...info };
        newInfo[e.target.name] = e.target.value;
        console.log(newInfo)
        setInfo(newInfo);
    }


    useEffect(() => {
        fetch(`http://localhost:5000/category/myFoods/${loggedInUser.user_id}`)
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [reloadCategory])
    const [show, setShow] = useState(false);
    const onSubmit = (e) => {
        const loading = toast.loading('Please wait...!');
        e.preventDefault()
        fetch('http://localhost:5000/foods', {
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
                "userId": loggedInUser.user_id,
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
    return (
        <DashboardContainer pageTitle={"Menu"}>
            {
                <>
                    <AddCategory setReloadCategory={setReloadCategory} />
                    <div className="accordion px-2" id="accordionExample">
                        {categories?.map((categorizedFoods, index) =>
                            <CategoryWithFood
                                categorizedFoods={categorizedFoods}
                                index={index}
                                setShow={setShow}
                            />
                        )}
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


                </>
            }
        </DashboardContainer >
    );
};

export default AddFood;