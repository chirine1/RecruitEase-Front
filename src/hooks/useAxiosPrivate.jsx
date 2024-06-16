import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from "react";
import axios, { axiosPrivate } from "@/axios/axios";

const useAxiosPrivate = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    try {
                        // Request a new access token
                        const response = await axios.get('/auth/refresh', { withCredentials: true });

                         // Update auth state with the new access token
                         setAuth(prev => ({
                            ...prev,
                            isAuthenticated: true,
                        }));

                        // Retry the original request with the new access token
                        return axiosPrivate(prevRequest);
                    } catch (refreshError) {
                        // Redirect to 401 Not Authorized template on refresh failure
                        navigate('/401', { replace: true });
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [setAuth, navigate]);

    // Return axiosPrivate instance within an object
    return { axiosPrivate };
}

export default useAxiosPrivate;
