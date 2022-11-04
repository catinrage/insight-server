module.exports = {
  Log: {
    user: async (scope, args, { prisma }) => {
      const user = await prisma.log
        .findUnique({
          where: { id: scope.id },
        })
        .user();
      return user;
    },
  },
  LogsList: {
    list: async (scope, args, { prisma }) => {
      return scope;
    },
  },
  LogsListQueryResponse: {
    __resolveType(object, context, info) {
      if (!object.code) {
        return 'LogsList';
      }
      return 'Error';
    },
  },
  LogQueryResponse: {
    __resolveType(object, context, info) {
      if (object.id) {
        return 'Log';
      }
      return 'Error';
    },
  },
  LogMutationResponse: {
    __resolveType(object, context, info) {
      if (object.id) {
        return 'Log';
      }
      return 'Error';
    },
  },
  Query: {
    GetLog: async (scope, args, { prisma }) => {
      const log = await prisma.log.findUnique({
        where: {
          id: args.id,
        },
      });
      return log;
    },
    ListLogs: async (scope, args, { prisma }) => {
      const logs = await prisma.log.findMany();
      return logs;
    },
  },
  Mutation: {
    CreateLog: async (scope, args, { prisma }) => {
      try {
        const log = await prisma.log.create({
          data: {
            ...args.input,
          },
        });
        return log;
      } catch ({ code }) {
        return code;
      }
    },
    DeleteLog: async (scope, args, { prisma }) => {
      try {
        const log = await prisma.log.delete({
          where: {
            id: args.id,
          },
        });
        return log;
      } catch ({ code }) {
        return code;
      }
    },
  },
};
