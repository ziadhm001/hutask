import {
  Container,
  Flex,
  Box,
  Heading,
  StackDivider,
  Text,
  Checkbox,
  Stack,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  useColorModeValue,
} from "@chakra-ui/react";
import TaskApi from "api/task";
import UserApi from "api/user";
import { useState, useEffect } from "react";
import { useRowSelect } from "react-table";

export default function Task(props) {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );
  let ops = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  let employees = props.employees;
  let assignedEmployees = props.assigned;
  let [status, setStatus] = useState(props.status);

  const updateProgress = async (progress) => {
    let response = await TaskApi.UpdateTask(props._id, { progress });
    setStatus(response.data.status);
  };

  const changeEmployeeAssignState = async (e) => {
    const user_id = e.target.value.split("|")[0];
    const task_id = e.target.value.split("|")[1];
    if (e.target.checked) {
      await UserApi.AssignTask({ task_id, user_id });
      assignedEmployees = props.assigned;
    } else {
      await UserApi.UnAssignTask({ task_id, user_id });
      assignedEmployees = props.assigned;
    }
    props.setChange(e.timeestamp);
  };
  const formColor = useColorModeValue(
    "#bfd1fc !important",
    "#192655 !important"
  );
  const [sliderValue, setSliderValue] = useState(props.progress);
  const labelStyles = {
    mt: "3",
    ml: "-2.5",
    fontSize: "sm",
  };
  return (
    <Container
      bg={borderColor}
      maxW="100%"
      mt="20px"
      marginBottom="20px"
      centerContent
      overflow="hidden"
      padding="20px"
      borderRadius="lg"
    >
      <Flex>
        <Box
          bg={borderColor}
          color="white"
          borderRadius="lg"
          m={{ sm: 1, md: 1, lg: 1 }}
          p={{ sm: 1, md: 1, lg: 1 }}
        >
          <Box p={4}>
            <Wrap bg={borderColor} spacing={{ base: 20, sm: 3, md: 5, lg: 10 }}>
              <WrapItem>
                <Box>
                  <Text
                    fontWeight="bold"
                    fontSize="4xl"
                    color={textColorPrimary}
                  >
                    {props.name}
                  </Text>
                  <Text
                    fontWeight="bold"
                    textAlign="center"
                    fontSize="larger"
                    mt="20px"
                    color={textColorPrimary}
                    marginBottom={props.department === "" ? "0px" : "40px"}
                  >
                    {props.department === ""
                      ? ""
                      : props.role === "manager"
                      ? `مدير قسم ${props.department}`
                      : `موظف بقسم ${props.department}`}
                  </Text>
                  <Text
                    fontWeight="bold"
                    textAlign="center"
                    fontSize="large"
                    mt="20px"
                    color={textColorPrimary}
                    marginBottom="5px"
                  >
                    {props.department === ""
                      ? ""
                      : props.count !== 0
                      ? `عدد المهام المكلف بها: ${props.count}`
                      : `غير مكلف بأي مهام`}
                  </Text>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}
