import { useNavigate, useParams } from "react-router-dom";
import OrderInfo from "./OrderInfo";
import OrderTable from "./OrderTable";
import { useEffect } from "react";
import { axiosPrivate } from "@/axios/axios";

const index = () => {

  const navigate = useNavigate();
  const {label} = useParams()

  useEffect(() => {
    // Make a request to your backend API endpoint
    axiosPrivate.post(`/payment/success/${label}`)
      .then(response => {
        // Handle successful response if needed
        console.log("Payment success:", response.data);
        // Navigate to dashboard after a 2-second delay
        setTimeout(() => {
          navigate("/employers-dashboard/dashboard");
        }, 2000);
      })
      .catch(error => {
        // Handle errors
        console.error("Error processing payment:", error);
      });
  }, [navigate]);

  return (
    <>
      <div className="upper-box">
        <span className="icon fa fa-check"></span>
        <h4>Your order is completed!</h4>
        <div className="text">Thank you. Your order has been received.</div>
      </div>
      {/* End upper-box */}

      
      {/* <!--Order Box--> */}

      

      {/* <!--End Order Box--> */}
    </>
  );
};

export default index;
