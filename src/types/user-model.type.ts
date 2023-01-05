import { Model, Document } from "mongoose";

// An interface describe the properties that required to create a new User
interface UserAttrs {
    id?: String;
    userName: String;
    fullName: String;
    email: String;
    profileImage: String;
}

// an interface describe the properties that User Document has
interface UserDoc extends Document {
    userName: String;
    fullName: String;
    email: String;
    profileImage: String;
}

// an interface describe the properties that a User Model has
interface UserModel extends Model<UserDoc> {
    createNewUser(attrs: UserAttrs): UserDoc;
}

export { UserAttrs, UserDoc, UserModel };
