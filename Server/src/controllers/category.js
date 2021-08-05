// ! Import Dependencies
const slugify = require("slugify");
const env = require("dotenv");

env.config();

// ! Import Category Model
const Category = require("../models/category");
const shortid = require("shortid");

// ! Rcursive function for creating nested categories[Tree : O(nlogn)]
function childrenCategories(categories, parentId = null) {
  const categoryList = [];
  let category; // an array
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cats of category) {
    categoryList.push({
      _id: cats._id,
      name: cats.name,
      slug: cats.slug,
      parentId: cats.parentId,
      children: childrenCategories(categories, cats._id),
    });
  }

  return categoryList;
}

// ! This controller create Category from "/category/create" route
exports.postCreateCategory = (req, res) => {
  /**
     *     // Create category object from req body
    const categoryObj = {
      name: req.body.name,
      slug: slugify(req.body.name),
    };
    if (req.body.parentId) {
      categoryObj.parentId = req.body.parentId;
    }
     //   // Create new category from category object
      const _category = new Category(categoryObj);
  //
     */

  // Destructure input from req body
  const { name } = req.body;

  const slug = `${slugify(name)}-${shortid.generate()}`;
  let parentId = null;
  if (req.body.parentId) {
    parentId = req.body.parentId;
  }

  let categoryUrl;
  if (req.file) {
    categoryUrl = process.env.API + "/public/" + req.file.filename;
  }

  //Create new category from Destructured body parameters
  const _category = new Category({
    name,
    slug,
    categoryImage: categoryUrl,
    parentId,
  });

  // Save Category
  _category.save((err, category) => {
    if (err) return res.status(400).json({ err });
    if (category) {
      return res.status(201).json({ category });
    }
  });
};

// ! This controller get categories from Category model
exports.getCategories = (req, res, next) => {
  Category.find({}).exec((err, categories) => {
    if (err) return res.status(400).json({ err });
    if (categories) {
      const categoryList = childrenCategories(categories); // Recursive call for nested categories
      return res.status(200).json({ categoryList });
    }
  });
};

// ! This controller update categories from Category model
exports.updateCategories = async (req, res) => {
  const { _id, name, parentId, type } = req.body;
  const updatedCategories = [];
  if (name instanceof Array) {
    for (let i = 0; i < name.length; i++) {
      const category = {
        name: name[i],
        type: type[i],
      };
      if (parentId[i] !== "") {
        category.parentId = parentId[i];
      }

      const updatedCategory = await Category.findOneAndUpdate(
        { _id: _id[i] },
        category,
        { new: true }
      );
      updatedCategories.push(updatedCategory);
    }
    return res.status(201).json({ updateCategories: updatedCategories });
  } else {
    const category = {
      name,
      type,
    };
    if (parentId !== "") {
      category.parentId = parentId;
    }
    const updatedCategory = await Category.findOneAndUpdate({ _id }, category, {
      new: true,
    });
    return res.status(201).json({ updatedCategory });
  }
};


// ! This controller update categories from Category model

exports.deleteCategories = async (req, res, next) => {
  const { ids } = req.body.payload;
  const deletedCategories = [];
  for (let i = 0; i < ids.length; i++) {
    const deleteCategory = await Category.findOneAndDelete({
      _id: ids[i]._id,
      //createdBy: req.user._id,
    });
    deletedCategories.push(deleteCategory);
  }

  if (deletedCategories.length == ids.length) {
    res.status(201).json({ message: "Categories removed" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};