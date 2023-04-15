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
  IconButton
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
  const [department, setDepartment] = useState("");
  const [service, setService] = useState("");
  const [element, setElement] = useState("");
  const [reason, setReason] = useState("");
  const { user } = useAuthContext()
  const history = useHistory();
 /* const programmingOptions = ["برنامج جديد","تطوير برنامج","دعم فني لبرنامج"];
  const eGateOptions = ["موقع جديد","تطوير موقع","دعم فني لموقع"];
  const eSupportOptions = ["الكارنيهات","أكواد الدفع","كتب الكترونية","عرض نتائج","القدرات","التظلمات","اخرى"];
  const networkOptions = ["نقاط الانترنت","خوادم","سويتشات","اخرى"];
  const tSupportOptions = ["الكنترولات","الايميلات","اخرى"];
  const maintainanceOptions = ["مشاكل هاردوير","مشاكل سوفتوير","تكهين","الطابعات","اخرى"];
  const othersOptions = ["اخرى"];*/
  const [buttonText, setButtonText] = useState("تسجيل الشكوى");
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
    if (department === "") {
      return setError("من فضلك اختر القسم");
    }
    if (service === "") {
      return setError("من فضلك اختر الخدمة");
    }
    if (element === "") {
      return setError("من فضلة اختر عنصر الخدمة");
    }
    if (reason === "") {
      return setError("من فضلك ادخل سبب البلاغ");
    }
     try {
      setButtonText("جاري ارسال الشكوى");

      // Register user here
      let response = await TaskApi.Register({
        department,
        service,
        element,
        reason,
        progress: 0,
        assigned: null,
        date: Date.now(),
        status: 'لم تبدأ بعد',
        creator: user._id,
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
            تسجيل بلاغ جديد 
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
                <option value='أخرى'>أخرى</option>
              </Select>
              <FormLabel
                justifyContent='left'
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'>
                الخدمات التابعة للقسم<Text color={brandStars}>*</Text>
              </FormLabel>
              <Select
                textAlign='left'
                isRequired={true}
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "0px" }}
                placeholder='اختر الخدمة'
                mb='24px'
                fontWeight='500'
                size='lg'
                onChange={(event) => {
                  setService(event.target.value);
                  setError(undefined);
                }}
              ><option value='برنامج جديد'>برنامج جديد</option></Select>
              <FormLabel
                justifyContent='left'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                display='flex'>
                عناصر الخدمات<Text color={brandStars}>*</Text>
              </FormLabel>
              
              
                <Select
                  textAlign='left'
                  isRequired={true}
                  fontSize='sm'
                  placeholder='اختر العنصر'
                  mb='24px'
                  size='lg'
                  variant='auth'
                  onChange={(event) => {
                    setElement(event.target.value);
                    setError(undefined);
                  }}
                ><option value='تصميم برنامج'>تصميم برنامج</option></Select>
                
                <FormLabel
                  justifyContent='left'
                  display='flex'
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  mb='8px'>
                سبب البلاغ
                <Text color={brandStars}>*</Text>
              </FormLabel>
              <Textarea
                textAlign='left'
                isRequired={true}
                variant='auth'
                fontSize='sm'
                color='black'
                ms={{ base: "0px", md: "0px" }}
                placeholder='من فضلك ادخل سبب البلاغ'
                mb='24px'
                fontWeight='500'
                size='lg'
                onChange={(event) => {
                  setReason(event.target.value);
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
