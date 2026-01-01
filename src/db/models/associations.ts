import Product from "./product";
import Category from "./category";
import User from "./user";

export function initializeAssociations() {
  Product.belongsTo(Category, {
    foreignKey: "category_id",
    as: "category",
  });
  Product.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
  });
  User.hasMany(Product, { foreignKey: "user_id", as: "products" });

  Category.hasMany(Product, {
    foreignKey: "category_id",
    as: "products",
  });
  Category.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
  });
  User.hasMany(Category, {
    foreignKey: "user_id",
    as: "categories",
  });
}
