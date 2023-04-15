import GridList from "./components/GridList";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Stack, Heading, Text,Container,Box,Button, useColorModeValue, useBreakpointValue } from "@chakra-ui/react";
export default function Home() {
  const history = useHistory();
  return(
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={{ base: "2xl", sm: "5xl" }} fontWeight={"bold"}>
          منظومة تقديم الطلبات والبلاغات   
        </Heading>
        <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'blue.400',
                zIndex: -1,
              }}>
              لمركز الحساب العلمي
            </Text>
            <br />{' '}
          </Heading>
        <Text color={useColorModeValue("gray.700","gray.100")} fontSize="2xl">
        يمكنك من خلال هذا النظام الالكتروني أن تقوم بطلب خدمة من خدمات مركز الحساب العلمي او تقديم بلاغ ومتابعته عن أي عطل خاص بأقسام المركز
        </Text>
      </Stack>
      <GridList/>
      <Button
                fontSize='sm'
                variant='brand'
                fontWeight='500'
                w='100%'
                h='50'
                mb='24px'
                onClick={() => history.push('/auth/register')}
              >
                تسجيل شكوى
      </Button>
    </Box>
  )

  }








