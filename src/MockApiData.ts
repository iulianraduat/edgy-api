import {
  IsApp,
  JsonAccount,
  JsonAppInfo,
  JsonEdgyObject,
  JsonObjectVersion,
  Mock
  } from './Api';

const AccountId: string = '1';

const AllAccounts: Partial<JsonAccount>[] = [
  {
    data: {
      fullName: 'test account',
      roles: ['ALL', 'Tester']
    },
    email: 'test@example.com',
    fullName: 'test account',
    id: '1',
    roles: ['ALL', 'Tester']
  },
  {
    data: {
      fullName: 'admin account',
      roles: ['ALL', 'Admin']
    },
    email: 'admin@example.com',
    fullName: 'admin account',
    id: '1',
    roles: ['ALL', 'Admin']
  }
];

const AllAppInfos: JsonAppInfo[] = [
  { favorite: true, id: '4', name: 'App 1', type: 'APP' },
  { favorite: false, id: '1', name: 'App 2', type: 'APP' },
  { favorite: false, id: '2a', name: 'App 3', type: 'APP' },
  { favorite: false, id: '8x', name: 'App 4', type: 'APP' }
];

const AllDefinedColors: string[] = ['red', 'green', 'blue', 'aqua', 'magenta'];

const AllDefinedRoles: string[] = ['ALL', 'Admin', 'Developer', 'Tester'];

const AllDefinedTags: string[] = ['Tag1', 'Tag2', 'Tag3', 'Tag4'];

const AllObjectVersions: JsonObjectVersion[] = [
  {
    name: 'App 1',
    version: 1,
    changelog: 'First app',
    latest: true,
    created: {
      on: '2018-12-08 17:07:26',
      by: 'Test API <api@edgy.ferbinder.com>'
    }
  }
];

const ApiKey: string = '1234123456781234abcdefghi';

const AppCfg: { [key: string]: unknown } = {
  data: 1
};

const AppId: string = 'appId';

const AppObject: JsonEdgyObject = {
  id: '1',
  type: 'APP-CFG',
  name: 'Mock APP-CFG',
  data: {
    custom_field1: 'Field 1',
    custom_field2: 'Field 2'
  },
  tags: ['Tag 1', 'Tag 2'],
  colors: ['red', 'green', 'blue'],
  version: {
    number: 2,
    changelog: 'Mock app object',
    created: {
      on: '2018-08-26 08:56:37',
      by: 'Test API <api@edgy.ferbinder.com>'
    },
    changed: {
      on: '2018-08-28 18:56:37',
      by: 'Test API <api@edgy.ferbinder.com>'
    },
    latest: true
  },
  owner: {
    id: '10',
    name: 'Fake owner'
  },
  acl: {
    'api@edgy.ferbinder.com': ['c', 'd', 'f', 'n', 'p', 'r', 't', 'w']
  }
};

const AppObjectAllVersions: JsonEdgyObject[] = [
  {
    id: '1',
    type: 'APP-CFG',
    name: 'Mock APP-CFG (OLD)',
    data: {
      custom_field1: 'Field 1',
      custom_field0: 'Fields'
    },
    version: {
      number: 1,
      changelog: 'Mock app object (draft)',
      created: {
        on: '2018-08-26 08:56:37',
        by: 'Test API <api@edgy.ferbinder.com>'
      },
      changed: {
        on: '2018-08-26 08:56:37',
        by: 'Test API <api@edgy.ferbinder.com>'
      },
      latest: false
    },
    owner: {
      id: '10',
      name: 'Fake owner'
    },
    acl: {
      'api@edgy.ferbinder.com': ['c', 'd', 'f', 'n', 'p', 'r', 't', 'w']
    }
  },
  {
    id: '1',
    type: 'APP-CFG',
    name: 'Mock APP-CFG',
    data: {
      custom_field1: 'Field 1',
      custom_field2: 'Field 2'
    },
    tags: ['Tag 1', 'Tag 2'],
    colors: ['red', 'green', 'blue'],
    version: {
      number: 2,
      changelog: 'Mock app object',
      created: {
        on: '2018-08-26 08:56:37',
        by: 'Test API <api@edgy.ferbinder.com>'
      },
      changed: {
        on: '2018-08-28 18:56:37',
        by: 'Test API <api@edgy.ferbinder.com>'
      },
      latest: true
    },
    owner: {
      id: '10',
      name: 'Fake owner'
    },
    acl: {
      'api@edgy.ferbinder.com': ['c', 'd', 'f', 'n', 'p', 'r', 't', 'w']
    }
  }
];

const AppType: IsApp = 'APP';

const AppVersion: number = 1;

const AnObject: JsonEdgyObject = {
  id: '7x',
  type: 'CUSTOM_TYPE',
  name: 'Small number',
  data: {
    value: '12122121343243'
  },
  version: {
    number: 1,
    changelog: 'First attempt',
    created: {
      on: '2018-12-08 17:01:15',
      by: 'Test API <api@edgy.ferbinder.com>'
    },
    changed: {
      on: '2018-12-08 17:01:15',
      by: 'Test API <api@edgy.ferbinder.com>'
    },
    latest: true
  },
  acl: {
    'api@edgy.ferbinder.com': ['c', 'd', 'f', 'n', 'p', 'r', 't', 'w']
  }
};

const AnObjectAllVersions: JsonEdgyObject[] = [
  {
    id: '7x',
    type: 'CUSTOM_TYPE',
    name: 'Small number',
    data: {
      value: '12122121343243'
    },
    version: {
      number: 1,
      changelog: 'First attempt',
      created: {
        on: '2018-12-08 17:01:15',
        by: 'Test API <api@edgy.ferbinder.com>'
      },
      changed: {
        on: '2018-12-08 17:01:15',
        by: 'Test API <api@edgy.ferbinder.com>'
      },
      latest: true
    },
    acl: {
      'api@edgy.ferbinder.com': ['c', 'd', 'f', 'n', 'p', 'r', 't', 'w']
    }
  }
];

const BaseUrl: string = 'https://edgy.ferbinder.com/api/@playground';

const FindObjects: JsonEdgyObject[] = [
  {
    id: '7x',
    type: 'CUSTOM_TYPE',
    name: 'Small number',
    data: {
      value: '12122121343243'
    },
    version: {
      number: 1,
      changelog: 'First attempt',
      created: {
        on: '2018-12-08 17:01:15',
        by: 'Test API <api@edgy.ferbinder.com>'
      },
      changed: {
        on: '2018-12-08 17:01:15',
        by: 'Test API <api@edgy.ferbinder.com>'
      },
      latest: true
    },
    acl: {
      'api@edgy.ferbinder.com': ['c', 'd', 'f', 'n', 'p', 'r', 't', 'w']
    }
  },
  {
    id: '7y',
    type: 'CUSTOM_TYPE',
    name: 'Big number',
    data: {
      value: '9898989898987'
    },
    version: {
      number: 1,
      changelog: 'Second attempt',
      created: {
        on: '2018-12-08 17:07:26',
        by: 'Test API <api@edgy.ferbinder.com>'
      },
      changed: {
        on: '2018-12-08 17:07:26',
        by: 'Test API <api@edgy.ferbinder.com>'
      },
      latest: true
    },
    acl: {
      'api@edgy.ferbinder.com': ['c', 'f', 'n', 'p', 'r', 't', 'w']
    }
  }
];

const MySignature: string = 'Test API <api@edgy.ferbinder.com>';

const mock: Mock = {
  AccountId,
  AllAccounts,
  AllAppInfos,
  AllDefinedColors,
  AllDefinedRoles,
  AllDefinedTags,
  AllObjectVersions,
  AnObject,
  AnObjectAllVersions,
  ApiKey,
  AppCfg,
  AppId,
  AppObject,
  AppObjectAllVersions,
  AppType,
  AppVersion,
  BaseUrl,
  FindObjects,
  MySignature
};

export default mock;
