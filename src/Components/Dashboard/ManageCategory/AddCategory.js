import React, { useContext, useState } from 'react';
import swal from 'sweetalert';
import toast from 'react-hot-toast';
import { UserContext } from '../../../App';
import SideVarNav from '../SidvarNav/SideVarNav';
import ManageCategory from './ManageCategory';
// import ManageCategory from '../AddCategory/ManageCategory';

const AddCategory = () => {

    const [category, setCategory] = useState(null)
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [reload, setReload] = useState(false)
    const handleAdmin = (e) => {
        e.preventDefault()
        const loading = toast.loading('Please wait...!');
        fetch("http://localhost:5000/category", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/Json'
            },
            body: JSON.stringify({ "email": loggedInUser.email, "categoryName": category,id:loggedInUser.user_id })
        })
            .then(res => res.json())
            .then(data => {
                toast.dismiss(loading);

                if (data) {
                    setReload(true)
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
                <ManageCategory reload={reload} />
            </div>
        </div>
    );
};

export default AddCategory;