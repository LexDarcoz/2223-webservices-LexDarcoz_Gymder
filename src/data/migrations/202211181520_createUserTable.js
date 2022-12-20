const { tables } = require("..");
module.exports = {
  up: async (knex) => {
    await knex.schema.createTable("user", (table) => {
      table.increments("id");
      table.string("auth0id", 255).notNullable().defaultTo("non-Auth0 user");
      table.string("fullName", 256).notNullable().defaultTo("No name given");
      table.string("image", 256);
      table.string("emailAddress", 256).defaultTo("No emailAddress given");
      table.string("phoneNumber", 256).defaultTo("No phoneNumber given");
      table.string("country", 256).defaultTo("I do not have a country yet!");
      table.string("state", 256).defaultTo("I do not have a state yet!");
      table.string("city", 256).defaultTo("I do not have a city yet!");
      table.string("bio", 256).defaultTo("I do not have a bio yet!");
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists("user");
  },
};
