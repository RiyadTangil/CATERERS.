import React, { useEffect, useState, useContext } from 'react';
import swal from 'sweetalert';
import { UserContext } from '../../../App';
import toast from 'react-hot-toast';
import DashboardContainer from '../DashboardContainer';
const ManageCategory = ({ reload }) => {
    const [categories, setCategories] = useState([])
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const handleDelete = (e, id) => {

        const loading = toast.loading('Please wait...!');
        fetch(`http://localhost:5000/category/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                toast.dismiss(loading);
                if (result) {
                    e.target.parentNode.parentNode.style.display = 'none';
                    return swal("Services deleted ", "Services deleted successfully", "success");

                }
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            })
            .catch(error => {
                toast.dismiss(loading);
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });


            })
    }
    useEffect(() => {
        fetch(`http://localhost:5000/category/categoryByUser/${loggedInUser.user_id}`)
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [reload])
    return (
        <DashboardContainer pageTitle={"Manage Category"}>

            {


                <table className="table table-borderless">
                    <thead>
                        <tr>
                            <th className="text-secondary text-left" scope="col">Sr No</th>
                            <th className="text-secondary" scope="col">Category name</th>
                            <th className="text-secondary" scope="col">action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories?.map((category, index) =>
                                <tr key={index + 1} className="border shadow-sm p-2 my-3 rounded-2">
                                    <td>{index + 1}</td>
                                    <td>{category.categoryName}</td>

                                    <td onClick={(e) => handleDelete(e, category._id)} >
                                        <button className="btn btn-warning" type="button" >
                                            delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            }
        </DashboardContainer>

    );
};

export default ManageCategory;