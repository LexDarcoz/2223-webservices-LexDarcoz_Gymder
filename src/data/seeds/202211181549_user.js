const { tables } = require("..");
module.exports = {
  seed: async (knex) => {
    await knex(tables.user).insert([
      {
        id: 1,
        fullName: "Admin",
        phoneNumber: "0485883988",
        emailaddress: "AdminMan@gmail.com",
        auth0id: "yes",
        image: "LukasFoto.png",
        bio: "Ik ben lukas",
      },
      {
        id: 2,
        fullName: "Lisa Weng",
        phoneNumber: "0485483988",
        emailaddress: "AdminMan@gmail.com",
        auth0id: "yes",
        image: "LisaFoto.png",
        bio: "Ik ben Lisa",
      },
      {
        id: 3,
        fullName: "Laurens Van Duyse",
        phoneNumber: "0485888988",
        image: "LaurensFoto.png",
        emailaddress: "AdminMan@gmail.com",
        auth0id: "yes",
        bio: "Ik ben Laurens",
      },

      {
        id: 4,
        fullName: "Joris De Maeyer",
        phoneNumber: "0285883988",
        emailaddress: "AdminMan@gmail.com",
        auth0id: "uwuwuwuv",
        bio: "Ik ben Laurens",
      },
      {
        id: 5,
        fullName: "Lukas De Maeyer",
        phoneNumber: "0485883988",
        emailaddress: "AdminMan@gmail.com",
        auth0id: "yes",
        bio: "Ik ben Lukas en doe voetbal",
      },
      {
        id: 6,
        fullName: "Joris De Maeyer",
        phoneNumber: "0485883988",
        emailaddress: "AdminMan@gmail.com",
        auth0id: "yes",
        bio: "Ik ben joris",
      },
      {
        id: 7,
        fullName: "Joris De Maeyer",
        phoneNumber: "0485883988",
        emailaddress: "AdminMan@gmail.com",
        auth0id: "yes",
        bio: "Ik ben joris",
      },
    ]);
  },
};
