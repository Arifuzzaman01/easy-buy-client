import React from "react";
import MLocation from "../../assets/location-merchant.png";

const BeMerchant = () => {
  return (
    <div data-aos="zoom-in-up"  className=" bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat  bg-[#03373D] p-20 rounded-3xl my-10">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={MLocation} className=" rounded-lg shadow-2xl w-2/5 -ml-10" />
        <div className="w-3/5">
          <h1 className="text-3xl text-base-300 font-bold">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="py-6 text-base-100">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <button className="btn  bg-[#CAEB66] rounded-full mr-3 text-gray-700 font-bold">Became a Merchant</button>
          <button className="btn btn-outline rounded-full  text-[#CAEB66]">Earn with Profast Courier</button>
        </div>
      </div>
    </div>
  );
};

export default BeMerchant;
