module.exports = {
  StorageItemRecord: {
    item: async (scope, args, { prisma }) => {
      const item = await prisma.storageItemRecord
        .findUnique({
          where: {
            id: scope.id,
          },
        })
        .item();
      return item;
    },
  },
  StorageItemRecordMutationResponse: {
    __resolveType(object, context, info) {
      if (object.id) {
        return 'StorageItemRecord';
      }
      return 'Error';
    },
  },
  Query: {
    GetStorageItemRecord: async (scope, args, { prisma }) => {
      const record = await prisma.storageItemRecord.findUnique({
        where: {
          id: args.id,
        },
      });
      return record;
    },
    ListStorageItemRecords: async (scope, args, { prisma }) => {
      const records = await prisma.storageItemRecord.findMany();
      return records;
    },
  },
  Mutation: {
    CreateStorageItemRecord: async (_, args, { prisma }) => {
      try {
        const storageItemRecord = await prisma.storageItemRecord.create({
          data: {
            ...args.input,
          },
        });
        return storageItemRecord;
      } catch ({ code }) {
        return {
          code,
        };
      }
    },
    UpdateStorageItemRecord: async (_, args, { prisma }) => {
      try {
        const storageItemRecord = await prisma.storageItemRecord.update({
          where: {
            id: args.id,
          },
          data: {
            ...args.input,
          },
        });
        return storageItemRecord;
      } catch ({ code }) {
        return {
          code,
        };
      }
    },
    DeleteStorageItemRecord: async (_, args, { prisma }) => {
      try {
        const storageItemRecord = await prisma.storageItemRecord.delete({
          where: {
            id: args.id,
          },
        });
        return storageItemRecord;
      } catch ({ code }) {
        return {
          code,
        };
      }
    },
  },
};
