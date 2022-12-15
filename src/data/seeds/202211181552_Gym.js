const { tables } = require("..");
module.exports = {
  seed: async (knex) => {
    await knex(tables.gym).insert([
      {
        id: 1,
        name: "Stamina Opwijk",
        rating: 5,
        owner: "Kambiz",
        description: "Address: Stationsstraat 12, bus 1 te, 1745 Opwijk",
      },
      {
        id: 2,
        name: "First Class Gym",
        rating: 4.0,
        owner: "Michael guy",
        description: "Address: Zwijnaardsesteenweg 282, 9000 Gent",
      },
      {
        id: 3,
        name: "Basic-Fit Gent Normaalschoolstraat",
        rating: 3,
        owner: "Johnny",
        description: "Address: Normaalschoolstraat 42, 9000 Gent",
      },
      {
        id: 4,
        name: "Physical Merchtem",
        rating: 4.6,
        owner: "John",
        description: "Address: August de Boeckstraat 29, 1785 Merchtem",
      },
      {
        id: 5,
        name: "Thermae Sports Merchtem",
        rating: 1,
        owner: "Jennifer",
        description: "Address: Kwekelaarstraat 4, 1785 Merchtem",
      },
      {
        id: 6,
        name: "Footloose Gym & Dans VZW",
        rating: 2.4,
        owner: "Jana",
        description: "Address: Mieregemstraat 35, 1785 Merchtem",
      },
    ]);
  },
};
