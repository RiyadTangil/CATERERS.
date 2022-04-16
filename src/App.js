import "./App.css"
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './Components/Login/Login/Login';
import { createContext, useState, useEffect } from 'react';
import PrivetRoute from './Components/Login/PrivetRoute/PrivetRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';
import Book from './Components/Dashboard/Book/Book';
import OrderList from './Components/Dashboard/OrderList/OrderList';

import Home from "./pages/Home";
import ManageFoodMenu from "./Components/Dashboard/ManageFoodMenu/ManageFoodMenu";
import BookList from "./Components/Dashboard/Book/BookList";
import AddFood from "./Components/Dashboard/AddFood/AddFood";
import AddCategory from "./Components/Dashboard/ManageCategory/AddCategory";
import Test from "./Components/Test";
import Restaurant from "./Components/Dashboard/Restaurant/Restaurant";
import RestaurantDetails from "./pages/RestaurantDetails";
import Profile from "./Components/Dashboard/Profile/Profile";
import SupportAdmin from "./pages/SupportAdmin";
import jwt_decode from "jwt-decode";
import ManageCategory from "./Components/Dashboard/ManageCategory/ManageCategory";
export const UserContext = createContext()
export const UserOrder = createContext()
export const ChatContext = createContext()
export const UserCard = createContext()
function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  const [chatId, setChatId] = useState({})
  const [cardItems, setCardItems] = useState([])
  const fetchUserInfo = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return false;
    }
    const decodedToken = await jwt_decode(token);
    const { name, email, shopImg, picture, typeOfPerson, _id, address, privetId, projectId, shopName, shopPhone, phoneNo } = decodedToken;
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
  }
  useEffect(() => {
    fetchUserInfo()
  }, [])
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <ChatContext.Provider value={[chatId, setChatId]}>
        <UserCard.Provider value={[cardItems, setCardItems]}>
          <Toaster />
          <Router>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/login">
                <Login></Login>
              </Route>
              <Route path="/dashboard/manage-food-menu">
                <ManageFoodMenu />
              </Route>
              <Route path="/dashboard/orderList">
                <OrderList></OrderList>
              </Route>
              <Route path="/dashboard/add-food">
                <AddFood />
              </Route>
              <Route path="/dashboard/manage-category">
                <ManageCategory />
              </Route>
              <Route path="/test">
                <Test />
              </Route>
              <Route path="/restaurant/:id">
                <RestaurantDetails />
              </Route>
              {/* <Route path="/restaurant/:id">
                <Restaurant />
              </Route> */}
              <PrivetRoute path="/dashboard/book">
                <Book></Book>
              </PrivetRoute>
              <PrivetRoute path="/dashboard/profile">
                <Profile />
              </PrivetRoute>
              <Route path="/dashboard/bookList">
                <BookList />
              </Route>
              <PrivetRoute path="/support">
                <SupportAdmin />
              </PrivetRoute>
            </Switch>
          </Router>
        </UserCard.Provider>
      </ChatContext.Provider>
    </UserContext.Provider>
  );
}
export default App;
