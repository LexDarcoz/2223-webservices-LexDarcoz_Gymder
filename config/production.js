module.exports = {
  port: 9000,
  log: {
    level: "info",
    disabled: false,
  },
  cors: {
    origins: ["https://gymder.onrender.com/"],
    maxAge: 3 * 60 * 60, // 3h in seconds
  },
  database: {
    client: "182201as",
    host: "vichogent.be",
    port: 40043,
    name: "182201as",
  },
};
