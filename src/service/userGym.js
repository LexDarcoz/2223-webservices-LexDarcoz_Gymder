const { getLogger } = require("../core/logging");
const ServiceError = require("../core/serviceError");
const userGymRepository = require("../repository/userGym");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

/**
 * Register a new user
 *
 * @param {object} user - The user's data.
 * @param {string} user.name - The user's name.
 */
const create = async (userId, gymId) => {
  debugLog("Creating a new user", gymId, userId);
  const id = await userGymRepository.create(userId, gymId);
  return await getById(id);
};

/**
 * Get all users.
 */
const getAll = async (userId) => {
  debugLog(`Fetching all gyms with userid ${userId}`);
  const data = await userGymRepository.findAll(userId);
  const totalCount = await userGymRepository.findCount();
  return {
    data,
    count: totalCount,
  };
};

/**
 * Get the user with the given id.
 *
 * @param {string} id - Id of the user to get.
 *
 * @throws {ServiceError} One of:
 * - NOT_FOUND: No user with the given id could be found.
 */
const getById = async (id) => {
  debugLog(`Fetching user with id ${id}`);
  const user = await userGymRepository.findById(id);

  if (!user) {
    throw ServiceError.notFound(`No user with id ${id} exists`, {
      id,
    });
  }

  return user;
};

/**
 * Delete an existing user.
 *
 * @param {string} id - Id of the user to delete.
 *
 * @throws {ServiceError} One of:
 * - NOT_FOUND: No user with the given id could be found.
 */
const deleteById = async (id) => {
  debugLog(`Deleting gym from user with id ${id}`);
  const deleted = await userGymRepository.deleteById(id);

  if (!deleted) {
    throw ServiceError.notFound(`No user with id ${id} exists`, {
      id,
    });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  deleteById,
};
