import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Initialize isAuthenticated from local storage, if available
    const storedIsAuthenticated = localStorage.getItem("isAuthenticated");
    return storedIsAuthenticated ? JSON.parse(storedIsAuthenticated) : false;
  });

  const [role, setRole] = useState(() => {
    // Initialize role from local storage, if available
    const storedRole = localStorage.getItem("role");
    return storedRole ? storedRole : null;
  });

  // Function to set authentication state
  const setAuth = (newIsAuthenticated, newRole) => {
    setIsAuthenticated(newIsAuthenticated);
    setRole(newRole);
    localStorage.setItem("isAuthenticated", JSON.stringify(newIsAuthenticated)); // Persist isAuthenticated to local storage
    localStorage.setItem("role", newRole); // Persist role to local storage
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
