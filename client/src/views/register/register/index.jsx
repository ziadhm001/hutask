import TaskApi from "../../../api/task";
// Chakra imports
import {
  Box,
  Button,
  Textarea,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Select,
  InputRightElement,
  Text,
  useColorModeValue,
  IconButton,
  Input
} from "@chakra-ui/react";
// Custom components
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import { MdOutlineRemoveRedEye,MdArrowForward } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useAuthContext } from "hooks/useAuthContext";

function SignIn() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");

  const { user } = useAuthContext()
  const history = useHistory();
  const [buttonText, setButtonText] = useState("تسجيل موظف");
  const [error, setError] = useState(undefined);
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const brandStars = useColorModeValue("brand.500", "brand.400");

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const register = async (event) => {
    if (event) {
      event.preventDefault();
    }
    if (name === "") {
      return setError("من فضلك ادخل اسم الموظف ");
    }
    if (username === "") {
      return setError("من فضلك ادخل اسم السمتخدم");
    }
    if (password === "") {
      return setError("من فضلك ادخل كلمة المرور");
    }
    if (password !== confirmPassword) {
      return setError("من فضلك ادخل كلمة مرور متطابقة");
    }
    if (email === "") {
      return setError("من فضلك ادخل البريد الالكتروني");
    }
    if (department === "") {
      return setError("من فضلك ادخل القسم التابع له");
    }
    if (role === "") {
      return setError("من فضلك ادخل المنصب");
    }
     try {
      setButtonText("جاري تسجيل الحساب");

      // Register user here
      let response = await TaskApi.Register({
        name,
        username,
        password,
        email,
        department,
        role,
        assigned: null,
        created: null,
      });
      if (response.data.progress !== 0) {
        setButtonText("تسجيل الشكوى");
        return setError(response.data.msg);
      }
      return history.push("/");
    } catch (err) {
      console.log(err);
      setButtonText("تسجيل الشكوى");
      if (err.response) {
        return setError(err.response.data.msg);
      }
      return setError("حدث خطأ");
    }
  };
  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>

      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w='100%'
        mx={{ base: "auto", lg: "0px" }}
        me='auto'
        h='100%'
        alignItems='start'
        justifyContent='center'
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "42px", md: "3vh" }}
        flexDirection='column'>
          
        <IconButton
          variant='outline'
          colorScheme='teal'
          aria-label='Call Sage'
          fontSize='20px'
          icon={<MdArrowForward />}
          onClick={() => history.goBack()}
        /> 

        <Box me='auto'>
          <Heading color={textColor} fontSize='36px' mb='10px' marginLeft='100px'>
            تسجيل موظف جديد 
          </Heading>
        </Box>
        <Flex
          zIndex='2'
          direction='column'
          w={{ base: "100%", md: "420px" }}
          maxW='100%'
          background='transparent'
          borderRadius='15px'
          mx={{ base: "auto", lg: "unset" }}
          me='auto'
          mb={{ base: "20px", md: "auto" }}>
          <Flex
            zIndex='2'
            direction='column'
            w={{ base: "100%", md: "420px" }}
            maxW='100%'
            background='transparent'
            borderRadius='15px'
            mx={{ base: "auto", lg: "unset" }}
            me='auto'
            mb={{ base: "20px", md: "auto" }}>
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
            <FormControl >
            <FormLabel
                  justifyContent='left'
                  display='flex'
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  mb='8px'>
                اسم الموظف
                <Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                textAlign='left'
                isRequired={true}
                variant='auth'
                fontSize='sm'
                color='black'
                type="text"
                ms={{ base: "0px", md: "0px" }}
                placeholder='اسم الموظف'
                mb='24px'
                fontWeight='500'
                size='lg'
                onChange={(event) => {
                  setName(event.target.value);
                  setError(undefined);
                }} />
                            <FormLabel
                  justifyContent='left'
                  display='flex'
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  mb='8px'>
                اسم المستخدم   
                <Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                textAlign='left'
                isRequired={true}
                variant='auth'
                fontSize='sm'
                color='black'
                type="text"
                ms={{ base: "0px", md: "0px" }}
                placeholder='اسم المستخدم'
                mb='24px'
                fontWeight='500'
                size='lg'
                onChange={(event) => {
                  setUsername(event.target.value);
                  setError(undefined);
                }} />
                                            <FormLabel
                  justifyContent='left'
                  display='flex'
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  mb='8px'>
                    البريد الالكتروني
                <Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                textAlign='left'
                isRequired={true}
                variant='auth'
                fontSize='sm'
                color='black'
                type="text"
                ms={{ base: "0px", md: "0px" }}
                placeholder='البريد الالكتروني'
                mb='24px'
                fontWeight='500'
                size='lg'
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError(undefined);
                }} />
                <FormLabel
                  justifyContent='left'
                  display='flex'
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  mb='8px'>
                  كلمة المرور
                <Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                textAlign='left'
                isRequired={true}
                variant='auth'
                fontSize='sm'
                color='black'
                type="password"
                ms={{ base: "0px", md: "0px" }}
                placeholder='كلمة المرور'
                mb='24px'
                fontWeight='500'
                size='lg'
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError(undefined);
                }} />
                                <FormLabel
                  justifyContent='left'
                  display='flex'
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  mb='8px'>
                    تأكيد كلمة المرور
                <Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                textAlign='left'
                isRequired={true}
                variant='auth'
                fontSize='sm'
                color='black'
                type="password"
                ms={{ base: "0px", md: "0px" }}
                placeholder='تأكيد كلمة المرور'
                mb='24px'
                fontWeight='500'
                size='lg'
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                  setError(undefined);
                }} />
              <FormLabel 
                justifyContent='left'
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'>
                اختر القسم<Text color={brandStars}>*</Text>
              </FormLabel>
              <Select
                textAlign='left'
                isRequired={true}
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "0px" }}
                placeholder='اختر القسم'
                mb='24px'
                fontWeight='500'
                size='lg'
                onChange={(event) => {
                  setDepartment(event.target.value);
                  setError(undefined);
                }}
              >
                <option value='البرمجة'>البرمجة</option>
                <option value='البوابة الالكترونية'>البوابة الالكترونية</option>
                <option value='الدعم الالكتروني'>الدعم الالكتروني</option>
                <option value='الشبكات'>الشبكات</option>
                <option value='الدعم الفني'>الدعم الفني</option>
                <option value='الصيانة'>الصيانة</option>
              </Select>
              <FormLabel 
                justifyContent='left'
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'>
                اختر القسم<Text color={brandStars}>*</Text>
              </FormLabel>
              <Select
                textAlign='left'
                isRequired={true}
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "0px" }}
                placeholder='اختر القسم'
                mb='24px'
                fontWeight='500'
                size='lg'
                onChange={(event) => {
                  setRole(event.target.value);
                  setError(undefined);
                }}
              >
                <option value='admin'>مدير</option>
                <option value='employee'>موظف</option>

              </Select>
              <Button
                fontSize='sm'
                variant='brand'
                fontWeight='500'
                w='100%'
                h='50'
                mb='24px'
                onClick={register}
              >
                {buttonText}
              </Button>
            </FormControl>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
