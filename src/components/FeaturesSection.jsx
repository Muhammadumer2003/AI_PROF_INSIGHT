import React from "react";
import {features} from '../data/features';

const FeaturesSection = () => {
  return (
    <section id="features" className="flex items-center p-10 jutsify-center flex-col pt-[55px]">
      <h2 className="font-roboto font-semibold text-3xl text-center mb-16 mt-10 sm:text-5xl mt-10">Features</h2>
      <div className="mt-10 grid items-center grid-cols-1 gap-3 md:grid-cols-3 max-w-screen-xl">
        {
          features.map((feature, index) => (
            <div key={index} className="bg-white border border-indigo-400/30 rounded-lg shadow-lg p-8 h-full flex space-x-4">
              <div>
                <h3 className="font-semibold text-xl">{feature.title}</h3>
                <p className="text-gray-500 mt-5">{feature.description}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default FeaturesSection;
