import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import toast from 'react-hot-toast';
const ManageCategory = ({reload}) => {
    const [categories, setCategories] = useState([])
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
        fetch("http://localhost:5000/category")
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [reload])
    return (
        <div style={{ backgroundColor: "#F4FDFB" }} className=" p-5 mt-3 shadow">
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
                            <tr>
                                <td>{index + 1}</td>
                                <td>{category.categoryName}</td>

                                <td onClick={(e) => handleDelete(e, category._id)} >
                                    <button class="btn btn-warning" type="button" >
                                        delete
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ManageCategory;