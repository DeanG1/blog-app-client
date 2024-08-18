import { privateAxios } from "./helper";
import { myAxios } from "./helper";
export const createPost = (postData) => {
  return privateAxios
    .post(
      `/user/${postData.userId}/category/${postData.categoryId}/posts`,
      postData
    )
    .then((response) => response.data)
    .catch((error) => {
      console.error(
        "Error creating post",
        error.response ? error.response.data : error.message
      );
      throw error;
    });
};
//get all posts
export const loadAllPosts = (pageNumber, pageSize) => {
  return myAxios
    .get(
      `/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`
    )
    .then((response) => response.data);
};
//load single by its ID
export const loadPost = (postId) => {
  return myAxios.get("/posts/" + postId).then((response) => response.data);
};

//create comment
export const createComment = (comment, postId) => {
  return privateAxios.post(`/post/${postId}/comments`, comment);
};
