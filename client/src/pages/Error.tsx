import { Flex, Heading } from "@chakra-ui/react";

const ErrorPage = () => {
  return (
    <>
      <Flex justifyContent={"center"} alignItems={"center"} minH={"100vh"}>
        <Heading textAlign={"center"}>404 Page Not Found</Heading>
      </Flex>
    </>
  );
};

export default ErrorPage;
