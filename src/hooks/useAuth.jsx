import { useContext, useDebugValue } from "react";
import AuthContext from "@/context/AuthProvider";

const useAuth = () => {
  const { isAuthenticated, role, setAuth  } = useContext(AuthContext);
  useDebugValue(isAuthenticated, isAuthenticated ? "Logged In" : "Logged Out");
  return { isAuthenticated, role, setAuth };
};

export default useAuth;
