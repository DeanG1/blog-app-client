import React, { useContext } from "react";
import Reusable from "../../components/Reusable";
import userContext from "../../context/userContext";

const Profile = () => {
  const user = useContext(userContext);
  return (
    <Reusable>
      <h1>Profile</h1>
      <h1>Welcome user: {user.name}</h1>
    </Reusable>
  );
};

export default Profile;
