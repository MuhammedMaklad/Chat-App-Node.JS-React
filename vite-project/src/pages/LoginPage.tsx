"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosConfig";
import { ICustomAxiosError } from "../helper/axiosError";

const LoginPage = () => {
  // Hocks
  const [credentials, setCredentials] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const toast = useToast();
  // Event Handler
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/login", credentials);
      if (response.data.success) {
        toast({
          title: "Logged in successfully",
          description: "Welcome back!",
          status: "success",
          duration: 5000,
          position: "top",
        });
        // Redirect to dashboard
        // window.location.href = "/dashboard";
      }
      // Clear form fields after successful login
      setCredentials({ email: "", password: "" });
    } catch (err: any) {
      toast({
        title: "Login failed",
        description: err.response.data.msg,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Text color={"blue.400"}>features</Text> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          as="form"
          onSubmit={onSubmitHandler}
        >
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={credentials.email}
                onChange={onChangeHandler}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={credentials.password}
                onChange={onChangeHandler}
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                type="submit"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>
            </Stack>
            <Stack pt={2}>
              <Text align={"center"}>
                Create Account?{" "}
                <Link
                  style={{ color: "#0056b3", fontWeight: "bold" }}
                  to={"/auth/register"}
                >
                  Register
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
export default LoginPage;
