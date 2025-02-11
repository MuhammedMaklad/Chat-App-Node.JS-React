import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProps {
  isAuthenticated: boolean;
  redirect: string;
  child: ReactNode;
  data?: unknown;
}

const ProtectedRoute = ({ isAuthenticated, redirect, child, data }: IProps) => {
  return (
    <>
      {isAuthenticated ? (
        child
      ) : (
        <Navigate to={redirect} replace state={data} />
      )}
    </>
  );
};

export default ProtectedRoute;
