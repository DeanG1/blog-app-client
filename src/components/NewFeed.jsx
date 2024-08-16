import React from "react";
import { useEffect, useState } from "react";
import { loadAllPosts } from "../services/post-service";
import { Row, Col } from "reactstrap";
import Post from "./Post";
function NewFeed() {
  const [postContent, setPostContent] = useState({
    content: [],
    totalPages: "",
    totalElements: "",
    pageSize: "",
    lastPage: false,
    pageNumber: "",
  });

  useEffect(() => {
    loadAllPosts()
      .then((data) => {
        console.log(data);
        setPostContent(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container-fluid">
      <Row>
        <Col md={{ size: 10, offset: 1 }}>
          <h1>Blogs count: ({postContent.totalElements})</h1>
          {postContent.content.map((post) => (
            <Post post={post} key={post.postId} />
          ))}
        </Col>
      </Row>
    </div>
  );
}

export default NewFeed;
