const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    await knex(tables.userGym).insert([
      {
        id: 1,
        gymId: 1,
        userId: 1,
      },
    ]);
  },
};
