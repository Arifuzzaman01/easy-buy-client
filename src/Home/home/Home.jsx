import React from "react";
import Banner from "../Banner/Banner";
import OurServices from "../Services/OurServices";
import ClientSlider from "./ClientSlider/ClientSlider";
import Benefits from "../Benefits/Benefits";
import BeMerchant from "../Marcent/BeMerchant";
import Work from "../HowTo/Work";
import FAQ from "../FAQ/FAQ";

const Home = () => {
  return (
    <div>
      <Banner />
      <Work />
      <OurServices />
      <ClientSlider />
      <Benefits />
      <BeMerchant />
      <FAQ />
    </div>
  );
};

export default Home;
