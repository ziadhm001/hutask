import React from "react";
import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdDashboard,
  MdCreateNewFolder,
} from "react-icons/md";

// Admin Imports
import Profile from "views/admin/profile";
import Tasks from "views/admin/tasks";
import RTL from "views/admin/dashboard";
import Home from "views/home/homepage";
// Auth Imports
// import SignInCentered from "views/auth/signIn";
import SignIn from "views/auth/signIn/index.jsx";
import Register from "views/form/register/index.jsx";

const routes = [
  {
    name: "الصفحة الرئيسية",
    layout: "/home",
    path: "/",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: Home,
  },
  {
    name: "لوحة القيادة",
    layout: "/admin",
    path: "/dashboard",
    icon: <Icon as={MdDashboard} width="20px" height="20px" color="inherit" />,
    component: RTL,
  },

  {
    name: "الملف الشخصي",
    layout: "/user",
    path: "/profile",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: Profile,
  },

  {
    name: "المهمات",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: "/tasks",
    component: Tasks,
  },

  {
    name: "Signin",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdHome} width="16px" height="16px" color="inherit" />,
    component: SignIn,
    hide: true,
  },
  {
    name: "تسجيل مهمة جديدة",
    layout: "/auth",
    path: "/register",
    icon: (
      <Icon as={MdCreateNewFolder} width="16px" height="16px" color="inherit" />
    ),
    component: Register,
    hide: true,
  },
];
export default routes;
