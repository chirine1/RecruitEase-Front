import React, { useEffect, useState } from "react";
import axios from "@/axios/axios";
import { toast } from "react-toastify";

const PaymentTable = () => {
  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    try {
      const response = await axios.get("/company/paid");
      setPayments(response.data);
    } catch (error) {
      console.error("Failed to fetch payments", error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>Payment Management</h4>
      </div>
      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-category-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Company Name</th>
                <th>Package</th>
                <th>Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>{payment.company_name}</td>
                  <td>{payment.package.label}</td>
                  <td>{new Date(payment.payment_date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentTable;