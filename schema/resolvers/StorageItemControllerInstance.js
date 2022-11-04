module.exports = {
  StorageItemControllerInstance: {
    blueprint: async (scope, args, { prisma }) => {
      const blueprint = await prisma.storageItemControllerInstance
        .findUnique({
          where: {
            id: scope.id,
          },
        })
        .blueprint();
      return blueprint;
    },
  },
  StorageItemControllerInstanceMutationResponse: {
    __resolveType(object, context, info) {
      if (object.id) {
        return 'StorageItemControllerInstance';
      }
      return 'Error';
    },
  },
  Query: {
    GetStorageItemControllerInstance: async (scope, args, { prisma }) => {
      const instance = await prisma.storageItemControllerInstance.findUnique({
        where: {
          id: args.id,
        },
      });
      return instance;
    },
    ListStorageItemControllerInstances: async (scope, args, { prisma }) => {
      const instances = await prisma.storageItemControllerInstance.findMany();
      return instances;
    },
  },
  Mutation: {
    CreateStorageItemControllerInstance: async (_, args, { prisma }) => {
      try {
        const storageItemControllerInstance =
          await prisma.storageItemControllerInstance.create({
            data: {
              ...args.input,
            },
          });
        return storageItemControllerInstance;
      } catch ({ code }) {
        return {
          code,
        };
      }
    },
    UpdateStorageItemControllerInstance: async (_, args, { prisma }) => {
      try {
        const storageItemControllerInstance =
          await prisma.storageItemControllerInstance.update({
            where: {
              id: args.id,
            },
            data: {
              ...args.input,
            },
          });
        return storageItemControllerInstance;
      } catch ({ code }) {
        return {
          code,
        };
      }
    },
    DeleteStorageItemControllerInstance: async (_, args, { prisma }) => {
      try {
        const storageItemControllerInstance =
          await prisma.storageItemControllerInstance.delete({
            where: {
              id: args.id,
            },
          });
        return storageItemControllerInstance;
      } catch ({ code }) {
        return {
          code,
        };
      }
    },
  },
};
