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
import ProtectedRoute from "../components/auth/ProtectedRoute";

const isAuthenticated = cookieServices.get("token") ? true : false;
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorPage />}>
      <Route
        index
        element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            child={<HomePage />}
            redirect="/auth/login"
          />
        }
      />
      <Route path="auth" element={<AuthLayout />}>
        <Route
          path="register"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              child={<RegisterPage />}
              redirect="/home"
            />
          }
        />
        <Route
          path="login"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              child={<LoginPage />}
              redirect="/home"
            />
          }
        />
      </Route>
    </Route>
  )
);

export default router;
