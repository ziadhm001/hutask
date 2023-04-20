// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import User from '../../../components/user/User'
import { useEffect, useState } from "react";
import UserApi from "api/user";
import Loading from "components/loading/Loading";
export default function Settings(props) {
  const [users, setUsers] = useState(null);
  const path = window.location.pathname;
  useEffect(() => {
    let controller = new AbortController();
    const getUsers = async () => {
      try
      {
      const userdata = await UserApi.Get()
      setUsers(userdata.data.users)
      }
      catch(error)
      {
        console.log(error)
      }
    }


    const getUnassignedUsers = async () => {
      try
      {
      const userdata = await UserApi.GetUnassigned();
      setUsers(userdata.data.users)
      }
      catch(error)
      {
        console.log(error)
      }
    }
    if(path.includes('unassigned'))
      getUnassignedUsers();
    else
      getUsers();
    return () => controller?.abort();
  },[])
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{base: 1, md: 1, xl: users && users.length > 0 ? 3 : 1}} gap='10px' mb='30px'>
        {users ? users.length > 0 ? users.map( (user,index) => {return <User key={index} name={user.name} email={user.email} department={user.department} role={user.role} count={user.assigned.length}/>}) : <User key={0} name={"لا يوجد مستخدمين"} department={""} role={""} count={""}/>
        : <Loading/>}
      </SimpleGrid>
    </Box>
  );
}
