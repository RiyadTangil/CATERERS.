import React, { useContext, useState } from 'react';
import swal from 'sweetalert';
import toast from 'react-hot-toast';
import SideVarNav from '../Dashboard/SidvarNav/SideVarNav';
import { UserContext } from '../../App';
import ManageCategory from './ManageCategory';
const AddCategory = () => {
    const [category, setCategory] = useState(null)
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    console.log(category, loggedInUser)
    const handleAdmin = (e) => {
        e.preventDefault()
        const loading = toast.loading('Please wait...!');
        fetch("http://localhost:5000/category", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/Json'
            },
            body: JSON.stringify({ "email": loggedInUser.email, "categoryName": category })
        })
            .then(res => res.json())
            .then(data => {
                toast.dismiss(loading);
                if (data) {
                    return swal("Admin Added", "Admin has been added successful.", "success");
                }
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            })
            .catch(error => {
                toast.dismiss(loading);
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            })


    }

    return (
        <div className="row">
            <SideVarNav></SideVarNav>
            <div className="col-md-9 mt-5">
                <div>
                    <form style={{ backgroundColor: "#F4FDFB" }} onSubmit={handleAdmin} className=" p-5  shadow">
                        <div className="row">
                            <div className="col-8">
                                <input type="text" name="description" onBlur={(e) => setCategory(e.target.value)} className="form-control" placeholder="Add Category Name" ></input>
                            </div>
                            <div className="col-4">
                                < button type="submit" className="btn main-bg">Add Category</button>
                            </div>

                        </div>
                       
                    </form>
                </div>
                <ManageCategory/>
            </div>
        </div>
    );
};

export default AddCategory;