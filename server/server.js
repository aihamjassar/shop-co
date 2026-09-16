process.on("uncaughtException", (err) => {
  console.error("🛑 UNCAUGHT EXCEPTION → shutting down...");
  console.error(err.name, err.message);
  console.error(err.stack);

  process.exit(1);
});

require("dotenv").config();

const app = require("./app");
const { connectDB } = require("./config/db");

const PORT = process.env.PORT || 3000;

let server;

const startServer = async () => {
  try {
    await connectDB();

    server = app.listen(PORT, () => {
      console.log(
        `✅ Server running on http://localhost:${PORT} [${process.env.NODE_ENV}]`,
      );
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

process.on("unhandledRejection", (err) => {
  console.error("🛑 UNHANDLED REJECTION → shutting down...");
  console.error(err?.name || "");
  console.error(err?.message || err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

const shutdown = (signal) => {
  console.log(`📴 ${signal} received. Shutting down gracefully...`);

  if (!server) {
    process.exit(0);
  }

  server.close(() => {
    console.log("💤 Process terminated");
    process.exit(0);
  });
};

// Production/container shutdown
process.on("SIGTERM", () => shutdown("SIGTERM"));

// Local shutdown with Ctrl+C
process.on("SIGINT", () => shutdown("SIGINT"));

startServer();