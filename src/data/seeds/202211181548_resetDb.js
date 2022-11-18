module.exports = {
  seed: async (knex) => {
    // first delete all entries in every table
    await knex("Gym").delete();
    await knex("User").delete();
  },
};
