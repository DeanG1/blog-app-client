//isLoggedIn=>

export const isLoggedIn = () => {
  let data = localStorage.getItem("data");
  if (data != null) return true;
  else return false;
};

//doLogin=> data=>set to localstorage

export const doLogin = (data, next) => {
  localStorage.setItem("data", JSON.stringify(data));
  next();
};

// Verify if data in localStorage has the token
const data = JSON.parse(localStorage.getItem("data"));
console.log("Stored data:", data);

//doLogout=> remove from localStorage

export const doLogout = (next) => {
  localStorage.removeItem("data");
  next();
};

//get currentUser
export const getCurrentUserDetail = () => {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem("data")).user;
  } else {
    return undefined;
  }
};

export const getToken = () => {
  const data = localStorage.getItem("data");
  if (data) {
    const parsedData = JSON.parse(data);
    console.log("Token:", parsedData.token); // Debug token value
    return parsedData.token;
  } else {
    console.log("No token found in localStorage"); // Debug message
    return null;
  }
};
