import axios from 'axios';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../../App';
import man from "../../../images/man.png"
import swal from 'sweetalert';
import toast from 'react-hot-toast';
import shop from "../../../images/retail-top-img.jpg"
import DashboardContainer from '../DashboardContainer';
import './profile.css'
const Profile = () => {
    const [info, setInfo] = useState({});
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [imgUploading, setImgUpload] = useState(false)
    const [imgLink, setFile] = useState(false)
    console.log(loggedInUser);
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
    const handleBlur = e => {
        const newInfo = { ...info };
        newInfo[e.target.name] = e.target.value;
        console.log(newInfo)
        setInfo(newInfo);
    }
    console.log(info, imgLink)
    const onSubmit = (e) => {
        const loading = toast.loading('Please wait...!');
        e.preventDefault()
        fetch(`http://localhost:5000/user2/${loggedInUser.user_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/Json'
            },
            body: JSON.stringify({

                "name": info.name,
                "address": info.address,
                "phoneNo": info.phoneNo,
                "email": info.email,
                "shopName": info.shopName,
                "shopPhone": info.shopPhone,
                "projectId": info.projectId,
                "privetId": info.privetId,
                "shopImg": imgLink,
            })

        })
            .then(response => response.json())
            .then(data => {
                toast.dismiss(loading);
                if (data) {
                    return swal("User Updated", "User has been added successful.", "success");
                }
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            })
            .catch(error => {
                toast.dismiss(loading);
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            })

    }

    return (
        <DashboardContainer pageTitle={"Profile"}>
            {
                <>
                    <div className="px-4">
                        <div className="d-flex justify-content-end pe-3">
                            <button onClick={onSubmit} className="btn main-bg">Save   </button>
                        </div>
                        <div style={{ borderRadius: "50%" }} className="text-center ">
                            <img style={{ width: "150px", borderRadius: "50%" }} src={loggedInUser.img || man} className="   card-img-top" alt="..."></img>
                        </div>
                        <form >
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label for="inputEmail4" className="form-label">Name</label>
                                    <input type="text" name="name" onBlur={handleBlur} defaultValue={loggedInUser?.name} className="form-control my-from " id=""></input>
                                </div>

                                <div className="col-md-6">
                                    <label for="inputEmail4" className="form-label">Address</label>
                                    <input type="text" name="address" onBlur={handleBlur} className="form-control my-from" defaultValue={loggedInUser?.address} id=""></input>
                                </div>
                                <div className="col-md-6">
                                    <label for="inputEmail4" className="form-label">Email</label>
                                    <input type="text" name="email" onBlur={handleBlur} defaultValue={loggedInUser?.email} className="form-control my-from" id=""></input>
                                </div>

                                <div className="col-md-6">
                                    <label for="inputEmail4" className="form-label">Phone number</label>
                                    <input type="text" name="phoneNo" onBlur={handleBlur} className="form-control my-from" defaultValue={loggedInUser?.phoneNo} id=""></input>
                                </div>


                                {loggedInUser?.typeOfPerson == "caterer" ?
                                    <>
                                        <div className="accordion" id="accordionExample">

                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingTwo">
                                                    <button className="accordion-button collapsed  profile-accordion" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                        Caterer Info
                                                    </button>
                                                </h2>
                                                <div id="collapseTwo" className="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">
                                                        <div className="row gy-3">
                                                            <div className="col-md-6">
                                                                <label for="inputEmail4" className="form-label">Shop name</label>
                                                                <input type="text" name="shopName" onBlur={handleBlur} defaultValue={loggedInUser?.shopName} className="form-control my-from" id=""></input>

                                                            </div>
                                                            <div className="col-md-6">
                                                                <label for="inputEmail4" className="form-label">Shop Number</label>
                                                                <input type="text" name="shopPhone" onBlur={handleBlur} defaultValue={loggedInUser?.shopPhone} className="form-control my-from" id=""></input>

                                                            </div>

                                                            <div className="col-md-6">
                                                                <img src={imgLink ? imgLink : loggedInUser?.shopImg} class="img-thumbnail" alt="..."></img>
                                                            </div>
                                                            <div className="col-md-6 d-flex flex-column justify-content-center">
                                                                <label for="inputEmail4" className="form-label">Shop number</label>
                                                                <input type="file" onChange={handleFileChange} className="form-control " aria-label="file example" required></input>

                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion" id="accordionExample2">

                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingOne">
                                                    <button className="accordion-button collapsed  profile-accordion" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                                        Enable Messaging
                                                    </button>
                                                </h2>
                                                <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample2">
                                                    <div className="accordion-body">
                                                        <div className="row gy-3">
                                                            <div className="col-md-6">
                                                                <label for="inputEmail4" className="form-label">Project Id</label>
                                                                <input type="text" onBlur={handleBlur} name="projectId" placeholder="Project Id" defaultValue={loggedInUser?.projectId} className="form-control my-from" id=""></input>

                                                            </div>
                                                            <div className="col-md-6">
                                                                <label for="inputEmail4" className="form-label">Privet Id</label>
                                                                <input type="text" onBlur={handleBlur} name="privetId" placeholder="Enter Privet Id" defaultValue={loggedInUser?.privetId} className="form-control my-from" id=""></input>

                                                            </div>



                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </> : null}
                            </div>
                        </form>
                    </div>
                </>
            }
        </DashboardContainer >

    );
};

export default Profile;