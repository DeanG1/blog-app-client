import userContext from "../context/userContext";
import Reusable from "../components/Reusable";
import AddPost from "../components/AddPost";

const CreatePost = () => {
  return (
    <userContext.Consumer>
      {(object) => (
        <Reusable>
          <h1>This is services page</h1>
          <h1>Welcome {object.user.login && object.user.data.name}</h1>
          <AddPost />
        </Reusable>
      )}
    </userContext.Consumer>
  );
};

export default CreatePost;
