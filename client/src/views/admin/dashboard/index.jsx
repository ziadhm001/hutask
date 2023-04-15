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
import Card from "components/card/Card.js";
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
  const {dispatch} = useAuthContext()
  const [taskCount, setTaskCount] = useState(-1);
  const [completedCount, setCompletedCount] = useState(-1);
  const [ongoingCount, setOngoingCount] = useState(-1);
  const [unassignedCount, setUnassignedCount] = useState(-1);
  const [tableDataComplex, setTableDataComplex] = useState([]);
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const [pieChartData, setPieChartData] = useState([0, 0, 0]);

  useEffect(() => {
    setPieChartData([
      (completedCount / taskCount),
      ongoingCount / taskCount,
      (completedCount + ongoingCount) / taskCount,
    ]);
  }, [completedCount, ongoingCount, taskCount]);

  useEffect(() => {
    const getOngoingCount = async () => {
      let response = await TaskApi.GetCountOngoing().catch(error => {
        if(error.response.status === 401)
        {
          localStorage.removeItem("user");
          // dispatch logout action
          dispatch({ type: "LOGOUT" });
          history.push("/auth/sign-in");
        }
      })

      setOngoingCount(response.data.count);
    };
    getOngoingCount();
  }, [dispatch, history, ongoingCount]);

  useEffect(() => {
    const getUnassignedCount = async () => {
      let response = await UserApi.GetUnassignedCount();
      setUnassignedCount(response.data.count);
    };
    getUnassignedCount();
  }, [unassignedCount]);

  useEffect(() => {
    const getTasks = async () => {
      let response = await TaskApi.Get({});
      await response.data.map((task) => task.creator = task.creator.name)
      setTableDataComplex(response.data)
    }
    getTasks();
  },[])

  useEffect(() => {
    const getTotalTasks = async () => {
      let response = await TaskApi.GetCount({});
      setTaskCount(response.data.count)
    }
    getTotalTasks();
  },[])

  useEffect(() => {
    const getCompletedCount = async () => {
      let response = await TaskApi.GetCountCompleted({});
      setCompletedCount(response.data.count)
    }
    getCompletedCount();
  },[completedCount, taskCount])

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 3 }}
        gap='40px'
        mb='40px'>
        <MiniStatistics
          startContent={
            <IconBox
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
            name='مهمات المركز'
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
        <DailyTraffic taskcount={taskCount}/>
        <Card p="20px" align="center" direction="column" w="100%">
      <Flex
        px={{ base: "0px", "2xl": "10px" }}
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        mb="8px"
      >
        <Text color={textColor} fontSize="md" fontWeight="600" mt="4px">
          نسبة المهام المنفذة
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
        p="15px"
        px="20px"
        mt="15px"
        mx="auto"
      >
        <Flex direction="column" py="5px">
          <Flex align="center">
            <Box h="8px" w="8px" bg="red.500" borderRadius="50%" me="4px" />
            <Text
              fontSize="xs"
              color="secondaryGray.600"
              fontWeight="700"
              mb="5px"
            >
              لم تبدأ بعد
            </Text>
          </Flex>
          <Text fontSize="lg" color={textColor} fontWeight="700">
            {(
              ((taskCount - completedCount - ongoingCount) / taskCount) *
              100
            ).toFixed(2)}
            %
          </Text>
        </Flex>
        <VSeparator mx={{ base: "60px", xl: "60px", "2xl": "60px" }} />
        <Flex direction="column" py="5px">
          <Flex align="center">
            <Box h="8px" w="8px" bg="yellow.500" borderRadius="50%" me="4px" />
            <Text
              fontSize="xs"
              color="secondaryGray.600"
              fontWeight="700"
              mb="5px"
            >
              جاري التنفيذ
            </Text>
          </Flex>
          <Text fontSize="lg" color={textColor} fontWeight="700">
            {((ongoingCount / taskCount) * 100).toFixed(2)}%
          </Text>
        </Flex>
        <VSeparator mx={{ base: "60px", xl: "60px", "2xl": "60px" }} />
        <Flex direction="column" py="5px" me="10px">
          <Flex align="center">
            <Box h="8px" w="8px" bg="green.500" borderRadius="50%" me="4px" />
            <Text
              fontSize="xs"
              color="secondaryGray.600"
              fontWeight="700"
              mb="5px"
            >
              تم الانتهاء
            </Text>
          </Flex>
          <Text fontSize="lg" color={textColor} fontWeight="700">
            {((completedCount / taskCount) * 100).toFixed(2)}%
          </Text>
        </Flex>
      </Card>
    </Card>
       
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
