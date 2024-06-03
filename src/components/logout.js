import axios from "@/axios/axios";
import { useAuth } from "@/context/AuthProvider";

export const logoutUser = async () => {


  try {
    // Make the logout request
    const response = await axios.delete("/auth/logout", {
      withCredentials: true,
    });


    // Clear authentication data from local storage
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("role");

    return response.data;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};
