const { tables } = require("..");
module.exports = {
  up: async (knex) => {
    await knex.schema.createTable("user", (table) => {
      table.increments("id");
      table.string("auth0id", 255).notNullable();

      table.string("fullName", 256).notNullable();

      table.string("image", 256);
      table.string("bio", 256);
      table.string("phoneNumber", 256);
      table.string("emailAddress", 256).notNullable();
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists("user");
  },
};
