import CustomNavbar from "./CustomNavbar";

const Reusable = ({ title = "This is reusable component", children }) => {
  return (
    <div className="container-fluid p-0 m-0">
      <CustomNavbar />
      {children}
    </div>
  );
};
export default Reusable;
