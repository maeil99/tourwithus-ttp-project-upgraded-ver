const CovidMainPage = () => {
  return (
    <div className="h-[638px] px-[50px] md:px-[101px]">
      <div className="flex flex-col py-12 md:flex-row md:justify-between items-center font-normal text-xl md:text-6xl  ">
        <h2>Be aware of Covid-19</h2>
        <div className="flex justify-center space-x-4 ">
          <button
            onClick={() =>
              (window.location.href = "https://covidnow.moh.gov.my/")
            }
            className="border border-red-300 rounded-lg px-2 py-2 font-medium text-4xl text-white hover:text-red-300 bg-red-300 hover:bg-white shadow-sm hover:shadow-lg"
          >
            Covid Status
          </button>
          <button
            onClick={() =>
              (window.location.href = "https://pelanpemulihannegara.gov.my/")
            }
            className="border border-red-300 rounded-lg px-2 py-2 font-medium text-4xl text-white hover:text-red-300 bg-red-300 hover:bg-white shadow-sm hover:shadow-lg"
          >
            SOP Guideline
          </button>
        </div>
      </div>
      <p className="text-base md:text-4xl flex justify-start">
        Find out about the current Covid-19 cases in your area{" "}
      </p>
    </div>
  );
};

export default CovidMainPage;
