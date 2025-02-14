import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Button,
  FormControl,
  FormLabel,
  Input,
  Avatar,
  AvatarBadge,
  Center,
  IconButton,
  Stack,
  useColorModeValue,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { MouseEvent, useRef, useState } from "react";
import { uploadService } from "../services/upload";

interface IProp {
  isOpen: boolean;
  onClose: () => void;
}

const EditUserModel = ({ isOpen, onClose }: IProp) => {
  const toast = useToast();
  const uploadPhotoRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>(
    "https://bit.ly/sage-adebayo"
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleOpenUploadPhoto = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    uploadPhotoRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      // Upload the file to Cloudinary (or your server)
      const result = await uploadService.uploadFile(file);
      if (!uploadService.isUploadError(result)) {
        setAvatarUrl(result.secure_url); // Update the avatar URL with the uploaded image
        toast({
          title: "Upload Success",
          description: "Image uploaded successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        console.error("Upload failed:", result.message);
      }
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent my={"auto"}>
        <Stack
          spacing={6}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
        >
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "2xl", sm: "3xl" }}
            alignSelf={"center"}
            mb={5}
          >
            Edit User Profile
          </Heading>
          <FormControl id="userIcon">
            <FormLabel>User Icon</FormLabel>
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                <Avatar size="xl" src={avatarUrl}>
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    icon={<SmallCloseIcon />}
                  />
                </Avatar>
              </Center>
              <Center w="full">
                <Button w="full" onClick={handleOpenUploadPhoto}>
                  Change Icon
                </Button>
                <Input
                  type="file"
                  ref={uploadPhotoRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  accept="image/*" // Restrict to image files
                />
              </Center>
            </Stack>
          </FormControl>
          <FormControl id="userName" isRequired>
            <FormLabel>User name</FormLabel>
            <Input
              placeholder="UserName"
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg={"red.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "red.500",
              }}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              bg={"blue.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "blue.500",
              }}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </ModalContent>
    </Modal>
  );
};

export default EditUserModel;
