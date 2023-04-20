// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/profile/components/Banner";
import ColumnsTable from "views/admin/profile/components/ColumnsTable";
import { columnsDataColumns } from "./variables/columnsData";
import { columns2DataColumns } from "./variables/columnsData";

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
  const [table2DataColumns, setTable2DataColumns] = useState([]);

  let { user } = useAuthContext();
  if(!user)
  {
    user = localStorage.getItem("user");
    user = JSON.parse(user);
  }

  const [role, setRole] = useState(null);
  useEffect(() => {
    let controller = new AbortController();
    const authStaff = async () => {
      try{
      let response = await UserApi.GetRole(user._id);
      setRole(response.data.users.role);
      controller = null;
      }
      catch(error)
      {
        console.log(error);
      }
    };
    authStaff();
    return () => controller?.abort();
  },[user._id])
  
  useEffect(() => {
    let controller = new AbortController();
    const getTasks = async () => {
      try{
      let response = await TaskApi.GetByCreator({
        _id: user._id
      });
        await response.data.map((task) => task.creator = task.creator.name);
        setTableDataColumns(response.data);
        controller = null;
    }
    catch(error){
      console.log(error);
    }
      
    }
    getTasks();
    return () => controller?.abort();
  },[user._id])

  useEffect(() => {
    let controller = new AbortController();
    const getTasks = async () => {
      try{
      let response = await TaskApi.GetAssignedTasks({
        _id: user._id
      });
        await response.data.map((task) => task.creator = task.creator.name);
        setTable2DataColumns(response.data);
        controller = null;
    }
    catch(error){
      console.log(error);
    }
    }
    getTasks();
    return () => controller?.abort();
  },[user._id])
  
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      
        {role ? <Banner
          banner={banner}
          avatar={avatar}
          name={user.name}
        />: <Loading/>}
        <Box marginBottom="20px">
        {role && role === "employee" &&
          <ColumnsTable
          title="المهام الموكلة اليك"
          columnsData={columns2DataColumns}
          tableData={table2DataColumns}
          />}
        </Box>
        {role &&
        <ColumnsTable
          title="المهام التي قدمتها"
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        />}
    </Box>
  );
}
