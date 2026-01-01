import bcrypt from "bcryptjs";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import crypto from "crypto";
import { sequelize } from "@/config/db";
import { JSONType } from "zod/v4/core/util";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare first_name: string;
  declare last_name: string;
  declare email: string;
  declare phone: CreationOptional<number | null>;
  declare role: CreationOptional<"admin" | "merchant" | "user">;
  declare password: string;
  declare is_verified: CreationOptional<boolean>;
  declare user_meta_data: CreationOptional<JSONType | null>;
  declare profile_pic: CreationOptional<string | null>;
  declare verification_token: CreationOptional<string | null>;
  declare reset_password_token: CreationOptional<string | null>;
  declare reset_password_expires: CreationOptional<Date | null>;
  declare refresh_tokens: CreationOptional<string[]>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
  declare deleted_at: CreationOptional<Date | null>;

  async comparePassword(candidatePass: string): Promise<boolean> {
    return await bcrypt.compare(candidatePass, this.password);
  }

  getResetPasswordToken(): string {
    const resetToken = crypto.randomBytes(25).toString("hex");
    this.reset_password_token = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    this.reset_password_expires = new Date(Date.now() + 10 * 60 * 1000);

    return resetToken;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(125),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(125),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isValidPhone(value: string | null) {
          if (value === null) return;
          const phoneRegex = /^(\+?[1-9]\d{1,14}|\d{10})$/;
          if (!phoneRegex.test(value)) {
            throw new Error("Invalid phone number format");
          }
        },
      },
    },
    role: {
      type: DataTypes.ENUM("admin", "merchant", "user"),
      defaultValue: "user",
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: { msg: "Password cannot be null" },
        notEmpty: { msg: "Password cannot be empty" },
        len: {
          args: [6, 255],
          msg: "Password must be at least 6 characters",
        },
      },
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    user_meta_data: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    profile_pic: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    verification_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reset_password_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reset_password_expires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    refresh_tokens: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
      allowNull: true,
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
    tableName: "users",
    paranoid: true,
    freezeTableName: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    indexes: [
      {
        fields: ["email"],
      },
      {
        fields: ["role"],
      },
    ],
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },

      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

export default User;
