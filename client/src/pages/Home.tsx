import { Box, Flex, Text, Avatar, useColorModeValue } from "@chakra-ui/react";
// import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";
import { socketService } from "../services/socket";
import cookieServices from "../services/cookieServices";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { setOnlineUser, setSocketConnection } from "../app/features/userSlice";

const HomePage = () => {
  const chatListBg = useColorModeValue("white", "gray.800");
  const mainContentBg = useColorModeValue("gray.100", "gray.900");

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {});
  useEffect(() => {
    const connection = socketService.connect({
      token: cookieServices.get("token"),
    });

    // get online users
    socketService.on("getOnlineUsers", (users: string[]) => {
      dispatch(setOnlineUser(users));
    });

    dispatch(setSocketConnection(connection));
    return () => {
      socketService.disconnect();
    };
  }, []);
  return (
    <Flex h="100vh">
      {/* Sidebar */}
      <Sidebar></Sidebar>
      {/* Chat List Panel */}
      <Box w="300px" bg={chatListBg} p={4} shadow="md" overflowY="auto">
        <Text color={"white"} fontSize="lg" fontWeight="bold" align={"center"}>
          Chats
        </Text>
        <Text color="gray.500" mt={4}>
          Explore users to start a conversation with.
        </Text>
        {/* Example Chat List Item */}
        <Flex mt={4} align="center">
          <Avatar name="User 1" src="https://bit.ly/broken-link" size="md" />
          <Box ml={3}>
            <Text fontWeight="bold">User 1</Text>
            <Text fontSize="sm" color="gray.500">
              Last message preview...
            </Text>
          </Box>
        </Flex>
        {/* Add more chat list items as needed */}
      </Box>

      {/* Main Content */}
      <Flex flex="1" direction="column" bg={mainContentBg} p={4}>
        <Flex flex="1" align="center" justify="center" direction="column">
          {/* <Image src={logo} width={250} alt="logo" /> */}
          <Text fontSize="4xl" fontWeight="bold" color="blue.500">
            chat app
          </Text>
          <Text color="gray.500">Select user to send message</Text>
        </Flex>
        {/* <Box mt={4}>
          <Input placeholder="Type your message..." />
        </Box> */}
      </Flex>
    </Flex>
  );
};

export default HomePage;
