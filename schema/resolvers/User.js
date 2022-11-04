const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

module.exports = {
  User: {
    role: async (scope, args, { prisma }) => {
      const role = await prisma.user
        .findUnique({
          where: {
            id: scope.id,
          },
        })
        .role();
      return role;
    },
    logs: async (scope, args, { prisma }) => {
      const logs = await prisma.user
        .findUnique({
          where: {
            id: scope.id,
          },
        })
        .logs();
      return logs;
    },
    sentMessages: async (scope, args, { prisma }) => {
      const sentMessages = await prisma.user
        .findUnique({
          where: {
            id: scope.id,
          },
        })
        .sentMessages();
      return sentMessages;
    },
    receivedMessages: async (scope, args, { prisma }) => {
      const receivedMessages = await prisma.user
        .findUnique({
          where: {
            id: scope.id,
          },
        })
        .receivedMessages();
      return receivedMessages;
    },
  },
  UserMutationResponse: {
    __resolveType(obj, context, info) {
      if (obj.id) {
        return 'User';
      }
      return 'Error';
    },
  },
  Query: {
    GetUser: async (scope, args, { prisma }) => {
      const user = await prisma.user.findUnique({
        where: {
          id: args.id,
        },
      });
      return user;
    },
    ListUsers: async (scope, args, { prisma }) => {
      const users = await prisma.user.findMany();
      return users;
    },
    CurrentUser: async (scope, args, { prisma, user }) => {
      return user;
    },
  },
  Mutation: {
    CreateUser: async (scope, args, { prisma }) => {
      try {
        const user = await prisma.user.create({
          data: {
            ...args.input,
            password: await bcrypt.hash(args.input.password, 12),
          },
        });
        return user;
      } catch ({ code }) {
        return code;
      }
    },
    UpdateUser: async (scope, args, { prisma, user }) => {
      try {
        const user = await prisma.user.update({
          where: {
            id: args.id,
          },
          data: {
            ...args.input,
            password: await bcrypt.hash(args.input.password, 12),
          },
        });
        return user;
      } catch ({ code }) {
        return code;
      }
    },
    DeleteUser: async (scope, args, { prisma, user }) => {
      try {
        const user = await prisma.user.delete({
          where: {
            id: args.id,
          },
        });
        return user;
      } catch ({ code }) {
        return code;
      }
    },
    Login: async (scope, args, { prisma, req, user }) => {
      const target = await prisma.user.findUnique({
        where: {
          username: args.username,
        },
        include: {
          role: true,
        },
      });
      if (target && (await bcrypt.compare(args.password, target.password))) {
        const jwt = await jsonwebtoken.sign(target, process.env.JWT_SECRET, {
          expiresIn: '1d',
        });
        return { ...target, jwt };
      }
      return {
        code: 'A1001',
      };
    },
  },
};
