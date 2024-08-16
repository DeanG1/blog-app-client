import { privateAxios } from "./helper";

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
