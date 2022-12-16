module.exports = {
  port: 9000,
  log: {
    level: "silly",
    disabled: true,
  },
  cors: {
    origins: ["http://localhost:9000/api/gym"],
    maxAge: 3 * 60 * 60,
  },
  database: {
    client: "mysql2",
    host: "vichogent.be",
    port: 40043,
    name: "182201as",
  },
};
