'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable("users", {
      id: {
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(200),
        validate: {
          isEmail: {
            msg: "User email should be valid"
          }
        },
        unique: true
      },
      phone: {
        allowNull: true,
        type: Sequelize.STRING(20)
      },
      role: {
        allowNull: false,
        type: Sequelize.ENUM("admin", "merchant", "user"),
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(200),
        validate: {
          notNull: {
            msg: "Password should't be null"
          },
          notEmpty: {
            msg: "Password should't be empty"
          },
        }
      },
      verification_token: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      reset_password_token: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      reset_password_expires: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      refresh_tokens: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
        allowNull: true,
      },
      is_verified: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      user_meta_data: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      profile_pic: {
        allowNull: true,
        type: Sequelize.STRING(255)
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      },
    })

    await queryInterface.addIndex("users", ["email"])
    await queryInterface.addIndex("users", ["first_name", "last_name"])
    await queryInterface.addIndex("users", ["role"])
  },


  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable("users", { cascade: true })
  }
};
