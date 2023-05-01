import TaskApi from "../../../api/task";
// Chakra imports
import {
  Box,
  Button,
  Textarea,
  Flex,
  FormControl,
  FormLabel,
  SimpleGrid,
  Input,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// Assets
import { useAuthContext } from "hooks/useAuthContext";
import axios from "axios";

function SignIn() {
  const [file, setFile] = useState("")
  const [department, setDepartment] = useState("");
  const [service, setService] = useState("");
  const [element, setElement] = useState("لا يوجد");
  const [reason, setReason] = useState("");
  const { user } = useAuthContext()
  let token = user.token
  const history = useHistory();
  const programmingOptions = ["برنامج جديد","تطوير برنامج","دعم فني لبرنامج"];
  const eGateOptions = ["موقع جديد","تطوير موقع","دعم فني لموقع"];
  const eSupportOptions = ["الكارنيهات","أكواد الدفع","كتب الكترونية","عرض نتائج","القدرات","التظلمات","اخرى"];
  const networkOptions = ["نقاط الانترنت","خوادم","سويتشات","اخرى"];
  const tSupportOptions = ["الكنترولات","الايميلات","اخرى"];
  const maintainanceOptions = ["مشاكل هاردوير","مشاكل سوفتوير","تكهين","الطابعات","اخرى"];
  const othersOptions = ["اخرى"];
  const devOrSupportProg = ["برنامج الشهادة الثبوتية","برنامج عيادة الاسنان","برنامج الكنترول","نظام مرتبات العاملين","نظام مرتبات المؤقتين","نظام مرتبات الكادر الطبي","تظام مرتبات اعضاء هيئة التدريس","الدفع الالكتروني"]
  const devOrSupportSite = ["موقع الجامعة الرئيسي","موقع كلية الهندسة بحلوان","موقع كلية الهندسة بالمطرية"]
  const [serviceList, setServiceList] = useState(null)
  const [elementList, setElementList] = useState(null)
  const [buttonText, setButtonText] = useState("تسجيل الشكوى");
  const [error, setError] = useState(undefined);
  const textColor = useColorModeValue("navy.700", "white");
  const selectColor = useColorModeValue("white","navy.700");

  const textColorSecondary = "gray.400";
  const brandStars = useColorModeValue("brand.500", "brand.400");

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const handleRegister = async (event) => {
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
      setButtonText("جاري ارسال الشكوى");
      const formData = new FormData()
      formData.append('source', file)
      formData.append('department',department)
      formData.append('service',service)
      formData.append('element',element)
      formData.append('reason',reason)
      formData.append('assigned',null)
      formData.append('date', Date.now())
      formData.append('status', "لم تبدأ بعد")
      formData.append('creator', user._id)

      // Register user here
      //let response = await TaskApi.Register({
      //  formData
      //});
      await axios.post('http://localhost:5000/api/tasks/register',formData,{headers: {"Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`}})
      .then((data)=>{history.push("/redirect/createdtask")})
      .catch ((err) => {
      console.log(err);
      setButtonText("تسجيل الشكوى");
      if (err.response) {
        return setError(err.response.data.error);
      }
      return setError("حدث خطأ");
    })
  };
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
          <Flex
            zIndex='2'
            direction='column'
            w={{ base: "100%", md: "100%" }}
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
            <form onSubmit={handleRegister} encType="multipart/form-data">
            <FormControl>
            <SimpleGrid columns={{ base: 1, md: 1, xl: 2}} gap='10px' mb='10px'>
              <Box>
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
                  switch(event.target.value){
                    case "البرمجة": setServiceList(programmingOptions); break;
                    case "البوابة الالكترونية": setServiceList(eGateOptions); break;
                    case "الدعم الالكتروني": setServiceList(eSupportOptions); break;
                    case "الشبكات": setServiceList(networkOptions); break;
                    case "الدعم الفني": setServiceList(tSupportOptions); break;
                    case "الصيانة": setServiceList(maintainanceOptions); break;
                    case "اخرى": setServiceList(othersOptions); break;
                    default: break;
                  }
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
              </Box>
              <Box>
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
                  switch(event.target.value){
                    case "تطوير برنامج": setElementList(devOrSupportProg); break;
                    case "دعم فني لبرنامج": setElementList(devOrSupportProg); break;
                    case "تطوير موقع": setElementList(devOrSupportSite); break;
                    case "دعم فني لموقع": setElementList(devOrSupportSite); break;
                    default: setElementList(null); setElement("لا يوجد"); break;
                  }
                  setService(event.target.value);
                  setError(undefined);
                }}
              >{serviceList && serviceList.map((option,i) => {return <option key={i} value={option}>{option}</option>})}</Select>
              </Box>
              <Box>
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
                  isRequired={elementList ? true : false}
                  fontSize='sm'
                  placeholder='اختر العنصر'
                  mb='24px'
                  size='lg'
                  variant='auth'
                  onChange={(event) => {
                    setElement(event.target.value);
                    setError(undefined);
                  }}
              >{elementList && elementList.map((option,i) => {return <option key={i} value={option}>{option}</option>})}</Select>
              </Box>
              <Box>
                <FormLabel
                  justifyContent='left'
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  display='flex'>
                  ارفق ملف
                </FormLabel>
                <Input
                type="file"
                onChange={(event) => {
                  setFile(event.target.files[0])
                  setError(undefined);
                }}
                height={"50px"}
                justifyContent={"center"}
                padding={"10px"}
                required={false}
                >
                </Input>                
              </Box>
              <Box>
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
              </Box>
              </SimpleGrid>
              <Button
                type="submit"
                fontSize='sm'
                variant='brand'
                fontWeight='500'
                w='100%'
                h='50'
              >
                {buttonText}
              </Button>
            </FormControl>
            </form>
          </Flex>
      </Box>
  );
}

export default SignIn;
