import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardBody, CardText, Container } from "reactstrap";
import { getCurrentUserDetail, isLoggedIn } from "../auth";
import { Button } from "reactstrap";
import { deletePost } from "../services/post-service";
import { toast } from "react-toastify";
import userContext from "../context/userContext";
function Post({
  post = {
    id: -1,
    title: "This is default post title",
    content: "This is default post content",
  },
  deletePost,
}) {
  const userContextData = useContext(userContext);
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(null);
  useEffect(() => {
    setUser(getCurrentUserDetail());
    setLogin(isLoggedIn());
  }, []);

  return (
    <Card className="border-0 shadow-md mt-3">
      <CardBody>
        <h1>{post.title}</h1>
        <CardText
          dangerouslySetInnerHTML={{ __html: post.content.substring(0, 70) }}
        ></CardText>
        <Container>
          <div>
            <Link
              className="btn btn-secondary border-0"
              to={"/posts/" + post.postId}
            >
              Read More
            </Link>
            {userContextData.user.login &&
              (user && user.id === post.user.id ? (
                <Button
                  onClick={() => deletePost(post)}
                  color="danger"
                  className="ms-2"
                >
                  Delete
                </Button>
              ) : (
                ""
              ))}
          </div>
        </Container>
      </CardBody>
    </Card>
  );
}

export default Post;
