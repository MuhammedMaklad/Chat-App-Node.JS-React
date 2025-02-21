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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosConfig";
import cookieServices from "../services/cookieServices";
import useCustomToast from "../components/Ui/CustomToast";

const LoginPage = () => {
  useEffect(() => {
    // Check if user is already logged in
    const token = cookieServices.get("token");
    if (token) navigate("/");
  });
  // Hocks
  const [credentials, setCredentials] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState<boolean>(false);
  const showToast = useCustomToast();

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
      if (response.data.success) {
        cookieServices.set("token", response.data.token);
        showToast("Logged in successfully", "Welcome back!", "success");
        setCredentials({ email: "", password: "" });
        navigate("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showToast("Login failed", err.response.data.msg, "error");
    } finally {
      setLoading(false);
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
