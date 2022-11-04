module.exports = {
  GlobalVariableMutationResponse: {
    __resolveType(object, context, info) {
      if (object.id) {
        return 'GlobalVariable';
      }
      return 'Error';
    },
  },
  Query: {
    GetGlobalVariable: async (scope, args, { prisma }) => {
      const variable = await prisma.globalVariable.findUnique({
        where: {
          id: args.id,
        },
      });
      return variable;
    },
    GetGlobalVariableByName: async (scope, args, { prisma }) => {
      const variable = await prisma.globalVariable.findUnique({
        where: {
          name: args.name,
        },
      });
      return variable;
    },
    ListGlobalVariables: async (scope, args, { prisma }) => {
      const variables = await prisma.globalVariable.findMany();
      return variables;
    },
    SearchGlobalVariablesByName: async (scope, args, { prisma }) => {
      const variables = await prisma.globalVariable.findMany({
        where: {
          name: {
            contains: args.keyword,
          },
        },
      });
      return variables;
    },
  },
  Mutation: {
    CreateGlobalVariable: async (_, args, { prisma }) => {
      try {
        const globalVariable = await prisma.globalVariable.create({
          data: {
            ...args.input,
          },
        });
        return globalVariable;
      } catch ({ code }) {
        return {
          code,
        };
      }
    },
    UpdateGlobalVariable: async (_, args, { prisma }) => {
      try {
        const globalVariable = await prisma.globalVariable.update({
          where: {
            id: args.id,
          },
          data: {
            ...args.input,
          },
        });
        return globalVariable;
      } catch ({ code }) {
        return {
          code,
        };
      }
    },
    DeleteGlobalVariable: async (_, args, { prisma }) => {
      try {
        const globalVariable = await prisma.globalVariable.delete({
          where: {
            id: args.id,
          },
        });
        return globalVariable;
      } catch ({ code }) {
        return {
          code,
        };
      }
    },
  },
};
