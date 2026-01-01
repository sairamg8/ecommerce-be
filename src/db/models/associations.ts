import Product from "./product";
import Category from "./category";
import User from "./user";

export function initializeAssociations() {
  Product.belongsTo(Category, {
    foreignKey: "category_id",
  });
  Product.belongsTo(User, {
    foreignKey: "user_id",
  });
  User.hasMany(Product, { foreignKey: "user_id" });

  Category.hasMany(Product, {
    foreignKey: "category_id",
  });
  Category.belongsTo(User, {
    foreignKey: "user_id",
  });
  User.hasMany(Category, {
    foreignKey: "user_id",
  });
}
