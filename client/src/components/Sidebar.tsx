import { ChatIcon, AddIcon } from "@chakra-ui/icons";
import {
  VStack,
  IconButton,
  Spacer,
  Avatar,
  useColorModeValue,
  useToast,
  AvatarBadge,
} from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import axiosInstance from "../api/axiosConfig";
import cookieServices from "../services/cookieServices";
import EditUserModel from "./EditUserModel";
import { useState } from "react";

const Sidebar = () => {
  const sidebarBg = useColorModeValue("gray.200", "gray.700");

  const toast = useToast();
  const [openEditModel, setOpenEditModel] = useState<boolean>(false);
  const onCloseEditModel = () => setOpenEditModel(false);

  // Handlers
  const handleLogout = async () => {
    try {
      await axiosInstance.get("/logout");
      cookieServices.remove("token");
      toast({
        title: "Logged out successfully",
        description: "See you next time!",
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error logging out",
        description: "Please try again later.",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
      console.error("Error logging out:", error);
      return;
    }
  };
  return (
    <>
      <VStack w="60px" bg={sidebarBg} p={4} spacing={6} align="center">
        <IconButton icon={<ChatIcon />} aria-label="Messages" />
        <IconButton icon={<AddIcon />} aria-label="Add User" />
        <Spacer />
        <IconButton
          aria-label="Edit User Info"
          onClick={() => setOpenEditModel(true)}
        >
          <Avatar name="User" src="https://bit.ly/dan-abramov" size="sm">
            <AvatarBadge boxSize="1.25em" bg="green.500" />
          </Avatar>
        </IconButton>
        <EditUserModel isOpen={openEditModel} onClose={onCloseEditModel} />
        <IconButton
          icon={<FiLogOut />}
          aria-label="Logout"
          colorScheme="red"
          variant="outline"
          onClick={handleLogout}
        />
      </VStack>
    </>
  );
};

export default Sidebar;
