//isLoggedIn =>
export const isLoggedIn = () => {
  let data = localStorage.getItem("data");
  if (data != null) {
    return true;
  } else {
    return false;
  }
};
//doLogin => data => set to LocalStorage
export const doLogin = (data, next) => {
  localStorage.setItem("data", JSON.stringify(data));
  next();
};
//doLogout => remove from LocalStorage
export const doLogout = (next) => {
  localStorage.removeItem("data");
  next();
};

export const currentUserDetail = () => {
  if (isLoggedIn) {
    return JSON.parse(localStorage.getItem("data")).user;
  } else {
    return false;
  }
};
