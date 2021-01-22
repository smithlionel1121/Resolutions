import { createApolloServer } from "meteor/apollo";
import { makeExecutableSchema } from "graphql-tools";

import merge from "lodash/merge";

import UsersSchema from "../../api/users/User.graphql";
import UsersResolver from "../../api/users/resolvers";
import GoalsSchema from "../../api/goals/Goal.graphql";
import GoalsResolver from "../../api/goals/resolvers";
import ResolutionsSchema from "../../api/resolutions/Resolutions.graphql";
import ResolutionsResolver from "../../api/resolutions/resolvers";

const typeDefs = [ResolutionsSchema, UsersSchema, GoalsSchema];

const resolvers = merge(ResolutionsResolver, UsersResolver, GoalsResolver);

// const server = new ApolloServer({ typeDefs, resolvers });

// server.listen().then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

createApolloServer({ schema });
