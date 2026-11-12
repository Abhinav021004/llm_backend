
import { client } from "../config/redis.js";

const unauthenticatedRateLimiter = async (req, res, next) => {
    try {
        const key = `rate-limit-ip:${req.ip}`;

        const requestCount = await client.incr(key);

        if (requestCount === 1) {
            await client.expire(key, 60);
        }

        if (requestCount > 10) {
            const remainingTime = await client.ttl(key);

            return res.status(429).json({
                message: `Too many requests. Try again after ${remainingTime} seconds.`
            });
        }

        next();
    }
    catch (err) {
        console.log("Unauthenticated rate limiter error:", err);
        next();
    }
};

export default unauthenticatedRateLimiter;
