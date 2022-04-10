import React, { useContext } from 'react';
import { UserContext } from '../../../App';
import man from "../../../images/man.png"
import shop from "../../../images/retail-top-img.jpg"
import DashboardContainer from '../DashboardContainer';
import './profile.css'
const Profile = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    console.log(loggedInUser, "profile page")
    return (
        <DashboardContainer pageTitle={"Profile"}>
            {
                <>
                    <div style={{ borderRadius: "50%" }} class="text-center ">
                        <img style={{ width: "150px", borderRadius: "50%" }} src={loggedInUser.img || man} class="   card-img-top" alt="..."></img>
                    </div>
                    <form class="row g-3 px-4">
                        <div class="col-md-6">
                            <label for="inputEmail4" class="form-label">Name</label>
                            <input type="text" defaultValue={loggedInUser?.name} class="form-control my-from " id=""></input>
                        </div>

                        <div class="col-md-6">
                            <label for="inputEmail4" class="form-label">Address</label>
                            <input type="text" class="form-control my-from" defaultValue={loggedInUser?.address} id=""></input>
                        </div>
                        <div class="col-md-6">
                            <label for="inputEmail4" class="form-label">Email</label>
                            <input type="text" defaultValue={loggedInUser?.email} class="form-control my-from" id=""></input>
                        </div>

                        <div class="col-md-6">
                            <label for="inputEmail4" class="form-label">Phone number</label>
                            <input type="text" class="form-control my-from" defaultValue={loggedInUser?.phoneNo} id=""></input>
                        </div>

                        <div class="col-md-6">
                            <label for="inputEmail4" class="form-label">Shop name</label>
                            <input type="text" defaultValue={loggedInUser?.shopName} class="form-control my-from" id=""></input>

                        </div>

                        <div class="col-md-6">
                            <label for="inputEmail4" class="form-label">Shop number</label>
                            <input type="text" class="form-control my-from" defaultValue={loggedInUser?.shopPhone} id=""></input>
                        </div>
                        <div class="col-md-12">
                            {/* <img src={shop} class="img-thumbnail" alt="..."></img> */}
                        </div>
                    </form>
                </>
            }
        </DashboardContainer>

    );
};

export default Profile;