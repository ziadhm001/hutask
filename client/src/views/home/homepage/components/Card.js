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
  const { heading, description, icon } = props;
  return (
    <Box
      maxW={{ base: "full", md: "300px" }}
      w={"full"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      maxH={{ base: "full", md: "200px" }}
    >
      <Stack align={"start"} spacing={1}>
        <Flex
          w={8}
          h={8}
          align={"center"}
          justify={"center"}
          color={"white"}
          rounded={"full"}
          bg={useColorModeValue("gray.100", "gray.700")}
        >
          {icon}
        </Flex>
        <Box>
          <Heading fontSize="larger" marginBottom="5px">
            {heading}
          </Heading>
          <Text fontSize={"16px"}>{description}.</Text>
        </Box>
      </Stack>
    </Box>
  );
}

export default Card;
