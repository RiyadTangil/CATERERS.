import React, { useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import swal from 'sweetalert';
import toast from 'react-hot-toast';
import "firebase/firestore";
import firebaseConfig from "./firebase.config";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../../App";
import "./login.css"
import axios from "axios";

const Login = (props) => {
    const { setUser } = props;
    const [imgLink, setFile] = useState(null);
    const [imgUploading, setImgUpload] = useState(false)
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    const storeAuthToken = (token) => {
        if (token) {
            sessionStorage.setItem("token", token);
        }
    };

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [loginInfo, setLoginInfo] = useState({});
    const [selectedUser, setSelectedUser] = useState("");
    let [newUser, setNewUser] = useState(false)
    const [show, setShow] = useState(true);
    const handleBlur = (event) => {
        let newUser = { ...loginInfo }
        newUser[event.target.name] = event.target.value
        setLoginInfo(newUser)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (newUser && loginInfo.password && selectedUser && loginInfo.password === loginInfo.confirmPassword) {

            const loading = toast.loading('Please wait...!');
            fetch("https://guarded-wave-53446.herokuapp.com/user2", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/Json'
                },
                body: JSON.stringify({
                    "name": loginInfo.name,
                    "address": loginInfo.address,
                    "phoneNo": loginInfo.phoneNo,
                    "email": loginInfo.email,
                    "typeOfPerson": selectedUser,
                    "shopPhone": loginInfo.shopPhone,
                    "shopImg": imgLink,
                    "shopName": loginInfo.shopName,
                    "password": loginInfo.password
                })
            })
                .then(res => res.json())
                .then(data => {
                    toast.dismiss(loading);

                    storeAuthToken(data.token ? data?.token : null)
                    setLoggedInUser(data?.data ? data?.data : [])
                    history.replace(from);
                    console.log(data?.data?.typeOfPerson)
                    if (data?.token) {
                        return swal(`${data?.data?.typeOfPerson} added`, `${data?.data?.typeOfPerson} has been added successful.`, "success");
                    }
                    swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });


                })
                .catch(error => {
                    toast.dismiss(loading);
                    swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
                })

        }

        if (newUser && loginInfo.password !== loginInfo.confirmPassword) {
            let newUserInfo = { ...loggedInUser }
            newUserInfo.error = "pass word not matched";
            setLoggedInUser(newUserInfo)
        }
        if (newUser && !selectedUser) {
            let newUserInfo = { ...loggedInUser }
            newUserInfo.error = "pleas select one type of user";
            setLoggedInUser(newUserInfo)
        }
        if (!newUser && loginInfo.email && loginInfo.password) {

            const loading = toast.loading('Please wait...!');
            fetch("https://guarded-wave-53446.herokuapp.com/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/Json'
                },
                body: JSON.stringify({
                    "email": loginInfo.email,
                    "password": loginInfo.password
                })
            })
                .then(res => res.json())
                .then(data => {
                    toast.dismiss(loading);
                    console.log(data);
                    storeAuthToken(data.token ? data?.token : null)
                    setLoggedInUser(data?.data ? data?.data : [])
                    history.replace(from);
                    if (data) {
                        return swal(data.message, "User login successfully", "success");
                    }
                    swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });


                })
                .catch(error => {
                    toast.dismiss(loading);
                    swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
                })
        }
    }
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    //this is the google sign in method . If require you can use
    // const handleGoogleSignIn = () => {
    //     const provider = new firebase.auth.GoogleAuthProvider();
    //     firebase
    //         .auth()
    //         .signInWithPopup(provider)
    //         .then((result) => {
    //             const { displayName, email, photoURL } = result.user;

    //             const signedInUser = { name: displayName, email: email, img: photoURL };
    //             setLoggedInUser(signedInUser);

    //             // storeAuthToken();
    //             history.replace(from);
    //         })
    //         .catch((error) => {
    //             let newUserInfo = { ...loggedInUser }
    //             newUserInfo.error = error.message;
    //             setLoggedInUser(newUserInfo);

    //         });


    // };
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
    return (

        <div className="login-page container ">

            <div className="d-flex justify-content-center my-5  ">
                <div style={{ borderRadius: "20px" }} className=" login-container bg-light p-5">
                    <form onSubmit={handleSubmit}>
                        {newUser && <div className=" mb-1">
                            <label htmlFor="inputemail3" className="col-sm-6 col-form-label">
                                Full Name
                            </label>
                            <input name="name" className="form-control" required onBlur={handleBlur} type="text" placeholder=" Full Name" />
                        </div>}
                        <div className=" mb-1">
                            <label htmlFor="inputemail3" className="col-sm-2 col-form-label">
                                email
                            </label>
                            <input className="form-control" type="text" required onBlur={handleBlur} placeholder="type your email" name="email" />
                        </div>
                        {newUser && <div className=" mb-1">
                            <label htmlFor="inputemail3" className="col-sm-6 col-form-label">
                                phone number
                            </label>
                            <input className="form-control" name="phoneNo" required onBlur={handleBlur} type="text" placeholder="phone number" />
                        </div>}
                        {newUser && <div className=" mb-1">
                            <label htmlFor="inputemail3" className="col-sm-6 col-form-label">
                                address
                            </label>
                            <input className="form-control" name="address" required onBlur={handleBlur} type="text" placeholder="address" />
                        </div>}
                        <div className="mb-1">
                            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                                Password
                            </label>
                            <input className="form-control" id="inputPassword3" type="password" required onBlur={handleBlur} name="password" placeholder="type your password" />
                        </div>
                        {newUser && <div className=" mb-1">
                            <label htmlFor="inputPassword3" className="col-sm-6 col-form-label">
                                Confirm password
                            </label>

                            <input className="form-control" id="inputPassword3" type="password" required onBlur={handleBlur} name="confirmPassword" placeholder="confirm password" />

                        </div>}
                        {newUser ? <p style={{ cursor: "pointer" }}>Already have an account ? <span onClick={() => setNewUser(!newUser)} name="newUser" id="newUser" className="text-primary">Log in</span></p>
                            : <p style={{ cursor: "pointer" }}>Are you new user? <span onClick={() => setNewUser(!newUser)} name="newUser" id="newUser" className="text-primary">create account</span></p>
                        }
                        <div className=" justify-content-center  d-flex mb-1">
                            <button className="w-75 btn main-bg" type="submit" variant="primary" size="md" block>
                                {newUser ? "sign up" : "Log in"}
                            </button>
                        </div>
                        {newUser &&
                            <>
                                <div className="form-check">
                                    <input className="form-check-input" onClick={() => setSelectedUser("customer")} type="radio" name="flexRadioDefault" id="flexRadioDefault1"></input>
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        I am a customer
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" onClick={() => setSelectedUser("caterer")} type="radio" name="flexRadioDefault" id="flexRadioDefault2" ></input>
                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                        I am a caterer
                                    </label>
                                </div>
                            </>}
                        {selectedUser === "caterer" &&
                            <>
                                <div className=" mb-1">
                                    <label htmlFor="inputemail3" className="col-sm-6 col-form-label">
                                        Caterer shop Name
                                    </label>
                                    <input className="form-control" required onBlur={handleBlur} name="shopName" type="text" placeholder=" aterer shop Name" />
                                </div>
                                <div className=" mb-1">
                                    <label htmlFor="inputemail3" className="col-sm-6 col-form-label">
                                        Caterer shop Phone
                                    </label>
                                    <input className="form-control" required onBlur={handleBlur} name="shopPhone" type="text" placeholder=" Caterer shop Phone" />
                                </div>
                                <div className=" mb-1">
                                    <label htmlFor="inputemail3" className="col-sm-6 col-form-label">
                                        Upload shop img                                    </label>
                                    <input type="file" name="img" onChange={handleFileChange} className="form-control" placeholder="Food img"></input>
                                </div>
                                {imgUploading &&
                                <div className="d-flex align-items-center">
                                    <strong>Uploading...</strong>
                                    <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
                                </div>}
                            </>}
                    </form>
                    <p className="text-warning">{loggedInUser?.error}</p>
                    {/* <div className="justify-content-center d-flex">
                        <button className="btn main-bg" onClick={handleGoogleSignIn}>sign in with google</button>
                    </div> */}
                </div>
            </div>
        </div>

    );
};



export default (Login);
