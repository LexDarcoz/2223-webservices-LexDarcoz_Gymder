const { tables, getKnex } = require("../data");
const { getLogger } = require("../core/logging");

const findAll = () => {
  return getKnex()(tables.user).select().orderBy("fullName", "ASC");
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

const create = async ({
  fullName,
  auth0id,
  emailAddress,
  bio,
  image,
  phoneNumber,
}) => {
  try {
    const [id] = await getKnex()(tables.user).insert({
      fullName,
      auth0id,
      emailAddress,
      bio,
      image,
      phoneNumber,
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

const updateByAuthId = async (
  auth0id,
  { fullName, phoneNumber, emailAddress, country, state, city, bio }
) => {
  try {
    await getKnex()(tables.user)
      .update({
        fullName,
        phoneNumber,
        emailAddress,
        country,
        state,
        city,
        bio,
      })
      .where("auth0id", auth0id);
    return auth0id;
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
  updateByAuthId,
  deleteById,
};
