"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { registerValidationSchema } from "../validation/registerValidationSchema";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { selectRegister, userRegister } from "../app/features/registerSlice";
import { AppDispatch } from "../app/store";

interface IData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface IError {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

const RegisterPage = () => {
  // Hocks
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState<IData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<IError>({});

  const dispatch: AppDispatch = useDispatch();
  const { loading } = useSelector(selectRegister);
  const navigate = useNavigate();
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await registerValidationSchema.validate(data, { abortEarly: false });
      setError({});
      console.log("Form data is valid:", data);
      const response = await dispatch(
        userRegister({
          name: `${data.firstName}-${data.lastName}`,
          email: data.email,
          password: data.password,
        })
      );
      if (response?.payload?.success) {
        navigate("/auth/login");
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        console.log("Validation errors:", err.errors); // Debugging
        const newErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setError(newErrors);
      }
    }
  };

  return (
    <Flex
      minH={"100vh"}
      // align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          {/* <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
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
            <HStack>
              <Box>
                <FormControl
                  id="firstName"
                  isRequired
                  isInvalid={!!error.firstName}
                >
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    name="firstName"
                    value={data.firstName}
                    onChange={onChangeHandler}
                  />
                  <FormErrorMessage>{error.firstName}</FormErrorMessage>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName" isInvalid={!!error.lastName}>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    name="lastName"
                    value={data.lastName}
                    onChange={onChangeHandler}
                  />
                  <FormErrorMessage>{error.lastName}</FormErrorMessage>
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired isInvalid={!!error.email}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={data.email}
                onChange={onChangeHandler}
              />
              <FormErrorMessage>{error.email}</FormErrorMessage>
            </FormControl>
            <FormControl id="password" isRequired isInvalid={!!error.password}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={onChangeHandler}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{error.password}</FormErrorMessage>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                type="submit"
                loadingText="Submitting"
                isLoading={loading}
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link style={{ color: "#0056b3" }} to={"/auth/login"}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default RegisterPage;
