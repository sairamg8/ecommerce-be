import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/config/db";

class Product extends Model {
  public id!: number;
  public category_id!: number;
  public name!: string;
  public slug!: string;
  public description?: string;
  public short_description?: string;
  public price!: number;
  public sale_price!: number;
  public sku!: number;
  public stock_quantity!: number;
  public image_url?: string;
  public is_active!: boolean;
  public is_featured!: boolean;
  public created_at!: Date;
  public updated_at!: Date;
  public deleted_at!: Date | null;
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
        return value ? parseFloat(value) : null;
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
        return value ? parseFloat(value) : null;
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
      validate: {
        notNull: {
          msg: "Is Active should't be null",
        },
      },
    },
    is_featured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Is Featured should't be null",
        },
      },
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
