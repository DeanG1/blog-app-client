import React, { useContext, useEffect, useRef, useState } from "react";
import Reusable from "../components/Reusable";
import { useNavigate, useParams } from "react-router-dom";
import userContext from "../context/userContext";
import { loadPost, updatePost as doUpdatePost } from "../services/post-service";
import { toast } from "react-toastify";
import {
  Button,
  Container,
  Form,
  Input,
  Label,
  Card,
  CardBody,
} from "reactstrap";
import JoditEditor from "jodit-react";
import { loadAllCategories } from "../services/category-service";
function UpdateBlog() {
  const editor = useRef(null);
  const [categories, setCategories] = useState([]);
  const { blogId } = useParams();
  const object = useContext(userContext);
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  useEffect(() => {
    //Load all categories
    loadAllCategories()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });

    //Load the blog from the database
    loadPost(blogId)
      .then((data) => {
        setPost({ ...data, categoryId: data.category.categoryId });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading the blog!");
      });
  }, []);

  useEffect(() => {
    if (post) {
      if (post.user.id == object.user.data.id) {
        toast.error("This is not your post!");
        navigate("/");
      }
    }
  }, [post]);
  const handleChange = (event, fieldName) => {
    setPost({
      ...post,
      [fieldName]: event.target.value,
    });
  };
  const updatePost = (event) => {
    event.preventDefault();
    console.log(post);
    doUpdatePost(
      { ...post, category: { categoryId: post.categoryId } },
      post.postId
    )
      .then((response) => {
        console.log(response);
        toast.success("Post updated!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error updating the post!");
      });
  };
  const updateHtml = () => {
    return (
      <div className="wrapper">
        <Card className="shadow-sm  border-0 mt-2">
          <CardBody>
            <h3>Update Post</h3>
            <Form onSubmit={updatePost}>
              <div className="my-3">
                <Label for="title">Post title</Label>
                <Input
                  type="text"
                  id="title"
                  placeholder="Enter here"
                  className="rounded-0"
                  name="title"
                  value={post.title}
                  onChange={(event) => handleChange(event, "title")}
                />
              </div>

              <div className="my-3">
                <Label for="content">Post Content</Label>
                <JoditEditor
                  ref={editor}
                  value={post.content}
                  onChange={(newContent) =>
                    setPost({ ...post, content: newContent })
                  }
                />
              </div>

              <div className="mt-3">
                <Label for="image">Select Post banner</Label>
                <Input
                  id="image"
                  type="file"
                  onChange={(event) => handleChange(event, "image")}
                />
              </div>

              <div className="my-3">
                <Label for="category">Post Category</Label>
                <Input
                  type="select"
                  id="category"
                  placeholder="Enter here"
                  className="rounded-0"
                  name="categoryId"
                  onChange={(event) => handleChange(event, "category")}
                  value={post.categoryId}
                >
                  <option disabled value={0}>
                    --Select category--
                  </option>

                  {categories.map((category) => (
                    <option
                      value={category.categoryId}
                      key={category.categoryId}
                    >
                      {category.categoryTitle}
                    </option>
                  ))}
                </Input>
              </div>

              <Container className="text-center">
                <Button type="submit" className="rounded-0" color="primary">
                  Update Post
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

  return (
    <Reusable>
      <Container>{post && updateHtml()}</Container>
    </Reusable>
  );
}

export default UpdateBlog;
