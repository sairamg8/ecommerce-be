'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("categories", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(125),
        allowNull: false,
        unique: true
      },
      slug: {
        type: Sequelize.STRING(125),
        allowNull: false,
        unique: true,
        comment: "a user friendly version of name"
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image_url: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE"
      },
    })

    await queryInterface.addIndex("categories", ["slug"]);
    await queryInterface.addIndex("categories", ["is_active"])
    await queryInterface.addIndex("categories", ["deleted_at"])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("categories", { cascade: true })
  }
};
