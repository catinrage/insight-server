module.exports = {
  StorageCategory: {
    parent: async (scope, args, { prisma }) => {
      const parentCategory = await prisma.storageCategory
        .findUnique({
          where: {
            id: scope.id,
          },
        })
        .parent();
      return parentCategory;
    },
    children: async (scope, args, { prisma }) => {
      const childrenCategories = await prisma.storageCategory
        .findUnique({
          where: {
            id: scope.id,
          },
        })
        .children();
      return childrenCategories;
    },
    items: async (scope, args, { prisma }) => {
      const items = await prisma.storageCategory
        .findUnique({
          where: {
            id: scope.id,
          },
        })
        .items();
      return items;
    },
    nestedItems: async (scope, args, { prisma }) => {
      let stack = [];
      let buffer = [];
      let pointer = scope.id;
      while (pointer) {
        stack.push(pointer);
        buffer.push(
          ...(
            await prisma.storageCategory
              .findUnique({
                where: {
                  id: pointer,
                },
              })
              .children({
                select: {
                  id: true,
                },
              })
          ).map((category) => category.id)
        );
        pointer = buffer.pop();
      }
      let nestedItems = [];
      for (const id of stack) {
        nestedItems.push(
          ...(await prisma.storageCategory
            .findUnique({
              where: {
                id,
              },
            })
            .items())
        );
      }
      return nestedItems;
    },
    fields: async (scope, args, { prisma }) => {
      const fields = (
        await prisma.storageCategory.findUnique({
          where: {
            id: scope.id,
          },
          include: {
            fields: {
              select: {
                field: true,
              },
              orderBy: {
                order: 'asc',
              },
            },
          },
        })
      ).fields.map((field) => field.field);
      return fields;
    },
    inheritedFields: async (scope, args, { prisma }) => {
      let parentId = scope.parentId;
      let output = [];
      while (parentId) {
        let parent = await prisma.storageCategory.findUnique({
          where: {
            id: parentId,
          },
          include: {
            fields: {
              select: {
                field: true,
              },
              orderBy: {
                order: 'asc',
              },
            },
          },
        });
        output = [...parent.fields, ...output];
        parentId = parent.parentId;
      }
      output = output.map((field) => {
        return field.field;
      });
      return output;
    },
    generators: async (scope, args, { prisma }) => {
      const generators = await prisma.storageCategory
        .findUnique({
          where: {
            id: scope.id,
          },
        })
        .generators();
      return generators;
    },
  },
  StorageCategoryMutationResponse: {
    __resolveType(object, context, info) {
      if (object.id) {
        return 'StorageCategory';
      }
      return 'Error';
    },
  },
  Query: {
    GetStorageCategory: async (scope, args, { prisma }) => {
      const category = await prisma.storageCategory.findUnique({
        where: {
          id: args.id,
        },
      });
      return category;
    },
    ListStorageCategories: async (scope, args, { prisma }) => {
      const categories = await prisma.storageCategory.findMany();
      return categories;
    },
    SearchStorageCategoriesByName: async (scope, args, { prisma }) => {
      const searchResult = await prisma.StorageCategory.findMany({
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
    CreateStorageCategory: async (_, args, { prisma }) => {
      try {
        const storageCategory = await prisma.storageCategory.create({
          data: {
            name: args.input.name,
            parentId: args.input.parentId,
          },
        });
        await prisma.storageCategoryOnStorageCategoryFormField.createMany({
          data: args.input.fields.map((field, index) => {
            return {
              categoryId: storageCategory.id,
              fieldId: field,
              order: index,
            };
          }),
        });
        return storageCategory;
      } catch ({ code }) {
        return {
          code,
        };
      }
    },
    UpdateStorageCategory: async (_, args, { prisma }) => {
      try {
        const storageCategory = await prisma.storageCategory.update({
          where: {
            id: args.id,
          },
          data: {
            name: args.input.name,
          },
        });
        await prisma.storageCategoryOnStorageCategoryFormField.deleteMany({
          where: {
            categoryId: args.id,
          },
        });
        await prisma.storageCategoryOnStorageCategoryFormField.createMany({
          data: args.input.fields.map((field, index) => {
            return {
              categoryId: args.id,
              fieldId: field,
              order: index,
            };
          }),
        });
        return storageCategory;
      } catch ({ code }) {
        return {
          code,
        };
      }
    },
    DeleteStorageCategory: async (_, args, { prisma }) => {
      try {
        const storageCategory = await prisma.storageCategory.delete({
          where: {
            id: args.id,
          },
        });
        await prisma.storageCategoryOnStorageCategoryFormField.deleteMany({
          where: {
            categoryId: args.id,
          },
        });
        return storageCategory;
      } catch ({ code }) {
        return {
          code,
        };
      }
    },
  },
};
