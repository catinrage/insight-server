module.exports = {
  Role: {
    users: async (scope, args, { prisma }) => {
      const users = await prisma.role
        .findUnique({
          where: {
            id: scope.id,
          },
        })
        .users();
      return users;
    },
  },
  RoleMutationResponse: {
    __resolveType(object, context, info) {
      if (object.id) {
        return 'Role';
      }
      return 'Error';
    },
  },
  Query: {
    GetRole: async (scope, args, { prisma }) => {
      const role = await prisma.role.findUnique({
        where: {
          id: args.id,
        },
      });
      return role;
    },
    ListRoles: async (scope, args, { prisma }) => {
      const roles = await prisma.role.findMany();
      return roles;
    },
  },
  Mutation: {
    CreateRole: async (scope, args, { prisma }) => {
      try {
        const role = await prisma.role.create({
          data: {
            ...args.input,
          },
        });
        return role;
      } catch ({ code }) {
        return code;
      }
    },
    UpdateRole: async (scope, args, { prisma }) => {
      try {
        const role = await prisma.role.update({
          where: {
            id: args.id,
          },
          data: {
            ...args.input,
          },
        });
        return role;
      } catch ({ code }) {
        return code;
      }
    },
    DeleteRole: async (scope, args, { prisma }) => {
      try {
        const role = await prisma.role.delete({
          where: {
            id: args.id,
          },
        });
        return role;
      } catch ({ code }) {
        return code;
      }
    },
  },
};
