import BareButton from "../../components/ui/Button/BareButton";
import { useNavigate } from "react-router-dom";

const AccoMainPage = () => {
  const nav = useNavigate();
  const navigateToPage = (pageLink: string) => {
    nav(pageLink);
  };
  return (
    <div className="h-[638px] px-[50px] md:px-[101px]">
      <div className="flex flex-col py-12 md:flex-row md:justify-between items-center font-normal text-xl md:text-6xl  ">
        <h2>Find places to stay</h2>
        <BareButton onClick={() => navigateToPage("/accommodation")}>
          See More
        </BareButton>
      </div>
      <p className="text-base md:text-4xl flex justify-start">Find the hotels around Malaysia  </p>
    </div>
  );
};

export default AccoMainPage;
