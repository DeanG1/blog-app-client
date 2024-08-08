import Reusable from "../components/Reusable";
import {
  Col,
  Container,
  Row,
  Card,
  CardBody,
  Label,
  Input,
  CardHeader,
  Form,
  FormGroup,
  Button,
} from "reactstrap";
const Login = () => {
  return (
    <Reusable>
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="dark" inverse>
              <CardHeader>
                <h3>Login</h3>
              </CardHeader>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="email">Enter Email</Label>
                    <Input type="text" id="email" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Enter password</Label>
                    <Input type="password" id="password" />
                  </FormGroup>
                  <Container className="text-center">
                    <Button color="light" outline>
                      Login
                    </Button>
                    <Button color="secondary" className="ms-2">
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
export default Login;
