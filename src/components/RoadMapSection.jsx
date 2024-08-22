import React from "react";
import MileStone from "./MileStone";

const roadmap = [
  {
    id: 1,
    title: "User Query",
    description: "Ask anything about professors or courses.",
  },
  {
    id: 2,
    title: "Data Retrieval",
    description: "Retrieves relevant information from the vector database.",
  },
  {
    id: 1,
    title: "AI Response",
    description: "Generates accurate, context-aware responses.",
  },
];

const RoadMapSection = () => {
  return (
    <section id="working" className="max-w-80 mx-auto pt-[60px]">
      <h1 className="font-roboto font-semibold text-3xl text-center mb-16 mt-10 sm:text-5xl">How It Works</h1>
      {
        roadmap.map((roadmapItem, index) => (
          <MileStone 
          key={index}
          title={roadmapItem.title}
          description={roadmapItem.description}
          lastItem={index === roadmap.length-1}
          />
        ))
      }
    </section>
  );
};

export default RoadMapSection;