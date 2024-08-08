const Reusable = ({ title = "This is reusable component", children }) => {
  return (
    <div>
      <h1>This is Header</h1>
      {children}
      <h1>This is Footer</h1>
    </div>
  );
};
export default Reusable;
