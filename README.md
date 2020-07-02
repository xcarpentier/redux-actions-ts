# Redux-Actions-TS

⚛️ Redux-Actions with TypeScript helper package

## How to use it?

### Create typed and async actions

```ts
const {
  request: signInRequest,
  success: signInSuccess,
  failure: signInFailure,
} = createAsyncActions<Credentials, User>('SIGN_IN')

// Create your payload type somewhere
// type Credentials = { username: string, password: string }
// type User = { name: string }


const signOut = createTypedAction<null>('SIGN_OUT')
```

### Handle actions with reducer

```ts
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
// later combine your reducer
```

### Dispatch your action (with react-redux-dispatch-async if you will 👍 )
```tsx
import React from 'react'
import { useDispatchAsync } from 'react-redux-dispatch-async'

export default function MyUserInterface({ credential }: { credential: Credential }) {
  // 👉 pass action and arguments into the array
  const { status, result, error } = useDispatchAsync(signInRequest, [credential])

  switch (status) {
    case 'loading':
      return <AppLoader />
    case 'error':
      return <Text>{error.message}</Text>
    case 'success':
      return <User {...result} />
    case 'timeout':
      return <Text>{'timeout ¯\\_(ツ)_//¯'}</Text>
    case 'canceled':
      return <Text>{'canceled ¯\\_(ツ)_//¯'}</Text>
    default:
      return null
  }
}
```

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