const { tables, getKnex } = require("../data/index");
const { getLogger } = require("../core/logging");

const findAll = async () => {
  return await getKnex()(tables.gym).select().orderBy("rating", "DESC");
};
const getRating = async (gymId) => {
  try {
    return await getKnex()(tables.gymRating)
      .where("gymId", gymId)
      .avg("rating");
  } catch (error) {
    return 0;
  }
};

const create = async ({
  name,
  description,
  owner,
  emailAddress,
  filename,
  address,
}) => {
  try {
    const [id] = await getKnex()(tables.gym).insert({
      name,
      owner,
      emailAddress,
      description,
      address,
      image: filename,
      rating: 0,
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

const updateById = async (id, { name }) => {
  const rating = await getRating(id);
  try {
    await getKnex()(tables.gym)
      .update({
        name,
        rating: rating,
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

const deleteById = async (id) => {
  try {
    const rowsAffected = await getKnex()(tables.gym).delete().where("id", id);

    return rowsAffected > 0;
  } catch (error) {
    const logger = getLogger();
    logger.error("Error in deleteById", {
      error,
    });
    throw error;
  }
};
const findById = (id) => {
  return getKnex()(tables.gym).where("id", id).first();
};
const findCount = async () => {
  const [count] = await getKnex()(tables.gym).count();
  return count["count(*)"];
};
module.exports = {
  findAll,
  findById,
  findCount,
  create,
  updateById,
  deleteById,
};
