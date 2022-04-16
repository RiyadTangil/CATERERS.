import React, { useContext } from 'react';
import {
  CardCvcElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import axios from 'axios';
import { useHistory,  } from "react-router";
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import swal from 'sweetalert';
import { useState } from 'react';
import { UserContext } from '../../../App';
import { UserCard } from '../../../App';

const SimpleCardForm = ({ order }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const stripe = useStripe();
  const elements = useElements();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [cardItems, setCardItems] = useContext(UserCard);
  const total = cardItems.reduce((total, prd) => total + (prd.foodPrice * prd.quantity), 0)
  let history = useHistory();
  const forDatabase = cardItems.map(item => {
    return {
        foodId: item._id,
        catererId:item.userId,
        quantity: item.quantity
    }
})


  const handleOrder = async data => {
    if (!stripe || !elements) {
      return;
    }
    const loading = toast.loading('Please wait...!');
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement),
    });

    if (error) {
      toast.dismiss(loading);
      setPaymentError(error.message);
      setPaymentSuccess(null);
      return swal("Failed!", error.message, "error", { dangerMode: true });
    }

    const orderInfo = {
      "customerId": loggedInUser._id,
      "price": total,
      "status": "Pending",
      "catererId": cardItems[0].userId,
      "ordersItems": forDatabase,
      "paymentId": paymentMethod.id
    }
    axios.post("http://localhost:5000/orders", orderInfo)
      .then(res => {
        toast.dismiss(loading);
        if (res.data) {
          setCardItems([]);
          history.push("/dashboard/bookList");
          return swal("Payment successful", "Your booking and payment has been successful.", "success");
        }
        swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
      })
      .catch(error => {
        toast.dismiss(loading);
        swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleOrder)} className="row g-3">
        <div className="col-md-6">
          <label for="inputEmail4" className="form-label">Name</label>
          <input type="text" defaultValue={loggedInUser.name} className="form-control" id=""></input>
        </div>

        <div className="col-md-6">
          <label for="inputEmail4" className="form-label">Address</label>
          <input type="text" className="form-control" defaultValue={loggedInUser.address} id=""></input>
        </div>
        <div className="col-md-6">
          <label for="inputEmail4" className="form-label">Price</label>
          <input type="text" defaultValue={total} className="form-control" id=""></input>
        </div>
        {/* <div className="col-md-6">
          <label for="inputEmail4" className="form-label">Service</label>
          <input type="text" defaultValue={order.name} className="form-control" id=""></input>
        </div> */}
        <div className="col-md-6">
          <label for="inputEmail4" className="form-label">Card Number</label>
          <CardNumberElement className="form-control" />

        </div>
        <div className="col-md-6">
          <label for="inputEmail4" className="form-label">Email</label>
          <input type="text" defaultValue={loggedInUser.email} className="form-control" id=""></input>
        </div>

        <div className="col-md-6">
          <label for="inputEmail4" className="form-label"> Expiration Date</label>
          <CardExpiryElement className="form-control" />


        </div>

        <div className="col-md-6">
          <label for="inputEmail4" className="form-label">CVC</label>
          <CardCvcElement className="form-control" />
        </div>
        <div className="pb-5 text-center ">
          <button className="btn main-bg me-md-2 text-center" type="submit" disabled={!stripe}>
            Order now
          </button>
        </div>
      </form>
      {
        paymentError && <p style={{ color: 'red' }}>{paymentError}</p>
      }
      {
        paymentSuccess && <p style={{ color: 'green' }}>Your payment was successful.</p>
      }
    </div>
  );
};

export default SimpleCardForm;