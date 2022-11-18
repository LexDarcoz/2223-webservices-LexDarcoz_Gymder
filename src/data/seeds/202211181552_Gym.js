module.exports = {
  seed: async (knex) => {
    await knex("Gym").insert([
      {
        id: 1,
        name: "Stamina Opwijk",
        rating: 5,
        contact: "Michael guy",
        description: "lorem",
      },
      {
        id: 2,
        name: "First Class Gym",
        rating: 3.6,
        description: "lorem",
      },
      {
        id: 3,
        name: "Basic Fit",
        rating: 3.6,
        contact: "Michael guy",
        description: "lorem",
      },
    ]);
  },
};
