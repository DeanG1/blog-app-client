import React from "react";
import Reusable from "../../components/Reusable";
import { Container } from "reactstrap";
import { useState, useEffect } from "react";
import { getCurrentUserDetail } from "../../auth";
import {
  deletePostService,
  loadPostUserWise,
} from "../../services/post-service";
import { toast } from "react-toastify";
import Post from "../../components/Post";
const UserDashboard = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    console.log(getCurrentUserDetail());
    setUser(getCurrentUserDetail());
    loadPostData();
  }, []);
  function loadPostData() {
    loadPostUserWise(getCurrentUserDetail().id)
      .then((data) => {
        console.log(data);
        setPosts([...data]);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error loading user post!");
      });
  }
  //Functionality to delete post
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
      <Container>
        <h1 className="mt-3">Posts Count: ({posts.length})</h1>
        {posts.map((post, index) => {
          return <Post deletePost={deletePost} post={post} key={index} />;
        })}
      </Container>
    </Reusable>
  );
};

export default UserDashboard;
