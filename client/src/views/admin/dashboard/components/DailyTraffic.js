import React from "react";

// Chakra imports
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import BarChart from "components/charts/BarChart";
import TaskApi from "api/task";
// Custom components
import Card from "components/card/Card.js";
import { barChartOptionsDailyTraffic } from "options/charts";
import { useState } from "react";
import { useEffect } from "react";
// Assets

export default function DailyTraffic(props) {
  const [barChartDataDailyTraffic, setBarChartDataDailyTraffic] = useState([
    {
      name: "Daily Traffic",
      data: [0, 0, 0, 0, 0, 0, 0],
    },
  ]);

  useEffect(() => {
    const getChartData = async () => {
      const engCountRes = await TaskApi.GetCountByCreator({
        name: "هندسة حلوان",
      });
      const scienctCountRes = await TaskApi.GetCountByCreator({
        name: "كلية العلوم",
      });
      const lawCountRes = await TaskApi.GetCountByCreator({
        name: "كلية الحقوق",
      });
      const medCountRes = await TaskApi.GetCountByCreator({
        name: "كلية الطب",
      });
      const commerceCountRes = await TaskApi.GetCountByCreator({
        name: "كلية التجارة",
      });
      const csCountRes = await TaskApi.GetCountByCreator({
        name: "كلية الحاسبات",
      });
      const eduCountRes = await TaskApi.GetCountByCreator({
        name: "كلية التربية",
      });
      setBarChartDataDailyTraffic([
        {
          name: "Daily Traffic",
          data: [
            engCountRes.data.count,
            scienctCountRes.data.count,
            lawCountRes.data.count,
            medCountRes.data.count,
            commerceCountRes.data.count,
            csCountRes.data.count,
            eduCountRes.data.count,
          ],
        },
      ]);
    };
    getChartData();
  }, []);
  const { ...rest } = props;
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <Card align="center" direction="column" w="100%" {...rest}>
      <Flex justify="space-between" align="start" px="10px" pt="5px">
        <Flex flexDirection="column" align="start" me="20px">
          <Flex w="100%">
            <Text
              me="auto"
              color="secondaryGray.600"
              fontSize="1xl"
              fontWeight="800"
            >
              الطلبات
            </Text>
          </Flex>
          <Flex align="end">
            <Text
              color={textColor}
              fontSize="34px"
              fontWeight="700"
              lineHeight="100%"
            >
              {props.taskcount === -1 ? "جاري التحميل" : props.taskcount}
            </Text>
            <Text
              ms="6px"
              color="secondaryGray.600"
              fontSize="1x1"
              fontWeight="500"
            >
              طلب
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Box h="240px" mt="auto">
        <BarChart
          chartData={barChartDataDailyTraffic}
          chartOptions={barChartOptionsDailyTraffic}
        />
      </Box>
    </Card>
  );
}
