
import "./App.css"
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Components/Login/Login/Login';
import { createContext, useState } from 'react';
import PrivetRoute from './Components/Login/PrivetRoute/PrivetRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';
import Home from "./pages/Home";
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
            </Switch>
          </Router>
        </UserCard.Provider>
      </UserOrder.Provider>
    </UserContext.Provider>
  );
}

export default App;
