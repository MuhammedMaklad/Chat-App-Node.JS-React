import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import { Flex, Heading } from "@chakra-ui/react";
import LoginPage from "../pages/LoginPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      errorElement={
        <Flex justifyContent={"center"} alignItems={"center"} minH={"100vh"}>
          <Heading textAlign={"center"}>404 Page Not Found</Heading>
        </Flex>
      }
    >
      <Route
        index
        element={
          <Heading color={"red.500"}>
            Home Page : {import.meta.env.VITE_REACT_APP_API_URL}
          </Heading>
        }
      />
      <Route path="auth">
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Route>
  )
);

export default router;
