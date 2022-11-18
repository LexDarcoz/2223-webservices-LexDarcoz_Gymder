const winston = require("winston");
const { combine, timestamp, colorize, printf } = winston.format;

let logger;

const loggerFormat = () => {
  const formatMessage = ({ level, message, timestamp, ...rest }) =>
    `${timestamp} | ${level} | ${message} | ${JSON.stringify(rest)}`;

  // Errors don't have a decent toString, so we need to format them manually
  const formatError = ({ error: { stack }, ...rest }) =>
    `${formatMessage(rest)}\n\n${stack}\n`;
  const format = (info) =>
    info.error instanceof Error ? formatError(info) : formatMessage(info);
  return combine(colorize(), timestamp(), printf(format));
};

/**
 * Get the root logger.
 */
module.exports.getLogger = () => {
  if (!logger) throw new Error("You must first initialize the logger");
  return logger;
};

/**
 * Initialize the root logger.
 *
 * @param {object} options - The log options.
 * @param {string} options.level - The log level.
 * @param {boolean} options.disabled - Disable all logging.
 * @param {object} options.defaultMeta - Default metadata to show.
 * @param {winston.transport[]} options.extraTransports - Extra transports to add besides console.
 */
module.exports.initializeLogger = ({
  level,
  disabled,
  defaultMeta = {},
  extraTransports = [],
}) => {
  logger = winston.createLogger({
    level,
    defaultMeta,
    format: loggerFormat(),
    transports: [
      new winston.transports.Console({
        silent: disabled,
      }),
      ...extraTransports,
    ],
  });

  logger.info(` Logger initialized with minimum log level ${level}`);
};
