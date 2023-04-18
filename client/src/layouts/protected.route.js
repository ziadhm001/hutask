import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import UserApi from "api/user";
import Loading from "../components/loading/Loading.js";

export const ProtectedRoute = ({ ...rest }) => {
  const history = useHistory({ forceRefresh: true });
  let user = JSON.parse(localStorage.getItem("user"));
  // user not signed in
  if (!user || !user.token || user.token === "") {
    return <Redirect to="/home" />;
  }
  const auth = async () => {
    await UserApi.GetRole(user._id).catch((err) => {
      if (err.request.status === 401) {
        history.go("/auth/sign-in");
        localStorage.removeItem("user");
      } else return <Route {...rest} />;
    });
  };

  auth();

  return <Route {...rest} />;
};
