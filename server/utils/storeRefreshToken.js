const dotenv = require("dotenv");
const redis = require("./redisClient");

dotenv.config();

exports.storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `refresh-token:${userId}`,
    refreshToken,
    "EX",
    parseInt(process.env.REFRESH_TOKEN_COOKIE_DAYS || "30", 10) * 24 * 60 * 60
  );
};
