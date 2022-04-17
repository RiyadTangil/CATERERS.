import React, { useEffect, useState } from 'react';
import './RestaurantInfo.css'
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useParams } from 'react-router';
import { Form, FormControl } from 'react-bootstrap';
import searchImg from '../../images/akar-icons_search (1).png'
const RestaurantInfo = ({ setSearchResult }) => {
    const [restaurantInfo, setRestaurantInfo] = useState([])

    const { id } = useParams();
    console.log(id)
    useEffect(() => {
        fetch(`http://localhost:5000/user2/restaurantInfo/${id}`)
            .then(res => res.json())
            .then(data => setRestaurantInfo(data))

    }, [])

    return (
        <div >
            <div >
                <div className='restaurant-media'>
                    <div className="restaurant-img">
                        <img style={{ width: "100%", height: "500px", objectFit: "cover" }} src={restaurantInfo?.shopImg || "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"} alt="..."></img>

                    </div>
                </div>
                <div style={{ transform: "translateY(-80px)" }}>
                    <div className='d-flex justify-content-center'>
                        <div className="logo-img">
                            <img src={restaurantInfo?.shopImg || "https://i.ytimg.com/vi/AUml2IgSFCQ/maxresdefault.jpg"} className="img-fluid  shadow" alt="..."></img>
                        </div>

                    </div>
                </div>
            </div>

            <div style={{ transform: "translateY(-80px)" }} className="bg-white sticky-info">

                <div className="container-fluid shadow border-top  p-3">
                    <div className="row ">
                        <div className="col-md-6 col-sm-12">
                            <div>
                                <h3 className="text-muted">{restaurantInfo?.shopName} <span className="bg-success text-white px-3 rounded-3">0</span></h3>
                                <div className="d-flex flex-start align-items-center py-1">
                                    <h6 className="text-muted fw-light  m-0 "><span className="text-danger px-1  "><FontAwesomeIcon icon={faCheckSquare} /></span> {restaurantInfo?.address}</h6>
                                    <p className="text-muted  ps-3 m-0">Delivery charge : <span>€10</span></p>
                                </div>
                                {/* <p className="text-muted">Maximum time to deliver : <span className=" px-1 ">10:16</span>Minutes.</p> */}


                            </div>


                        </div>
                        <div className="col-md-6 col-sm-12  d-flex justify-content-end align-items-center">


                            <div className="input-group w-75">
                                <span className="input-group-text  my-from" id="basic-addon1"><img src={searchImg}></img> </span>
                                <input onChange={(e) => setSearchResult(e.target.value.toLowerCase())}
                                    type="search"
                                    className="form-control my-from "
                                    placeholder="search "
                                    aria-label="Search"
                                ></input>

                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default RestaurantInfo;