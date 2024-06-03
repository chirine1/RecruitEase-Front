import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkoutForm";
import { axiosPrivate } from "@/axios/axios";
import { useLocation, useParams } from "react-router-dom";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe(
  "pk_test_51PMvL0RvFLWAdNVDk5fhUV4jPwQRGbuFbhsRMJDwJ0yWDgOVYDHdPbBNE1f4DcGUgcQxdAwYZ1kuD7VteS9PdMe3003IfD9yMa"
);

const PaymentPageContent = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { label } = useParams();

  useEffect(() => {
    console.log(label);
    if (label) {
      console.log("Making API call with label:", label);
      axiosPrivate
        .post("/payment/create_payment_intent", { label: label })
        .then((response) => {
          setClientSecret(response.data.clientSecret);
        })
        .catch((error) => {
          console.error(
            "There was an error creating the PaymentIntent!",
            error
          );
        });
    } else {
      console.error("Label is undefined!");
    }
  }, [label]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm label={label} />
        </Elements>
      )}
    </div>
  );
};

export default PaymentPageContent;
