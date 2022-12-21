const { getLogger } = require("../core/logging");
const gymRepository = require("../repository/gym");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const getAll = async () => {
  debugLog("Fetching all places");
  const items = await gymRepository.findAll();
  const count = await gymRepository.findCount();
  return { items, count };
};

const getById = (id) => {
  debugLog(`Fetching place with id ${id}`);
  return gymRepository.findById(id);
};

const create = async (
  { name, owner, emailAddress, description, address },
  filename
) => {
  const newGym = { name, owner, emailAddress, description, address, filename };
  debugLog("Creating new gym", newGym);
  const id = await gymRepository.create(newGym);
  return getById(id);
};

const updateById = async (id, { name, description, owner, emailAddress }) => {
  const updatedGym = { name, description, owner, emailAddress };
  debugLog(`Updating gym with id ${id}`, updatedGym);
  await gymRepository.updateById(id, updatedGym);
  return getById(id);
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
};
