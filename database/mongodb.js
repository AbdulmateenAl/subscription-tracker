import { mongoose } from "mongoose";

import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
    throw new Error("Please define the mongodb_URI environment variable in .env.<production/development>.local");
}

const connectToDatabase = async () => {
    try {
        mongoose.connect(DB_URI);
        console.log(`Connected to Database in ${NODE_ENV} mode`);
    } catch (error) {
        console.error("Error connecting to database: ", error);
        process.exit(1);
    }
}

export default connectToDatabase;