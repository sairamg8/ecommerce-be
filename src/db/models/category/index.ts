import { sequelize } from "@/config/db";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

class Category extends Model<
  InferAttributes<Category>,
  InferCreationAttributes<Category>
> {
  declare id: CreationOptional<number>;
  declare user_id: number;
  declare name: string;
  declare slug: string;

  declare description: CreationOptional<string>;
  declare image_url: CreationOptional<string>;
  declare is_active: CreationOptional<boolean>;

  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
  declare deleted_at: CreationOptional<Date | null>;
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        key: "id",
        model: "users",
      },
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
        "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder--Glossary.svg",
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    tableName: "categories",
    paranoid: true,
    timestamps: true,
    underscored: true,
    indexes: [{ fields: ["name"] }, { fields: ["slug", "description"] }],
  }
);

export default Category;
