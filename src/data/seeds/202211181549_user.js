const { tables } = require("..");
module.exports = {
  seed: async (knex) => {
    await knex(tables.user).insert([
      {
        id: 1,
        name: "Admin",
        emailaddress: "AdminMan@gmail.com",
      },
      {
        id: 2,
        name: "Joris De Maeyer",
        emailaddress: "AdminMan@gmail.com",
      },
      {
        id: 3,
        name: "Yes",
        emailaddress: "AdminMan@gmail.com",
      },
    ]);
  },
};
