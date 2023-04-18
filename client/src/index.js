import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import UserLayout from "layouts/user";
import HomeLayout from "layouts/home";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./layouts/protected.route.js";
import { AdminRoute } from "./layouts/admin.route.js";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") disableReactDevTools();

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <AuthContextProvider>
      <React.StrictMode>
        <BrowserRouter>
          <Switch>
            <ProtectedRoute path={`/auth/register`} component={AuthLayout} />
            <Route path={`/auth`} component={AuthLayout} />
            <Route path={`/home`} component={HomeLayout} />
            <ProtectedRoute path={`/user`} component={UserLayout} />
            <AdminRoute path={`/admin`} component={AdminLayout} />
            <Redirect from="/" to="/home" />
          </Switch>
        </BrowserRouter>
      </React.StrictMode>
    </AuthContextProvider>
  </ChakraProvider>,
  document.getElementById("root")
);
