module.exports = {
  StorageCategoryFormField: {
    categories: async (scope, args, { prisma }) => {
      const categories = await prisma.storageCategoryFormField
        .findUnique({
          where: {
            id: scope.id,
          },
        })
        .categories();
      return categories;
    },
    generators: async (scope, args, { prisma }) => {
      const generators = await prisma.storageCategoryFormField
        .findUnique({
          where: {
            id: scope.id,
          },
        })
        .generators();
      return generators;
    },
  },
  StorageCategoryFormFieldMutationResponse: {
    __resolveType(object, context, info) {
      if (object.id) {
        return 'StorageCategoryFormField';
      }
      return 'Error';
    },
  },
  Query: {
    GetStorageCategoryFormField: async (scope, args, { prisma }) => {
      const storageCategoryFormField =
        await prisma.storageCategoryFormField.findUnique({
          where: {
            id: args.id,
          },
        });
      return storageCategoryFormField;
    },
    ListStorageCategoryFormFields: async (scope, args, { prisma }) => {
      const order = {};
      order[args.orderBy] = args.orderType;
      const storageCategoryFormFields =
        await prisma.storageCategoryFormField.findMany({
          skip: args.skip,
          take: args.take,
          orderBy: order,
        });
      return storageCategoryFormFields;
    },
    SearchStorageCategoryFormFieldsByName: async (scope, args, { prisma }) => {
      const searchResult = await prisma.storageCategoryFormField.findMany({
        take: 10,
        where: {
          name: {
            contains: args.keyword,
          },
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });
      return searchResult;
    },
  },
  Mutation: {
    CreateStorageCategoryFormField: async (_, args, { prisma }) => {
      try {
        const storageCategoryFormField =
          await prisma.storageCategoryFormField.create({
            data: {
              ...args.input,
            },
          });
        return storageCategoryFormField;
      } catch ({ code }) {
        return {
          code,
        };
      }
    },
    UpdateStorageCategoryFormField: async (_, args, { prisma }) => {
      try {
        const storageCategoryFormField =
          await prisma.storageCategoryFormField.update({
            where: {
              id: args.id,
            },
            data: {
              ...args.input,
            },
          });
        return storageCategoryFormField;
      } catch ({ code }) {
        return {
          code,
        };
      }
    },
    DeleteStorageCategoryFormField: async (_, args, { prisma }) => {
      try {
        const storageCategoryFormField =
          await prisma.storageCategoryFormField.delete({
            where: {
              id: args.id,
            },
          });
        return storageCategoryFormField;
      } catch ({ code }) {
        return {
          code,
        };
      }
    },
  },
};
