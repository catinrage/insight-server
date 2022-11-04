module.exports = {
  StorageItemControllerBlueprint: {
    instances: async (scope, args, { prisma }) => {
      const instances = await prisma.storageItemControllerBlueprint
        .findUnique({
          where: {
            id: scope.id,
          },
        })
        .instances();
      return instances;
    },
  },
  StorageItemControllerBlueprintMutationResponse: {
    __resolveType(object, context, info) {
      if (object.id) {
        return 'StorageItemControllerBlueprint';
      }
      return 'Error';
    },
  },
  Query: {
    GetStorageItemControllerBlueprint: async (scope, args, { prisma }) => {
      const blueprint = await prisma.storageItemControllerBlueprint.findUnique({
        where: {
          id: args.id,
        },
      });
      return blueprint;
    },
    ListStorageItemControllerBlueprints: async (scope, args, { prisma }) => {
      const blueprints = await prisma.storageItemControllerBlueprint.findMany();
      return blueprints;
    },
  },
  Mutation: {
    CreateStorageItemControllerBlueprint: async (_, args, { prisma }) => {
      try {
        const storageItemControllerBlueprint =
          await prisma.storageItemControllerBlueprint.create({
            data: {
              ...args.input,
            },
          });
        return storageItemControllerBlueprint;
      } catch ({ code }) {
        return {
          code,
        };
      }
    },
    UpdateStorageItemControllerBlueprint: async (_, args, { prisma }) => {
      try {
        const storageItemControllerBlueprint =
          await prisma.storageItemControllerBlueprint.update({
            where: {
              id: args.id,
            },
            data: {
              ...args.input,
            },
          });
        return storageItemControllerBlueprint;
      } catch ({ code }) {
        return {
          code,
        };
      }
    },
    DeleteStorageItemControllerBlueprint: async (_, args, { prisma }) => {
      try {
        const storageItemControllerBlueprint =
          await prisma.storageItemControllerBlueprint.delete({
            where: {
              id: args.id,
            },
          });
        return storageItemControllerBlueprint;
      } catch ({ code }) {
        return {
          code,
        };
      }
    },
  },
};
