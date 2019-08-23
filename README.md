# edgy-api

It provides a JavaScript class for accessing the Edgy API from a μApp (microApp)

---

## Using the API

### Mock Data

Using the default mock data
---------------------------

```js
new API()
```

Using a custom mock data
------------------------

The required fields of a mock object:

| name                 | type                   |
|----------------------|------------------------|
| AllAccounts          | Partial<JsonAccount>[] |
| AllAppInfos          | JsonAppInfo[]          |
| AllDefinedColors     | string[]               |
| AllDefinedRoles      | string[]               |
| AllDefinedTags       | string[]               |
| AllObjectVersions    | JsonObjectVersion[]    |
| AnObject             | JsonEdgyObject         |
| ApiKey               | string                 |
| AppCfg               | object                 |
| AppId                | string                 |
| AppObject            | JsonEdgyObject         |
| AppObjectAllVersions | JsonEdgyObject[]       |
| AppType              | IsApp                  |
| AppVersion           | number                 |
| BaseUrl              | string                 |
| FindObjects          | JsonEdgyObject[]       |

```js
const mockField = 'AppId'
new API({ [mockField]: 'customAppId01' })
```

### Functions

buildFindObjectsFilter
----------------------

It returns a string which can be used with findObjects()

| name              | type              | required | description                       |
|-------------------|-------------------|----------|-----------------------------------|
| findObjectsFilter | FindObjectsFilter | yes      | an object representing the filter |

The optional fields of FindObjectsFilter:

| name       | type                 |
|------------|----------------------|
| changedBy  | string               |
| changedOn  | string               |
| changelog  | string               |
| createdBy  | string               |
| createdOn  | string               |
| colors     | string               |
| fields     | string[]             |
| name       | string               |
| ownerId    | string               |
| roles      | string[]             |
| tags       | string               |
| typeName   | starts/ends/contains |
| typeObject | string               |

```js
new API().buildFindObjectsFilter({ name: 'App' })
```

callApi
-------

It allows to do a low level call to the API

| name            | type                    | required | description                                                     |
|-----------------|-------------------------|----------|-----------------------------------------------------------------|
| method          | METHOD                  | yes      | the HTTP method                                                 |
| endpointAndArgs | string                  | yes      | the path and query                                              |
| obj             | any                     | no       | the body for write methods                                      |
| onSuccess       | (resp: unknown) => void | no       | callback function                                               |
| onError         | (resp: Error) => void   | no       | callback function                                               |
| postMessage     | string                  | no       | a message received by the page including this app via an iframe |

The endpointAndArgs must have the format '/api/@WORKSPACE/endpoint?arg' with:
* /api/@ - a fixed string
* WORKSPACE - the name of the workspace where we are autheticated
* /endpoint - the path representing the endpoint
* ?arg - the optional query if the enpoint needs one

```js
const mockField = `${method}_${endpointAndArgs}`
await new API().callApi('GET', '/api/@WORKSPACE/endpoint?arg')
```

deleteObject
------------

It removes an object

| name      | type                           | required | description          |
|-----------|--------------------------------|----------|----------------------|
| id        | string                         | yes      | the id of the object |
| onSuccess | (resp: JsonEdgyObject) => void | no       | callback function    |
| onError   | (resp: Error) => void          | no       | callback function    |

```js
const mockField = 'AnObject'
await new API().deleteObject('appId')
```

findObjects
-----------

Search for objects respecting a set of criterions

| name      | type                             | required | description                                    |
|-----------|----------------------------------|----------|------------------------------------------------|
| filter    | string                           | yes      | the filter build with buildFindObjectsFilter() |
| fields    | string[]                         | no       | returns only these fields from object          |
| onSuccess | (resp: JsonEdgyObject[]) => void | no       | callback function                              |
| onError   | (resp: Error) => void            | no       | callback function                              |

```js
const mockField = 'FindObjects'
await new API().findObjects('to=ACCOUNT', ['name', 'data.roles'])
```

getAllAccounts
--------------

It returns info about all defined acccounts

| name      | type                  | required                        | description                                          |
|-----------|-----------------------|---------------------------------|------------------------------------------------------|
| filter    | string[]              | no                              | returns only these fields from object (default name) |
| onSuccess | (resp: string[] \| Partial<JsonAccount>[]) => void | no|callback function                                 |
| onError   | (resp: Error) => void | no                              | callback function                                    |

The following fields in filter are mapped:

| field    | mapped to     |
|----------|---------------|
| email    | name          |
| fullName | data.fullName |
| roles    | data.roles    |

```js
const mockField = 'AllAccounts'
await new API().getAllAccounts()
```

getAllAppInfos
--------------

It returns info about all Apps which are available to the user

| name      | type                          | required | description       |
|-----------|-------------------------------|----------|-------------------|
| onSuccess | (resp: JsonAppInfo[]) => void | no       | callback function |
| onError   | (resp: Error) => void         | no       | callback function |

The fields of JsonAppInfo:

| name     | type              |
|----------|-------------------|
| favorite | boolean           |
| id       | string            |
| name     | string            |
| type     | APP/APP-CFG       |
| bundle   | JsonAppBundleInfo |

The fields of JsonAppBundleInfo:

| name    | type   |
|---------|--------|
| author  | string |
| id      | string |
| version | number |

```js
const mockField = 'AllAppInfos'
await new API().getAllAppInfos()
```

getAllDefinedColors
-------------------

It returns all defined colors

| name      | type                     | required | description       |
|-----------|--------------------------|----------|-------------------|
| onSuccess | (resp: string[]) => void | no       | callback function |
| onError   | (resp: Error) => void    | no       | callback function |

```js
const mockField = 'AllDefinedColors'
await new API().getAllDefinedColors()
```

getAllDefinedRoles
------------------

It returns all defined roles

| name      | type                     | required | description       |
|-----------|--------------------------|----------|-------------------|
| onSuccess | (resp: string[]) => void | no       | callback function |
| onError   | (resp: Error) => void    | no       | callback function |

```js
const mockField = 'AllDefinedRoles'
await new API().getAllDefinedRoles()
```

getAllDefinedTags
-----------------

It returns all defined tags

| name      | type                     | required | description       |
|-----------|--------------------------|----------|-------------------|
| onSuccess | (resp: string[]) => void | no       | callback function |
| onError   | (resp: Error) => void    | no       | callback function |

```js
const mockField = 'AllDefinedTags'
await new API().getAllDefinedTags()
```

getAllObjectVersions
--------------------

It returns all info about all versions of an object

| name      | type                                | required | description          |
|-----------|-------------------------------------|----------|----------------------|
| id        | string                              | yes      | the id of the object |
| onSuccess | (resp: JsonObjectVersion[]) => void | no       | callback function    |
| onError   | (resp: Error) => void               | no       | callback function    |

```js
const mockField = 'AllObjectVersions'
await new API().getAllObjectVersions('appId')
```

getApiKey
---------

It returns the current api key

```js
const mockField = 'ApiKey'
new API().getApiKey()
```

getAppCfg
---------

It returns for an APP-CFG the object representing the customization or undefined for an APP

```js
const mockField = 'AppCfg'
new API().getAppCfg()
```

getAppId
---------

It returns the id of the current μApp

```js
const mockField = 'AppId'
new API().getAppId()
```

getAppSection
----------

It returns the currently selected section or undefined

```js
const mockField = undefined
new API().getAppSection()
```

getAppType
----------

It returns the type of the μApp: APP or APP-CFG

```js
const mockField = 'AppType'
new API().getAppType()
```

getAppVersion
-------------

It returns the number of the current version

```js
const mockField = 'AppVersion'
new API().getAppVersion()
```

getBaseUrl
----------

It returns the URL which represents the base of all endpoints

```js
const mockField = 'BaseUrl'
const mockFieldValue = 'https://edgy.ferbinder.com/api/@WORKSPACE'
new API().getBaseUrl()
```

getMyself
---------

It returns fields from current App

| name      | type                           | required | description                             |
|-----------|--------------------------------|----------|-----------------------------------------|
| fields    | string[]                       | no       | a list of required fields or all fields |
| onSuccess | (resp: JsonEdgyObject) => void | no       | callback function                       |
| onError   | (resp: Error) => void          | no       | callback function                       |

```js
const mockField = 'AppObject'
await new API().getMyself(['data'])
```

getObject
---------

It returns an object

| name      | type                   | required                  | description                                        |
|-----------|------------------------|---------------------------|----------------------------------------------------|
| id        | string                 | yes                       | the id of the object                               |
| version   | number \| *                         | no|the number of a version or '*' for all versions |
| fields    | string[]               | no                        | a list of required fields or all fields            |
| onSuccess | (resp: JsonEdgyObject \| JsonEdgyObject[]) => void | no|callback function                               |
| onError   | (resp: Error) => void  | no                        | callback function                                  |

```js
const mockField = 'AnObject'
const mockFieldAllVersions = 'AnObjectAllVersions'
await new API().getObject('appId')
```

getMySignature
--------------

It returns the name and the email of current logged in account

```js
const mockField = 'MySignature'
const mockFieldValue = 'Full Name <email@address.com>'
new API().getMySignature()
```

isAppCfg
--------

It returns true if the current App is a customized App (is a APP-CFG)

```js
const mockField = 'AppType'
new API().isAppCfg()
```

isAppLatestVersion
------------------

It returns true is this is the latest version of this App

```js
const mockField = 'AppObject.version.latest'
new API().isAppLatestVersion()
```

isPermalinkApiKey
-----------------

It returns true if the current api key represents a permalink

```js
const mockField = 'ApiKey'
const mockFieldValue = '$id.17xysz4gvnrlm.20200529175809'
new API().isPermalinkApiKey()
```

saveAppCfg
----------

It creates a new object of type APP-CFG owned by the current APP

| name      | type                           | required | description       |
|-----------|--------------------------------|----------|-------------------|
| obj       | JsonEdgyObject                 | yes      | the new object    |
| onSuccess | (resp: JsonEdgyObject) => void | no       | callback function |
| onError   | (resp: Error) => void          | no       | callback function |

The type will be APP-CFG and the owner.id will be the id of current APP.

```js
const mockField = undefined
await new API().saveAppCfg({ name: 'New App-Cfg', data: {} })
```

saveMyself
--------------

It creates a new version of current App. All missing fields are took from current App

| name      | type                           | required | description                    |
|-----------|--------------------------------|----------|--------------------------------|
| obj       | JsonEdgyObject                 | yes      | the new version of current App |
| onSuccess | (resp: JsonEdgyObject) => void | no       | callback function              |
| onError   | (resp: Error) => void          | no       | callback function              |

```js
const mockField = 'AppObject'
await new API().saveMyself({data: { date: 'today' }})
```

saveObject
----------

It creates a new object

| name      | type                           | required | description       |
|-----------|--------------------------------|----------|-------------------|
| obj       | JsonEdgyObject                 | yes      | the new object    |
| onSuccess | (resp: JsonEdgyObject) => void | no       | callback function |
| onError   | (resp: Error) => void          | no       | callback function |

```js
const mockField = undefined
await new API().saveObject({ name: 'New App', type: 'MyCustomObject' })
```

updateObject
------------

It creates a new version of an object. The id of the object is took from obj.id

| name      | type                           | required | description       |
|-----------|--------------------------------|----------|-------------------|
| obj       | JsonEdgyObject                 | yes      | the new object    |
| onSuccess | (resp: JsonEdgyObject) => void | no       | callback function |
| onError   | (resp: Error) => void          | no       | callback function |

```js
const mockField = 'AnObject'
await new API().updateObject({ name: 'App Re-branded' })
```

---

## About the versioning schema used for Edgy Api

- Major - it will be increased if there are breaking changes in the code of Api.js
- Minor - it will be increased if there are added new functions in Api.js
- Patch - it will be increased if there are only bugs fixed in Api.js

---

## Changelog

### 1.0.0

- The initial release of Edgy API for μApp

### 1.1.0

- Added a function for saving an APP-CFG
