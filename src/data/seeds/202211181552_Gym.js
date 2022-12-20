const { tables } = require("..");
module.exports = {
  seed: async (knex) => {
    await knex(tables.gym).insert([
      {
        id: 1,
        name: "Stamina Opwijk",
        rating: 5,
        owner: "Kambiz",
        image: "StaminaLogo.jpg",
        emailAddress: "Kambiz@gmail.com",
        address: "Address: Stationsstraat 12, bus 1 te, 1745 Opwijk",
        description:
          "Want to stay fit but can't seem to find the motivation? Join our gym now!",
      },
      {
        id: 2,
        name: "First Class Gym",
        rating: 4.0,
        owner: "Michael",
        image: "FirstClassGymLogo.png",
        emailAddress: "Michael@gmail.com",
        address: "Address: Zwijnaardsesteenweg 282, 9000 Gent",
        description:
          "We can't wait to share the best deals and advice with you",
      },
      {
        id: 3,
        name: "Basic-Fit Gent",
        rating: 3,
        owner: "Johnny",
        emailAddress: "Johnny@gmail.com",
        address: "Address: Normaalschoolstraat 42, 9000 Gent",
        description: "Basic fit at Gent, come by!",
      },
      {
        id: 4,
        name: "Physical Merchtem",
        rating: 4.6,
        owner: "John",
        emailAddress: "John@gmail.com",
        image: "PhysicalLogo.png",
        address: "Address: August de Boeckstraat 29, 1785 Merchtem",
        description:
          "Merchtem gym with best quality of service, come see for yourself!",
      },
      {
        id: 5,
        name: "Thermae Sports Merchtem",
        rating: 1,
        owner: "Jennifer",
        emailAddress: "Jennifer@gmail.com",
        address: "Address: Kwekelaarstraat 4, 1785 Merchtem",
        description: "",
      },
      {
        id: 6,
        name: "Footloose Gym & Dans VZW",
        rating: 2.4,
        owner: "Jana",
        emailAddress: "Jana@gmail.com",
        address: "Address: Mieregemstraat 35, 1785 Merchtem",
        description: "Dancing gym Merchtem!",
      },
    ]);
  },
};
