// Chakra imports
import { Box, Select, SimpleGrid } from "@chakra-ui/react";
import Task from '../../../components/task/Task'
import { useEffect, useState } from "react";
import TaskApi from "api/task";
import UserApi from "api/user";
import Loading from "components/loading/Loading";
import { useAuthContext } from "hooks/useAuthContext";

export default function Settings(props) {
  const {user, dispatch} = useAuthContext();
  const [allTasks, setAllTasks] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [employees, setEmployees] = useState(null);
  const path = window.location.pathname.split('/')
  const [change, setChange] = useState('')
  const [department ,setDepartment] = useState(null)
  const [searchByStatus, setSearchByStatus] = useState(null)
  useEffect(() => {
    let controller = new AbortController();
    const getTasks = async () => {
      try
      {
      const tasks = await TaskApi.Get()
      setAllTasks(tasks.data)
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
      setAllTasks([tasks.data])
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
  },[change, department])

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

  },[department])

  useEffect(()=> {
    if(searchByStatus && searchByStatus !== "الكل")
    {
      let filteredTasks = allTasks.filter((task) => {return task.status === searchByStatus})
      setTasks(filteredTasks)
    }
    else{
      setTasks(allTasks)
    }
  },[searchByStatus,allTasks])
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Select onChange={(event) => {setSearchByStatus(event.target.value)}}>
        <option value={"الكل"}>كل الحالات</option>
        <option value={"لم تبدأ بعد"}>لم تبدأ بعد</option>
        <option value={"جاري التنفيذ"}>جاري التنفيذ</option>
        <option value={"تم الانتهاء"}>تم الانتهاء</option>
      </Select>
      <SimpleGrid columns={{base: 1, md: 1, xl: tasks ? tasks.length <= 1 ? 1 : 2 : 1}} gap='10px' mb='20px'>
        {tasks ? tasks.length >= 1 ? tasks.map((task,index) => {
          return <Task key={index} name={task.creator.name} status={task.status} date={task.date} department={task.department} service={task.service} element ={task.element} progress={task.progress} reason={task.reason} _id={task._id} employees={employees} assigned={task.assigned} setChange={setChange}/>}) : <Task key={0} name={"لا يوجد طلبات"} department={""} role={""} count={""}/>
        : <Loading/> }
      </SimpleGrid>
    </Box>
  );
}
