import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { loadAllCategories } from "../services/category-service";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
function CategorySideMenu() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        console.log(data);
        setCategories([...data]);
      })
      .catch((error) => {
        toast.error("Error in loading categories!");
        console.log(error);
      });
  }, []);
  return (
    <div>
      <ListGroup>
        <ListGroupItem tag={Link} to="/" action={true} className="border-0">
          All Blogs
        </ListGroupItem>
        {categories &&
          categories.map((category, index) => {
            return (
              <ListGroupItem
                tag={Link}
                to={"/categories/" + category.categoryId}
                className="border-0 shadow-0 mt-1"
                key={index}
                action={true}
              >
                {category.categoryTitle}
              </ListGroupItem>
            );
          })}
      </ListGroup>
    </div>
  );
}

export default CategorySideMenu;
