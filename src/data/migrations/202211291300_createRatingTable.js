const { tables } = require("..");
module.exports = {
  up: async (knex) => {
    await knex.schema.createTable("gymRating", (table) => {
      table.increments("id");
      table.integer("rating");
      table.string("description");

      table.integer("gymId").unsigned().notNullable();
      table
        .foreign("gymId", "fk_GymRating_Gym")
        .references(`${tables.gym}.id`)
        .onDelete("CASCADE");

      table.integer("userId").unsigned().notNullable();
      table
        .foreign("userId", "fk_GymRating_User")
        .references(`${tables.user}.id`)
        .onDelete("CASCADE");
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists("gymRating");
  },
};
