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
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidationSchema } from "../../validation/registerValidationSchema";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { userRegister } from "../../app/features/registerSlice";
interface IUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
const RegisterCard = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUserData>({
    resolver: yupResolver(registerValidationSchema),
  });

  // onSubmitHandler
  const onSubmitHandler = async (userData: IUserData) => {
    await dispatch(
      userRegister({
        name: `${userData.firstName}-${userData.lastName}`,
        email: userData.email,
        password: userData.password,
      })
    );
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
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          as="form"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl
                  id="firstName"
                  isRequired
                  isInvalid={errors.firstName ? true : false}
                >
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" {...register("firstName")} />
                  <FormErrorMessage>
                    {errors.firstName?.message ?? ""}
                  </FormErrorMessage>
                </FormControl>
              </Box>
              <Box>
                <FormControl
                  id="lastName"
                  isInvalid={errors.lastName ? true : false}
                >
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" {...register("lastName")} />
                  <FormErrorMessage>
                    {errors.lastName?.message ?? ""}
                  </FormErrorMessage>
                </FormControl>
              </Box>
            </HStack>
            <FormControl
              id="email"
              isRequired
              isInvalid={errors.email?.message ? true : false}
            >
              <FormLabel>Email address</FormLabel>
              <Input type="email" {...register("email")} />
              <FormErrorMessage>{errors.email?.message ?? ""}</FormErrorMessage>
            </FormControl>
            <FormControl
              id="password"
              isRequired
              isInvalid={errors.password?.message ? true : false}
            >
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
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
              <FormErrorMessage>
                {errors.password?.message ?? ""}
              </FormErrorMessage>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                type="submit"
                loadingText="Submitting"
                isLoading={isSubmitting}
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

export default RegisterCard;
