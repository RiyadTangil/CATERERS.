import "./App.css"
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './Components/Login/Login/Login';
import { createContext, useState } from 'react';
import PrivetRoute from './Components/Login/PrivetRoute/PrivetRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';
import Book from './Components/Book/Book';
import OrderList from './Components/Dashboard/OrderList/OrderList';
import Profile from "./Components/Dashboard/Profile/Profile";
import Home from "./pages/Home";
import ManageFoodMenu from "./Components/ManageFoodMenu/ManageFoodMenu";
import BookList from "./Components/Book/BookList";
import AddFood from "./Components/Dashboard/AddFood/AddFood";
import AddCategory from "./Components/Dashboard/ManageCategory/AddCategory";
export const UserContext = createContext()
export const UserOrder = createContext()
export const UserCard = createContext()
function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  const [order, setOrder] = useState({})
  const [cardItems, setCardItems] = useState([])
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <UserOrder.Provider value={[order, setOrder]}>
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
              <Route path="/dashboard/add-category">
                <AddCategory />
              </Route>
              <PrivetRoute path="/dashboard/book">
                <Book></Book>
              </PrivetRoute>
              <PrivetRoute path="/dashboard/profile">
                <Profile></Profile>
              </PrivetRoute>
              <Route path="/dashboard/bookList">
                <BookList />
              </Route>
            </Switch>
          </Router>
        </UserCard.Provider>
      </UserOrder.Provider>
    </UserContext.Provider>
  );
}
export default App;
