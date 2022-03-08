import PlanIcon from "../../assets/plan-icon.svg";
import MoneyIcon from "../../assets/money-icon.svg";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button/Button";
import ThumbsUpIcon from "../../assets/icons/ThumbsUpIcon";
import AccoMainPage from "./AccoMainPage";
import CovidMainPage from "./CovidMainPage";
import AttractMainPage from "./AttractMainPage";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="h-[720px]">
        <div>
          <p className="pt-[103px] text-[#4E95C3] text-[64px] flex justify-center">
            Every journey starts with a single
          </p>
          <p className=" text-[#4E95C3] text-[64px] flex  pl-[600px]">
            click...
          </p>
          <div className="flex justify-center pt-[130px]">
            <Button
              bgColor="bg-[#DB0505]"
              textColor="text-white"
              borderColor="border-[#DB0505]"
              textSize="text-[36px]"
              onClick={() => navigate("/accommodation?get_started=true")}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
      <div className="h-[465px]  grid grid-cols-3 pt-[149px] text-2xl ">
        <div className="flex flex-col items-center space-y-[50px]">
          <p>Plan everything you need here in a single website</p>
          <img src={PlanIcon} alt="" className="w-[110px] h-[116px]" />
        </div>
        <div className="flex flex-col items-center space-y-[50px]">
          <p>Recommending the best places for you</p>
          <ThumbsUpIcon className="w-[110px] h-[116px]" />
        </div>
        <div className="flex flex-col items-center space-y-[50px]">
          <p>Make the best choice for your budget</p>
          <img src={MoneyIcon} alt="" className="w-[110px] h-[116px]" />
        </div>
      </div>
      <div className="grid grid-flow-row">
        <AccoMainPage />
        <CovidMainPage />
        <AttractMainPage />
      </div>
    </>
  );
};

export default Home;
