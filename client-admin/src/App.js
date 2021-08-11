import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { getAllCategory, getInitialdata, isUserLoggedIn } from './actions';
import './App.css';
import PrivateRoute from './compoents/HOC/privateRoute';
import Home from './containers/Home';
import Category from "./containers/Category"
import Orders from './containers/Orders';
import Products from './containers/Products';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import NewPage from './containers/NewPage';


function App() {

  // ! Extract authentication data from store
  const auth = useSelector((state) => state.auth);

  // ! Returns a refernce to the store.dispatch() method
  const dispatch = useDispatch();

  // ! using this hook, React will be informed that App components needs to dispatch action after every updates
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn()); // ! Dispatch isUserLoggedIn action to store the token and the user
    }
    if(auth.authenticate){
      dispatch(getInitialdata()); // ! Dispatch initialData action to fetch all categories & Product initially  from API

    }  }, [auth.authenticate]);

  // ! Render React App 
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute path="/" exact component={Home}/>
          <PrivateRoute path="/category" component={Category}/>
          <PrivateRoute path="/page" component={NewPage}/>
          <PrivateRoute path="/products" component={Products}/>
          <PrivateRoute path="/orders" component={Orders}/>
          <Route path="/signin" component={Signin}/>
          <Route path="/signup" component={Signup}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
