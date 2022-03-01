import Container from "../../components/ui/Container";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../components/ui/Button/Button";

const Accommodation = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("get_started");

  const navigateToPage = (pageLink: string) => {
    if (query) {
      setSearchParams({ get_started: "true", people: "5" });
    }
    navigate(pageLink + `?${searchParams}`);
  };

  const loc = "seri_iskandar";
  return (
    <>
      <Container className="xl:px-0">
        <Button onClick={() => navigateToPage(`/accommodation/${loc}`)}>
          Search
        </Button>
      </Container>
    </>
  );
};

export default Accommodation;
