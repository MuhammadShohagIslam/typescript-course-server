import { PubSub } from "graphql-subscriptions";
import User from "../../models/user-model";
import { GraphQLError } from "graphql";
const pubsub = new PubSub();

const userResolvers = {
    Query: {
        users: async (_: any, args: any) => {
            try {
                const users = await User.find({}).exec();
                return users;
            } catch (error) {
                throw new GraphQLError(error?.message, {
                    extensions: {
                        code: 500,
                        http: { status: 500 },
                    },
                });
            }
        },
    },
    Mutation: {
        createNewUser: async (_, args: any,) => {
            try {
                const newUser = User.createNewUser({
                    ...args.input,
                });
                const user = await newUser.save();
                pubsub.publish("USER_ADDED", {
                    userAdded: user,
                });
                return user;
            } catch (error) {
                throw new GraphQLError(error?.message, {
                    extensions: {
                        code: 500,
                        http: { status: 500 },
                    },
                });
            }
        },
    },
    Subscription: {
        userAdded: {
            subscribe: () => pubsub.asyncIterator(["USER_ADDED"]),
        },
    },
};

export default userResolvers;
