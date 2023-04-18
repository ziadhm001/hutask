import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  FcAbout,
  FcAssistant,
  FcCollaboration,
  FcDonate,
  FcFlowChart,
  FcSupport,
  FcMultipleDevices,
} from "react-icons/fc";

import Card from "./Card";

export default function gridListWith() {
  return (
    <Box p={4}>
      <Container maxW={"5xl"}>
        <Flex flexWrap="wrap" gridGap={2} justify="center">
          <SimpleGrid columns={{ base: 1, md: 1, xl: 3 }} gap="20px" mb="20px">
            <Card
              heading={"البوابة الالكترونية"}
              icon={<Icon as={FcMultipleDevices} w={10} h={10} />}
              description={
                "نبني جميع مواقعنا بأفضل برنامج إدارة محتوى وهو ما يسمح بإدارة جميع المحتويات الموجودة مسؤول عن بوابة الجامعة الالكترونية"
              }
            />
            <Card
              heading={"قسم الشبكة"}
              icon={<Icon as={FcCollaboration} w={10} h={10} />}
              description={
                "مسؤول عن خوادم الجامعة ومتابعة أداء المستخدمين ووضع سياسات وصلاحيات استخدام الشبكة في أغراض العمل"
              }
              href={"#"}
            />
            <Card
              heading={"قسم البرمجة"}
              icon={<Icon as={FcFlowChart} w={10} h={10} />}
              description={
                "يقوم بتحليل وتصميم وتنفيذ برامج الكمبيوتر لتستطيع متابعة اعمالك الكترونيا والاستفادة الكاملة من البيانات"
              }
              href={"#"}
            />
            <Card
              heading={"قسم الصيانة"}
              icon={<Icon as={FcSupport} w={10} h={10} />}
              description={"مسؤول عن أجهزة الحاسب الالي من صيانة وفحص واصلاح"}
              href={"#"}
            />
            <Card
              heading={"قسم دعم الكنترول"}
              icon={<Icon as={FcAbout} w={10} h={10} />}
              description={
                "تقديم الدعم الفنى لبرنامج الكنترول وبرنامج التشعيب ومجال الايميلات الجامعية للسادة اعضاء هيئة التدريس"
              }
              href={"#"}
            />
            <Card
              heading={"وحدة الدعم الالكتروني"}
              icon={<Icon as={FcAssistant} w={10} h={10} />}
              description={
                "هى مجموعة مخصصة لبعض الأنشطة والخدمات الطلابية التى تقدمها وحدة الدعم الإلكترونى بجامعة حلوان"
              }
              href={"#"}
            />
          </SimpleGrid>
        </Flex>
      </Container>
    </Box>
  );
}
