import { useToast } from "@chakra-ui/react";

type TStatus = "info" | "warning" | "success" | "error" | "loading" | undefined;

const useCustomToast = () => {
  const toast = useToast();

  const showToast = (title: string, description: string, status: TStatus) => {
    toast({
      title: title,
      description: description,
      status: status,
      position: "top",
      duration: 5000,
      isClosable: true,
    });
  };
  return showToast;
};

export default useCustomToast;
