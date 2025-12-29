import Product from "./product";
import Category from "./category";

export function initializeAssociations() {
  Product.belongsTo(Category, {
    foreignKey: "category_id",
    as: "categories",
  });

  Category.hasMany(Product, {
    foreignKey: "category_id",
    as: "products",
  });
}
