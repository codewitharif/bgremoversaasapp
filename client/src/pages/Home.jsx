import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Pricing from "../components/Pricing";
import Testimonial from "../components/Testimonial";
import Cta from "../components/Cta";

const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Testimonial />
      <Cta />
    </div>
  );
};

export default Home;
