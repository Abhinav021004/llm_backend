import { CLIENT_UNBLOCK_MODES, createClient } from "redis";

const client = await createClient({
    url:process.env.REDIS_URL
}
)
  client.on("error", (err) => console.log("Redis Client Error", err))
  .connect();

const redisConnect=async ()=>{
    await client.connect();
    console.log("redis connected");
}
client.destroy();
export {client,redisConnect};