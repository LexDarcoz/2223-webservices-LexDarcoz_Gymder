module.exports = {
  seed: async (knex) => {
    // first delete all entries in every table
    await knex("gym").delete();
    await knex("user").delete();
    await knex("userGym").delete();
  },
};
