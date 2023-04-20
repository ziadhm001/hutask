// Chakra imports
import { Portal, Box, useDisclosure } from "@chakra-ui/react";
import Footer from "components/footer/FooterAdmin.js";
// Layout components
import Navbar from "components/navbar/NavbarRTL.js";
import Sidebar from "components/sidebar/Sidebar.js";
import { RtlProvider } from "components/rtlProvider/RtlProvider.js";
import { SidebarContext } from "contexts/SidebarContext";
import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routes.js";
import Success from "components/result/Result";
// Custom Chakra theme
export default function Home(props) {
  const successType = window.location.pathname.split("/")[2];
  document.documentElement.dir = "rtl";
  return (
    <RtlProvider>
      {successType === "createduser" ? (
        <Success
          heading="تم تسجيل الموظف بنجاح"
          text="سيتم تحويلك تلقائيا للوحة القيادة"
        />
      ) : (
        <Success
          heading="تم تسجيل المهمة بنجاح"
          text="سيتم تحويلك تلقائيا للوحة القيادة"
        />
      )}
    </RtlProvider>
  );
}
