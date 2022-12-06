const { getLogger } = require("../core/logging");
const ServiceError = require("../core/serviceError");
const gymRatingRepository = require("../repository/gymRating");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

/**
 * Get all transactions.
 */
const getAll = async () => {
  debugLog("Fetching all transactions");
  const items = await gymRatingRepository.findAll();
  const count = await gymRatingRepository.findCount();
  return {
    items,
    count,
  };
};

/**
 * Get the transaction with the given `id`.
 *
 * @param {number} id - Id of the transaction to find.
 */
const getById = async (id) => {
  debugLog(`Fetching transaction with id ${id}`);
  const transaction = await gymRatingRepository.findById(id);

  if (!transaction) {
    throw ServiceError.notFound(`There is no transaction with id ${id}`, {
      id,
    });
  }

  return transaction;
};

const create = async ({ amount, date, placeId, userId }) => {
  debugLog("Creating new transaction", {
    amount,
    date,
    placeId,
    userId,
  });

  const id = await gymRatingRepository.create({
    amount,
    date,
    placeId,
    userId,
  });
  return getById(id);
};

const updateById = async (id, { amount, date, placeId, userId }) => {
  debugLog(`Updating transaction with id ${id}`, {
    amount,
    date,
    placeId,
    userId,
  });

  await gymRatingRepository.updateById(id, {
    amount,
    date,
    placeId,
    userId,
  });
  return getById(id);
};

/**
 * Delete the transaction with the given `id`.
 *
 * @param {number} id - Id of the transaction to delete.
 */
const deleteById = async (id) => {
  debugLog(`Deleting transaction with id ${id}`);
  await gymRatingRepository.deleteById(id);
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
