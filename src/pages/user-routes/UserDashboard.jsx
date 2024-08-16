import React from "react";
import Reusable from "../../components/Reusable";
import AddPost from "../../components/AddPost";
import { Container } from "reactstrap";
import NewFeed from "../../components/NewFeed";
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
