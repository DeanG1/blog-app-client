import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Button, CardText, Container } from "reactstrap";
function Post({
  post = {
    title: "This is default post title",
    content: "This is default post content",
  },
}) {
  return (
    <Card className="border-0 shadow-md mt-3">
      <CardBody>
        <h1>{post.title}</h1>
        <CardText
          dangerouslySetInnerHTML={{ __html: post.content.substring(0, 30) }}
        ></CardText>
        <Container>
          <Link
            className="btn btn-secondary border-0"
            to={"/posts/" + post.postId}
          >
            Read More
          </Link>
        </Container>
      </CardBody>
    </Card>
  );
}

export default Post;
