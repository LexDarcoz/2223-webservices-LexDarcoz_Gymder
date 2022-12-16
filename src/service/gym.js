const { getLogger } = require("../core/logging");
const gymRepository = require("../repository/gym");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

/**
 * Get all places.
 */
const getAll = async () => {
  debugLog("Fetching all places");
  const items = await gymRepository.findAll();
  const count = await gymRepository.findCount();
  return { items, count };
};

/**
 * Get the place with the given `id`.
 *
 * @param {string} id - Id of the place to get.
 */
const getById = (id) => {
  debugLog(`Fetching place with id ${id}`);
  return gymRepository.findById(id);
};

/**
 * Create a new place.
 *
 * @param {object} gym - Place to create.
 * @param {string} gym.name - Name of the place.
 * @param {number} [gym.rating] - Rating of the place (between 1 and 5).
 */

// , filename, filename
const create = async ({ name, description, owner, emailAddress }) => {
  const newGym = { name, description, owner, emailAddress };
  debugLog("Creating new gym", newGym);
  const id = await gymRepository.create(newGym);
  return getById(id);
};

/**
 * Update an existing place.
 *
 * @param {string} id - Id of the place to update.
 * @param {object} place - Place to save.
 * @param {string} [place.name] - Name of the place.
 * @param {number} [place.rating] - Rating of the place (between 1 and 5).
 */
const updateById = async (id, { name, description, owner, emailAddress }) => {
  const updatedGym = { name, description, owner, emailAddress };
  debugLog(`Updating gym with id ${id}`, updatedGym);
  await gymRepository.updateById(id, updatedGym);
  return getById(id);
};

/**
 * Delete an existing place.
 *
 * @param {string} id - Id of the place to delete.
 */
const deleteById = async (id) => {
  debugLog(`Deleting gym with id ${id}`);
  await gymRepository.deleteById(id);
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
