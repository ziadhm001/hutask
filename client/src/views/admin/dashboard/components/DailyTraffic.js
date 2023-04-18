import React, { useMemo } from "react";

// Chakra imports
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Chart from "react-apexcharts";
import Card from "components/card/Card.js";
import { useState } from "react";
import { useEffect } from "react";
import UserApi from "api/user";
// Assets

const barChartOptionsLoading = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    style: {
      fontSize: "12px",
      fontFamily: undefined,
    },
    onDatasetHover: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
    },
    theme: "dark",
  },
  xaxis: {
    categories: ["جاري التحميل"],
    show: false,
    labels: {
      show: true,
      style: {
        colors: "#A3AED0",
        fontSize: "14px",
        fontWeight: "500",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
    color: "black",
    labels: {
      show: true,
      style: {
        colors: "#CBD5E0",
        fontSize: "14px",
      },
    },
  },
  grid: {
    show: false,
    strokeDashArray: 5,
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      type: "vertical",
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      colorStops: [
        [
          {
            offset: 0,
            color: "#4318FF",
            opacity: 1,
          },
          {
            offset: 100,
            color: "rgba(67, 24, 255, 1)",
            opacity: 0.28,
          },
        ],
      ],
    },
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      columnWidth: "40px",
    },
  },
};

let barChartOptionsDailyTraffic = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    style: {
      fontSize: "12px",
      fontFamily: undefined,
    },
    onDatasetHover: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
    },
    theme: "dark",
  },
  xaxis: {
    categories: [],
    show: true,
    tickAmount: 2,
    floating: false,
    labels: {
      show: true,
      style: {
        colors: "#959bb8",
        fontSize: "14px",
        fontWeight: "bold",
      },
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: true,
    tickAmount: 2,
    color: "black",
    title: {
      offsetX: -40,
      text: "عدد الطلبات",
      style: {
        fontSize: "16px",
        color: "#959bb8",
      },
    },
    labels: {
      show: true,
      style: {
        colors: "#959bb8",
        fontSize: "14px",
        fontWeight: "bold",
      },
    },
  },
  grid: {
    show: false,
    strokeDashArray: 0,
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      tickAmount: 2,
      lines: {
        show: false,
      },
    },
  },

  fill: {
    type: "gradient",
    gradient: {
      type: "vertical",
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      colorStops: [
        [
          {
            offset: 0,
            color: "#4318FF",
            opacity: 1,
          },
          {
            offset: 100,
            color: "rgba(67, 24, 255, 1)",
            opacity: 0.28,
          },
        ],
      ],
    },
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      columnWidth: "40px",
      //distributed: true,
    },
  },
};

let barChartDataDailyTraffic = [];
export default function DailyTraffic(props) {
  const [dataForChart, setDataForChart] = useState();

  useEffect(() => {
    const getChartData = async () => {
      const response = await UserApi.GetCreatedCount();
      await response.data.users.map(
        (user) => (user.created = user.created.length)
      );
      setDataForChart(response.data.users);
    };
    if (!dataForChart) {
      barChartDataDailyTraffic = [];
      barChartOptionsDailyTraffic.xaxis.categories = [];
      getChartData();
    } else
      dataForChart.map((user) => {
        barChartDataDailyTraffic.push(user.created);
        barChartOptionsDailyTraffic.xaxis.categories.push(user.name);
      });
  }, [dataForChart]);

  const { ...rest } = props;
  // Chakra Color Mode
  const textColor = useColorModeValue("navy.700", "white");
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
        <Chart
          options={
            barChartOptionsDailyTraffic.xaxis.categories.length
              ? barChartOptionsDailyTraffic
              : barChartOptionsLoading
          }
          series={
            barChartDataDailyTraffic.length
              ? [{ data: barChartDataDailyTraffic }]
              : [{ data: [10] }]
          }
          type="bar"
          width="100%"
          height="100%"
        />
      </Box>
    </Card>
  );
}
