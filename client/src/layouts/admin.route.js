import UserApi from "api/user";
import { useState } from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ProtectedRoute } from "../layouts/protected.route.js";
import UserLayout from "layouts/user";

import Loading from "../components/loading/Loading.js";
export const AdminRoute = ({ ...rest }) => {
  let user = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();
  const [role, setRole] = useState(null);
  const authAdmin = async () => {
    if (!user || !user.token || user.token === "") {
      return history.go("/auth/sign-in");
    }
    let response = await UserApi.GetRole(user._id).catch((err) => {
      if (err.request.status === 401) {
        history.go("/auth/sign-in");
        localStorage.removeItem("user");
      }
    });
    setRole(response.data.users.role);
    // user not signed in

    if (role && role !== "admin") {
      return history.push("/user/home");
    } else if (response.data.error === "Request is not authorized")
      return history.push("/home");
    return;
  };
  authAdmin();
  return (
    <>
      {role === null ? (
        <Loading />
      ) : role !== "admin" ? (
        <ProtectedRoute path={`/user`} component={UserLayout} />
      ) : (
        <Route {...rest} />
      )}
    </>
  );
};
