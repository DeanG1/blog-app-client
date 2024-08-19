import NewFeed from "../components/NewFeed";
import Reusable from "../components/Reusable";
import { Container } from "reactstrap";
import { Row, Col } from "reactstrap";
import CategorySideMenu from "../components/CategorySideMenu";
const Home = () => {
  return (
    <Reusable>
      <Container className="mt-3">
        <Row>
          <Col md={2} className="pt-5">
            <CategorySideMenu />
          </Col>
          <Col md={10}>
            <NewFeed />
          </Col>
        </Row>
      </Container>
    </Reusable>
  );
};
export default Home;
