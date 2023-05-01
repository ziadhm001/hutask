// Chakra imports
import {
  Box,
  Icon,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
// Custom 
import ReactApexChart from "react-apexcharts";
import MiniStatistics from "components/card/MiniStatistics";
import MiniCalendar from "components/calendar/MiniCalendar";
import IconBox from "components/icons/IconBox";
import React, { useEffect, useState } from "react";
import {
  MdAddTask,
  MdAccessibility,
  MdFileCopy,
} from "react-icons/md";
import ComplexTable from "./components/ComplexTable";
import DailyTraffic from "./components/DailyTraffic";
import TaskApi from "../../../api/task";
import UserApi from "../../../api/user";

import {
  columnsDataComplex,
} from "./variables/columnsData";
import { pieChartOptions } from "options/charts";
import { Flex, Text} from "@chakra-ui/react"
import Card from "components/card/MCard.js";
import { VSeparator } from "components/separator/Separator";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useAuthContext } from "hooks/useAuthContext";



export default function UserReports() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const cardColor = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  const history = useHistory();
  const {user, dispatch} = useAuthContext()
  const [taskCount, setTaskCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(-1);
  const [ongoingCount, setOngoingCount] = useState(-1);
  const [unassignedCount, setUnassignedCount] = useState(-1);
  const [tableDataComplex, setTableDataComplex] = useState([]);
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const [pieChartData, setPieChartData] = useState([100, 100, 100]);
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
    if(taskCount === 0)
      setPieChartData([0,0,0])
    else
      setPieChartData([
        (completedCount / taskCount),
        (ongoingCount / taskCount),
        (taskCount - completedCount - ongoingCount) / taskCount,
      ]);
    }, [completedCount, ongoingCount, taskCount]);

  useEffect(() => {
    let controller = new AbortController();
    const getOngoingCount = async () => {
      try{
      let response = await TaskApi.GetMCountOngoing({department: department}).catch(error => {
        if(error.response.status === 401)
        {
          localStorage.removeItem("user");
          // dispatch logout action
          dispatch({ type: "LOGOUT" });
          history.push("/auth/sign-in");
        }
      })
      setOngoingCount(response.data.count);
      controller = null;
    }
    catch(error){
      console.log(error);
    }
    };
    getOngoingCount();

    return () => controller?.abort();
  }, [department, dispatch, history, ongoingCount]);

  useEffect(() => {
    let controller = new AbortController();

    const getUnassignedCount = async () => {
      try{
      let response = await UserApi.GetMUnassignedCount({department: department});
      setUnassignedCount(response.data.count);
      controller = null;
      }
      catch(error){
        console.log(error);
      }
    };
    getUnassignedCount();
    return () => controller?.abort();
  }, [department, unassignedCount]);

  useEffect(() => {
    let controller = new AbortController();

    const getTasks = async () => {
      try{
      let response = await TaskApi.GetManager({department: department});
      await response.data.map((task) => task.creator = task.creator.name)
      setTableDataComplex(response.data)
      controller = null;
      }
      catch(error)
      {
        console.log(error);
      }
    }
    getTasks();
    return () => controller?.abort();

  },[department])

  useEffect(() => {
    let controller = new AbortController();
  
    const getTotalTasks = async () => {
      try{
      let response = await TaskApi.GetMCount({department: department});
      setTaskCount(response.data.count)
      controller = null;
      }
      catch(error)
      {
        console.log(error);
      }
    }
    getTotalTasks();
    return () => controller?.abort();

  },[department])

  useEffect(() => {
    let controller = new AbortController();

    const getCompletedCount = async () => {
      try{
      let response = await TaskApi.GetMCountCompleted({department: department});
      setCompletedCount(response.data.count)
      controller = null;
      }
      catch(error){
        console.log(error);
      }
    }
    getCompletedCount();
    return () => controller?.abort();

  },[completedCount, department, taskCount])
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 3 }}
        gap='40px'
        mb='40px'>
        <MiniStatistics
          id="222"
          startContent={
            <IconBox
              id="222"
              onClick={() => history.push('/manager/users/unassigned')}
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdAccessibility} color={brandColor} />
              }
            />
          }
          name='الموظفون غير المعينين'
          value={unassignedCount === -1 ? "جاري التحميل" : unassignedCount}
        />
          <MiniStatistics
            startContent={
              <IconBox
                w='56px'
                h='56px'
                bg={boxBg}
                icon={
                  <Icon w='32px' h='32px' as={MdFileCopy} color={brandColor} />
                }
              />
            }
            name='مهمات القسم'
            value={taskCount === -1 ? 'جاري التحميل' : taskCount}
          />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
              icon={<Icon w='28px' h='28px' as={MdAddTask} color='white' />}
            />
          }
          name='مهام لم تنتهي بعد'
          value={completedCount === -1 ? 'جاري التحميل' : taskCount - completedCount}
        />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='40px' mb='20px'>
    <Card p="15px" direction="column" w="100%">
      <Flex
        px={{ base: "0px", "2xl": "10px" }}
        w="100%"
        mb="8px"
      >
        <Text color={textColor} fontSize="md" fontWeight="600" mt="4px">
          حالة المهام
        </Text>
      </Flex>

      <ReactApexChart
        options={pieChartOptions}
        series={pieChartData}
        type='pie'
        width='100%'
        height='55%'
      />
      <Card
        bg={cardColor}
        flexDirection="row"
        boxShadow={cardShadow}
        w="100%"
        p="25px"
        mt="15px"
      >
        <Flex direction="column" py="5px">
          <Flex align="center">
            <Box h="8px" w="8px" bg="red.500" borderRadius="50%" me="4px" />
            <Text
              fontSize="small"
              color="secondaryGray.600"
              fontWeight="700"
              mb="5px"
            >
              لم تبدأ بعد
            </Text>
          </Flex>
          <Text fontSize="lg" color={textColor} fontWeight="700">
            {taskCount === 0 ? 0 : (
              ((taskCount - completedCount - ongoingCount) / taskCount) *
              100
            ).toFixed(2)}
            %
          </Text>
        </Flex>
        <VSeparator mx={{ base: "42px", xl: "42px", "2xl": "42px" }} />
        <Flex direction="column" py="5px">
          <Flex align="center">
            <Box h="8px" w="8px" bg="yellow.500" borderRadius="50%" me="4px" />
            <Text
              fontSize="small"
              color="secondaryGray.600"
              fontWeight="700"
              mb="5px"
            >
              جاري التنفيذ
            </Text>
          </Flex>
          <Text fontSize="lg" color={textColor} fontWeight="700">
            {taskCount === 0 ? 0 : ((ongoingCount / taskCount) * 100).toFixed(2)}%
          </Text>
        </Flex>
        <VSeparator mx={{ base: "42px", xl: "42px", "2xl": "42px" }} />
        <Flex direction="column" py="5px" me="10px">
          <Flex align="center">
            <Box h="8px" w="8px" bg="green.500" borderRadius="50%" me="4px" />
            <Text
              fontSize="small"
              color="secondaryGray.600"
              fontWeight="700"
              mb="5px"
            >
              تم الانتهاء
            </Text>
          </Flex>
          <Text fontSize="lg" color={textColor} fontWeight="700">
            {taskCount === 0 ? 0 :((completedCount / taskCount) * 100).toFixed(2)}%
          </Text>
        </Flex>
      </Card>
    </Card>
    <MiniCalendar/>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='10px' mb='20px'>
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
      </SimpleGrid>
    </Box>
  );
}
