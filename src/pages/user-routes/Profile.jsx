import React, { useContext } from "react";
import Reusable from "../../components/Reusable";
import userContext from "../../context/userContext";
import { useParams } from "react-router-dom";
import { getUser } from "../../services/user-service";
import { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";
import ViewUserProfile from "../../components/ViewUserProfile";
const Profile = () => {
  const object = useContext(userContext);
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUser(userId).then((data) => {
      console.log(data);
      setUser({ ...data });
    });
  }, []);

  const userView = () => {
    return (
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <ViewUserProfile user={user} />
        </Col>
      </Row>
    );
  };
  return <Reusable>{user ? userView() : ""}</Reusable>;
};

export default Profile;
