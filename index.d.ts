declare class Api {
  constructor(mock?: Partial<Mock>);
  public buildFindObjectsFilter(findObjectsFilter: FindObjectsFilter): string;
  public callApi(
    method: METHOD,
    endpointAndArgs: string,
    obj?: unknown,
    onSuccess?: (resp: unknown) => void,
    onError?: (resp: Error) => void,
    postMessage?: string
  ): Promise<unknown>;
  public deleteObject(
    id: string,
    onSuccess?: (resp: JsonEdgyObject) => void,
    onError?: (error: Error) => void
  ): Promise<JsonEdgyObject | Error>;
  public findObjects(
    filter: string,
    fields?: string[],
    onSuccess?: (objs: JsonEdgyObject[]) => void,
    onError?: (error: Error) => void
  ): Promise<JsonEdgyObject[] | Error>;
  public getAccountId(): string;
  public getAllAccounts(
    filter?: string[],
    onSuccess?: (resp: string[] | Partial<JsonAccount>[]) => void,
    onError?: (error: Error) => void
  ): Promise<string[] | Partial<JsonAccount>[] | Error>;
  public getAllAppInfos(
    onSuccess?: (resp: JsonAppInfo[]) => void,
    onError?: (error: Error) => void
  ): Promise<JsonAppInfo[] | Error>;
  public getAllDefinedColors(
    onSuccess?: (resp: string[]) => void,
    onError?: (error: Error) => void
  ): Promise<string[] | Error>;
  public getAllDefinedRoles(
    onSuccess?: (resp: string[]) => void,
    onError?: (error: Error) => void
  ): Promise<string[] | Error>;
  public getAllDefinedTags(
    onSuccess?: (resp: string[]) => void,
    onError?: (error: Error) => void
  ): Promise<string[] | Error>;
  public getAllObjectVersions(
    id: string,
    onSuccess?: (resp: JsonObjectVersion[]) => void,
    onError?: (error: Error) => void
  ): Promise<JsonObjectVersion[] | Error>;
  public getApiKey(): string;
  public getAppCfg(): { [key: string]: unknown } | undefined;
  public getAppId(): string;
  public getAppSection(): string | undefined;
  public getAppType(): IsApp;
  public getAppVersion(): number | undefined;
  public getBaseUrl(): string;
  public getMyself(
    fields?: string[],
    onSuccess?: (resp: JsonEdgyObject) => void,
    onError?: (error: Error) => void
  ): Promise<JsonEdgyObject | Error>;
  public getObject(
    id: string,
    version?: number | '*',
    fields?: string[],
    onSuccess?: (resp: JsonEdgyObject | JsonEdgyObject[]) => void,
    onError?: (error: Error) => void
  ): Promise<JsonEdgyObject | JsonEdgyObject[] | Error>;
  public getMySignature(): string;
  public isAppCfg(): boolean;
  public isAppLatestVersion(): boolean;
  public isPermalinkApiKey(): boolean;
  public saveAppCfg(
    obj: Omit<JsonEdgyObject, 'type'>,
    onSuccess?: (resp: JsonEdgyObject) => void,
    onError?: (error: Error) => void
  ): Promise<JsonEdgyObject | Error>;
  public saveMyself(
    obj: Partial<JsonEdgyObject>,
    onSuccess?: (resp: JsonEdgyObject) => void,
    onError?: (error: Error) => void
  ): Promise<JsonEdgyObject | Error>;
  public saveObject(
    obj: JsonEdgyObject,
    onSuccess?: (resp: JsonEdgyObject) => void,
    onError?: (error: Error) => void
  ): Promise<JsonEdgyObject | Error>;
  public updateObject(
    obj: Partial<JsonEdgyObject>,
    onSuccess?: (resp: JsonEdgyObject) => void,
    onError?: (error: Error) => void
  ): Promise<JsonEdgyObject | Error>;
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
  Objects: { [id: string]: JsonEdgyObject };
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
  getApiKey(): string;
  getAppCfg(): { [key: string]: unknown } | undefined;
  getAppId(): string;
  getAppSection(): string | undefined;
  getAppType(): IsApp;
  getAppVersion(): number;
  getBaseUrl(): string;
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
  getMySignature(): string;
  isAppLatestVersion(): boolean;
  isPermalinkApiKey(): boolean;
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

/**
 * The following interface represents the equivalent of an iCalendar event as defined by RFC 2445
 *
 * The following fields from iCalendar have a different meaning or are not present as fields:
 *
 * class is implemented via the ACL assigned to the Event object
 * - PUBLIC is implemented by letting ALL read it
 * - PRIVATE is implemented by letting only its owner to read it
 * - CONFIDENTIAL is implemented by letting only a set of users to read it
 *
 * created is represented by the creation date of the Event object
 *
 * contact is not present as the contacts are obtained from account objects of attendees
 *
 * dtstamp is represented by the creation date of the Event object
 *
 * dtstart and dtend are not present
 *
 * last-modified is represented by the last change date of Event object
 *
 * priority is represented as a free text instead of a number from 0 to 9
 * - HIGH represents 1
 * - MEDIUM represents 5
 * - LOW represents 9
 * - undefined represents 0
 *
 * recurrence-id represents actually the start date time of the recurring event
 *
 * rstatus is not present as the validation of the event object can be made at its creation
 *
 * uid is represented by the id of the Event object
 *
 * url is not present as there is no default .ics representation of it
 *
 * seq is represented by the version number of the Event object
 */
export interface Event {
  alarms?: JsonEventAlarmObjectId[];
  /* it represents attach */
  attachments?: DocumentObjectId[];
  /* it represents attendee */
  attendees?: JsonEventAttendeeObjectId[];
  categories?: string[];
  /* it represents comment */
  comments?: string[];
  description?: string;
  /* the duration of the event or one of its recurring events in seconds */
  duration: number;
  /* when end the event or when end the valability of the recurring events */
  end: EventDateTimeTimezone;
  /* it represents exdate. these dates correspond to the start of the recurring events */
  exDates?: EventDateTimeTimezone[];
  /* other event objects representing excluded events */
  exEvents?: EventObjectId[];
  /* it represents exrule */
  exRules?: EventRule[];
  geo?: EventGeo;
  location?: EventLocation;
  /* there can be more than one organizer */
  organizer: UserObjectId[];
  /* default is MEDIUM */
  priority?: 'HIGH' | 'MEDIUM' | 'LOW';
  resources?: ResourceObjectId[];
  /* it represents rdate. these dates correspond to the start of the recurring events */
  rDates?: EventDateTimeTimezone[];
  /* event objects whos events are included in this event */
  rEvents?: EventObjectId[];
  /* it represents rrule (the relation between them is OR) */
  rRules?: EventRule[];
  /* when start the event or when start the valability of these recurring events */
  start: EventDateTimeTimezone;
  status?: 'TENTATIVE' | 'CONFIRMED' | 'CANCELLED' | 'NEEDS-ACTION' | 'IN-PROCESS' | 'COMPLETED' | 'DRAFT';
  summary: string;
  transp?: 'OPAQUE' | 'TRANSPARENT';
  [xProp: string]: any;
}

export interface JsonEventAttendeeObject {
  /* it represents the sent-by */
  attendee: UserObjectId;
  /* a list of delegators from the latest to first */
  delegatedFrom?: UserObjectId[];
  /* the dir is not present as there is no ldap entry representation of it */
  /* member means roles of attendee */
  /* cn is the attendee's name */
  /* it is assumed DELEGATED if delegatedFrom is not empty. also delegated-to is found in delegatedFrom list */
  partStat: 'NEEDS-ACTION' | 'ACCEPTED' | 'DECLINED' | 'TENTATIVE';
  role: 'CHAIR' | 'REQ-PARTICIPANT' | 'OPT-PARTICIPANT' | 'NON-PARTICIPANT';
  /* it is true if it is expected an answer from attendee */
  rsvp: boolean;
  /* implicitly has the type (cutype) 'INDIVIDUAL', all other types are represented as resources: 'GROUP' | 'RESOURCE' | 'ROOM' | 'UNKNOWN' */
}

export interface JsonEventAlarmObject {
  action: 'AUDIO' | 'DISPLAY' | 'EMAIL';
  message?: string;
  /* the offset in seconds relative to start or end of the event */
  offset: number;
  relativeTo: 'START' | 'END';
  sound?: SoundObjectId;
}

type DocumentObjectId = number;
type JsonEventAlarmObjectId = number;
type SoundObjectId = number;
type JsonEventAttendeeObjectId = number;

/* it is a string conform to ISO 8601 notation: yyyy-mm-ddThh:mm:ss.nnnnnn+|-hh:mm */
type EventDateTimeTimezone = string;

/* an array holding the Latitude and the Longitude of the venue (when has 2 values) or a box represented by the min and max Latitude followed by min max Longitude (when has 4 values) */
type EventGeo =
  | { latitude: number; longitude: number }
  | { minLatitude: number; maxLatitude: number; minLongitude: number; maxLongitude: number };

/* a text or a link to a .vcf file */
type EventLocation = string;

interface EventRule {
  count?: number;
  match: EventRuleMoment;
  until?: EventDateTimeTimezone;
}

/* the relation between fields is AND and between the values in a field is OR */
interface EventRuleMoment {
  seconds?: number[];
  minutes?: number[];
  hours?: number[];
  days?: number[];
  months?: number[];
  years?: number[];
  weeksOfYear?: number[];
  daysOfWeek?: number[];
  daysOfYear?: number[];
}

type EventObjectId = number;
type ResourceObjectId = number;
type UserObjectId = number;

export interface JournalEvent {}
