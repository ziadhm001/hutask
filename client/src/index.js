import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import UserLayout from "layouts/user";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./layouts/protected.route.js";
import { AdminRoute } from "./layouts/admin.route.js";

import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <AuthContextProvider>
      <React.StrictMode>
        <BrowserRouter>
          <Switch>
            <ProtectedRoute path={`/auth/register`} component={AuthLayout} />
            <Route path={`/auth`} component={AuthLayout} />
            <AdminRoute path={`/admin`} component={AdminLayout} />
            <Route path="/admin/tasks/:id" component={AdminLayout} />
            <ProtectedRoute path={`/user`} component={UserLayout} />
            <Redirect from="/" to="/admin/dashboard" />
          </Switch>
        </BrowserRouter>
      </React.StrictMode>
    </AuthContextProvider>
  </ChakraProvider>,
  document.getElementById("root")
);
