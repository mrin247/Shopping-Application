// ! Import Models
const Category = require("../../models/category");
const Product = require("../../models/product");
const Order=require("../../models/order")

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
      type: cats.type,
      children: childrenCategories(categories, cats._id),
    });
  }

  return categoryList;
}

// ! This controller send categories and products from "/initialdata" route

exports.postInitialdata = async (req, res) => {
  const categories = await Category.find({}).exec();
  const products = await Product.find({})
    .select("_id name price quantity slug description productPhotos category")
    .populate({ path: "category", select: "_id name" })
    .exec();
    const orders = await Order.find({})
    .populate("items.productId", "name")
    .exec();
  res.status(200).json({
    categories: childrenCategories(categories),
    products,
    orders,
  });
};
