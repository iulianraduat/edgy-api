declare class Api {
  constructor(mock?: Partial<Mock>);
  public buildFindObjectsFilter: (findObjectsFilter: FindObjectsFilter) => string;
  public callApi: (
    method: METHOD,
    endpointAndArgs: string,
    obj?: unknown,
    onSuccess?: (resp: unknown) => void,
    onError?: (resp: Error) => void,
    postMessage?: string
  ) => Promise<unknown>;
  public deleteObject: (
    id: string,
    onSuccess?: (resp: JsonEdgyObject) => void,
    onError?: (error: Error) => void
  ) => Promise<JsonEdgyObject | Error>;
  public findObjects: (
    filter: string,
    fields?: string[],
    onSuccess?: (objs: JsonEdgyObject[]) => void,
    onError?: (error: Error) => void
  ) => Promise<JsonEdgyObject[] | Error>;
  public getAccountId: () => string;
  public getAllAccounts: (
    filter?: string[],
    onSuccess?: (resp: string[] | Partial<JsonAccount>[]) => void,
    onError?: (error: Error) => void
  ) => Promise<string[] | Partial<JsonAccount>[] | Error>;
  public getAllAppInfos: (
    onSuccess?: (resp: JsonAppInfo[]) => void,
    onError?: (error: Error) => void
  ) => Promise<JsonAppInfo[] | Error>;
  public getAllDefinedColors: (
    onSuccess?: (resp: string[]) => void,
    onError?: (error: Error) => void
  ) => Promise<string[] | Error>;
  public getAllDefinedRoles: (
    onSuccess?: (resp: string[]) => void,
    onError?: (error: Error) => void
  ) => Promise<string[] | Error>;
  public getAllDefinedTags: (
    onSuccess?: (resp: string[]) => void,
    onError?: (error: Error) => void
  ) => Promise<string[] | Error>;
  public getAllObjectVersions: (
    id: string,
    onSuccess?: (resp: JsonObjectVersion[]) => void,
    onError?: (error: Error) => void
  ) => Promise<JsonObjectVersion[] | Error>;
  public getApiKey: () => string;
  public getAppCfg: () => { [key: string]: unknown } | undefined;
  public getAppId: () => string;
  public getAppSection: () => string | undefined;
  public getAppType: () => IsApp;
  public getAppVersion: () => number | undefined;
  public getBaseUrl: () => string;
  public getMyself: (
    fields?: string[],
    onSuccess?: (resp: JsonEdgyObject) => void,
    onError?: (error: Error) => void
  ) => Promise<JsonEdgyObject | Error>;
  public getObject: (
    id: string,
    version?: number | '*',
    fields?: string[],
    onSuccess?: (resp: JsonEdgyObject | JsonEdgyObject[]) => void,
    onError?: (error: Error) => void
  ) => Promise<JsonEdgyObject | JsonEdgyObject[] | Error>;
  public getMySignature: () => string;
  public isAppCfg: () => boolean;
  public isAppLatestVersion: () => boolean;
  public isPermalinkApiKey: () => boolean;
  public saveAppCfg: (
    obj: Omit<JsonEdgyObject, 'type'>,
    onSuccess?: (resp: JsonEdgyObject) => void,
    onError?: (error: Error) => void
  ) => Promise<JsonEdgyObject | Error>;
  public saveMyself: (
    obj: Partial<JsonEdgyObject>,
    onSuccess?: (resp: JsonEdgyObject) => void,
    onError?: (error: Error) => void
  ) => Promise<JsonEdgyObject | Error>;
  public saveObject: (
    obj: JsonEdgyObject,
    onSuccess?: (resp: JsonEdgyObject) => void,
    onError?: (error: Error) => void
  ) => Promise<JsonEdgyObject | Error>;
  public updateObject: (
    obj: Partial<JsonEdgyObject>,
    onSuccess?: (resp: JsonEdgyObject) => void,
    onError?: (error: Error) => void
  ) => Promise<JsonEdgyObject | Error>;
  protected isPresent(): boolean;
  protected getApi(): WindowApi;
}

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

export type METHOD = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

declare module 'edgy-api' {}

export default Api;

export type Mock = {
  AllAccounts: Partial<JsonAccount>[];
  AllAppInfos: JsonAppInfo[];
  AllDefinedColors: string[];
  AllDefinedRoles: string[];
  AllDefinedTags: string[];
  AllObjectVersions: JsonObjectVersion[];
  AnObject: JsonEdgyObject;
  AnObjectAllVersions: JsonEdgyObject[];
  ApiKey: string;
  AppCfg: object;
  AppId: string;
  AppObject: JsonEdgyObject;
  AppObjectAllVersions: JsonEdgyObject[];
  AppType: IsApp;
  AppVersion: number;
  BaseUrl: string;
  FindObjects: JsonEdgyObject[];
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

export type IsApp = 'APP' | 'APP-CFG';

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
