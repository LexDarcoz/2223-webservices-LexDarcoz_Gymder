module.exports = {
  seed: async (knex) => {
    await knex("User").insert([
      {
        id: 1,
        name: "Admin",
        password: "Test123",
      },
      {
        id: 2,
        name: "Laurens De Maeyer",
        password: "Poesjes",
      },
      {
        id: 3,
        name: "Yes",
        password: "Yes123",
      },
    ]);
  },
};
