import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "./../../../hooks/useAuth";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const { parcelId } = useParams();
  //   console.log(parcelId);
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()
  const { data: parcelInfo = {}, isPending } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      // console.log(res.data);
      return res.data;
    },
  });
  // console.log(parcelInfo);
  const amount = parcelInfo.total_cost;
  const amountInCents = amount * 100;
  // console.log(amountInCense);
  if (isPending) {
    return <p> Loading...</p>;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) return;

    try {
      // ✅ 1️⃣ Create a Payment Method
      const { error: methodError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card,
        });
      if (methodError) {
        setError(methodError.message);
        return;
      } else {
        setError("");
        console.log("[PaymentMethod]", paymentMethod);
      }

      // ✅ 2️⃣ Create Payment Intent
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
        parcelId,
      });
      const clientSecret = res.data.clientSecret;

      // ✅ 3️⃣ Confirm the Card Payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });
      if (result.error) {
        setError(result.error.message);
        return;
      }

      // ✅ 4️⃣ Mark Payment & Save History
      if (result.paymentIntent.status === "succeeded") {
        // console.log("✅ Payment succeeded!", result.paymentIntent);
        const paymentData = {
          parcelId,
          userEmail: user.email,
          transactionId: result.paymentIntent.id,
          amount: amountInCents / 100,
        };
        const paymentRes = await axiosSecure.post("/payments", paymentData);
        // console.log(paymentRes);
        if (paymentRes.data) {
          const transactionId = result.paymentIntent.id;

          // ✅ Show SweetAlert2
          Swal.fire({
            title: "Payment Successful!",
            text: `Your Transaction ID: ${transactionId}`,
            icon: "success",
            confirmButtonText: "Go to myParcels",
          }).then((result) => {
            if (result.isConfirmed) {
              // ✅ Redirect to My Parcels page
              navigate("/dashboard/myParcels");
            }
          });
        }
      }
    } catch (error) {
      console.error(error);
      setError(
        error?.response?.data?.error || error.message || "Payment failed"
      );
      Swal.fire("Error!", error.message || "Something went wrong.", "error");
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
          Pay ${amount} for parcel pickup
        </button>
        {error && <p className="text-red-500"> {error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
