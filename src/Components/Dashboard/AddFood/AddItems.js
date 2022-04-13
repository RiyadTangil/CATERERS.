import axios from 'axios';
import React, { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import previewImg from '../../../images/previewimg.jpg';
const AddItems = ({ imgLink, setFile, show, setShow, handleBlur, onSubmit, categories, editableFood }) => {
    const [loggedInUser, setLoggedInUser] = React.useState(null);
    const published = ["published", "unpublished"]
    const avaiable = ["available", "unavailable"]

    const [imgUploading, setImgUpload] = useState(false)
    const handleFileChange = (e) => {
        setFile(null)
        setImgUpload(true)
        const newFile = e.target.files[0];
        const imageData = new FormData();
        imageData.set('key', '8ece3963cdc5195811f654de65d90034');
        imageData.append('image', newFile);
        //axios copied code form git hub search results of google
     
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

    return (
        <div>
            {/* <Button variant="primary" onClick={() => setShow(false)}>
                Launch
            </Button> */}

            <Offcanvas placement={'end'} show={show} onHide={() => setShow(false)}>
                <Offcanvas.Header closeButton>

                    <Offcanvas.Title>{categories ? "Add Item" : "Update Item"}</Offcanvas.Title>


                </Offcanvas.Header>
                <Offcanvas.Body>
                    <form onSubmit={onSubmit}>
                        <div className="border-bottom  px-4 pb-3 row g-3">
                            <div >
                                <label htmlFor="exampleInputEmail1">Food Name </label>
                                <input type="text" defaultValue={editableFood?.foodName} name="name" onBlur={handleBlur} className="form-control  my-from" placeholder="Food Name" ></input>
                            </div>
                            <div >
                                <label htmlFor="inputEmail4" className="form-label">description</label>
                                <textarea type="text" defaultValue={editableFood?.foodDescription} name="description" className="form-control my-from" rows="3" placeholder="Food Description" onBlur={handleBlur} id=""></textarea>
                            </div>
                            <div className="form-check pt-2">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Sold out
                                </label>
                            </div >
                        </div>
                        <div className=" pt-3">
                            {categories?.length > 0 && categories ?
                                <select onBlur={handleBlur} className="form-select form-select my-form-select  mb-3" name="category" aria-label=".form-select-lg example">
                                    {categories?.map((category, index) =>
                                        <option key={index} value={category._id}>{category.categoryName}
                                        </option>)}
                                </select>
                                : null}
                        </div>
                        <div className="row gy-3" >
                            <div className="col-md-6" >
                                <select onBlur={handleBlur} className="form-select form-select my-form-select  mb-3" name="publishStatus" aria-label=".form-select-lg example">
                                    {published?.map((publishStatus, index) =>
                                        <option key={index} value={publishStatus}>{publishStatus}
                                        </option>)}
                                </select>
                            </div>
                            <div className="col-md-6" >
                                <select onBlur={handleBlur} className="form-select form-select my-form-select  mb-3" name="produceAvailable" aria-label=".form-select-lg example">
                                    {avaiable?.map((availableStatus, index) =>
                                        <option key={index} value={availableStatus}>{availableStatus}
                                        </option>)}
                                </select>
                            </div>
                            <div className="col-md-6" >
                                <label htmlFor="exampleInputEmail1">Price</label>
                                <input type="number" defaultValue={editableFood?.foodPrice} onBlur={handleBlur} name="price" className="form-control my-from" placeholder="Food Price"></input>
                            </div>
                            <div className="col-md-6" >
                                <label htmlFor="inputEmail4" className="form-label">Vat %</label>
                                <input type="number" defaultValue={editableFood?.vat} onBlur={handleBlur} name="vat" className="form-control my-from" placeholder="Vat"></input>

                            </div>
                            <div className="col-md-6" >
                                <label htmlFor="inputEmail4" className="form-label">preview</label>
                                <img src={imgLink ? imgLink : editableFood?.foodImg ? editableFood?.foodImg : previewImg} className="img-thumbnail" alt="..."></img>
                            </div>
                            <div className="col-md-6 pt-5" >
                                <label htmlFor="inputEmail4" className="form-label">Select img</label>
                                {editableFood?.foodImg ?
                                    <input type="file" onChange={handleFileChange} className="form-control " aria-label="file example" ></input> :
                                    <input type="file" onChange={handleFileChange} className="form-control " aria-label="file example" required></input>

                                }
                            </div>
                        </div>

                        <div className="d-flex justify-content-end">
                            {imgLink ?

                                < button type="submit" className="btn main-bg">Submit</button> :

                                    imgLink === null && imgUploading ?
                                        <button className="btn btn-primary" type="button" disabled>
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            uploading
                                        </button> :
                                        < button className="btn main-bg" disabled>Submit</button>
                            }
                        </div>

                        <div className="col-md-12">
                            {/* <img src={shop} className="img-thumbnail" alt="..."></img> */}
                        </div>
                    </form>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default AddItems;