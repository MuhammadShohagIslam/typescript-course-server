const userTypeDefs = `#graphql 
    type User {
        _id: ID!
        userName: String!
        fullName: String!
        email: String!
        profileImage: String!
    }

    # input type
    input UserCreateInput {
        userName: String!
        fullName: String!
        email: String!
        profileImage: String!
    }

    type Query {
        users: [User!]
    }

    type Mutation {
        createNewUser(input: UserCreateInput!): User!
    }
    type Subscription{
        userAdded: User!
    }
`;
export default userTypeDefs;
