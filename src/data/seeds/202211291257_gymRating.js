module.exports = {
  seed: async (knex) => {
    await knex("Gym").insert([
      {
        userId: "yes",
        gymId: "yes",
      },
    ]);
  },
};
