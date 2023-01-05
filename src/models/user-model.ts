import { Schema, model } from "mongoose";
import { UserDoc, UserModel, UserAttrs } from "../types/user-model.type";

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
        },
        profileImage: {
            type: String,
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                ret.userCreatedAt = ret.createdAt;
                delete ret._id;
                delete ret.createdAt;
                delete ret.updatedAt;
                delete ret.__v;
            },
        },
    }
);

userSchema.statics.createNewUser = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = model<UserDoc, UserModel>("Users", userSchema);

export default User;
