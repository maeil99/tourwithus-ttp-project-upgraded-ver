import React from "react";
import { useNavigate } from "react-router-dom";
import BareButton from "../../components/ui/Button/BareButton";

const AttractMainPage = () => {
  const nav = useNavigate();
  const navigateToPage = (pageLink: string) => {
    nav(pageLink);
  };
  return (
    <div className="h-[638px] px-[50px] md:px-[101px]">
      <div className="flex flex-col py-12 md:flex-row md:justify-between items-center font-normal text-xl md:text-6xl  ">
        <h2>Find the best places to visit</h2>
        <BareButton onClick={() => navigateToPage("/attraction")}>
          See More
        </BareButton>
      </div>
      <p className="text-base md:text-4xl flex justify-start">
        Visit exciting new places in your area
      </p>
    </div>
  );
};

export default AttractMainPage;
