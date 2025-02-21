import { ChatIcon, AddIcon } from "@chakra-ui/icons";
import {
  VStack,
  IconButton,
  Spacer,
  Avatar,
  useColorModeValue,
  AvatarBadge,
} from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import axiosInstance from "../api/axiosConfig";
import cookieServices from "../services/cookieServices";
import EditUserModel from "./EditUserModel";
import { useState } from "react";
import useCustomToast from "./Ui/CustomToast";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const sidebarBg = useColorModeValue("gray.200", "gray.700");

  const [openEditModel, setOpenEditModel] = useState<boolean>(false);
  const onCloseEditModel = () => setOpenEditModel(false);

  const showToast = useCustomToast();
  const navigate = useNavigate();

  // Handlers
  const handleLogout = async () => {
    try {
      await axiosInstance.get("/logout");
      cookieServices.remove("token");
      showToast("Logged out successfully", "See You Next Time!.", "success");
      navigate("/auth/login");
    } catch (error) {
      showToast("Error logging out", "Please try again later.", "error");
      console.error("Error logging out:", error);
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
