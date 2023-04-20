// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import Task from '../../../components/task/Task'
import { useEffect, useState } from "react";
import TaskApi from "api/task";
import UserApi from "api/user";
import Loading from "components/loading/Loading";
import { useAuthContext } from "hooks/useAuthContext";

export default function Settings(props) {
  const {user, dispatch} = useAuthContext();
  const [tasks, setTasks] = useState(null);
  const [employees, setEmployees] = useState(null);
  const path = window.location.pathname.split('/')
  const [change, setChange] = useState('')
  const [department ,setDepartment] = useState(null)
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
    const getTasks = async () => {
      try
      {
      const tasks = await TaskApi.GetManager({department: department})
      setTasks(tasks.data)
      controller = null;
      }
      catch(error){
        console.log(error)
      }
    }
    const getTask = async () => {
      try
      {
      const tasks = await TaskApi.GetTask({_id: path[3]});
      setTasks([tasks.data])
      controller = null;
      }
      catch(error)
      {
        console.log(error)
      }
    }
    if(path.length === 4)
      getTask();
    else
      getTasks();

    return () => controller?.abort();
  },[path,change])

  useEffect(() => {
    let controller = new AbortController();
    const getEmployees = async () => {
      try{
      const employees = await UserApi.GetByRole("employee");
      setEmployees(employees.data.users);
      controller = null;
      }
      catch(error){
        console.log(error)
      }
    }
    getEmployees();
    return () => controller?.abort();

  },[])
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{base: 1, md: 1, xl: tasks ? tasks.length === 1 ? 1 : 2 : 1}} gap='40px' mb='20px'>
        {tasks ? tasks.map((task,index) => 
          <Task key={index} name={task.creator.name} status={task.status} date={task.date} department={task.department} service={task.service} element ={task.element} progress={task.progress} reason={task.reason} _id={task._id} employees={employees} assigned={task.assigned} setChange={setChange}/>
        ): <Loading/> }
      </SimpleGrid>
    </Box>
  );
}
