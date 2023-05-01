import React,{useState} from "react";
import AuthApi from "../../../api/auth";
import { useHistory } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

import { useAuthContext } from '../../../hooks/useAuthContext'

function SignIn() {
  const { dispatch } = useAuthContext();
  const { user } = useAuthContext();
  const [username, setUsername] = useState("");  // <-- Default values HERE
  const [password, setPassword] = useState("");       // <-- Default values HERE
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const submitHandler = (event) => {
    event.preventDefault();
  }
  const login = async (event) => {
    if (event) {
      event.preventDefault();
    }
    if (user && user.token) {
      return history.push("/");
    }
    if (username === "") {
      return setError("من فضلك أدخل اسم المستخدم");
    }
    if (password === "") {
      return setError("من فضلك أدخل كلمة المرور");
    }
    setIsLoading(true);
    try {
          let response = await AuthApi.Login({
            username,
            password,
          });
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(response.data))
            // update the auth context
            dispatch({type: 'LOGIN', payload: response.data})
            if (!response.data.name) {
              setIsLoading(false);
              return setError("حدث خطأ");
            }
            else
              return history.push("/");
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      if (err.message) {
        return setError(err.response.data.error);
      }
      return setError("حدث خطأ");
    }
  };
  return (
    <Center>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w='100%'
        mx={{ base: "auto", lg: "0px" }}
        h='100%'
        alignItems='center'
        justifyContent='center'
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection='column'>
        <Box me='auto'>
          <Heading color={textColor} fontSize='36px' mb='50px' marginLeft='110px'>
              تسجيل الدخول
            </Heading>
          </Box>
          <Flex
            zIndex='2'
            direction='column'
            w={{ base: "100%", md: "420px" }}
            maxW='100%'
            background='transparent'
            borderRadius='15px'
            me='auto'
            mb={{ base: "20px", md: "auto" }}>
          
            <Flex
            zIndex='2'
            direction='column'
            w={{ base: "100%", md: "420px" }}
            maxW='100%'
            background='transparent'
            borderRadius='15px'
            me='auto'
            mb={{ base: "30px", md: "auto" }}>
              <h4
                style={{
                  fontSize: ".9em",
                  color: "red",
                  textAlign: "center",
                  fontWeight: 400,
                  transition: ".2s all",
                }}
              >
                {error}
              </h4>
              <form>
                <FormControl>
                  <FormLabel
                    justifyContent='left'
                    display='flex'
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    mb='8px'>
                    اسم المستخدم<Text color={brandStars}>*</Text>
                  </FormLabel>
                  <Input
                    textAlign='left'
                    isRequired={true}
                    variant='auth'
                    fontSize='sm'
                    ms={{ base: "0px", md: "0px" }}
                    type='text'
                    placeholder='اسم المستخدم'
                    mb='30px'
                    defaultValue={username}
                    fontWeight='500'
                    size='lg'
                    onChange={(event) => {
                      setUsername(event.target.value);
                      setError(undefined);
                    }}
                  />
                  <FormLabel
                    justifyContent='left'
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    display='flex'>
                    كلمة المرور<Text color={brandStars}>*</Text>
                  </FormLabel>
                  <InputGroup size='md'>
                    <Input
                      textAlign='left'
                      isRequired={true}
                      fontSize='sm'
                      placeholder='كلمة المرور'
                      mb='50px'
                      size='lg'
                      defaultValue={password}
                      type={show ? "text" : "password"}
                      variant='auth'
                      onChange={(event) => {
                        setPassword(event.target.value);
                        setError(undefined);
                      }}
                    />
                    <InputRightElement display='flex' alignItems='center' mt='4px'>
                      <Icon
                        color={textColorSecondary}
                        _hover={{ cursor: "pointer" }}
                        as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                        onClick={handleClick}
                      />
                    </InputRightElement>
                  </InputGroup>
                  <Button
                    fontSize='sm'
                    variant='brand'
                    fontWeight='500'
                    w='100%'
                    h='50'
                    mb='24px'
                    type='submit'
                    isLoading={isLoading}
                    loadingText="جاري تسجيل الدخول"
                    onClick={login}
                    onSubmit={submitHandler}
                    >
                    تسجيل الدخول
                  </Button>
                </FormControl>
              </form>
            <Flex
              flexDirection='column'
              justifyContent='center'
              alignItems='start'
              maxW='100%'
              mt='0px'>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
        </Center>
  );
}

export default SignIn;
