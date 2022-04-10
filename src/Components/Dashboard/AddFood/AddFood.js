import React, { useContext, useEffect, useState } from 'react';
import swal from 'sweetalert';
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { UserContext } from '../../../App';
import SideVarNav from '../SidvarNav/SideVarNav';
import axios from 'axios';
import DashboardContainer from '../DashboardContainer';
const containerStyle = {
    backgroundColor: "#F4FDFB",
    // marginRight: "20px"
}
const AddFood = () => {
    const [info, setInfo] = useState({});
    const published = ["published", "unpublished"]
    const avaiable = ["available", "unavailable"]
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [imgLink, setFile] = useState(null);
    const [imgUploading, setImgUpload] = useState(false)
    const [categories, setCategories] = useState([]);
    const handleBlur = e => {
        const newInfo = { ...info };
        newInfo[e.target.name] = e.target.value;
        console.log(newInfo)
        setInfo(newInfo);
    }
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
    console.log(imgLink)
    useEffect(() => {
        fetch(`http://localhost:5000/category/categoryByUser/${loggedInUser.user_id}`)
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])

    const onSubmit = (e) => {
        const loading = toast.loading('Please wait...!');
        e.preventDefault()
        fetch('http://localhost:5000/foods', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/Json'
            },
            body: JSON.stringify({
                "img": imgLink,
                "name": info.name,
                "description": info.description,
                "price": info.price,
                "category": "test",
                "userId": loggedInUser.user_id,
                "produceAvailable": info.produceAvailable,
                "publishStatus": info.publishStatus,
                "catererId": info.category,
            })

        })
            .then(response => response.json())
            .then(data => {
                toast.dismiss(loading);
                console.log(data);
                if (!data.error) {
                    return swal("service Added", "service has been added successful.", "success");
                }
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            })
            .catch(error => {
                toast.dismiss(loading);
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            })
    }
    return (


        <DashboardContainer pageTitle={"Menu"}>
            {
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Accordion Item #1
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Accordion Item #2
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Accordion Item #3
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                            </div>
                        </div>
                    </div>
                </div>
                // <div className=" p-3   d-flex justify-content-center flex-column">
                //     <div className="row  mt-2 p-3 g-3">
                //         <form onSubmit={onSubmit} >
                //             <div className="row g-3 ">
                //                 <div className="col">
                //                     <label htmlFor="exampleInputEmail1">Food Name </label>
                //                     <input type="text" name="name" onBlur={handleBlur} className="form-control" placeholder="Food Name" ></input>
                //                 </div>
                //                 <div className="col">
                //                     <label htmlFor="exampleInputEmail1">Food img</label>
                //                     <input type="file" name="img" onChange={handleFileChange} className="form-control" placeholder="Food img"></input>
                //                 </div>
                //             </div>
                //             <div className="row mt-2 g-3">
                //                 <div className="col form-group">
                //                     <label htmlFor="exampleInputEmail1">Description</label>
                //                     <input type="text" name="description" onBlur={handleBlur} className="form-control" placeholder="Food Description" ></input>
                //                 </div>
                //                 <div className="col">
                //                     <label htmlFor="exampleInputEmail1">Price</label>
                //                     <input type="number" onBlur={handleBlur} name="price" className="form-control" placeholder="Food Price"></input>
                //                 </div>

                //             </div>

                //             <div className="row mt-2 g-3">
                //                 <div className="col-md-6 col-12">
                //                     <select onBlur={handleBlur} className="form-select form-select mb-3" name="category" aria-label=".form-select-lg example">
                //                         {categories?.map((category, index) => <option key={index} value={category._id}>{category.categoryName}</option>)}
                //                     </select>
                //                 </div>
                //                 <div className="col-md-3 col-6">
                //                     <select onBlur={handleBlur} className="form-select form-select mb-3" name="publishStatus" aria-label=".form-select-lg example">
                //                         {published?.map((category, index) => <option key={index} value={category}>{category}</option>)}
                //                     </select>
                //                 </div>
                //                 <div className="col-md-3 col-6">
                //                     <select onBlur={handleBlur} className="form-select form-select mb-3" name="produceAvailable" aria-label=".form-select-lg example">
                //                         {avaiable?.map((category, index) => <option key={index} value={category}>{category}</option>)}
                //                     </select>
                //                 </div>
                //             </div>
                //             <div className="col-12 d-flex justify-content-end mt-2">
                //                 {imgLink ?

                //                     < button type="submit" className="btn main-bg">Submit</button> :
                //                     imgLink === null & imgUploading ?
                //                         <button className="btn btn-primary" type="button" disabled>
                //                             <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                //                             uploading
                //                         </button> :
                //                         < button className="btn main-bg" disabled>Submit</button>
                //                 }

                //             </div>
                //         </form>
                //     </div>
                // </div>

            }
        </DashboardContainer>
    );
};

export default AddFood;