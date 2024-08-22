import React from "react";
import Image from 'next/image';
import demo from '../assets/images/dashboarddemo.png';

const HeroSection = () => {
  return (
    <section className="hero-section text-center font-roboto mt-32 flex flex-col items-center w-full max-h-screen overflow-y-auto">
      <h1 className="text-4xl font-extrabold leading-[1.15] text-black sm:text-6xl mx-2">
        ProfInsights AI
        <br />
        <span className="bg-gradient-to-r from-pink-500 via-indigo-600 to-pink-500 bg-clip-text text-transparent font-extrabold sm:text-6xl">
          Your Professor Guide
        </span>
      </h1>
      <h2 className="mt-5 text-gray-600 sm:text-xl">AI-Powered Assistant leveraging RAG for accurate professor and course insights</h2>
      <div className="mx-auto mt-5 flex max-w-fit space-x-4">
        <a href="#getstarted" className="rounded-full border px-5 py-2 text-sm font-roboto font-medium shadow-sm border-black bg-black text-white hover:ring-gray-400 hover:ring-2">
          Get Started
        </a>
        <a href="#features" className="rounded-full border px-5 py-2 text-sm font-roboto font-medium shadow-sm border-gray-200 bg-white text-black hover:ring-gray-300 hover:ring-2">
          Learn More
        </a>
      </div>
      <div className="mt-8 flex items-center justify-center w-full">
        <Image src={demo} alt="Demo" className="mx-auto max-h-[300px]" />
      </div>
    </section>
  );
};

export default HeroSection;
