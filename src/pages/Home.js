import NewFeed from "../components/NewFeed";
import Reusable from "../components/Reusable";
import { Container } from "reactstrap";
const Home = () => {
  return (
    <Reusable>
      <Container className="mt-3">
        <NewFeed />
      </Container>
    </Reusable>
  );
};
export default Home;
