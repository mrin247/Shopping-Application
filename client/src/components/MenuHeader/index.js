import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../actions";

/**
 * @author
 * @function MenuHeader
 **/

const MenuHeader = (props) => {
  // ! Extract category data from store
  const category = useSelector((state) => state.category);

  // ! Returns a refernce to the store.dispatch() method
  const dispatch = useDispatch();

  // ! This recursive function render categories by maintaining and returning an array
  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category._id}>
          {category.parentId ? (
            <a href={category.slug}>{category.name}</a>
          ) : <span>{category.name}</span>}

          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }

    return myCategories;
  };

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  return (
    <div className="menuHeader">
      <ul>
        {category.categories.length > 0
          ? renderCategories(category.categories)
          : null}
      </ul>
    </div>
  );
};

export default MenuHeader;
