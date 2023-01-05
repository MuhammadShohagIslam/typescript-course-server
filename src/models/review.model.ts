import { Schema, model } from "mongoose";
import { UserDoc, UserModel, UserAttrs } from "../types/user-model.type";

const reviewSchema = new Schema(
    {
        serviceName: {
            type: String,
            index: true,
        },
        name:{
            type: String
        },
        email:{
            type: String
        },
        img: {
            type: String,
        },
        comment: {
            type: String,
        },
        star: {
            type: Number,
        },
        _service:{
            type: Schema.Types.ObjectId,
            ref: "Services"
        }
    },
    { timestamps: true }
);

const Review = model("Reviews", reviewSchema);

module.exports = Review;
