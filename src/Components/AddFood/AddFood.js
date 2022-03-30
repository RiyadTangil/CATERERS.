import React, { useContext, useEffect, useState } from 'react';
import swal from 'sweetalert';
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import SideVarNav from '../Dashboard/SidvarNav/SideVarNav';
const containerStyle = {
    backgroundColor: "#F4FDFB",
    // marginRight: "20px"
}
const AddFood = () => {
    const [info, setInfo] = useState({});
    const [file, setFile] = useState(null);
    const published = ["published", "unpublished"]
    const avaiable = ["available", "unavailable"]
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [categories, setCategories] = useState([]);
    const handleBlur = e => {
        const newInfo = { ...info };
        newInfo[e.target.name] = e.target.value;
        console.log(newInfo)
        setInfo(newInfo);
    }
    const handleFileChange = (e) => {
        const newFile = e.target.files[0];
        setFile(newFile);
    }
    useEffect(() => {
        fetch("http://localhost:5000/category")
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])
    console.log(info);
    const onSubmit = (e) => {
        const loading = toast.loading('Please wait...!');
        e.preventDefault()
        const formData = new FormData()
        // formData.append('file', file);
        // formData.append('name', info.name);
        // formData.append('img', "testing");
        // formData.append('description', info.description);
        // formData.append('price', info.price);
        // formData.append('catererId', loggedInUser.user_id);

        fetch('http://localhost:5000/foods', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/Json'
            },
            body: JSON.stringify({
                img: "Testing",
                "name": info.name,
                "description": info.description,
                "price": info.price,
                "category": info.category,
                "catererId": loggedInUser.user_id,
                "produceAvailable": info.produceAvailable,
                "publishStatus": info.publishStatus,
                "catererId": loggedInUser.user_id,
            })

        })
            .then(response => response.json())
            .then(data => {
                toast.dismiss(loading);
                console.log(data);
                if (!data.error) {
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
        <div className="row">
            <SideVarNav></SideVarNav>
            <div className="col-md-9 mt-3">
                <div style={containerStyle} className="shadow">
                    <div className=" p-3   d-flex justify-content-center flex-column">
                        <div className="row  mt-2 p-3 g-3">
                            <form onSubmit={onSubmit} >
                                <div className="row g-3 ">
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1">Food Name</label>
                                        <input type="text" name="name" onBlur={handleBlur} className="form-control" placeholder="Food Name" ></input>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1">Food img</label>
                                        <input type="file" name="img" onChange={handleFileChange} className="form-control" placeholder="Food img"></input>
                                    </div>
                                </div>
                                <div className="row mt-2 g-3">
                                    <div className="col form-group">
                                        <label htmlFor="exampleInputEmail1">Description</label>
                                        <input type="text" name="description" onBlur={handleBlur} className="form-control" placeholder="Food Description" ></input>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1">Price</label>
                                        <input type="number" onBlur={handleBlur} name="price" className="form-control" placeholder="Food Price"></input>
                                    </div>

                                </div>

                                <div className="row mt-2 g-3">
                                    <div className="col-md-6 col-12">
                                        <select onBlur={handleBlur} className="form-select form-select mb-3" name="category" aria-label=".form-select-lg example">
                                            {categories?.map((category, index) => <option key={index} value={category.categoryName}>{category.categoryName}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-md-3 col-6">
                                        <select onBlur={handleBlur} className="form-select form-select mb-3" name="publishStatus" aria-label=".form-select-lg example">
                                            {published?.map((category, index) => <option key={index} value={category}>{category}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-md-3 col-6">
                                        <select onBlur={handleBlur} className="form-select form-select mb-3" name="produceAvailable" aria-label=".form-select-lg example">
                                            {avaiable?.map((category, index) => <option key={index} value={category}>{category}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12 d-flex justify-content-end mt-2">
                                    < button type="submit" className="btn main-bg">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddFood;