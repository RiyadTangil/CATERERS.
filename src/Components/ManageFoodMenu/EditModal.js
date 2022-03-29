import React, { useState } from 'react';
import MangesServiceDetails from './MenuDetails';
import { Button, Modal } from 'react-bootstrap';
import swal from 'sweetalert';
import toast from 'react-hot-toast';
const EditModal = ({ show, setShow,editId }) => {
    const [info, setInfo] = useState({});
    const [file, setFile] = useState(null);
    const handleClose = () => {
        setShow(false);
    }
    const handleEdit = (id) => {
        console.log(id);

    }
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
    const containerStyle = {
        backgroundColor: "#F4FDFB",
    }
    console.log(info.name);
    const onSubmit = (e) => {
        const loading = toast.loading('Please wait...!');
        e.preventDefault()
        fetch(`http://localhost:5000/foods/${editId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/Json'
            },
            body: JSON.stringify({
                "img": "Testing",
                "name": info.name,
                "description": info.description,
                "price": info.price,
                "category": info.category,
            })

        })
            .then(response => response.json())
            .then(data => {
                toast.dismiss(loading);
                console.log(data);
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
                                        <input type="text" name="category" onBlur={handleBlur} className="form-control" placeholder="Food Description" ></input>
                                    </div>
                                   

                                </div>
                                <div className="col-12 d-flex justify-content-end mt-2">
                                    < button type="submit" className="btn main-bg">Submit</button>
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