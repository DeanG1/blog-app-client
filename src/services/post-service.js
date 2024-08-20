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

//upload post image
export const uploadPostImage = (image, postId) => {
  let formData = new FormData();
  formData.append("image", image);
  return privateAxios
    .post(`/post/image/upload/${postId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};
//Get category wise posts
export const loadPostCategoryWise = (categoryId) => {
  return privateAxios
    .get(`/category/${categoryId}/posts`)
    .then((response) => response.data);
};
//Get posts wise user
export function loadPostUserWise(userId) {
  return privateAxios
    .get(`/user/${userId}/posts`)
    .then((response) => response.data);
}
//Delete post
export function deletePostService(postId) {
  return privateAxios
    .delete(`/posts/${postId}`)
    .then((response) => response.data);
}
//Update post
export function updatePost(post, postId) {
  console.log(post);
  return privateAxios
    .put(`/posts/${postId}`, post)
    .then((response) => response.data);
}
