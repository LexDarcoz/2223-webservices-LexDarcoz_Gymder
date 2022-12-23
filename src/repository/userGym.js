const { tables, getKnex } = require("../data/index");
const { getLogger } = require("../core/logging");

const findAll = async (userId) => {
  return await getKnex()(tables.userGym).select().where("userId", userId);
};
const create = async (userId, gymId) => {
  try {
    const [id] = await getKnex()(tables.userGym).insert({ userId, gymId });

    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error("Error in create", {
      error,
    });
    throw error;
  }
};

const updateById = async (id, { gymId }) => {
  try {
    await getKnex()(tables.userGym)
      .update({
        gymId,
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
    const rowsAffected = await getKnex()(tables.userGym)
      .delete()
      .where("gymId", id);

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
  return getKnex()(tables.userGym).where("id", id).first();
};
const findCount = async () => {
  const [count] = await getKnex()(tables.userGym).count();
  return count["count(*)"];
};
module.exports = {
  findAll,
  findCount,
  create,
  updateById,
  deleteById,
  findById,
};
