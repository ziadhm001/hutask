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
} from "@chakra-ui/react"
import TaskApi from "api/task"
import UserApi from "api/user"
import { useState, useEffect } from "react"

export default function Task(props) {
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white")
    const borderColor = useColorModeValue(
        "white !important",
        "#111C44 !important"
    )
    let ops = {
        month: "long",
        day: "numeric",
        year: "numeric",
    }

    let [employees, setEmployees] = useState(props.employees)
    let assignedEmployees = props.assigned
    let [status, setStatus] = useState(props.status)
    const updateProgress = async (progress) => {
        let response = await TaskApi.UpdateTask(props._id, { progress })
        setStatus(response.data.status)
        props.setChange(new Date())
    }

    useEffect(() => {
        setStatus(props.status)
        setSliderValue(props.progress)
        if (Array.isArray(props.employees)) {
            let taskEmployees = props.employees.filter((employee) => {
                return employee.department === props.department
            })
            setEmployees(taskEmployees)
        }
    }, [props.status, props.employees])
    const changeEmployeeAssignState = async (e) => {
        const user_id = e.target.value.split("|")[0]
        const task_id = e.target.value.split("|")[1]
        if (e.target.checked) {
            await UserApi.AssignTask({ task_id, user_id })
            assignedEmployees = props.assigned
        } else {
            await UserApi.UnAssignTask({ task_id, user_id })
            assignedEmployees = props.assigned
        }
        props.setChange(new Date())
    }

    const formColor = useColorModeValue(
        "#bfd1fc !important",
        "#192655 !important"
    )
    const [sliderValue, setSliderValue] = useState(props.progress)
    const labelStyles = {
        mt: "3",
        ml: "-2.5",
        fontSize: "sm",
    }
    return (
        <Container
            bg={borderColor}
            maxW="100%"
            mt={0}
            marginBottom="20px"
            centerContent
            overflow="hidden"
            padding="50px"
        >
            <Flex>
                <Box
                    bg={borderColor}
                    color="white"
                    borderRadius="lg"
                    m={{ sm: 1, md: 1, lg: 1 }}
                    p={{ sm: 1, md: 1, lg: 1 }}
                >
                    <Box p={1}>
                        <Wrap
                            bg={borderColor}
                            spacing={{ base: 20, sm: 3, md: 5, lg: 10 }}
                        >
                            <WrapItem>
                                <Box>
                                    <Heading color={textColorPrimary}>
                                        {props.name === "لا يوجد طلبات"
                                            ? props.name
                                            : `طلب من ${props.name}`}
                                    </Heading>
                                    {props.name === "لا يوجد طلبات" ? (
                                        <></>
                                    ) : (
                                        <Text
                                            fontWeight="bold"
                                            fontSize="larger"
                                            mt="10px"
                                            color={textColorPrimary}
                                            marginBottom="15px"
                                        >
                                            بتاريخ:{" "}
                                            {new Intl.DateTimeFormat(
                                                "ar-AE-u-nu-latn",
                                                ops
                                            ).format(props.date)}
                                        </Text>
                                    )}
                                    {props.name === "لا يوجد طلبات" ? (
                                        <></>
                                    ) : (
                                        <Flex
                                            margin="auto"
                                            align="center"
                                            flexDirection="column"
                                            justifyContent="center"
                                            alignItems="center"
                                            bg={
                                                status === "جاري التنفيذ"
                                                    ? "yellow.500"
                                                    : status === "تم الانتهاء"
                                                    ? "green.500"
                                                    : status === "لم تبدأ بعد"
                                                    ? "red.500"
                                                    : null
                                            }
                                            rounded={"25px"}
                                            w={"75%"}
                                            h={"30px"}
                                            textAlign="center"
                                        >
                                            <Text
                                                display="inline"
                                                marginLeft="5px"
                                                fontWeight="bold"
                                                fontSize="larger"
                                                color="white"
                                                stroke="black"
                                            >
                                                {status}
                                            </Text>
                                        </Flex>
                                    )}

                                    {props.name === "لا يوجد طلبات" ? (
                                        <></>
                                    ) : (
                                        <Box pt={6} justifyContent="center">
                                            <Text
                                                fontWeight="bold"
                                                fontSize="2xl"
                                                mt="10px"
                                                color={textColorPrimary}
                                                textAlign="center"
                                                marginBottom="30px"
                                            >
                                                نسبة انجاز المهمة
                                            </Text>
                                            <Slider
                                                isReadOnly={
                                                    status === "تم الانتهاء"
                                                }
                                                accessKey=""
                                                onChangeEnd={updateProgress}
                                                marginLeft="30px"
                                                width="260px"
                                                value={sliderValue}
                                                aria-label="slider-ex-6"
                                                onChange={(val) => {
                                                    setSliderValue(val)
                                                }}
                                            >
                                                <SliderMark
                                                    color={textColorPrimary}
                                                    value={25}
                                                    {...labelStyles}
                                                >
                                                    25%
                                                </SliderMark>
                                                <SliderMark
                                                    color={textColorPrimary}
                                                    value={50}
                                                    {...labelStyles}
                                                >
                                                    50%
                                                </SliderMark>
                                                <SliderMark
                                                    color={textColorPrimary}
                                                    value={75}
                                                    {...labelStyles}
                                                >
                                                    75%
                                                </SliderMark>
                                                <SliderMark
                                                    value={sliderValue}
                                                    textAlign="center"
                                                    bg="blue.500"
                                                    color="white"
                                                    mt="-10"
                                                    ml="-5"
                                                    w="12"
                                                >
                                                    {sliderValue}%
                                                </SliderMark>
                                                <SliderTrack>
                                                    <SliderFilledTrack />
                                                </SliderTrack>
                                                <SliderThumb />
                                            </Slider>
                                        </Box>
                                    )}
                                    <HStack
                                        mt={{ lg: 10, md: 10 }}
                                        spacing={2}
                                        px={2}
                                        alignItems="flex-start"
                                    ></HStack>
                                </Box>
                            </WrapItem>
                            {props.name === "لا يوجد طلبات" ? (
                                <></>
                            ) : (
                                <WrapItem>
                                    <Box
                                        bg={formColor}
                                        borderRadius="lg"
                                        width="100%"
                                        margin="auto"
                                    >
                                        <Box m={8} color="#0B0E3F">
                                            <VStack spacing={2}>
                                                <FormControl id="name">
                                                    <FormLabel
                                                        fontSize="larger"
                                                        fontWeight="bold"
                                                        color={textColorPrimary}
                                                    >
                                                        القسم
                                                    </FormLabel>
                                                    <Input
                                                        readOnly
                                                        value={props.department}
                                                        bg={formColor}
                                                        color={textColorPrimary}
                                                        type="text"
                                                        size="md"
                                                        borderColor={
                                                            textColorPrimary
                                                        }
                                                    />
                                                </FormControl>
                                                <FormControl id="name">
                                                    <FormLabel
                                                        fontSize="larger"
                                                        fontWeight="bold"
                                                        color={textColorPrimary}
                                                    >
                                                        الخدمة
                                                    </FormLabel>
                                                    <Input
                                                        readOnly
                                                        value={props.service}
                                                        bg={formColor}
                                                        color={textColorPrimary}
                                                        type="text"
                                                        size="md"
                                                        borderColor={
                                                            textColorPrimary
                                                        }
                                                    />
                                                </FormControl>
                                                <FormControl id="name">
                                                    <FormLabel
                                                        fontSize="larger"
                                                        fontWeight="bold"
                                                        color={textColorPrimary}
                                                    >
                                                        العنصر
                                                    </FormLabel>
                                                    <Input
                                                        readOnly
                                                        value={props.element}
                                                        bg={formColor}
                                                        color={textColorPrimary}
                                                        type="text"
                                                        size="md"
                                                        borderColor={
                                                            textColorPrimary
                                                        }
                                                    />
                                                </FormControl>
                                                <FormControl id="name">
                                                    <FormLabel
                                                        fontSize="larger"
                                                        fontWeight="bold"
                                                        color={textColorPrimary}
                                                    >
                                                        السبب
                                                    </FormLabel>
                                                    <Textarea
                                                        readOnly
                                                        value={props.reason}
                                                        bg={formColor}
                                                        color={textColorPrimary}
                                                        height="150px"
                                                        width="100%"
                                                        borderColor={
                                                            textColorPrimary
                                                        }
                                                        _hover={{
                                                            borderRadius: {
                                                                textColorPrimary,
                                                            },
                                                        }}
                                                        placeholder="message"
                                                    />
                                                </FormControl>
                                                <FormControl id="name">
                                                    <FormLabel
                                                        fontSize="larger"
                                                        fontWeight="bold"
                                                        color={textColorPrimary}
                                                    >
                                                        القائمين على الخدمة
                                                    </FormLabel>
                                                </FormControl>
                                                <Box boxSize="100%">
                                                    <Stack
                                                        direction="column"
                                                        divider={
                                                            <StackDivider
                                                                borderColor={
                                                                    textColorPrimary
                                                                }
                                                            />
                                                        }
                                                    >
                                                        {employees &&
                                                            employees.map(
                                                                (
                                                                    employee,
                                                                    index
                                                                ) => (
                                                                    <Checkbox
                                                                        isReadOnly={
                                                                            status ===
                                                                            "تم الانتهاء"
                                                                        }
                                                                        color={
                                                                            textColorPrimary
                                                                        }
                                                                        fontWeight="bold"
                                                                        fontSize="smaller"
                                                                        colorScheme="green"
                                                                        isChecked={
                                                                            props
                                                                                .assigned
                                                                                .length !==
                                                                                0 &&
                                                                            props.assigned.filter(
                                                                                (
                                                                                    employee_id
                                                                                ) =>
                                                                                    employee_id ===
                                                                                    employee._id
                                                                            )
                                                                                .length !==
                                                                                0
                                                                        }
                                                                        key={
                                                                            index
                                                                        }
                                                                        onChange={
                                                                            changeEmployeeAssignState
                                                                        }
                                                                        value={
                                                                            employee._id +
                                                                            "|" +
                                                                            props._id
                                                                        }
                                                                    >
                                                                        {
                                                                            employee.name
                                                                        }
                                                                    </Checkbox>
                                                                )
                                                            )}
                                                    </Stack>
                                                </Box>
                                            </VStack>
                                        </Box>
                                    </Box>
                                </WrapItem>
                            )}
                        </Wrap>
                    </Box>
                </Box>
            </Flex>
        </Container>
    )
}
