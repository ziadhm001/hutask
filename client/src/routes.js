import React from "react";
import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdDashboard,
  MdCreateNewFolder,
  MdSupervisorAccount,
} from "react-icons/md";

// Admin Imports
import Profile from "views/admin/profile";
import Tasks from "views/admin/tasks";
import RTL from "views/admin/dashboard";
import Home from "views/home/homepage";
// Manager Imports
import MUsers from "views/manager/users";
import MTasks from "views/manager/tasks";
import MRTL from "views/manager/dashboard";
// import SignInCentered from "views/auth/signIn";
import SignIn from "views/auth/signIn/index.jsx";
import Signup from "views/admin/register/index.jsx";
import Register from "views/form/register/index.jsx";
import Users from "views/admin/users";

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
    name: "المستخدمون",
    layout: "/admin",
    icon: (
      <Icon
        as={MdSupervisorAccount}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    path: "/users",
    component: Users,
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
    name: "تسجيل مهمة جديدة",
    layout: "/user",
    path: "/register",
    icon: (
      <Icon as={MdCreateNewFolder} width="16px" height="16px" color="inherit" />
    ),
    component: Register,
    hide: true,
  },

  {
    name: "تسجيل مستخدم جديد",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: "/register",
    component: Signup,
  },
  {
    name: "لوحة القيادة",
    layout: "/manager",
    path: "/dashboard",
    icon: <Icon as={MdDashboard} width="20px" height="20px" color="inherit" />,
    component: MRTL,
  },

  {
    name: "المهمات",
    layout: "/manager",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: "/tasks",
    component: MTasks,
  },

  {
    name: "المستخدمون",
    layout: "/manager",
    icon: (
      <Icon
        as={MdSupervisorAccount}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    path: "/users",
    component: MUsers,
  },

  {
    name: "Signin",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdHome} width="16px" height="16px" color="inherit" />,
    component: SignIn,
  },
];
export default routes;
