const jwksrsa = require("jwks-rsa");
const jwt = require("koa-jwt");
const axios = require("axios");
const config = require("config");

const AUTH_USER_INFO = config.get("auth.userInfo");

const { getLogger } = require("./logging");

function getJwtSecret() {
  const logger = getLogger();
  try {
    let secretFunction = jwksrsa.koaJwtSecret({
      jwksUri: config.get("auth.jwksUri"),
      cache: true,
      cacheMaxEntries: 5,
    });
    return secretFunction;
  } catch (error) {
    logger.error("Something went worng when handling the JWT secret", {
      error,
    });
    throw error;
  }
}

function checkJwtToken() {
  const logger = getLogger();
  try {
    let secretFunction = getJwtSecret();
    return jwt({
      secret: secretFunction,
      audience: config.get("auth.audience"),
      issuer: config.get("auth.issuer"),
      algorithms: ["RS256"],
      passthrough: true, // ctx.state.user will be undefined if no valid JWT is provided
    });
  } catch (error) {
    logger.error("Something went wrong when checking the JWT", { error });
    throw error;
  }
}

async function addUserInfo(ctx) {
  const logger = getLogger();
  try {
    const token = ctx.headers.authorization;
    const url = AUTH_USER_INFO;
    if (token && url && ctx.state.user) {
      logger.debug(`addUserInfo: ${url}, ${JSON.stringify(token)}`);

      const userInfo = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });

      ctx.state.user = {
        ...ctx.state.user,
        ...userInfo.data,
      };
    }
  } catch (error) {
    logger.error("Something went wrong when fetching user info", { error });
    throw error;
  }
}

function hasPermission(permission) {
  return async (ctx, next) => {
    const logger = getLogger();
    const user = ctx.state.user;
    logger.debug(`hasPermission: ${JSON.stringify(user)}`);

    // simply having a user object means they are logged in
    if (user && permission === permissions.loggedIn) {
      await next();
    } else if (
      user &&
      user.permissions &&
      user.permissions.includes(permission)
    ) {
      await next();
    } else {
      ctx.throw(
        403,
        "You are not allowed to view this part of the application",
        {
          code: "FORBIDDEN",
        }
      );
    }
  };
}

const permissions = Object.freeze({
  loggedIn: "loggedIn",
  read: "read",
  write: "write",
});

module.exports = {
  checkJwtToken,
  addUserInfo,
  hasPermission,
  permissions,
};
