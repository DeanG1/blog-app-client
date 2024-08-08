import Reusable from "../components/Reusable";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
} from "reactstrap";
const Signup = () => {
  return (
    <Reusable>
      <Container>
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <Card className="mt-4" color="dark" inverse>
              <CardHeader>
                <h3>Signup</h3>
              </CardHeader>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="name">Enter Name</Label>
                    <Input type="text" id="name" placeholder="Enter here" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Enter Email</Label>
                    <Input type="email" id="email" placeholder="Enter here" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Enter Password</Label>
                    <Input
                      type="password"
                      id="password"
                      placeholder="Enter here"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="about">Enter About</Label>
                    <Input
                      type="textarea"
                      id="about"
                      style={{ height: "200px" }}
                      placeholder="Enter here"
                    />
                  </FormGroup>
                  <Container className="text-center">
                    <Button outline color="light">
                      Register
                    </Button>
                    <Button color="secondary" type="reset" className="ms-2">
                      Reset
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Reusable>
  );
};
export default Signup;
