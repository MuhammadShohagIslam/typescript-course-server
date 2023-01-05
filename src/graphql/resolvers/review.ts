import { PubSub } from "graphql-subscriptions";
import dateScalar from "../custom-scaler/date.scaler";
const pubSub = new PubSub()

module.exports = {
    Date: dateScalar,
    Query: {
        getAllReview: async (parent, args) => {
            try {
                let reviews;
                if (args.query) {
                    reviews = await Review.find({ _service: args.query })
                        .sort({ createdAt: -1 })
                        .exec();
                } else {
                    reviews = await Review.find({}).exec();
                }
                return reviews;
            } catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: 500,
                        http: { status: 500 },
                    },
                });
            }
        },
        getReview: getReviewByReviewIdController,
        getReviewBySpecificUser: getReviewBySpecificUserController,
    },
    Mutation: {
        createNewReview: createNewReviewController,
        updateReview: updateReviewByReviewIdController,
        removeReview: removeReviewByReviewIdController,
    },
    Subscription: {
        reviewAdded: {
            subscribe: () => pubSub.asyncIterator(['REVIEW_ADDED'])
        },
    },
};
