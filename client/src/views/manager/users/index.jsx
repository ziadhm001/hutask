// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import User from '../../../components/user/User'
import { useEffect, useState } from "react";
import UserApi from "api/user";
import Loading from "components/loading/Loading";
import { useAuthContext } from "hooks/useAuthContext";
export default function Settings(props) {
  const [users, setUsers] = useState(null);
  const [department, setDepartment] = useState(null);
  const path = window.location.pathname;
  let { user } = useAuthContext();
  if (!user) {
    user = localStorage.getItem("user");
    user = JSON.parse(user);
  }
  useEffect(() => {
    let controller = new AbortController();
    const getDepartment = async () => {
      try{
        let response = await UserApi.GetDepartment(user._id)
        if(response)
          setDepartment(response.data.users.department);
        controller = null;
      }
      catch(error)
      {
        console.log(error);
      }
    };
    getDepartment();
    return () => controller?.abort();
  }, [department, user._id]);
  useEffect(() => {
    let controller = new AbortController();

    const getUnassignedUsers = async () => {
      try
      {
      const userdata = await UserApi.GetUnassignedManager({department: department});
      setUsers(userdata.data.users)
      controller = null;
      }
      catch(error)
      {
        console.log(error);
      }
    }
    const getUsers = async () => {
      try
      {
      const userdata = await UserApi.GetUsersManager({department: department});
      setUsers(userdata.data.users)
      controller = null;
      }
      catch(error)
      {
        console.log(error);
      }
    }
    getUsers();

    if(path.includes('unassigned'))
      getUnassignedUsers();
    else
      getUsers();
    return () => controller?.abort();
  },[department])
  console.log(users)


  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{base: 1, md: 1, xl: users && users.length > 0 ? 3 : 1}} gap='10px' mb='30px'>
        {users ? users.length > 0 ? users.map( (user,index) => {return <User key={index} name={user.name} email={user.email} department={user.department} role={user.role} count={user.assigned.length}/>}) : <User key={0} name={"لا يوجد مستخدمين"} department={""} role={""} count={""}/>
        : <Loading/>}
      </SimpleGrid>
    </Box>
  );
}
