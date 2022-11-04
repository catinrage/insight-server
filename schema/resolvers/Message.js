module.exports = {
  Message: {
    sender: async (scope, args, { prisma }) => {
      const sender = await prisma.message
        .findUnique({
          where: { id: scope.id },
        })
        .sender();
      return sender;
    },
    recipient: async (scope, args, { prisma }) => {
      const recipient = await prisma.message
        .findUnique({
          where: { id: scope.id },
        })
        .recipient();
      return recipient;
    },
  },
  MessagesList: {
    list: async (scope, args, { prisma }) => {
      return scope;
    },
  },
  MessagesListQueryResponse: {
    __resolveType(object, context, info) {
      if (!object.code) {
        return 'MessagesList';
      }
      return 'Error';
    },
  },
  MessageQueryResponse: {
    __resolveType(object, context, info) {
      if (object.id) {
        return 'Message';
      }
      return 'Error';
    },
  },
  MessageMutationResponse: {
    __resolveType(object, context, info) {
      if (object.id) {
        return 'Message';
      }
      return 'Error';
    },
  },
  Query: {
    GetMessage: async (scope, args, { prisma }) => {
      const message = await prisma.message.findUnique({
        where: {
          id: args.id,
        },
      });
      return message;
    },
    ListMessages: async (scope, args, { prisma }) => {
      const messages = await prisma.message.findMany();
      return messages;
    },
    GetMyMessages: async (scope, args, { prisma, user }) => {
      if (user.id) {
        const messages = await prisma.message.findMany({
          where: {
            OR: [
              {
                sender: {
                  id: user.id,
                },
              },
              {
                recipient: {
                  id: user.id,
                },
              },
            ],
          },
        });
        return messages;
      }
      return [];
    },
  },
  Mutation: {
    CreateMessage: async (_, args, { prisma }) => {
      try {
        const message = await prisma.message.create({
          data: {
            ...args.input,
          },
        });
        return message;
      } catch ({ code }) {
        return {
          code,
        };
      }
    },
    DeleteMessage: async (_, args, { prisma }) => {
      try {
        const message = await prisma.message.delete({
          where: {
            id: args.id,
          },
        });
        return message;
      } catch ({ code }) {
        return {
          code,
        };
      }
    },
    MarkMessageAsSeen: async (_, args, { prisma }) => {
      try {
        const message = await prisma.message.update({
          where: {
            id: args.id,
          },
          data: {
            seen: true,
          },
        });
        return message;
      } catch ({ code }) {
        return {
          code,
        };
      }
    },
  },
};
