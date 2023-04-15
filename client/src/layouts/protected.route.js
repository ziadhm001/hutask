import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
export const ProtectedRoute = ({ ...rest }) => {
  let user = JSON.parse(localStorage.getItem("user"));
  // user not signed in
  if (!user || !user.token || user.token === "") {
    return <Redirect to="/auth/signin" />;
  }

  return <Route {...rest} />;
};
