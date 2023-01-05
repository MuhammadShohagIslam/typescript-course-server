import mongoose, { ConnectOptions } from "mongoose";
import config from "./config";

const connectionDatabase = () => {
    try {
        if (!config.MONGO_DB) {
            throw new Error("MONGO_URL must be defined");
        }
        mongoose
            .connect(config.MONGO_DB, {
                dbName: "courseService",
                useNewUrlParser: true,
                useUnifiedTopology: true,
            } as ConnectOptions)
            .then((db) => {
                console.log("MongoDB Database is connected!");
            })
            .catch((err) => {
                console.log("Error Connecting to the Database");
            });
    } catch (error) {
        console.log(`MongoDB connection is failed!. ${error.message}`);
    }
};

export default connectionDatabase;
