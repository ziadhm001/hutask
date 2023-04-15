import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

function Card(props) {
  const { heading, description, icon, href } = props;
  return (
    <Box
      maxW={{ base: "full", md: "500px" }}
      w={"full"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
    >
      <Stack align={"start"} spacing={2}>
        <Flex
          w={24}
          h={24}
          align={"center"}
          justify={"center"}
          color={"white"}
          rounded={"full"}
          bg={useColorModeValue("gray.100", "gray.700")}
        >
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size="xl" marginBottom="20px">
            {heading}
          </Heading>
          <Text mt={1} fontSize={"large"}>
            {description}.
          </Text>
        </Box>
      </Stack>
    </Box>
  );
}

export default Card;
