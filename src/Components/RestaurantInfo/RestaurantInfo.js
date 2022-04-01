import React from 'react';
import './RestaurantInfo.css'
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
const RestaurantInfo = () => {
    return (
        <div >
            <div >
                <div className='restaurant-media'>
                    <div className="restaurant-img">
                        <img style={{width:"100%",height:"500px",objectFit:"cover"}} src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"  alt="..."></img>

                    </div>
                </div>
                <div style={{ transform: "translateY(-80px)" }}>
                    <div className='d-flex justify-content-center'>
                        <div className="logo-img">
                            <img src="https://i.ytimg.com/vi/AUml2IgSFCQ/maxresdefault.jpg" className="img-fluid  shadow" alt="..."></img>
                        </div>

                    </div>
                </div>
            </div>

            <div style={{ transform: "translateY(-70px)" }} className="bg-white">
                <div>
                    <div className="container shadow  p-4">
                        <div className="row ">
                            <div className="col-md-6 col-sm-12">
                                <div className="d-flex justify-content-start align-items-center">
                                    <div>
                                        <h3 className="text-muted">Burger King <span className="bg-success text-white px-3 rounded-3">0</span></h3>
                                        <h6 className="text-muted fw-light pt-3"><span className="text-danger px-1  "><FontAwesomeIcon icon={faCheckSquare} /></span> North Indian</h6>

                                    </div>
                                </div>

                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="d-flex justify-content-end align-items-center">
                                    <div>
                                        <p className="text-muted text-end p-0 m-0">Delivery charge : <span>€10</span></p>
                                        <p className="text-muted text-end">Maximum time to deliver : <span className=" px-1 ">10:16</span>Minutes.</p>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

               


            </div>
        </div>

    );
};

export default RestaurantInfo;