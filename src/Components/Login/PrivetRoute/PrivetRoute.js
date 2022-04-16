import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { UserContext } from '../../../App';
import jwt_decode from "jwt-decode";

const PrivetRoute = ({ children, ...rest }) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    const isLoggedIn = () => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            return false;
        }
        const decodedToken = jwt_decode(token);
        const { name, email, picture, typeOfPerson, _id, address, privetId, projectId,shopName,shopImg,shopPhone,phoneNo } = decodedToken;
        const newSignedInUser = {
            name: name,
            email: email,
            phoneNo: phoneNo,
            shopName: shopName,
            shopPhone: shopPhone,
            img: picture,
            shopImg: shopImg,
            typeOfPerson: typeOfPerson,
            _id: _id,
            privetId: privetId,
            projectId: projectId,
            address: address
          };
          setLoggedInUser(newSignedInUser)
     
        // get current time
        const currentTime = new Date().getTime() / 1000;
        // compare the expiration time with the current time
        // will return false if expired and will return true if not expired
        return decodedToken.exp > currentTime;
      
    }
 

    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggedInUser.email || isLoggedIn() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivetRoute;