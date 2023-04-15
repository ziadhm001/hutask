import {
  Flex,
  Table,
  Progress,
  Icon,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";
// Assets
import {
  MdCheckCircle,
  MdOutlineTimer,
  MdOutlineError,
  MdEdit,
} from "react-icons/md";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
export default function ColumnsTable(props) {
  const { columnsData, tableData } = props;
  let ops = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const history = useHistory();
  const showDetails = (task_id) => {
    history.push(`/admin/tasks/${task_id}`);
  };
  const brandColor = useColorModeValue("brand.500", "white");
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 5;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Text
        color={textColor}
        fontSize="22px"
        fontWeight="700"
        lineHeight="100%"
        align="left"
        px="25px"
      >
        المهمات
      </Text>
      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe="10px"
                  key={index}
                  borderColor={borderColor}
                >
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "القسم") {
                    data = (
                      <Text
                        color={textColor}
                        fontSize="sm"
                        fontWeight="700"
                        align="left"
                      >
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "مقدم الطلب") {
                    data = (
                      <Text
                        color={textColor}
                        fontSize="sm"
                        fontWeight="700"
                        align="left"
                      >
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "الخدمة") {
                    data = (
                      <Text
                        color={textColor}
                        fontSize="sm"
                        fontWeight="700"
                        align="left"
                      >
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "تفاصيل") {
                    data = (
                      <Icon
                        w="32px"
                        h="32px"
                        as={MdEdit}
                        color={brandColor}
                        cursor="pointer"
                        onClick={() => showDetails(cell.value)}
                      />
                    );
                  } else if (cell.column.Header === "الحالة") {
                    data = (
                      <Flex align="center">
                        <Icon
                          w="24px"
                          h="24px"
                          marginRight="5px"
                          color={
                            cell.value === "جاري التنفيذ"
                              ? "yellow.500"
                              : cell.value === "تم الانتهاء"
                              ? "green.500"
                              : cell.value === "لم تبدأ بعد"
                              ? "red.500"
                              : null
                          }
                          as={
                            cell.value === "تم الانتهاء"
                              ? MdCheckCircle
                              : cell.value === "جاري التنفيذ"
                              ? MdOutlineTimer
                              : cell.value === "لم تبدأ بعد"
                              ? MdOutlineError
                              : null
                          }
                        />
                        <Text
                          color={textColor}
                          fontSize="sm"
                          fontWeight="700"
                          align="left"
                        >
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "التاريخ") {
                    data = (
                      <Text
                        color={textColor}
                        fontSize="sm"
                        fontWeight="700"
                        align="left"
                      >
                        {new Intl.DateTimeFormat("ar-AE-u-nu-latn", ops).format(
                          cell.value
                        )}
                      </Text>
                    );
                  } else if (cell.column.Header === "نسبة الانجاز") {
                    data = (
                      <Flex align="center">
                        <Text
                          color={textColor}
                          fontSize="sm"
                          fontWeight="700"
                          align="left"
                        >
                          %{cell.value}
                        </Text>
                        <Progress
                          variant="table"
                          colorScheme="brandScheme"
                          h="8px"
                          w="108px"
                          mx="3px"
                          value={cell.value}
                        />
                      </Flex>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      maxH="30px !important"
                      py="8px"
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                    >
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
}
