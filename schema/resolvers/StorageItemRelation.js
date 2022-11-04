module.exports = {
  StorageItemRelation: {
    lhs: async (scope, args, { prisma }) => {
      const lhs = await prisma.storageItemRelation
        .findUnique({
          where: {
            id: scope.id,
          },
        })
        .lhs();
      return item;
    },
    rhs: async (scope, args, { prisma }) => {
      const rhs = await prisma.storageItemRelation
        .findUnique({
          where: {
            id: scope.id,
          },
        })
        .rhs();
      return item;
    },
  },
  StorageItemRelationMutationResponse: {
    __resolveType(object, context, info) {
      if (object.id) {
        return 'StorageItemRelation';
      }
      return 'Error';
    },
  },
  Query: {
    GetStorageItemRelation: async (scope, args, { prisma }) => {
      const relation = await prisma.storageItemRelation.findUnique({
        where: {
          id: args.id,
        },
      });
      return relation;
    },
    ListStorageItemRelations: async (scope, args, { prisma }) => {
      const relations = await prisma.storageItemRelation.findMany();
      return relations;
    },
  },
  Mutation: {
    CreateStorageItemRelation: async (_, args, { prisma }) => {
      try {
        const storageItemRelation = await prisma.storageItemRelation.create({
          data: {
            ...args.input,
          },
        });
        return storageItemRelation;
      } catch ({ code }) {
        return {
          code,
        };
      }
    },
    UpdateStorageItemRelation: async (_, args, { prisma }) => {
      try {
        const storageItemRelation = await prisma.storageItemRelation.update({
          where: {
            id: args.id,
          },
          data: {
            ...args.input,
          },
        });
        return storageItemRelation;
      } catch ({ code }) {
        return {
          code,
        };
      }
    },
    DeleteStorageItemRelation: async (_, args, { prisma }) => {
      try {
        const storageItemRelation = await prisma.storageItemRelation.delete({
          where: {
            id: args.id,
          },
        });
        return storageItemRelation;
      } catch ({ code }) {
        return {
          code,
        };
      }
    },
  },
};
