import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const User = new Schema({
    lang: String,
    memo: String,
    userId: String
});