const { hasPermission, permissions } = require("../core/auth");
const { tables, getKnex } = require("../data");
const { getLogger } = require("../core/logging");

/**
 * Get all users.
 */
const findAll = () => {
  return getKnex()(tables.gymRating).select().orderBy("rating", "ASC");
};

/**
 * Calculate the total number of user.
 */
const findCount = async () => {
  const [count] = await getKnex()(tables.gymRating).count();
  return count["count(*)"];
};

/**
 * Find a user with the given id.
 *
 * @param {string} id - The id to search for.
 */
const findById = (id) => {
  return getKnex()(tables.user).where("id", id).first();
};

/**
 * Create a new gymRating with the given `name`.
 *
 * @param {object} gym - User to create.
 * @param {string} gymRating.id - Name of the user.
 *
 * @returns {Promise<number>} - Id of the created user.
 */
const create = async ({ userId, gymId, rating, description }) => {
  try {
    const [id] = await getKnex()(tables.gymRating).insert({
      userId,
      gymId,
      rating,
      description,
    });
    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error("Error in create", {
      error,
    });
    throw error;
  }
};

/**
 * Update a gym with the given `id`.
 *
 * @param {number} id - Id of the user to update.
 * @param {object} user - User to save.
 * @param {string} user.name - Name of the user.
 *
 * @returns {Promise<number>} - Id of the updated user.
 */
const updateById = async (id, { userId, gymId, rating, description }) => {
  try {
    await getKnex()(tables.user)
      .update({
        userId,
        gymId,
        rating,
        description,
      })
      .where("id", id);
    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error("Error in updateById", {
      error,
    });
    throw error;
  }
};

/**
 * Update a gym with the given `id`.
 *
 * @param {string} id - Id of the user to delete.
 */
const deleteById = async (id) => {
  try {
    const rowsAffected = await getKnex()(tables.gymRating)
      .delete()
      .where("id", id);
    return rowsAffected > 0;
  } catch (error) {
    const logger = getLogger();
    logger.error("Error in deleteById", {
      error,
    });
    throw error;
  }
};

module.exports = {
  findAll,
  findCount,
  findById,
  create,
  updateById,
  deleteById,
};
