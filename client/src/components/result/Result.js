import { Box, Heading, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import Card from "components/card/Card";

export default function Success(props) {
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => {
      return history.push("/admin/dashboard");
    }, 3000);
  }, [history]);

  return (
    <Card marginY="10%" maxW="50%" marginX="25%">
      <Box textAlign="center" py={10} px={6}>
        <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
        <Heading as="h2" size="xl" mt={6} mb={2}>
          {props.heading}
        </Heading>
        <Text color={"gray.500"}>{props.text}</Text>
      </Box>
    </Card>
  );
}
