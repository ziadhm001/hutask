/* eslint-disable */
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
// chakra imports
import { Box, Flex, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import { useAuthContext } from "hooks/useAuthContext";
import UserApi from "api/user";
import { useEffect, useState } from "react";

export function SidebarLinks(props) {
  let { user } = useAuthContext();
  if (!user) {
    user = localStorage.getItem("user");
    user = JSON.parse(user);
  }
  //   Chakra color mode
  let location = useLocation();
  let activeColor = useColorModeValue("gray.700", "white");
  let inactiveColor = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.600"
  );
  let activeIcon = useColorModeValue("brand.500", "white");
  let textColor = useColorModeValue("secondaryGray.500", "white");
  let brandColor = useColorModeValue("brand.500", "brand.400");

  const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return (
      (location.pathname === "/home/" && routeName === "/") ||
      (location.pathname.includes(routeName) && routeName.length !== 1)
    );
  };

  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createLinks = (routes) => {
    const [role, setRole] = useState("");
    useEffect(() => {
      const getRole = async () => {
        if (user) {
          let response = await UserApi.GetRole(user._id);
          let role = response.data.users.role;
          setRole(role);
        } else setRole(null);
      };
      getRole();
    }, [role]);
    if (role && role !== "admin")
      return routes.map((route, index) => {
        if (route.category) {
          return (
            <>
              <Text
                fontSize={"md"}
                color={activeColor}
                fontWeight="bold"
                mx="auto"
                ps={{
                  sm: "10px",
                  xl: "16px",
                }}
                pt="18px"
                pb="12px"
                key={index}
              >
                {route.name}
              </Text>
              {createLinks(route.items)}
            </>
          );
        } else if (
          route.layout === "/auth" ||
          route.layout === "/user" ||
          route.layout === "/home"
        ) {
          return (
            <NavLink key={index} to={route.layout + route.path}>
              {route.icon ? (
                <Box>
                  <HStack
                    spacing={
                      activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                    }
                    py="5px"
                    ps="10px"
                  >
                    <Flex w="100%" alignItems="center" justifyContent="center">
                      <Box
                        color={
                          activeRoute(route.path.toLowerCase())
                            ? activeIcon
                            : textColor
                        }
                        me="18px"
                      >
                        {route.icon}
                      </Box>
                      <Text
                        me="auto"
                        color={
                          activeRoute(route.path.toLowerCase())
                            ? activeColor
                            : textColor
                        }
                        fontWeight={
                          activeRoute(route.path.toLowerCase())
                            ? "bold"
                            : "normal"
                        }
                      >
                        {route.name}
                      </Text>
                    </Flex>
                    <Box
                      h="36px"
                      w="4px"
                      bg={
                        activeRoute(route.path.toLowerCase())
                          ? brandColor
                          : "transparent"
                      }
                      borderRadius="5px"
                    />
                  </HStack>
                </Box>
              ) : (
                <Box>
                  <HStack
                    spacing={
                      activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                    }
                    py="5px"
                    ps="10px"
                  >
                    <Text
                      me="auto"
                      color={
                        activeRoute(route.path.toLowerCase())
                          ? activeColor
                          : inactiveColor
                      }
                      fontWeight={
                        activeRoute(route.path.toLowerCase())
                          ? "bold"
                          : "normal"
                      }
                    >
                      {route.name}
                    </Text>
                    <Box h="36px" w="4px" bg="brand.400" borderRadius="5px" />
                  </HStack>
                </Box>
              )}
            </NavLink>
          );
        }
      });
    else if (role === "admin")
      return routes.map((route, index) => {
        if (route.category) {
          return (
            <>
              <Text
                fontSize={"md"}
                color={activeColor}
                fontWeight="bold"
                mx="auto"
                ps={{
                  sm: "10px",
                  xl: "16px",
                }}
                pt="18px"
                pb="12px"
                key={index}
              >
                {route.name}
              </Text>
              {createLinks(route.items)}
            </>
          );
        } else if (
          route.layout === "/admin" ||
          route.layout === "/auth" ||
          route.layout === "/user"
        ) {
          return (
            <NavLink key={index} to={route.layout + route.path}>
              {route.icon ? (
                <Box>
                  <HStack
                    spacing={
                      activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                    }
                    py="5px"
                    ps="10px"
                  >
                    <Flex w="100%" alignItems="center" justifyContent="center">
                      <Box
                        color={
                          activeRoute(route.path.toLowerCase())
                            ? activeIcon
                            : textColor
                        }
                        me="18px"
                      >
                        {route.icon}
                      </Box>
                      <Text
                        me="auto"
                        color={
                          activeRoute(route.path.toLowerCase())
                            ? activeColor
                            : textColor
                        }
                        fontWeight={
                          activeRoute(route.path.toLowerCase())
                            ? "bold"
                            : "normal"
                        }
                      >
                        {route.name}
                      </Text>
                    </Flex>
                    <Box
                      h="36px"
                      w="4px"
                      bg={
                        activeRoute(route.path.toLowerCase())
                          ? brandColor
                          : "transparent"
                      }
                      borderRadius="5px"
                    />
                  </HStack>
                </Box>
              ) : (
                <Box>
                  <HStack
                    spacing={
                      activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                    }
                    py="5px"
                    ps="10px"
                  >
                    <Text
                      me="auto"
                      color={
                        activeRoute(route.path.toLowerCase())
                          ? activeColor
                          : inactiveColor
                      }
                      fontWeight={
                        activeRoute(route.path.toLowerCase())
                          ? "bold"
                          : "normal"
                      }
                    >
                      {route.name}
                    </Text>
                    <Box h="36px" w="4px" bg="brand.400" borderRadius="5px" />
                  </HStack>
                </Box>
              )}
            </NavLink>
          );
        }
      });
    else if (!role)
      return routes.map((route, index) => {
        if (route.category) {
          return (
            <>
              <Text
                fontSize={"md"}
                color={activeColor}
                fontWeight="bold"
                mx="auto"
                ps={{
                  sm: "10px",
                  xl: "16px",
                }}
                pt="18px"
                pb="12px"
                key={index}
              >
                {route.name}
              </Text>
              {createLinks(route.items)}
            </>
          );
        } else if (route.layout === "/auth" || route.layout === "/home") {
          return (
            <NavLink key={index} to={route.layout + route.path}>
              {route.icon ? (
                <Box>
                  <HStack
                    spacing={
                      activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                    }
                    py="5px"
                    ps="10px"
                  >
                    <Flex w="100%" alignItems="center" justifyContent="center">
                      <Box
                        color={
                          activeRoute(route.path.toLowerCase())
                            ? activeIcon
                            : textColor
                        }
                        me="18px"
                      >
                        {route.icon}
                      </Box>
                      <Text
                        me="auto"
                        color={
                          activeRoute(route.path.toLowerCase())
                            ? activeColor
                            : textColor
                        }
                        fontWeight={
                          activeRoute(route.path.toLowerCase())
                            ? "bold"
                            : "normal"
                        }
                      >
                        {route.name}
                      </Text>
                    </Flex>
                    <Box
                      h="36px"
                      w="4px"
                      bg={
                        activeRoute(route.path.toLowerCase())
                          ? brandColor
                          : "transparent"
                      }
                      borderRadius="5px"
                    />
                  </HStack>
                </Box>
              ) : (
                <Box>
                  <HStack
                    spacing={
                      activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                    }
                    py="5px"
                    ps="10px"
                  >
                    <Text
                      me="auto"
                      color={
                        activeRoute(route.path.toLowerCase())
                          ? activeColor
                          : inactiveColor
                      }
                      fontWeight={
                        activeRoute(route.path.toLowerCase())
                          ? "bold"
                          : "normal"
                      }
                    >
                      {route.name}
                    </Text>
                    <Box h="36px" w="4px" bg="brand.400" borderRadius="5px" />
                  </HStack>
                </Box>
              )}
            </NavLink>
          );
        }
      });
  };
  const createLogout = (routes) => {
    return routes.map((route, key) => {
      return (
        <NavLink to={route.layout + route.path} key={key}>
          {route.icon ? (
            <Flex
              align="center"
              justifyContent="space-between"
              w="100%"
              ps="17px"
              mb="0px"
            >
              <HStack
                mb="6px"
                spacing={
                  activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                }
              >
                <Flex w="100%" alignItems="center" justifyContent="center">
                  <Box
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? activeIcon
                        : inactiveColor
                    }
                    me="12px"
                    mt="6px"
                  >
                    {route.icon}
                  </Box>
                  <Text
                    me="auto"
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? activeColor
                        : "secondaryGray.600"
                    }
                    fontWeight="500"
                  >
                    {route.name}
                  </Text>
                </Flex>
              </HStack>
            </Flex>
          ) : (
            <ListItem ms={null}>
              <Flex ps="34px" alignItems="center" mb="8px">
                <Text
                  color={
                    activeRoute(route.path.toLowerCase())
                      ? activeColor
                      : inactiveColor
                  }
                  fontWeight="500"
                  fontSize="sm"
                >
                  {route.name}
                </Text>
              </Flex>
            </ListItem>
          )}
        </NavLink>
      );
    });
  };
  //  BRAND
  return <>{createLinks(routes)}</>;
}

export default SidebarLinks;
