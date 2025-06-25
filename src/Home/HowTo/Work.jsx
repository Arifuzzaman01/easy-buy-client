import React from "react";
import { FaBox, FaMoneyBillWave, FaBuilding } from "react-icons/fa";

const workItems = [
  {
    id: 1,
    title: "Booking Pick & Drop",
    description: "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FaBox className="text-4xl text-primary" />,
  },
  {
    id: 2,
    title: "Cash On Delivery",
    description: "Safe and secure cash-on-delivery service across Bangladesh.",
    icon: <FaMoneyBillWave className="text-4xl text-primary" />,
  },
  {
    id: 3,
    title: "Delivery Hub, Booking SME & Corporate",
    description: "Seamless solutions for SMEs and corporate booking with dedicated support.",
    icon: <FaBuilding className="text-4xl text-primary" />,
  },
];

const Work = () => {
  return (
    <section className="py-12 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center">How to Work</h2>
      <p className="text-gray-600 text-center mt-3 max-w-2xl mx-auto">
        From personal packages to business shipments — we deliver on time, every time.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {workItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow p-6 flex flex-col hover:bg-[#CAEB66] transition-all duration-500 hover:shadow-lg"
          >
            {item.icon}
            <h3 className="text-xl font-semibold mt-4">{item.title}</h3>
            <p className="text-gray-500 mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Work;
