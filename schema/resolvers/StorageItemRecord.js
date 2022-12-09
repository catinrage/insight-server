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
      const records = await prisma.storageItemRecord.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
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
        await prisma.storageItem.update({
          where: {
            id: args.input.itemId,
          },
          data: {
            quantity: { increment: args.input.quantity },
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
        const storageItemRecordTemp = await prisma.storageItemRecord.findUnique(
          {
            where: {
              id: args.id,
            },
          }
        );
        const storageItemRecord = await prisma.storageItemRecord.update({
          where: {
            id: args.id,
          },
          data: {
            ...args.input,
          },
        });
        await prisma.storageItem.update({
          where: {
            id: storageItemRecord.itemId,
          },
          data: {
            quantity: {
              increment:
                storageItemRecord.quantity - storageItemRecordTemp.quantity,
            },
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
        await prisma.storageItem.update({
          where: {
            id: storageItemRecord.itemId,
          },
          data: {
            quantity: { increment: -storageItemRecord.quantity },
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
