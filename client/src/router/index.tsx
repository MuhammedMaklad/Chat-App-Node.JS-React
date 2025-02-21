import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AuthLayout from "../layout/Auth";
import HomePage from "../pages/Home";
import ErrorPage from "../pages/Error";
import cookieServices from "../services/cookieServices";

const token = cookieServices.get("token");
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorPage />}>
      <Route index element={<HomePage />} />
      <Route path="auth" element={<AuthLayout />}>
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Route>
  )
);

export default router;
