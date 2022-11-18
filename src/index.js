const createServer = require("./createServer");

async function main() {
  try {
    const server = await createServer();
    await server.start();

    async function onClose() {
      await server.stop();
      process.exit(0);
    }

    process.on("SIGTERM", onClose);
    process.on("SIGQUIT", onClose);
  } catch (error) {
    process.exit(-1);
  }
}

// Wrap inside a main function as top level await is not supported in all NodeJS versions
main();
