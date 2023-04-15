// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import Task from '../../../components/task/Task'
import { useEffect, useState } from "react";
import TaskApi from "api/task";
import UserApi from "api/user";
import Loading from "components/loading/Loading";
export default function Settings(props) {
  const [tasks, setTasks] = useState(null);
  const [employees, setEmployees] = useState(null);
  const path = window.location.pathname.split('/')
  useEffect(() => {
    const getTasks = async () => {
      const tasks = await TaskApi.Get()
      setTasks(tasks.data)
    }
    const getTask = async () => {
      const tasks = await TaskApi.GetTask({_id: path[3]});
      setTasks([tasks.data])
    }
    if(path.length === 4)
      getTask();
    else
      getTasks();
  },[])

  useEffect(() => {
    const getEmployees = async () => {
      const employees = await UserApi.GetByRole("employee")
      setEmployees(employees.data.users)
    }
    getEmployees();

  },[])
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{base: 1, md: 1, xl: tasks ? tasks.length === 1 ? 1 : 2 : 1}} gap='40px' mb='20px'>
        {tasks ? tasks.map((task,index) => 
          <Task key={index} name={task.creator.name} status={task.status} date={task.date} department={task.department} service={task.service} element ={task.element} progress={task.progress} reason={task.reason} _id={task._id} employees={employees}/>
        ): <Loading/> }
      </SimpleGrid>
    </Box>
  );
}
