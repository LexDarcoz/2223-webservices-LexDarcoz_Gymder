const { tables } = require("..");
module.exports = {
  up: async (knex) => {
    await knex.schema.createTable("userGym", (table) => {
      table.increments("id");
      table.integer("gymId").unsigned().notNullable();
      table
        .foreign("gymId", "fk_UserGym_Gym")
        .references(`${tables.gym}.id`)
        .onDelete("CASCADE");

      table.integer("userId").unsigned().notNullable();
      table
        .foreign("userId", "fk_UserGym_User")
        .references(`${tables.user}.id`)
        .onDelete("CASCADE");
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists("userGym");
  },
};
