import defaultMock from './MockApiData';

class Api {
  private mock: Mock;

  constructor(mock?: Partial<Mock>) {
    this.mock = mock ? { ...defaultMock, ...mock } : defaultMock;
  }

  public buildFindObjectsFilter(findObjectsFilter: FindObjectsFilter): string {
    const filters: string[] = [];
    const {
      changedBy,
      changedOn,
      changelog,
      createdBy,
      createdOn,
      colors,
      fields,
      name,
      ownerId,
      roles,
      tags,
      typeName,
      typeObject
    } = findObjectsFilter;

    if (changedBy) {
      filters.push(`chb=${changedBy}`);
    }

    if (changedOn) {
      filters.push(`cho=${changedOn}`);
    }

    if (changelog) {
      filters.push(`cl=${changelog}`);
    }

    if (createdBy) {
      filters.push(`crb=${createdBy}`);
    }

    if (createdOn) {
      filters.push(`cro=${createdOn}`);
    }
    if (colors) {
      filters.push(`c=${colors}`);
    }

    if (fields) {
      filters.push(`f=${fields.join(',')}`);
    }

    if (name) {
      filters.push(`n=${name}`);
    }

    if (ownerId) {
      filters.push(`o=${ownerId}`);
    }

    if (roles) {
      filters.push(`r=${roles.join(',')}`);
    }

    if (tags) {
      filters.push(`t=${tags}`);
    }

    if (typeName) {
      filters.push(`tn=${typeName}`);
    }

    if (typeObject) {
      filters.push(`to=${typeObject}`);
    }

    const filter = filters.join('&');
    return filter;
  }

  public callApi(
    method: METHOD,
    endpointAndArgs: string,
    obj?: unknown,
    onSuccess?: (resp: unknown) => void,
    onError?: (resp: Error) => void,
    postMessage?: string
  ): Promise<unknown> {
    if (this.isPresent()) {
      return this.getApi()!.callApi(method, endpointAndArgs, obj, onSuccess, onError, postMessage);
    }

    const mockResponse = this.mock[`${method}_${endpointAndArgs}`] || obj;
    onSuccess && onSuccess(mockResponse);

    return new Promise<unknown>(resolve => {
      resolve(mockResponse);
    });
  }

  public deleteObject(
    id: string,
    onSuccess?: (resp: JsonEdgyObject) => void,
    onError?: (error: Error) => void
  ): Promise<JsonEdgyObject | Error> {
    if (this.isPresent()) {
      return this.getApi()!.deleteObject(id, onSuccess, onError);
    }

    onSuccess && onSuccess(this.mock.AnObject);
    return new Promise<JsonEdgyObject>(resolve => {
      resolve(this.mock.AnObject);
    });
  }

  public findObjects(
    filter: string,
    fields?: string[],
    onSuccess?: (objs: JsonEdgyObject[]) => void,
    onError?: (error: Error) => void
  ): Promise<JsonEdgyObject[] | Error> {
    if (this.isPresent()) {
      return this.getApi()!.findObjects(filter, fields, onSuccess, onError);
    }

    onSuccess && onSuccess(this.mock.FindObjects);

    return new Promise<JsonEdgyObject[]>(resolve => {
      resolve(this.mock.FindObjects);
    });
  }

  public getAccountId(): string {
    return this.isPresent() ? this.getApi()!.getAccountId() : this.mock.AccountId;
  }

  public getAllAccounts(
    filter?: string[],
    onSuccess?: (resp: string[] | Partial<JsonAccount>[]) => void,
    onError?: (error: Error) => void
  ): Promise<string[] | Partial<JsonAccount>[] | Error> {
    if (this.isPresent()) {
      return this.getApi()!.getAllAccounts(filter, onSuccess, onError);
    }

    onSuccess && onSuccess(this.mock.AllAccounts);
    return new Promise<Partial<JsonAccount>[]>(resolve => {
      resolve(this.mock.AllAccounts);
    });
  }

  public getAllAppInfos(
    onSuccess?: (resp: JsonAppInfo[]) => void,
    onError?: (error: Error) => void
  ): Promise<JsonAppInfo[] | Error> {
    if (this.isPresent()) {
      return this.getApi()!.getAllAppInfos(onSuccess, onError);
    }

    onSuccess && onSuccess(this.mock.AllAppInfos);
    return new Promise<JsonAppInfo[]>(resolve => {
      resolve(this.mock.AllAppInfos);
    });
  }

  public getAllDefinedColors(
    onSuccess?: (resp: string[]) => void,
    onError?: (error: Error) => void
  ): Promise<string[] | Error> {
    if (this.isPresent()) {
      return this.getApi()!.getAllDefinedColors(onSuccess, onError);
    }

    onSuccess && onSuccess(this.mock.AllDefinedColors);
    return new Promise<string[]>(resolve => {
      resolve(this.mock.AllDefinedColors);
    });
  }

  public getAllDefinedRoles(
    onSuccess?: (resp: string[]) => void,
    onError?: (error: Error) => void
  ): Promise<string[] | Error> {
    if (this.isPresent()) {
      return this.getApi()!.getAllDefinedRoles(onSuccess, onError);
    }

    onSuccess && onSuccess(this.mock.AllDefinedRoles);
    return new Promise<string[]>(resolve => {
      resolve(this.mock.AllDefinedRoles);
    });
  }

  public getAllDefinedTags(
    onSuccess?: (resp: string[]) => void,
    onError?: (error: Error) => void
  ): Promise<string[] | Error> {
    if (this.isPresent()) {
      return this.getApi()!.getAllDefinedTags(onSuccess, onError);
    }

    onSuccess && onSuccess(this.mock.AllDefinedTags);
    return new Promise<string[]>(resolve => {
      resolve(this.mock.AllDefinedTags);
    });
  }

  public getAllObjectVersions(
    id: string,
    onSuccess?: (resp: JsonObjectVersion[]) => void,
    onError?: (error: Error) => void
  ): Promise<JsonObjectVersion[] | Error> {
    if (this.isPresent()) {
      return this.getApi()!.getAllObjectVersions(id, onSuccess, onError);
    }

    onSuccess && onSuccess(this.mock.AllObjectVersions);
    return new Promise<JsonObjectVersion[]>(resolve => {
      resolve(this.mock.AllObjectVersions);
    });
  }

  public getApiKey(): string {
    return this.isPresent() ? this.getApi()!.getApiKey() : this.mock.ApiKey;
  }

  public getAppCfg(): { [key: string]: unknown } | undefined {
    return this.isPresent() ? this.getApi()!.getAppCfg() : this.mock.AppCfg;
  }

  public getAppId(): string {
    return this.isPresent() ? this.getApi()!.getAppId() : this.mock.AppId;
  }

  public getAppSection(): string | undefined {
    if (this.isPresent()) {
      return this.getApi()!.getAppSection();
    }

    const urlPath = window.location.pathname.substr(1);
    return urlPath === '' ? undefined : urlPath;
  }

  public getAppType(): IsApp {
    return this.isPresent() ? this.getApi()!.getAppType() : this.mock.AppType;
  }

  public getAppVersion(): number {
    return this.isPresent() ? this.getApi()!.getAppVersion() : this.mock.AppVersion;
  }

  public getBaseUrl(): string {
    return this.isPresent() ? this.getApi()!.getBaseUrl() : this.mock.BaseUrl;
  }

  public getMyself(
    fields?: string[],
    onSuccess?: (resp: JsonEdgyObject) => void,
    onError?: (error: Error) => void
  ): Promise<JsonEdgyObject | Error> {
    if (this.isPresent()) {
      return this.getApi()!.getMyself(fields, onSuccess, onError);
    }

    onSuccess && onSuccess(this.mock.AppObject);
    return new Promise<JsonEdgyObject>(resolve => {
      resolve(this.mock.AppObject);
    });
  }

  public getObject(
    id: string,
    version?: number | '*',
    fields?: string[],
    onSuccess?: (resp: JsonEdgyObject | JsonEdgyObject[]) => void,
    onError?: (error: Error) => void
  ): Promise<JsonEdgyObject | JsonEdgyObject[] | Error> {
    if (this.isPresent()) {
      return this.getApi()!.getObject(id, version, fields, onSuccess, onError);
    }

    if (version !== '*') {
      onSuccess && onSuccess(this.mock.AnObject);
      return new Promise<JsonEdgyObject>(resolve => {
        resolve(this.mock.AppObject);
      });
    }

    onSuccess && onSuccess(this.mock.AnObjectAllVersions);
    return new Promise<JsonEdgyObject[]>(resolve => {
      resolve(this.mock.AppObjectAllVersions);
    });
  }

  public getMySignature(): string {
    return this.isPresent() ? this.getApi()!.getMySignature() : this.mock.MySignature;
  }

  public isAppCfg(): boolean {
    return this.getAppType() === TYPE_APP_CFG;
  }

  public isAppLatestVersion(): boolean {
    return this.isPresent() ? this.getApi()!.isAppLatestVersion() : this.mock.AppObject.version!.latest === true;
  }

  public isPermalinkApiKey(): boolean {
    return this.getApiKey().charAt(0) === '$';
  }

  public saveAppCfg(
    obj: Omit<JsonEdgyObject, 'type'>,
    onSuccess?: (resp: JsonEdgyObject) => void,
    onError?: (error: Error) => void
  ): Promise<JsonEdgyObject | Error> {
    return this.saveObject(
      {
        ...obj,
        type: 'APP-CFG',
        owner: {
          id: this.getAppId()
        }
      },
      onSuccess,
      onError
    );
  }

  public saveMyself(
    obj: Partial<JsonEdgyObject>,
    onSuccess?: (resp: JsonEdgyObject) => void,
    onError?: (error: Error) => void
  ): Promise<JsonEdgyObject | Error> {
    if (this.isPresent()) {
      return this.getApi()!.saveMyself(obj, onSuccess, onError);
    }

    const mockResponse = { ...this.mock.AppObject, ...obj };
    this.mock.AppObject = mockResponse;

    mockResponse.version = {
      ...mockResponse.version,
      changelog: obj.version ? obj.version.changelog : mockResponse.version!.changelog,
      number: (mockResponse.version!.number as number) + 1,
      latest: true
    };

    this.mock.AppObjectAllVersions[this.mock.AppObjectAllVersions.length - 1].version!.latest = false;
    this.mock.AppObjectAllVersions = [...this.mock.AppObjectAllVersions, mockResponse];

    onSuccess && onSuccess(mockResponse);
    return new Promise<JsonEdgyObject>(resolve => {
      resolve(mockResponse);
    });
  }

  public saveObject(
    obj: JsonEdgyObject,
    onSuccess?: (resp: JsonEdgyObject) => void,
    onError?: (error: Error) => void
  ): Promise<JsonEdgyObject | Error> {
    if (this.isPresent()) {
      return this.getApi()!.saveObject(obj, onSuccess, onError);
    }

    if (obj.id === undefined) {
      obj = {
        ...obj,
        id: Math.random()
          .toString(36)
          .substr(2, 9)
      };
    }
    this.mock.FindObjects = [...this.mock.FindObjects, obj];

    onSuccess && onSuccess(obj);
    return new Promise<JsonEdgyObject>(resolve => {
      resolve(obj);
    });
  }

  public updateObject(
    obj: Partial<JsonEdgyObject>,
    onSuccess?: (resp: JsonEdgyObject) => void,
    onError?: (error: Error) => void
  ): Promise<JsonEdgyObject | Error> {
    if (this.isPresent()) {
      return this.getApi()!.updateObject(obj, onSuccess, onError);
    }

    const fullObj: JsonEdgyObject = { ...this.mock.AnObject, ...obj };
    fullObj.version!.deleted = fullObj.version!.created;
    this.mock.FindObjects = [...this.mock.FindObjects, fullObj];

    onSuccess && onSuccess(fullObj);
    return new Promise<JsonEdgyObject>(function(resolve) {
      resolve(fullObj);
    });
  }

  protected isPresent(): boolean {
    return !!this.getApi();
  }

  protected getApi(): WindowApi | undefined {
    return (window as any).__api;
  }
}

export const TYPE_APP: string = 'APP';
export const TYPE_APP_CFG: string = 'APP-CFG';
export type IsApp = 'APP' | 'APP-CFG';

export interface FindObjectsFilter {
  changedBy?: string;
  changedOn?: string;
  changelog?: string;
  createdBy?: string;
  createdOn?: string;
  colors?: string;
  fields?: string[];
  name?: string;
  ownerId?: string;
  roles?: string[];
  tags?: string;
  typeName?: 'starts' | 'ends' | 'contains';
  typeObject?: string;
}

interface WindowApi {
  callApi: (
    method: METHOD,
    endpointAndArgs: string,
    obj?: unknown,
    onSuccess?: (resp: unknown) => void,
    onError?: (resp: unknown) => void,
    postMessage?: string
  ) => Promise<unknown>;
  deleteObject: (
    id: string,
    onSuccess?: (resp: JsonEdgyObject) => void,
    onError?: (error: Error) => void
  ) => Promise<JsonEdgyObject | Error>;
  findObjects: (
    filter: string,
    fields?: string[],
    onSuccess?: (objs: JsonEdgyObject[]) => void,
    onError?: (error: Error) => void
  ) => Promise<JsonEdgyObject[] | Error>;
  getAccountId: () => string;
  getAllAccounts: (
    filter?: string[],
    onSuccess?: (resp: string[] | Partial<JsonAccount>[]) => void,
    onError?: (error: Error) => void
  ) => Promise<string[] | Partial<JsonAccount>[] | Error>;
  getAllAppInfos: (
    onSuccess?: (resp: JsonAppInfo[]) => void,
    onError?: (error: Error) => void
  ) => Promise<JsonAppInfo[] | Error>;
  getAllDefinedColors: (
    onSuccess?: (resp: string[]) => void,
    onError?: (error: Error) => void
  ) => Promise<string[] | Error>;
  getAllDefinedRoles: (
    onSuccess?: (resp: string[]) => void,
    onError?: (error: Error) => void
  ) => Promise<string[] | Error>;
  getAllDefinedTags: (
    onSuccess?: (resp: string[]) => void,
    onError?: (error: Error) => void
  ) => Promise<string[] | Error>;
  getAllObjectVersions: (
    id: string,
    onSuccess?: (resp: JsonObjectVersion[]) => void,
    onError?: (error: Error) => void
  ) => Promise<JsonObjectVersion[] | Error>;
  getApiKey: () => string;
  getAppCfg: () => { [key: string]: unknown } | undefined;
  getAppId: () => string;
  getAppSection: () => string | undefined;
  getAppType: () => IsApp;
  getAppVersion: () => number;
  getBaseUrl: () => string;
  getMyself: (
    fields?: string[],
    onSuccess?: (resp: JsonEdgyObject) => void,
    onError?: (error: Error) => void
  ) => Promise<JsonEdgyObject | Error>;
  getObject: (
    id: string,
    version?: number | '*',
    fields?: string[],
    onSuccess?: (resp: JsonEdgyObject | JsonEdgyObject[]) => void,
    onError?: (error: Error) => void
  ) => Promise<JsonEdgyObject | JsonEdgyObject[] | Error>;
  getMySignature: () => string;
  isAppLatestVersion: () => boolean;
  isPermalinkApiKey: () => boolean;
  saveMyself: (
    obj: Partial<JsonEdgyObject>,
    onSuccess?: (resp: JsonEdgyObject) => void,
    onError?: (error: Error) => void
  ) => Promise<JsonEdgyObject | Error>;
  saveObject: (
    obj: JsonEdgyObject,
    onSuccess?: (resp: JsonEdgyObject) => void,
    onError?: (error: Error) => void
  ) => Promise<JsonEdgyObject | Error>;
  updateObject: (
    obj: Partial<JsonEdgyObject>,
    onSuccess?: (resp: JsonEdgyObject) => void,
    onError?: (error: Error) => void
  ) => Promise<JsonEdgyObject | Error>;
}

export type METHOD = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export type Mock = {
  AccountId: string;
  AllAccounts: Partial<JsonAccount>[];
  AllAppInfos: JsonAppInfo[];
  AllDefinedColors: string[];
  AllDefinedRoles: string[];
  AllDefinedTags: string[];
  AllObjectVersions: JsonObjectVersion[];
  AnObject: JsonEdgyObject;
  AnObjectAllVersions: JsonEdgyObject[];
  ApiKey: string;
  AppCfg: { [key: string]: unknown };
  AppId: string;
  AppObject: JsonEdgyObject;
  AppObjectAllVersions: JsonEdgyObject[];
  AppType: IsApp;
  AppVersion: number;
  BaseUrl: string;
  FindObjects: JsonEdgyObject[];
  MySignature: string;
  [key: string]: unknown;
};

export interface JsonAccount extends JsonEdgyObject {
  email: string;
  fullName: string;
  roles: string[];
}

export interface JsonEdgyObject {
  acl?: JsonEdgyObjectAcl;
  colors?: string[];
  data?: unknown;
  id?: string;
  name: string;
  owner?: JsonEdgyObjectOwner;
  tags?: string[];
  type: string;
  version?: JsonEdgyObjectVersion;
}

export interface JsonEdgyObjectAcl {
  [email: string]: string[];
}

export interface JsonEdgyObjectOwner {
  id: string;
  name?: string;
}

export interface JsonEdgyObjectVersion {
  changed?: JsonEdgyObjectVersionOnBy;
  changelog?: string;
  created?: JsonEdgyObjectVersionOnBy;
  deleted?: JsonEdgyObjectVersionOnBy;
  latest?: boolean;
  number?: number;
}

export interface JsonEdgyObjectVersionOnBy {
  by: string;
  on: string;
}

export interface JsonAppInfo {
  favorite: boolean;
  id: string;
  name: string;
  type: IsApp;
  bundle?: JsonAppBundleInfo;
}

export interface JsonAppBundleInfo {
  author: string;
  id: string;
  version: number;
}

export interface JsonObjectVersion {
  created: {
    on: string;
    by: string;
  };
  changelog: string;
  latest: boolean;
  name: string;
  version: number;
}

export default Api;
