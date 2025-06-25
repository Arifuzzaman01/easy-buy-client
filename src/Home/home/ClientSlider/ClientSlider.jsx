import React from "react";
import Marquee from "react-fast-marquee";
import logo1 from "../../../assets/brands/amazon.png"
import logo2 from "../../../assets/brands/amazon_vector.png"
import logo3 from "../../../assets/brands/casio.png"
import logo4 from "../../../assets/brands/moonstar.png"
import logo5 from "../../../assets/brands/randstad.png"
import logo6 from "../../../assets/brands/start-people 1.png"
import logo7 from "../../../assets/brands/start.png"

const ClientSlider = () => {
  const logos = [
    logo1,
    logo2,
    logo3,
    logo4,
    logo5,
    logo6,
    logo7,
  ];

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center">Our Clients</h2>
      <div className="mt-8">
        <Marquee speed={40} gradient={false}>
          {logos.map((logo, index) => (
            <div key={index} className="flex items-center justify-center mx-18">
              <img src={logo} alt={`Client ${index + 1}`} className="h-6 w-auto" />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default ClientSlider;
