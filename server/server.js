process.on("uncaughtException", (err) => {
  console.error("🛑 UNCAUGHT EXCEPTION → shutting down...");
  console.error(err.name, err.message);
  console.error(err.stack);
  process.exit(1);
});

require("dotenv").config();

const app = require("./app");
const { connectDB } = require("./config/db");

let server;
const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectDB();
    server = app.listen(PORT, () => {
      console.log(
        `✅ Server running on http://localhost:${PORT} [${process.env.NODE_ENV}]`
      );
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
})();

process.on("unhandledRejection", (err) => {
  console.error("🛑 UNHANDLED REJECTION → shutting down...");
  console.error(err?.name || "", err?.message || err);
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

process.on("SIGABRT", () => {
  console.log("📴 SIGTERM received. Shutting down gracefully...");
  if (server) server.close(() => console.log("💤 Process terminated"));
});
