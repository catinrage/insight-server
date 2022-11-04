const { makeExecutableSchema } = require('@graphql-tools/schema');
const { loadFiles } = require('graphql-import-files');
const { merge } = require('lodash');
const { path } = require('path');
const fs = require('fs');
const { GraphQLJSONObject, GraphQLJSON } = require('graphql-type-json');

const resolvers = {
  basic: {
    Json: GraphQLJSON,
    Object: GraphQLJSONObject,
  },
};

fs.readdirSync(__dirname + '/resolvers').forEach((file) => {
  if (file.endsWith('.js') && file !== 'index.js') {
    const resolver = require(`./resolvers/${file}`);
    resolvers[file.split('.')[0]] = resolver;
  }
});

const typeDefs = loadFiles('./schema/types/**/*.gql');
module.exports = {
  schema: makeExecutableSchema({
    typeDefs,
    resolvers: merge(...Object.values(resolvers)),
  }),
  typeDefs: typeDefs,
  resolvers: merge(...Object.values(resolvers)),
};
