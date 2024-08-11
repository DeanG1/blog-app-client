import { useState, useEffect } from "react";
import Reusable from "../components/Reusable";
import { signUp } from "../services/user-service";
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
import { toast } from "react-toastify";
const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });
  useEffect(() => {}, [data]);
  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });
  };

  const resetData = () => {
    setData({
      name: "",
      email: "",
      password: "",
      about: "",
    });
  };

  const submitForm = (event) => {
    event.preventDefault();
    signUp(data)
      .then((response) => {
        console.log(response);
        toast.success("User is registered succesfully!");
        setData({
          name: "",
          email: "",
          password: "",
          about: "",
        });
      })
      .catch((error) => {
        console.log(error);
        console.log("Error!");
      });
  };
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
                <Form onSubmit={submitForm}>
                  <FormGroup>
                    <Label for="name">Enter Name</Label>
                    <Input
                      type="text"
                      id="name"
                      value={data.name}
                      onChange={(e) => handleChange(e, "name")}
                      placeholder="Enter here"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Enter Email</Label>
                    <Input
                      type="email"
                      id="email"
                      value={data.email}
                      onChange={(e) => handleChange(e, "email")}
                      placeholder="Enter here"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Enter Password</Label>
                    <Input
                      type="password"
                      id="password"
                      value={data.password}
                      onChange={(e) => handleChange(e, "password")}
                      placeholder="Enter here"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="about">Enter About</Label>
                    <Input
                      type="textarea"
                      id="about"
                      value={data.about}
                      onChange={(e) => handleChange(e, "about")}
                      style={{ height: "200px" }}
                      placeholder="Enter here"
                    />
                  </FormGroup>
                  <Container className="text-center">
                    <Button outline color="light">
                      Register
                    </Button>
                    <Button
                      onClick={resetData}
                      color="secondary"
                      type="reset"
                      className="ms-2"
                    >
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
