import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentForm = () => {
  const { parcelId } = useParams();
//   console.log(parcelId);
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const { data: parcelInfo = {}, isPending } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      // console.log(res.data);
      return res.data;
    },
  });
    console.log(parcelInfo);
    const amount = parcelInfo.total_cost
  if (isPending) {
    return <p> Loading...</p>;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("error", error);
      setError(error.message);
    } else {
      setError(" ");
      console.log("[PaymentMethod]", paymentMethod);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-2xl shadow-md w-full max-w-md mx-auto"
      >
        <CardElement className="p-2 border rounded"></CardElement>
        <button
          type="submit"
          disabled={!stripe}
          className="btn btn-secondary text-black w-full"
        >
          Pay ${amount}  for parcel pickup
        </button>
        {error && <p className="text-red-500"> {error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
