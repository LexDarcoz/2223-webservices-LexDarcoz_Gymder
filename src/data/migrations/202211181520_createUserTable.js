const { tables } = require("..");
module.exports = {
  up: async (knex) => {
    await knex.schema.createTable("user", (table) => {
      table.increments("id");

      table.string("name", 256).notNullable();

      table.string("emailaddress", 256).notNullable();
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists("user");
  },
};
