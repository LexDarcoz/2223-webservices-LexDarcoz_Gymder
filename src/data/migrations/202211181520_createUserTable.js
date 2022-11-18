module.exports = {
  up: async (knex) => {
    await knex.schema.createTable("User", (table) => {
      table.increments("id");

      table.string("name", 256).notNullable();

      table.string("email-adres", 256).notNullable();

      table.string("password", 256).notNullable();

      table.integer("level", 256).notNullable();

      table.string("salt", 128).notNullable();
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists("User");
  },
};
