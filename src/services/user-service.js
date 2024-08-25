import { myAxios } from "./helper";
import { privateAxios } from "./helper";
export const signUp = (user) => {
  return myAxios.post("/auth/register", user).then((response) => response.data);
};

export const loginUser = (loginDetail) => {
  return myAxios
    .post("/auth/login", loginDetail)
    .then((response) => response.data);
};
//Get user
export const getUser = (userId) => {
  return myAxios.get(`/users/${userId}`).then((response) => response.data);
};

//Update user
export function updateUser(user, userId) {
  console.log(user);
  console.log(userId);
  return privateAxios
    .put(`/users/${userId}`, user)
    .then((response) => response.data);
}
