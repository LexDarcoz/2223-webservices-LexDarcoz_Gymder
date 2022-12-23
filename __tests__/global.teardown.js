const { shutdownData, getKnex, tables } = require("../src/data");

module.exports = async () => {
  // Remove any leftover data
  await getKnex()(tables.userGym).delete();
  await getKnex()(tables.user).delete();
  await getKnex()(tables.gym).delete();

  // Close database connection
  await shutdownData();
};
