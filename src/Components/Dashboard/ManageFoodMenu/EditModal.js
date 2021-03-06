import React, { useState } from 'react';
import MangesServiceDetails from './MenuDetails';
import { Button, Modal } from 'react-bootstrap';
import swal from 'sweetalert';
import toast from 'react-hot-toast';
import axios from 'axios';
const EditModal = ({ show, setShow, editableFood }) => {
    const [info, setInfo] = useState({});
    const [imgLink, setFile] = useState(null);
    const [imgUploading, setImgUpload] = useState(false)
    const handleClose = () => {
        setShow(false);
    }
    const published = ["published", "unpublished"]
    const avaiable = ["available", "unavailable"]
    const handleBlur = e => {
        const newInfo = { ...info };
        newInfo[e.target.name] = e.target.value;
        console.log(newInfo)
        setInfo(newInfo);
    }
    const handleFileChange = (e) => {
        const newFile = e.target.files[0];
        const imageData = new FormData();
        imageData.set('key', '8ece3963cdc5195811f654de65d90034');
        imageData.append('image', newFile);
        //axios copied code form git hub search results of google
        setImgUpload(true)
        axios.post('https://api.imgbb.com/1/upload',
            imageData)
            .then(function (response) {
                setFile(response.data.data.display_url);
                setImgUpload(false)
            })
            .catch(function (error) {
                console.log(error);
                setImgUpload(false)
            });

    }
    const containerStyle = {
        backgroundColor: "#F4FDFB",
    }
    const onSubmit = (e) => {
        const loading = toast.loading('Please wait...!');
        e.preventDefault()
        fetch(`https://guarded-wave-53446.herokuapp.com/foods/${editableFood._id}`, {
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
                "produceAvailable": info.produceAvailable,
                "publishStatus": info.publishStatus,
            })

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
        setShow(false);
    }

    return (

        <Modal show={show} onHide={handleClose}>
            <Modal.Header className="border-0" closeButton>
                <Modal.Title>Update Food </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={containerStyle} className="shadow">
                    <div className=" p-3   d-flex justify-content-center flex-column">
                        <div className="row  mt-2 p-3 g-3">
                            <form onSubmit={onSubmit} >
                                <div className="row g-3 ">
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1">Food Name</label>
                                        <input type="text" name="name" onBlur={handleBlur} defaultValue={editableFood?.foodName} className="form-control" placeholder="Food Name" ></input>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1">Food img</label>
                                        <input type="file" name="img" onChange={handleFileChange} className="form-control" placeholder="Food img"></input>
                                    </div>
                                </div>
                                <div className="row mt-2 g-3">
                                    <div className="col form-group">
                                        <label htmlFor="exampleInputEmail1">Description</label>
                                        <input type="text" name="description" onBlur={handleBlur} className="form-control" defaultValue={editableFood?.foodDescription} placeholder="Food Description" ></input>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1">Price</label>
                                        <input type="number" onBlur={handleBlur} name="price" defaultValue={editableFood?.foodPrice} className="form-control" placeholder="Food Price"></input>
                                    </div>

                                </div>
                                <div className="row mt-2 g-3">

                                    <div className="col-md-6 col-6">
                                        <select onBlur={handleBlur} className="form-select form-select mb-3" name="publishStatus" aria-label=".form-select-lg example">
                                            {published?.map((category, index) => <option key={index} value={category}>{category}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-md-6 col-6">
                                        <select onBlur={handleBlur} className="form-select form-select mb-3" name="produceAvailable" aria-label=".form-select-lg example">
                                            {avaiable?.map((category, index) => <option key={index} value={category}>{category}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12 d-flex justify-content-end mt-2">
                                    {!imgUploading ?

                                        < button type="submit" className="btn main-bg">Submit</button> :

                                        <button className="btn btn-primary" type="button" disabled>
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            uploading
                                        </button>

                                    }

                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </Modal.Body>

        </Modal>

    );
};

export default EditModal;