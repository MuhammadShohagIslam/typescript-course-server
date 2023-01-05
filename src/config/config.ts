import * as dotenv from "dotenv";
dotenv.config();

const config = {
    MONGO_DB: process.env.MONGO_URL
}
export default config;