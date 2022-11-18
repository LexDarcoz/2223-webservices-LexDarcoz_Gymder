const { tables, getKnex } = require("../data/index");
const { getLogger } = require("../core/logging");

const findAll = () => {
  return getKnex()("Gym").select().orderBy("rating", "ASC");
};
