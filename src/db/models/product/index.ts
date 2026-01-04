import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "@/config/db";

class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  declare id: CreationOptional<number>;
  declare category_id: CreationOptional<number>;
  declare name: CreationOptional<string>;
  declare slug: CreationOptional<string>;
  declare description: CreationOptional<string>;
  declare short_description: CreationOptional<string>;
  declare price: CreationOptional<number>;
  declare sale_price: CreationOptional<number>;
  declare sku: CreationOptional<number>;
  declare stock_quantity: CreationOptional<number>;
  declare image_url: CreationOptional<string>;
  declare is_active: CreationOptional<boolean>;
  declare is_featured: CreationOptional<boolean>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
  declare deleted_at: CreationOptional<Date | null>;
  declare user_id: number;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        key: "id",
        model: "users",
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        key: "id",
        model: "categories",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name Should't be null",
        },
        notEmpty: {
          msg: "Name Should't be null",
        },
      },
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Slug Should't be null",
        },
        notEmpty: {
          msg: "Slug Should't be null",
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Description Should't be null",
        },
        notEmpty: {
          msg: "Description Should't be null",
        },
      },
    },
    short_description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Description Should't be null",
        },
        notEmpty: {
          msg: "Description Should't be null",
        },
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Description Should't be null",
        },
      },
      get() {
        const value = this.getDataValue("price");
        return value ? parseFloat(String(value)) : null;
      },
    },
    sale_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Description Should't be null",
        },
      },
      get() {
        const value = this.getDataValue("sale_price");
        return value ? parseFloat(String(value)) : null;
      },
    },
    sku: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Slug Should't be null",
        },
      },
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Stock Quantity should't be null",
        },
      },
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Image URL should't be null",
        },
      },
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: {
          msg: "Is Active should't be null",
        },
      },
    },
    is_featured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: {
          msg: "Is Featured should't be null",
        },
      },
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
    paranoid: true,
    tableName: "products",
    sequelize,
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ["category_id"] },
      { fields: ["is_active"] },
      { fields: ["is_featured"] },
      { fields: ["price"] },
      { fields: ["created_at"] },
      { fields: ["slug"], unique: true },
      { fields: ["sku"], unique: true },
    ],
    createdAt: "created_at", // ← add these
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);

export default Product;
