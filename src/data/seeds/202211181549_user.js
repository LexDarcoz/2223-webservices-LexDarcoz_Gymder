module.exports = {
  seed: async (knex) => {
    await knex(tables.user).insert([
      {
        id: 1,
        name: "Admin",
        password: "Test123",
      },
      {
        id: 2,
        name: "Joris De Maeyer",
        password: "Anaal123",
      },
      {
        id: 3,
        name: "Yes",
        password: "Yes123",
      },
    ]);
  },
};
