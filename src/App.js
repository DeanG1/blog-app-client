import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "reactstrap";
import About from "./pages/About";
import Reusable from "./components/Reusable";
function App() {
  return (
    <Reusable>
      <h1>This is app component</h1>
    </Reusable>
  );
}

export default App;
