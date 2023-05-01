import React from "react"
import { useEffect } from "react"
import UserApi from "api/user"
import { useAuthContext } from "hooks/useAuthContext"
// chakra imports
import {
    Box,
    Flex,
    Drawer,
    DrawerBody,
    Icon,
    useColorModeValue,
    DrawerOverlay,
    useDisclosure,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/react"
import Content from "components/sidebar/components/Content"
import {
    renderThumb,
    renderTrack,
    renderView,
} from "components/scrollbar/Scrollbar"
import { Scrollbars } from "react-custom-scrollbars-2"
import PropTypes from "prop-types"

// Assets
import { IoMenuOutline } from "react-icons/io5"

function Sidebar(props) {
    const { routes } = props

    let variantChange = "0.2s linear"
    let shadow = useColorModeValue(
        "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
        "unset"
    )
    // Chakra Color Mode
    let sidebarBg = useColorModeValue("white", "navy.800")
    let sidebarMargins = "0px"
    let { user } = useAuthContext()
    if (!user) {
        user = localStorage.getItem("user")
        user = JSON.parse(user)
    }
    //  BRAND
    useEffect(() => {
        const getRole = async () => {
            try {
                await UserApi.GetRole(user._id)
            } catch (err) {
                if (err.response.request.status === 401)
                    localStorage.removeItem("user")
            }
        }
        getRole()
    }, [])
    // SIDEBAR
    return (
        <Box display={{ sm: "none", xl: "block" }} position="fixed" minH="100%">
            <Box
                bg={sidebarBg}
                transition={variantChange}
                w="210px"
                h="100vh"
                m={sidebarMargins}
                minH="100%"
                overflowX="hidden"
                boxShadow={shadow}
            >
                <Scrollbars
                    autoHide
                    renderTrackVertical={renderTrack}
                    renderThumbVertical={renderThumb}
                    renderView={renderView}
                >
                    <Content routes={routes} />
                </Scrollbars>
            </Box>
        </Box>
    )
}

// FUNCTIONS
export function SidebarResponsive(props) {
    let sidebarBackgroundColor = useColorModeValue("white", "navy.800")
    let menuColor = useColorModeValue("gray.400", "white")
    // // SIDEBAR
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const { routes } = props
    // let isWindows = navigator.platform.startsWith("Win");
    let { user } = useAuthContext()
    if (!user) {
        user = localStorage.getItem("user")
        user = JSON.parse(user)
    }
    //  BRAND
    useEffect(() => {
        const getRole = async () => {
            try {
                await UserApi.GetRole(user._id)
            } catch (err) {
                if (err.response.request.status === 401)
                    localStorage.removeItem("user")
            }
        }
        getRole()
    }, [])

    return (
        <Flex display={{ sm: "flex", xl: "none" }} alignItems="center">
            <Flex ref={btnRef} w="max-content" h="max-content" onClick={onOpen}>
                <Icon
                    as={IoMenuOutline}
                    color={menuColor}
                    my="auto"
                    w="15px"
                    h="15px"
                    me="px"
                    _hover={{ cursor: "pointer" }}
                />
            </Flex>
            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                placement={
                    document.documentElement.dir === "rtl" ? "right" : "left"
                }
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent
                    w="210px"
                    maxW="210px"
                    bg={sidebarBackgroundColor}
                >
                    <DrawerCloseButton
                        zIndex="3"
                        onClose={onClose}
                        _focus={{ boxShadow: "none" }}
                        _hover={{ boxShadow: "none" }}
                    />
                    <DrawerBody maxW="210px" px="0rem" pb="0">
                        <Scrollbars
                            autoHide
                            renderTrackVertical={renderTrack}
                            renderThumbVertical={renderThumb}
                            renderView={renderView}
                        >
                            <Content routes={routes} />
                        </Scrollbars>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Flex>
    )
}
// PROPS

Sidebar.propTypes = {
    logoText: PropTypes.string,
    routes: PropTypes.arrayOf(PropTypes.object),
    variant: PropTypes.string,
}

export default Sidebar
