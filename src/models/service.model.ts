import { Schema, model } from "mongoose";
import { UserDoc, UserModel, UserAttrs } from "../types/user-model.type";

const serviceSchema = new Schema(
    {
        name: {
            type: String,
            index: true,
        },
        description: {
            type: String,
        },
        img: {
            type: String,
        },
        price: {
            type: String,
        },
    },
    { timestamps: true }
);
serviceSchema.index({name: 'text'});

const Service = model("Services", serviceSchema);

module.exports = Service;
