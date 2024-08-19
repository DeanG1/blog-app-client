import userContext from "../context/userContext";
import Reusable from "../components/Reusable";

const About = () => {
  return (
    <userContext.Consumer>
      {(object) => (
        <Reusable>
          <h1>this is about page</h1>
          <p>we are building blog website</p>
          {console.log(object)}
          <h1>Welcome user: {object.user.login && object.user.data.name}</h1>
        </Reusable>
      )}
    </userContext.Consumer>
  );
};

export default About;
