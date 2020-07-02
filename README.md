<p>
  <a href="https://www.npmjs.com/package/redux-actions-ts"><img alt="npm downloads" src="https://img.shields.io/npm/dm/redux-actions-ts.svg"/></a>
  <a href="https://www.npmjs.com/package/redux-actions-ts"><img alt="npm version" src="https://badge.fury.io/js/redux-actions-ts.svg"/></a>
  <a href="#hire-an-expert"><img src="https://img.shields.io/badge/%F0%9F%92%AA-hire%20an%20expert-brightgreen"/></a>
</p>

# Redux-Actions-TS

⚛️ Redux-Actions with TypeScript helper package

## How to use it?

### Create typed and async actions
```
yarn add redux-actions-ts
```

```ts
import { createAsyncActions, createTypedAction } form 'redux-actions-ts'
// async example
const {
  request: signInRequest,
  success: signInSuccess,
  failure: signInFailure,
} = createAsyncActions<Credentials, User>('SIGN_IN')

// Create your payload type somewhere
// type Credentials = { username: string, password: string }
// type User = { name: string }

// just typed action (ie. not async)
const signOut = createTypedAction<null>('SIGN_OUT')
```

### Handle actions with reducer

```ts
import { handleTypedActions, createTypedHandler } form 'redux-actions-ts'

const signIn = handleTypedActions(
  [
    createTypedHandler(signInSuccess, signInSuccessReducer),
    createTypedHandler(signInFailure, signInFailureReducer),
    createTypedHandler(signOut, signOutReducer),
  ],
  {
    user: {
      isAuthenticated: false
    }
  },
)
// later combine your reducers...
```

### Dispatch your action (with `react-redux-dispatch-async` if you will 👍 )
```tsx
import React from 'react'
import { useDispatchAsync } from 'react-redux-dispatch-async'

export default function MyUserInterface({ id }: { id: string }) {
  // 👉 pass action and arguments into the array
  const response = useDispatchAsync(getUserActionRequest, [id])

  switch (response.status) {
    case 'loading':
      return <AppLoader />
    case 'error':
      return <Text>{response.error.message}</Text>
    case 'success':
      return <User {...response.result} />
    case 'timeout':
      return <Text>{'timeout ¯\\_(ツ)_//¯'}</Text>
    case 'canceled':
      return <Text>{'canceled ¯\\_(ツ)_//¯'}</Text>
    default:
      return null
  }
}
```
👉 [react-redux-dispatch-async](https://github.com/xcarpentier/react-redux-dispatch-async)

## Local Development

Below is a list of commands you will probably find useful.

### `npm start` or `yarn start`

Runs the project in development/watch mode. Your project will be rebuilt upon changes. TSDX has a special logger for you convenience. Error messages are pretty printed and formatted for compatibility VS Code's Problems tab.

<img src="https://user-images.githubusercontent.com/4060187/52168303-574d3a00-26f6-11e9-9f3b-71dbec9ebfcb.gif" width="600" />

Your library will be rebuilt if you make edits.

### `npm run build` or `yarn build`

Bundles the package to the `dist` folder.
The package is optimized and bundled with Rollup into multiple formats (CommonJS, UMD, and ES Module).

<img src="https://user-images.githubusercontent.com/4060187/52168322-a98e5b00-26f6-11e9-8cf6-222d716b75ef.gif" width="600" />

### `npm test` or `yarn test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.

## Hire an expert!

Looking for a ReactNative freelance expert with more than 14 years of experience? Contact Xavier from his [website](https://xaviercarpentier.com)!
