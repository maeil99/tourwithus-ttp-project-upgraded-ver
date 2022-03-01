import React, { useState } from "react";
import MiniChevronDownIcon from "../../../assets/icons/MiniChevronDownIcon";


type ICardProps = {
  header: string;
  className?: string;
  children?: React.ReactNode;
  price?: number;
  cardType: "accommodation" | "flight" | "attraction" | "cab";
  onClick?: () => void;
};

const Card = ({
  className = "",
  children,
  onClick,
  header,
  price,
  cardType,
}: ICardProps) => {
  const [toggleCard, setToggleCard] = useState(false);
  return (
    <div
      className={`${className} border border-gray-200 rounded-xl divide-y divide-solid px-6`}
    >
      <div className="flex justify-between mb-4 pt-6">
        <div>
          <h2 className={`font-medium text-lg md:text-xl`}>{header}</h2>
        </div>
        <div className="flex items-center space-x-2">
          {price && (
            <h2>{`RM${price.toFixed(2)} per ${
              cardType === "accommodation"
                ? "night"
                : cardType === "attraction"
                ? "person"
                : cardType === "flight"
                ? "ticket"
                : "trip"
            }`}</h2>
          )}
          <button
            className=" px-3 border bg-red-400 text-white font-semibold text-lg shadow-md hover:shadow-xl"
            onClick={onClick}
          >
            View Deals
          </button>
          <div onClick={() => setToggleCard(!toggleCard)}>
            <MiniChevronDownIcon
              className={`text-gray-400 w-6 h-6 transform transition duration-200 ${
                toggleCard ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
        </div>
      </div>
      <div className={`${toggleCard ? "" : "hidden "}`}>
        <div className="flex flex-col divide-y divide-solid">{children}</div>
      </div>
    </div>
  );
};

export default Card;