import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isPending, data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });
    console.log(payments);
  if (isPending) {
    return <p>Loading...</p>;
  }
  return (
    <div className="overflow-x-auto rounded-xl shadow">
      <table className="table w-full">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
            <th>Parcel ID</th>
            <th>Transaction ID</th>
            <th>Amount ($)</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {payments.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">
                No payments found.
              </td>
            </tr>
          ) : (
            payments.map((payment) => (
              <tr key={payment._id} className="hover">
                <td>{payment.parcelId}</td>
                <td>{payment.transactionId}</td>
                <td>${payment.amount}</td>
                <td>
                  <span className="badge badge-success">{payment.status}</span>
                </td>
                <td>{new Date(payment.createdAt).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
