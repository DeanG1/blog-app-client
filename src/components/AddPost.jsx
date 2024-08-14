import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Form,
  Input,
  Label,
  Container,
} from "reactstrap";
import JoditEditor from "jodit-react";
import { loadAllCategories } from "../services/category-service";
const AddPost = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const editor = useRef(null);
  const [content, setContent] = useState("");
  return (
    <div className="wrapper">
      <Card className="shadow-md">
        <CardBody>
          <h3>Whatadjaiofsdfnsdflsdnfsdnfsdfjsdfsdfsdf</h3>
          <Form>
            <div className="my-3">
              <Label for="title">Post title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Type here..."
                className="rounded-0"
              />
            </div>
            <div className="my-3">
              <Label for="content">Post Content</Label>
              {/* <Input
                type="textarea"
                style={{ height: "300px" }}
                id="content"
                placeholder="Type here..."
                className="rounded-0"
              /> */}
              <JoditEditor
                ref={editor}
                value={content}
                onChange={(newContent) => setContent(newContent)}
              />
            </div>
            <div className="my-3">
              <Label for="category">Post Category</Label>
              <Input
                type="select"
                id="category"
                placeholder="Type here..."
                className="rounded-0"
              >
                {categories.map((category) => (
                  <option key={category.categoryId}>
                    {category.categoryTitle}
                  </option>
                ))}
              </Input>
            </div>

            <Container className="text-center">
              <Button className="rounded-0" color="primary">
                Create Post
              </Button>
              <Button className="rounded-0 ms-2" color="danger">
                Reset Content
              </Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddPost;
