import { sequelize } from "@/config/db";
import { DataTypes, Model } from "sequelize";

class Category extends Model {
  public id!: number;
  public name!: string;
  public slug!: string;
  public description!: string;
  public image_url!: string;
  public is_active!: boolean;

  public created_at!: Date;
  public updated_at!: Date;
  public deleted_at!: Date | null;

  static associate(models: any) {
    Category.hasMany(models.Product, {
      foreignKey: "category_id",
      as: "products",
    });
  }
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(125),
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Category should't be null",
        },
        notEmpty: {
          msg: "Category should't be empty",
        },
      },
    },
    slug: {
      type: DataTypes.STRING(125),
      allowNull: false,
      unique: true,
      comment: "A User friendly version of name",
      validate: {
        notNull: {
          msg: "Slug should't be null",
        },
        notEmpty: {
          msg: "Slug should't be empty",
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image_url: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue:
        "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg",
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "categories",
    paranoid: true,
    timestamps: true,
    underscored: true,
  }
);

export default Category;
