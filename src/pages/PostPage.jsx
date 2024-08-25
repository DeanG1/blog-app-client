import Reusable from "../components/Reusable";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useEffect, useState } from "react";
import { isLoggedIn } from "../auth";
import {
  createComment,
  loadPost,
  deleteComment as deleteCommentService,
} from "../services/post-service";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/helper";

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState({ content: "" });
  const [modal, setModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  useEffect(() => {
    loadPost(postId)
      .then((data) => {
        setPost(data);
      })
      .catch((error) => {
        toast.error("Error when loading post!");
      });
  }, [postId]);

  const toggleModal = (commentId) => {
    setCommentToDelete(commentId);
    setModal(!modal);
  };

  const handleDelete = () => {
    if (!isLoggedIn()) {
      toast.error("Need to login first");
      setModal(false);
      return;
    }
    deleteCommentService(commentToDelete)
      .then(() => {
        toast.success("Comment deleted!");
        setPost({
          ...post,
          comments: post.comments.filter(
            (comment) => comment.commentId !== commentToDelete
          ),
        });
        setModal(false);
      })
      .catch((error) => {
        toast.error("Error deleting the comment!");
        setModal(false);
      });
  };

  const submitPost = () => {
    if (!isLoggedIn()) {
      toast.error("Need to login first");
      return;
    }
    if (comment.content.trim() === "") {
      return;
    }
    createComment(comment, post.postId)
      .then((data) => {
        toast.success("Comment added!");
        setPost({
          ...post,
          comments: [...post.comments, data.data],
        });
        setComment({ content: "" });
      })
      .catch((error) => {
        toast.error("Error adding comment!");
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
                    <b> {new Date(post.addedDate).toLocaleString()}</b>
                  </CardText>
                  <CardText>
                    <span className="text-muted">
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
                    <CardText
                      style={{
                        wordWrap: "break-word",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {comment.content}
                    </CardText>
                    <Button
                      color="danger"
                      onClick={() => toggleModal(comment.commentId)}
                    >
                      X
                    </Button>
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
        <Modal isOpen={modal} toggle={() => toggleModal(null)}>
          <ModalHeader toggle={() => toggleModal(null)}>
            Confirm Delete
          </ModalHeader>
          <ModalBody>Are you sure you want to delete this comment?</ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={handleDelete}>
              Yes
            </Button>{" "}
            <Button color="secondary" onClick={() => toggleModal(null)}>
              No
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </Reusable>
  );
};

export default PostPage;
