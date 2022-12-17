const { tables } = require("..");
module.exports = {
  up: async (knex) => {
    await knex.schema.createTable("gym", (table) => {
      table.increments("id");

      table.string("name", 256).notNullable();

      table.string("emailAddress", 256);

      table.string("owner", 256).notNullable();

      table.string("description", 256);

      table.string("image", 256);

      table.double("rating");
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists("gym");
  },
};
