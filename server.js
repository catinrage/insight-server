const dotenv = require('dotenv');
dotenv.config();

const { ApolloServer } = require('apollo-server-express');
const {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} = require('apollo-server-core');
const { applyMiddleware } = require('graphql-middleware');

const express = require('express');
const http = require('http');

const { PrismaClient } = require('@prisma/client');
const jsonwebtoken = require('jsonwebtoken');
const guardian = require('./security');

const { schema } = require('./schema/generator');

async function startApolloServer(schema) {
  const prisma = new PrismaClient();
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema: applyMiddleware(schema, guardian()),
    csrfPrevention: true,
    cache: 'bounded',
    cors: {
      origin: '*',
      credentials: true,
      allowedHeaders: [
        'access-control-allow-origin',
        'Access-Control-Allow-Headers',
        'Origin,Accept',
        'X-Requested-With',
        'Content-Type',
        'Access-Control-Request-Method',
        'Access-Control-Request-Headers',
      ],
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    context: async ({ req, res }) => {
      let user = {
        role: {
          permissions: [],
        },
      };
      if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
      ) {
        try {
          user = await jsonwebtoken.verify(
            req.headers.authorization.split(' ')[1],
            process.env.JWT_SECRET
          );
        } catch (error) {}
      }
      return {
        prisma,
        user,
      };
    },
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise((resolve) =>
    httpServer.listen({ port: process.env.SERVER_PORT }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
startApolloServer(schema);
