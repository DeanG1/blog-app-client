import React, { useState } from "react";
import Reusable from "../components/Reusable";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import CategorySideMenu from "../components/CategorySideMenu";
import NewFeed from "../components/NewFeed";
import {
  loadPostCategoryWise,
  deletePostService,
} from "../services/post-service";
import { toast } from "react-toastify";
import Post from "../components/Post";
function Categories() {
  const { categoryId } = useParams();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    console.log(categoryId);
    loadPostCategoryWise(categoryId)
      .then((data) => {
        setPosts([...data]);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading post!");
      });
  }, [categoryId]);

  function deletePost(post) {
    //delete post
    deletePostService(post.postId)
      .then((response) => {
        console.log(response);
        toast.success("Post deleted successfully!");
        let newPosts = posts.filter((post) => post.postId != post.postId);
        setPosts([...newPosts]);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error deleting post!");
      });
  }
  return (
    <Reusable>
      <Container className="mt-3">
        <Row>
          <Col md={2} className="pt-5">
            <CategorySideMenu />
          </Col>
          <Col md={10}>
            <h1>Blogs Count ({posts.length}) </h1>
            {posts &&
              posts.map((post, index) => {
                return <Post deletePost={deletePost} key={index} post={post} />;
              })}
            {posts.length <= 0 ? <h1>No posts in this category</h1> : ""}
          </Col>
        </Row>
      </Container>
    </Reusable>
  );
}

export default Categories;
