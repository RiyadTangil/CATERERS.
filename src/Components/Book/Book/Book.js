import React, { useContext, useEffect, useState } from 'react';
import { UserContext, UserOrder } from '../../../App';
import { Toast } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import infoEmojis from '../../../images/info-emoji.svg';
import SideVarNav from '../../Dashboard/SidvarNav/SideVarNav';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from '../../PaymentProcess/SimpleCardForm';

const Book = () => {
    const [order, setOrder] = useContext(UserOrder)
    const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
    const [show, setShow] = useState(true);
    const [paymentId, setPaymentId] = useState(null)
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [showPaymentBtn, setShowPaymentBTn] = useState(false)
    const handlePayment = (id) => {
        setPaymentId(id)
        setShowPaymentBTn(true)
    }


    return (

        <div className="row">
            <SideVarNav></SideVarNav>
            <div className="col-md-9 mt-5 ">

                <div style={{ backgroundColor: "#F4FDFB" }} className="shadow pt-5 px-5">
                    <div className=" d-flex   justify-content-center  flex-column">
                        <Elements stripe={stripePromise}>
                            <SimpleCardForm order={order}></SimpleCardForm>
                        </Elements>


                       

                       
                    </div>


                </div>


            </div>
        </div >

    );
};

export default Book;