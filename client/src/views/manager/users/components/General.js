// Chakra imports
import { Text, useColorModeValue } from "@chakra-ui/react";
// import TaskApi from "api/task";
// import { useEffect, useState } from "react";
// Custom components
import Card from "components/card/Card.js";
// Assets

export default function GeneralInformation(props) {
  // const { _id } = props;
  // const [tasks, setTasks] = useState({
  //   department: "جاري التحميل",
  //   service: "جاري التحميل",
  //   element: "جاري التحميل",
  //   progress: "جاري التحميل",
  //   reason: "جاري التحميل",
  //   creator: "جاري التحميل",
  //   status: "جاري التحميل",
  //   date: "جاري التحميل",
  //   assigned: "جاري التحميل",
  // });
  // const getTask = async (_id) => {
  //   let response = await TaskApi.GetTask({ _id });
  //   setTasks([response.data]);
  // };

  // const getTasks = async () => {
  //   let response = await TaskApi.Get();
  //   setTasks([response.data]);
  // };
  // useEffect(() => {
  //   if (_id !== null) getTask(_id);
  //   else getTasks();
  // }, [_id]);
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  return (
    <Card mb={{ base: "0px", "2xl": "20px" }}>
      <Text
        color={textColorPrimary}
        fontWeight="bold"
        fontSize="2xl"
        mt="10px"
        mb="4px"
      >
        تعديل المهمة
      </Text>
      {/*tasks
        ? tasks.map((task) => (
            <>
              <Text
                mt="45px"
                mb="36px"
                color={textColor}
                fontSize="2xl"
                ms="24px"
                fontWeight="700"
              >
                طلب مقدم من كلية {task.creator.name}
              </Text>
              <SimpleGrid
                columns={{ base: 1, md: 1, xl: 2 }}
                gap="20px"
                mx="40px"
                mb="40px"
              >
                <Information
                  boxShadow={cardShadow}
                  title="القسم"
                  value={task.department}
                />
                <Information
                  boxShadow={cardShadow}
                  title="الخدمة"
                  value={task.service}
                />
                <Information
                  boxShadow={cardShadow}
                  title="العنصر"
                  value={task.element}
                />
                <Information
                  boxShadow={cardShadow}
                  title="الحالة"
                  value={task.status}
                />
                <Information
                  boxShadow={cardShadow}
                  title="السبب"
                  value={task.reason}
                />
                <Box>
                  <FormLabel
                    justifyContent="right"
                    ms="4px"
                    fontSize="large "
                    fontWeight="500"
                    color={textColor}
                    display="flex"
                  >
                    مدى التقدم
                  </FormLabel>
                  <Input
                    textAlign="right"
                    isRequired={false}
                    fontSize="large"
                    placeholder={task.progress}
                    mb="24px"
                    size="lg"
                    defaultValue={task.progress}
                    type="text"
                    variant="auth"
                  />
                </Box>
              </SimpleGrid>
            </>
          ))
        : console.log("NOPE")*/}
    </Card>
  );
}
