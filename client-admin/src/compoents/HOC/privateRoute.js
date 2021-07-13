import React from "react";
import { Redirect, Route } from "react-router-dom";

// ! Setup private route
const PrivateRoute = ({ component: Component, ...rest }) => {
  return <Route
      {...rest}
      component={(props) => {
        const token = window.localStorage.getItem("token");
        if (token) { // If admin user token exists then only render components
          return <Component {...props} />;
        } else { // If admin user token not exists then redirect to sigin form
          return <Redirect to={`/signin`} />;
        }
      }}
    />
};

export default PrivateRoute;
