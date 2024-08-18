import Reusable from "../components/Reusable";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  Button,
  Input,
} from "reactstrap";
import { isLoggedIn } from "../auth";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { createComment, loadPost } from "../services/post-service";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/helper";
const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState({
    content: "",
  });
  useEffect(() => {
    //load the post by postId
    loadPost(postId)
      .then((data) => {
        console.log(data);
        setPost(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error when loading post!");
      });
  }, []);

  const printDate = (numbers) => {
    return new Date(numbers).toLocaleString();
  };

  const submitPost = () => {
    if (!isLoggedIn()) {
      toast.error("Need to login first");
      return;
    }
    //If there is no written comment return
    if (comment.content.trim() === "") {
      return;
    }
    createComment(comment, post.postId)
      .then((data) => {
        console.log(data);
        toast.success("Comment added!");
        setPost({
          ...post,
          comments: [...post.comments, data.data],
        });
        setComment({
          content: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Reusable>
      <Container className="mt-4">
        <Link to="/">Home</Link> / {post && <Link to="">{post.title}</Link>}
        <Row>
          <Col md={{ size: 12 }}>
            <Card className="mt-3 ps-2">
              {post && (
                <CardBody>
                  <CardText>
                    Posted by: <b>{post.user.name}</b> on
                    <b> {printDate(post.addedDate)}</b>
                  </CardText>
                  <CardText>
                    <span className="text-muted">
                      {" "}
                      Category : {post.category.categoryTitle}
                    </span>
                  </CardText>
                  <div
                    className="divider"
                    style={{
                      width: "100%",
                      height: "1px",
                      background: "#e2e2e2",
                    }}
                  ></div>
                  <CardText className="mt-3">
                    <span className="h1">{post.title}</span>
                  </CardText>
                  <div
                    className="image-container mt-3 shadow"
                    style={{ maxWidth: "40%" }}
                  >
                    <img
                      className="img-fluid"
                      src={BASE_URL + "/post/image/" + post.imageName}
                      alt=""
                    />
                  </div>
                  <CardText
                    className="mt-5"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  ></CardText>
                </CardBody>
              )}
            </Card>
          </Col>
        </Row>
        <Row className="m-4">
          <Col md={{ size: 9, offset: 1 }}>
            <h3>Comments : ({post ? post.comments.length : 0})</h3>
            {post &&
              post.comments.map((comment, index) => (
                <Card className="mt-4 border-0" key={index}>
                  <CardBody>
                    <CardText>{comment.content}</CardText>
                  </CardBody>
                </Card>
              ))}
            <Card className="mt-4 border-0">
              <CardBody>
                <Input
                  type="textarea"
                  value={comment.content}
                  onChange={(event) =>
                    setComment({ content: event.target.value })
                  }
                  placeholder="Write a comment"
                />
                <Button onClick={submitPost} className="mt-3" color="primary">
                  Submit
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Reusable>
  );
};
export default PostPage;
