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
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosConfig";
import cookieServices from "../services/cookieServices";

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
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState<boolean>(false);

  // Event Handler
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  // TODO: Handle Login Process
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setLoading(true);
      const response = await axiosInstance.post("/login", credentials);
      setLoading(false);
      if (response.data.success) {
        cookieServices.set("token", response.data.token);
        toast({
          title: "Logged in successfully",
          description: "Welcome back!",
          status: "success",
          duration: 2000,
          position: "top",
        });
      }
      setCredentials({ email: "", password: "" });
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast({
        title: "Login failed",
        description: err.response.data.msg,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };
  return (
    <Flex
      minH={"100vh"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} minW={"lg"} py={10} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign In</Heading>
          {/* <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Text color={"blue.400"}>features</Text> ✌️
          </Text> */}
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
                isLoading={isLoading}
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
