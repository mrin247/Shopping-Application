import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./containers/HomePage";
import ProductList from "./containers/ProductListPage";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./actions";
import { ProductDetailsPage } from "./containers/ProductDetailsPage";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/:productSlug/:productId/p" component={ProductDetailsPage} />
          <Route path="/:slug" component={ProductList} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
