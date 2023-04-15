// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/profile/components/Banner";
import ColumnsTable from "views/admin/profile/components/ColumnsTable";
import { columnsDataColumns } from "./variables/columnsData";
import { useAuthContext } from "hooks/useAuthContext";
import TaskApi from "api/task";
// Assets
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/avatar.jpg";
import React, { useState, useEffect } from "react";
import UserApi from "api/user";
import Loading from "components/loading/Loading";
export default function Overview() {
  const [tableDataColumns, setTableDataColumns] = useState([]);
  let { user } = useAuthContext();
  if(!user)
  {
    user = localStorage.getItem("user");
    user = JSON.parse(user);
  }

  const [role, setRole] = useState(null);
  useEffect(() => {
    const authStaff = async () => {
      let response = await UserApi.GetRole(user._id);
      setRole(response.data.users.role);
    };
    authStaff();
  },[user._id])
  
  useEffect(() => {
    const getTasks = async () => {
      let response = await TaskApi.GetByCreator({
        _id: user._id
      });
        await response.data.map((task) => task.creator = task.creator.name);
        setTableDataColumns(response.data);
      
    }
    getTasks();
  },[user._id])
  
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 1 }}
        gap='40px'
        mb='40px'>
        {role ? <Banner
          banner={banner}
          avatar={avatar}
          name={user.name}
        />: <Loading/>}
      </SimpleGrid>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 1 }}
        gap='50px'
        mx='60px'
        mb='40px'>
        {role && role !== "user" &&
          <ColumnsTable
          title="المهام الموكلة اليك"
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        />}
        {role &&
        <ColumnsTable
          title="المهام التي قدمتها"
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        />}
      </SimpleGrid>
    </Box>
  );
}
