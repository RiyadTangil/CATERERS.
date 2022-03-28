import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext, UserOrder } from '../../../App';
import image from '../../../images/accounts.png'
import './addService.css'

const ServiceDetails = ({ service ,handleCard}) => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        fetch('https://morning-thicket-61908.herokuapp.com/isAdmin', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => setIsAdmin(data));

    }, [])


    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [order, setOrder] = useContext(UserOrder)
  
    return (

        <div className="col-md-4 col-sm-6">

            <div style={{ paddingBottom: "80px" }}>
                <div >
                    <div >
                        <div style={{ backgroundColor: "white", borderRadius: "10px", height: "370px" }} className=" text-center  shadow p-4">
                            <img style={{ height: '50px' }} src={`data:image/png;base64,${service.image.img}`} alt="" />
                            <h6 className="my-2 ">{service.name}</h6>
                            <h6 className="my-2">${service.price}</h6>

                            <p className="text-secondary">Lorem ipsum dolor Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum, dolorum. sit amet, consectetur adipisicing elit. Aliquam, quaerat?</p>
                            <button onClick={() => handleCard(service._id)} className="btn text-light submitButton">
                                <span className="text-black">  Buy now</span>
                                <div className="SubmitButton__horizontal"></div>
                                <div className="submitButton__vertical"></div>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;