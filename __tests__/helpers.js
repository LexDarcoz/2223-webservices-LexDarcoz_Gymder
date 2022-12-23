const axios = require("axios");
const config = require("config");
const supertest = require("supertest");

const createServer = require("../src/createServer");
const { getKnex } = require("../src/data");

const fetchAccessToken = async () => {
  const response = await axios.post(
    config.get("auth.tokenUrl"),
    {
      grant_type: "password",
      username: config.get("auth.testUser.username"),
      password: config.get("auth.testUser.password"),
      audience: config.get("auth.audience"),
      scope: "openid profile email offline_access",
      client_id: config.get("auth.clientId"),
      client_secret: config.get("auth.clientSecret"),
    },
    {
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
    }
  );

  return response.data.access_token;
};

/**
 * Ensure a server instance is running.
 *
 * @param {Function} setter - Setter which gives access to the supertest agent and the Knex instance
 *
 * @returns {supertest.SuperAgentTest} A supertest agent.
 */
const withServer = (setter) => {
  let server;

  beforeAll(async () => {
    server = await createServer();
    const token = await fetchAccessToken();

    setter({
      knex: getKnex(),
      request: supertest(server.getApp().callback()),
      authHeader: `Bearer ${token}`,
    });
  });

  afterAll(async () => {
    // Cleanup resources!
    await server.stop();
  });
};

module.exports = {
  fetchAccessToken,
  withServer,
};
