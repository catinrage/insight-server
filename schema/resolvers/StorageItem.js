module.exports = {
  StorageItem: {
    category: async (scope, args, { prisma }) => {
      const category = await prisma.storageItem
        .findUnique({
          where: {
            id: scope.id,
          },
        })
        .category();
      return category;
    },
    records: async (scope, args, { prisma }) => {
      const records = await prisma.storageItem
        .findUnique({
          where: {
            id: scope.id,
          },
        })
        .records();
      return records;
    },
    relations: async (scope, args, { prisma }) => {
      const lhs = await prisma.storageItem
        .findUnique({
          where: {
            id: scope.id,
          },
        })
        .lhsRelations();
      const rhs = await prisma.storageItem
        .findUnique({
          where: {
            id: scope.id,
          },
        })
        .rhsRelations();
      return [...rhs, ...lhs];
    },
    lhsRelations: async (scope, args, { prisma }) => {
      const lhs = await prisma.storageItem
        .findUnique({
          where: {
            id: scope.id,
          },
        })
        .lhsRelations();
      return lhs;
    },
    rhsRelations: async (scope, args, { prisma }) => {
      const rhs = await prisma.storageItem
        .findUnique({
          where: {
            id: scope.id,
          },
        })
        .rhsRelations();
      return lhs;
    },
    controllers: async (scope, args, { prisma }) => {
      const controllers = await prisma.storageItem
        .findUnique({
          where: {
            id: scope.id,
          },
        })
        .controllers();
      return controllers;
    },
  },
  StorageItemMutationResponse: {
    __resolveType(object, context, info) {
      if (object.id) {
        return 'StorageItem';
      }
      return 'Error';
    },
  },
  Query: {
    GetStorageItem: async (scope, args, { prisma }) => {
      const item = await prisma.storageItem.findUnique({
        where: {
          id: args.id,
        },
      });
      return item;
    },
    ListStorageItems: async (scope, args, { prisma }) => {
      const items = await prisma.storageItem.findMany({
        orderBy: {
          updatedAt: 'desc',
        },
      });
      return items;
    },
  },
  Mutation: {
    CreateStorageItem: async (_, args, { prisma }) => {
      try {
        const storageItem = await prisma.storageItem.create({
          data: {
            ...args.input,
            propertiesAsString: JSON.stringify(args.input.properties),
          },
        });
        return storageItem;
      } catch ({ code }) {
        return {
          code,
        };
      }
    },
    UpdateStorageItem: async (_, args, { prisma }) => {
      try {
        const storageItem = await prisma.storageItem.update({
          where: {
            id: args.id,
          },
          data: {
            ...args.input,
            propertiesAsString: JSON.stringify(args.input.properties),
          },
        });
        return storageItem;
      } catch ({ code }) {
        return {
          code,
        };
      }
    },
    DeleteStorageItem: async (_, args, { prisma }) => {
      try {
        const storageItem = await prisma.storageItem.delete({
          where: {
            id: args.id,
          },
        });
        return storageItem;
      } catch ({ code }) {
        return {
          code,
        };
      }
    },
  },
};
