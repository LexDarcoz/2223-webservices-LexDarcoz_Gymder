module.exports = {
  up: async (knex) => {
    await knex.schema.createTable("User", (table) => {
      table.increments("id");

      table.string("name", 256).notNullable();

      table.string("emailaddress", 256).notNullable();
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists("User");
  },
};
