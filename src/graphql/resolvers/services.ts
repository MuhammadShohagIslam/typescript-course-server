const { PubSub } = require("graphql-subscriptions");
const {
    getAllServiceByPageController,
    getServiceByServiceIdController,
    createNewServiceController,
    getAllServicesUnderLimitController,
    getSearchResultController,
} = require("../../controllers/services.controller");
const { SERVICE_CREATED } = require("../event-labels/event.labels");

const pubsub = new PubSub();

module.exports = {
    Query: {
        getAllServiceByPage: getAllServiceByPageController,
        getAllServicesUnderLimit: getAllServicesUnderLimitController,
        getService: getServiceByServiceIdController,
        getSearchResult: getSearchResultController,
    },
    Mutation: {
        createNewService: createNewServiceController,
    },
    Subscription: {
        serviceCreated: {
            subscribe: () => pubsub.asyncIterator("SERVICE_CREATED"),
        },
    },
};
