import BareButton from "../../components/ui/Button/BareButton";

const CovidMainPage = () => {
  return (
    <div className="h-[638px] px-[50px] md:px-[101px]">
      <div className="flex flex-col py-12 md:flex-row md:justify-between items-center font-normal text-xl md:text-6xl  ">
        <h2>Be aware of Covid-19</h2>
        <BareButton
          onClick={() =>
            (window.location.href = "https://covidnow.moh.gov.my/")
          }
        >
          See More
        </BareButton>
      </div>
      <p className="text-base md:text-4xl flex justify-start">
        Find out about the current Covid-19 cases in your area{" "}
      </p>
    </div>
  );
};

export default CovidMainPage;
