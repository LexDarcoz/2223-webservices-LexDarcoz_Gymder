module.exports = {
  up: async (knex) => {
    await knex.schema.createTable("Gym", (table) => {
      table.increments("id");

      table.string("name", 256).notNullable();

      table.string("email-Adres", 256);

      table.string("contact", 256).notNullable();

      table.string("description", 256);

      table.string("image", 256);

      table.double("rating");
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists("Gym");
  },
};
