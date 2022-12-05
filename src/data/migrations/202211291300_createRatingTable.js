import { tables } from "../index.js";

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable("GymRating", (table) => {
      table.increments("id");

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

      table.integer("rating");
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists("gymRating");
  },
};
