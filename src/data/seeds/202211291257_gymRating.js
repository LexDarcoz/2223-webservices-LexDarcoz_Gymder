const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    await knex(tables.gymRating).insert([
      {
        userId: 1,
        gymId: 1,
        rating: 3,
      },
    ]);
  },
};
