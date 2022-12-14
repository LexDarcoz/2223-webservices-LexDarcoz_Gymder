const { tables } = require("..");
module.exports = {
  seed: async (knex) => {
    await knex(tables.gym).insert([
      {
        id: 1,
        name: "Stamina Opwijk",
        rating: 5,
        owner: "Michael guy",
        description: "lorem",
      },
      {
        id: 2,
        name: "First Class Gym",
        rating: 4.0,
        owner: "Michael guy",
        description: "lorem",
      },
      {
        id: 3,
        name: "Basic Fit",
        rating: 3,
        owner: "Michael guy",
        description: "lorem",
      },
    ]);
  },
};
