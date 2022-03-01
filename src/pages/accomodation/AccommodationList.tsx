import { useParams, useSearchParams } from "react-router-dom";
import Container from "../../components/ui/Container";

export const AccommodationList = () => {
    const {place} = useParams();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('get_started')
    const peopleQuery = searchParams.get('people')
    console.log(place)
    console.log(query , peopleQuery)
    
  return (
    <Container>
      <h1>Accommodation List</h1>
    </Container>
  )
};
