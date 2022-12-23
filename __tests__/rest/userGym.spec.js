const config = require("config");

const { withServer } = require("../helpers");
const { tables } = require("../../src/data");

const data = {
  userGym: [
    {
      id: 10,
      userId: 1,
      gymId: 10,
    },
    {
      id: 20,
      userId: 1,
      gymId: 10,
    },
    {
      id: 30,
      userId: 1,
      gymId: 10,
    },
  ],
  gym: [
    {
      id: 10,
      name: "Test gym",
      owner: "TestOwner",
      emailAddress: "Test@gmail.com",
      description: "Test",
      address: "TestAddress",
      rating: 2.4,
      image: "StaminaLogo.jpg",
    },
  ],
  users: [
    {
      id: 1,
      auth0id: config.get("auth.testUser.userId"),
      fullName: config.get("auth.testUser.username"),
      image: "EmmaFoto.jpg",
      emailAddress: "Test@gmail.com",
      phoneNumber: "0485883293",
      country: "Belgium",
      state: "Oost-Vlaanderen",
      city: "Gent",
      bio: "I am testuser",
    },
  ],
};

const dataToDelete = {
  userGym: [1, 2, 3],
  gym: [10],
  users: [1],
};

describe("userGyms", () => {
  let request;
  let knex;
  let authHeader;

  withServer(({ knex: k, request: r, authHeader: a }) => {
    knex = k;
    request = r;
    authHeader = a;
  });

  const url = "/api/userGym";

  describe("GET /api/userGym", () => {
    beforeAll(async () => {
      await knex(tables.user).insert(data.users);
      await knex(tables.gym).insert(data.gym);
      await knex(tables.userGym).insert(data.userGym);
    });

    afterAll(async () => {
      await knex(tables.userGym).whereIn("id", dataToDelete.userGym).delete();

      await knex(tables.gym).whereIn("id", dataToDelete.gym).delete();

      await knex(tables.user).whereIn("id", dataToDelete.users).delete();
    });

    test("it should 200 and return all userGyms", async () => {
      const response = await request.get(url).set("Authorization", authHeader);

      expect(response.status).toBe(200);
      expect(response.body.count).toBe(3);
    });
  });

  describe("POST /api/userGym", () => {
    const userGymToDelete = [];
    const usersToDelete = [];

    beforeAll(async () => {
      await knex(tables.user).insert(data.users);
      await knex(tables.gym).insert(data.gym);
    });

    afterAll(async () => {
      await knex(tables.userGym).whereIn("id", dataToDelete.userGym).delete();
      await knex(tables.gym).whereIn("id", dataToDelete.gym).delete();
      await knex(tables.user).whereIn("id", dataToDelete.users).delete();
    });

    test("it should 201 and create a new userGym", async () => {
      const newUserGym = {
        userId: data.users[0].id,
        gymId: data.gym[0].id,
      };
      const response = await request
        .post(url)
        .set("Authorization", authHeader)
        .send(newUserGym);

      expect(response.status).toBe(201);

      expect(response.body.id).toBeTruthy();
      expect(response.body.name).toBe(data.users[0].name);

      dataToDelete.userGym.push(response.body.id);
    });
  });

  describe("DELETE /api/userGym/:id", () => {
    beforeAll(async () => {
      await knex(tables.user).insert(data.users);
      await knex(tables.gym).insert(data.gym);
      await knex(tables.userGym).insert(data.userGym[0]);
    });

    afterAll(async () => {
      await knex(tables.gym).whereIn("id", dataToDelete.gym).delete();
      await knex(tables.user).whereIn("id", dataToDelete.users).delete();
    });

    test("it should 200 and delete the requested userGym", async () => {
      const gymUserId = data.userGym[0].id;
      const response = await request
        .delete(`${url}/${gymUserId}`)
        .set("Authorization", authHeader);

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });
  });
});
