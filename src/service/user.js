const { getLogger } = require("../core/logging");
const ServiceError = require("../core/serviceError");
const userRepository = require("../repository/user");

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
const register = ({
  fullName,
  auth0id,
  bio,
  image,
  phoneNumber,
  emailAddress,
}) => {
  debugLog("Creating a new user", {
    fullName,
    auth0id,
    bio,
    image,
    phoneNumber,
    emailAddress,
  });
  return userRepository.create({
    fullName,
    auth0id,
    bio,
    image,
    phoneNumber,
    emailAddress,
  });
};

/**
 * Get all users.
 */
const getAll = async () => {
  debugLog("Fetching all users");
  const data = await userRepository.findAll();
  const totalCount = await userRepository.findCount();
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
  const user = await userRepository.findById(id);

  if (!user) {
    throw ServiceError.notFound(`No user with id ${id} exists`, {
      id,
    });
  }

  return user;
};

const getByAuth0Id = async (auth0id) => {
  debugLog(`Fetching user with auth0id ${auth0id}`);
  const user = await userRepository.findByAuth0Id(auth0id);

  if (!user) {
    throw ServiceError.notFound(`No user with id ${auth0id} exists`, {
      auth0id,
    });
  }

  return user;
};
/**
 * Update an existing user.
 *
 * @param {string} id - Id of the user to update.
 * @param {object} user - User to save.
 * @param {string} [user.name] - Name of the user.
 *
 * @throws {ServiceError} One of:
 * - NOT_FOUND: No user with the given id could be found.
 */
const updateByAuthId = (
  auth0id,
  { fullName, phoneNumber, emailAddress, country, state, city, bio }
) => {
  debugLog(`Updating user with Authid ${auth0id}`, {
    fullName,
    phoneNumber,
    emailAddress,
    country,
    state,
    city,
    bio,
  });
  return userRepository.updateByAuthId(auth0id, {
    fullName,
    phoneNumber,
    emailAddress,
    country,
    state,
    city,
    bio,
  });
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
  debugLog(`Deleting user with id ${id}`);
  const deleted = await userRepository.deleteById(id);

  if (!deleted) {
    throw ServiceError.notFound(`No user with id ${id} exists`, {
      id,
    });
  }
};

module.exports = {
  register,
  getAll,
  getById,
  getByAuth0Id,
  updateByAuthId,
  deleteById,
};
