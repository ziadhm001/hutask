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
    let response = await UserApi.GetRole(user._id);
    setRole(response.data.users.role);
    // user not signed in
    if (!user || !user.token || user.token === "") {
      return <Redirect to="/auth/signin" />;
    }

    if (role && role !== "admin") {
      return history.push("/user/profile");
    }

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
