import React from "react";


const benefits = [
  {
    id: 1,
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: "https://i.ibb.co/HLRSB7gx/Illustration.png"
  },
  {
    id: 2,
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: "https://i.ibb.co/x8mPrxX7/Group-4.png",
  },
  {
    id: 3,
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns — anytime you need us.",
    image: "https://i.ibb.co/DgGMhpDL/support.jpg",
  },
];

const Benefits = () => {
  return (
    <section className="py-12 max-w-7xl mx-auto space-y-8 px-4 ">
      <h2 className="text-3xl font-bold text-center">Why Choose Us?</h2>
      {benefits.map((benefit) => (
        <div
          key={benefit.id}
          className="flex flex-col md:flex-row items-center bg-base-100 rounded-lg shadow p-4 hover:shadow-lg transition"
        >
          {/* Left: Image */}
          <div className="md:w-1/4 flex justify-center">
            <img
              src={benefit.image}
              alt={benefit.title}
              className="h-32 w-32 object-contain bg-white p-3 rounded-2xl"
            />
          </div>
          
          {/* Middle: Vertical Line */}
          <div className="hidden md:block py-14 w-1 bg-gray-500 mr-6" />
          
          {/* Right: Text */}
          <div className="md:flex-1 mt-4 md:mt-0">
            <h3 className="text-2xl font-semibold">{benefit.title}</h3>
            <p className="text-gray-500 mt-2">{benefit.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Benefits;
