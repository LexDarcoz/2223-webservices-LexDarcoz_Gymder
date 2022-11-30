import tables from "./data"

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable("gymRating", (table) => {
      table.increments("id");
      table.integer("gymId").unsigned().notNullable();
      table
        .foreign("gymId", "fk_gymRating_Gym")
        .references(`${tables.}.id`)
        .onDelete("CASCADE");

      table.integer("userId").unsigned().notNullable();

      table
        .foreign("userId", "fk_gymRating_User")
        .references(`${tables.place}.id`)
        .onDelete("CASCADE");

      table.integer("rating");
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists("gymRating");
  },
};
