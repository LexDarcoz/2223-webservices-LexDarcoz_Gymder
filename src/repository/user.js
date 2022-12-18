const { tables, getKnex } = require("../data");
const { getLogger } = require("../core/logging");

const findAll = () => {
  return getKnex()(tables.user).select().orderBy("name", "ASC");
};

const findCount = async () => {
  const [count] = await getKnex()(tables.user).count();
  return count["count(*)"];
};

const findById = (id) => {
  return getKnex()(tables.user).where("id", id).first();
};

const findByAuth0Id = (auth0id) => {
  return getKnex()(tables.user).where("auth0id", auth0id).first();
};

const create = async ({ name, auth0id }) => {
  try {
    const [id] = await getKnex()(tables.user).insert({
      name,
      auth0id,
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

const updateById = async (
  id,
  { name, auth0id, emailAddress, bio, phoneNumber }
) => {
  try {
    await getKnex()(tables.user)
      .update({
        name,
        auth0id,
        emailAddress,
        bio,
        phoneNumber,
      })
      .where("auth0id", id);
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
    const rowsAffected = await getKnex()(tables.user).delete().where("id", id);
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
  findByAuth0Id,
  create,
  updateById,
  deleteById,
};
