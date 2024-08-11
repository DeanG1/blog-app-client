import { useState } from "react";
import { signUp } from "../services/user-service";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Reusable from "../components/Reusable";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });

  const validate = () => {
    const newErrors = {};

    // Validate name
    if (!data.name || data.name.length < 4) {
      newErrors.name = "Name must be at least 4 characters long";
    }

    // Validate email
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Email is invalid";
    }

    // Validate password
    const passwordRegex = /^(?=.*[A-Z])(?=.*\W).{6,}$/;
    if (!data.password || !passwordRegex.test(data.password)) {
      newErrors.password =
        "Password must be at least 6 characters long, include one uppercase letter, and one special character";
    }

    // Validate about
    if (!data.about) {
      newErrors.about = "About field cannot be empty";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    setErrors({});
  };

  const submitForm = async (event) => {
    event.preventDefault();

    if (!validate()) {
      toast.error("Please correct the errors before submitting.");
      return;
    }

    try {
      const resp = await signUp(data);
      console.log(resp);
      toast.success("User is registered successfully! User ID: " + resp.id);
      resetData();
    } catch (error) {
      console.log(error);
      setErrors({
        name: error.response?.data?.name || "",
        email: error.response?.data?.email || "",
        password: error.response?.data?.password || "",
        about: error.response?.data?.about || "",
      });
    }
  };

  return (
    <Reusable>
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="dark" inverse>
              <CardHeader>
                <h3>Fill Information to Register!</h3>
              </CardHeader>

              <CardBody>
                <Form onSubmit={submitForm}>
                  <FormGroup>
                    <Label for="name">Enter Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter here"
                      id="name"
                      onChange={(e) => handleChange(e, "name")}
                      value={data.name}
                      invalid={!!errors.name}
                    />
                    <FormFeedback>{errors.name}</FormFeedback>
                  </FormGroup>

                  <FormGroup>
                    <Label for="email">Enter Email</Label>
                    <Input
                      type="email"
                      placeholder="Enter here"
                      id="email"
                      onChange={(e) => handleChange(e, "email")}
                      value={data.email}
                      invalid={!!errors.email}
                    />
                    <FormFeedback>{errors.email}</FormFeedback>
                  </FormGroup>

                  <FormGroup>
                    <Label for="password">Enter Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter here"
                      id="password"
                      onChange={(e) => handleChange(e, "password")}
                      value={data.password}
                      invalid={!!errors.password}
                    />
                    <FormFeedback>{errors.password}</FormFeedback>
                  </FormGroup>

                  <FormGroup>
                    <Label for="about">Write something about yourself</Label>
                    <Input
                      type="textarea"
                      placeholder="Enter here"
                      id="about"
                      style={{ height: "250px" }}
                      onChange={(e) => handleChange(e, "about")}
                      value={data.about}
                      invalid={!!errors.about}
                    />
                    <FormFeedback>{errors.about}</FormFeedback>
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
