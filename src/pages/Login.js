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
import { toast } from "react-toastify";
import { useState } from "react";
import { doLogin } from "../auth";
import { loginUser } from "../services/user-service";
const Login = () => {
  const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: "",
  });
  const handleChange = (event, property) => {
    setLoginDetail({ ...loginDetail, [property]: event.target.value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(loginDetail);
    //validation
    if (
      loginDetail.username.trim() === "" ||
      loginDetail.password.trim() === ""
    ) {
      toast.error("Username or Password  is required !!");
      return;
    }

    //submit the data to server to generate token
    loginUser(loginDetail)
      .then((data) => {
        console.log(data);
        doLogin(data, () => {
          console.log("Login detail is saved to local storage");
        });
        toast.success("Login Success");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400 || error.response.status === 404) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong  on sever !!");
        }
      });
  };
  const handleReset = () => {
    setLoginDetail({
      username: "",
      password: "",
    });
  };
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
                <Form onSubmit={handleFormSubmit}>
                  <FormGroup>
                    <Label for="email">Enter Email</Label>
                    <Input
                      type="text"
                      id="email"
                      onChange={(e) => handleChange(e, "username")}
                      value={loginDetail.username}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Enter password</Label>
                    <Input
                      type="password"
                      id="password"
                      onChange={(e) => handleChange(e, "password")}
                      value={loginDetail.password}
                    />
                  </FormGroup>
                  <Container className="text-center">
                    <Button color="light" outline>
                      Login
                    </Button>
                    <Button
                      color="secondary"
                      className="ms-2"
                      onClick={handleReset}
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
export default Login;
