import React from "react";

const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-100 hover:bg-[#CAEB66] rounded-2xl shadow p-6 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300">
      <div className="text-4xl text-primary p-5 bg-gradient-to-b from-gray-300 to-gray-100 rounded-full">{icon}</div>
      <h3 className="text-xl text-primary font-semibold mt-4">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );
};

export default ServiceCard;
