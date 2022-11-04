const { shield, rule, allow, deny } = require('graphql-shield');

const has = (permission) => {
  return rule()(async (parent, args, { user }, info) => {
    return (
      user.role.permissions.includes('SUDO') ||
      user.role.permissions.includes(permission) ||
      // test
      true
    );
  });
};

module.exports = () => {
  return shield(
    {
      Query: {
        GetMessage: has('READ_MESSAGES'),
        ListMessages: has('READ_MESSAGES'),
        GetLog: has('READ_LOGS'),
        ListLogs: has('READ_LOGS'),
      },
      Mutation: {
        Login: allow,
        CreateUser: has('WRITE_USER'),
        CreateRole: has('WRITE_ROLE'),
        CreateStorageCategory: has('WRITE_STORAGE_CATEGORY'),
        CreateStorageCategoryFormField: has(
          'WRITE_STORAGE_CATEGORY_FORM_FIELD'
        ),
        CreateStorageItem: has('WRITE_STORAGE_ITEM'),
        CreateStorageItemRecord: has('WRITE_STORAGE_ITEM_RECORD'),
        CreateStorageItemControllerBlueprint: has(
          'WRITE_STORAGE_ITEM_CONTROLLER'
        ),
        CreateStorageItemControllerInstance: has(
          'WRITE_STORAGE_ITEM_CONTROLLER'
        ),
      },
      User: {
        sentMessages: has('READ_MESSAGES'),
        receivedMessages: has('READ_MESSAGES'),
      },
    },
    {
      debug: process.env.MODE === 'DEV' ? true : false,
      allowExternalErrors: process.env.MODE === 'DEV' ? true : false,
      fallbackError: { code: 'A4003' },
      fallbackRule: allow,
    }
  );
};
