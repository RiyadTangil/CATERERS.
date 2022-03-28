import React, { useState } from 'react';
import swal from 'sweetalert';
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";
import SideVarNav from '../Dashboard/SidvarNav/SideVarNav';
const containerStyle = {
    backgroundColor: "#F4FDFB",
    border: '1px solid red'
}
const AddService = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [info, setInfo] = useState({});
    const [file, setFile] = useState(null);
    const handleBlur = e => {
        const newInfo = { ...info };
        newInfo[e.target.name] = e.target.value;
        setInfo(newInfo);
    }
    const handleFileChange = (e) => {
        const newFile = e.target.files[0];

        setFile(newFile);
    }
    const onSubmit = (e) => {
        const loading = toast.loading('Please wait...!');
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', file);
        formData.append('name', info.name);
        formData.append('description', info.description);
        formData.append('price', info.price);
        fetch('https://morning-thicket-61908.herokuapp.com/addService', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                toast.dismiss(loading);
                if (data) {
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
            <div className="col-md-9 mt-5">
                <div style={{ backgroundColor: "#F4FDFB", marginRight: "20px" }}>
                    <div className="shadow p-5   d-flex justify-content-center flex-column">

                        <div className="row mt-2 g-3">
                            <div className="col-6 form-group">

                                <select class="form-select form-select mb-3" aria-label=".form-select-lg example">
                                    <option selected>See all  Category</option>
                                    <option value="1">Category   One</option>
                                    <option value="2"> Category Two</option>
                                    <option value="3"> Category Three</option>


                                </select>
                            </div>
                            <div className="col-6">
                                <div className="d-flex justify-content-around align-items-center">
                                    <div>

                                        <input type="text" name="description" onBlur={handleBlur} className="form-control" placeholder="Add Category Name" ></input>
                                    </div>
                                    <div>
                                        < button type="submit" className="btn main-bg">Add Category</button>
                                    </div>

                                </div>
                            </div>

                        </div>
                        {/* <div className="d-flex justify-content-between mb-2">
                            < button type="submit" className="btn main-bg">Add Category</button>
                            < button type="submit" className="btn main-bg">Add Category</button>
                        </div> */}
                        <form onSubmit={onSubmit}>
                            <div className="row g-3">
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
                                    <select class="form-select form-select mb-3" aria-label=".form-select-lg example">
                                        <option selected>select one Category</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>


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
    );
};

export default AddService;