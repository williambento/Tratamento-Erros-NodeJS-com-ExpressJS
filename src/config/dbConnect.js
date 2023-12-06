import mongoose from "mongoose";

mongoose.connect(process.env.CONECTION_STRING_DB);

let db = mongoose.connection;

export default db;