import { Flex, Image, useColorModeValue } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
const AuthLayout = () => {
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        bgColor={bgColor}
        p="10px"
        mt={"5px"}
      >
        <Image
          src={logo}
          width={"180px"}
          height={"80px"}
          alt="Logo is loading"
        />
      </Flex>
      <Outlet />
    </>
  );
};

export default AuthLayout;
