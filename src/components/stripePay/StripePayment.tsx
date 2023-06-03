import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./stripe.css";
import useAuth from "../../auth/hooks/useAuth";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY!);
interface params {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const StripePayment = ({ setSuccess, setLoading, loading }: params) => {
  const { auth } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  // const [loading, setLoading] = useState(true);
  const fetchPaymentIntent = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8081/create-payment-intent", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + auth.accessToken,
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
      });

      if (response.ok) {
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } else {
        throw new Error("Failed to fetch payment intent");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads

    fetchPaymentIntent();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <>
      {clientSecret && (
        //@ts-ignore
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm setSuccess={setSuccess} />
        </Elements>
      )}
    </>
  );
};
export default StripePayment;
