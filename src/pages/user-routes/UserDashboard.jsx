import React from "react";
import Reusable from "../../components/Reusable";
import AddPost from "../../components/AddPost";
import { Container } from "reactstrap";
const UserDashboard = () => {
  return (
    <Reusable>
      <Container>
        <AddPost />
      </Container>
    </Reusable>
  );
};

export default UserDashboard;
