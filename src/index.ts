import {
  Action,
  ActionFunction1,
  createAction,
  handleAction,
  Reducer,
} from 'redux-actions'

export type TypedAction<Payload> = ActionFunction1<Payload, Action<Payload>>

interface AsyncActions<RequestPayload, SuccessPayload, FailurePayload> {
  cancelable: false
  request: TypedAction<RequestPayload>
  success: TypedAction<SuccessPayload>
  failure: TypedAction<FailurePayload>
}

interface AsyncCancelableActions<
  RequestPayload,
  SuccessPayload,
  FailurePayload,
  CancelPayload
> {
  cancelable: true
  request: TypedAction<RequestPayload>
  success: TypedAction<SuccessPayload>
  failure: TypedAction<FailurePayload>
  cancel: TypedAction<CancelPayload>
}

type AsyncTypedActions<
  RequestPayload,
  SuccessPayload,
  FailurePayload,
  CancelPayload = any
> =
  | AsyncActions<RequestPayload, SuccessPayload, FailurePayload>
  | AsyncCancelableActions<
      RequestPayload,
      SuccessPayload,
      FailurePayload,
      CancelPayload
    >

export function createTypedAction<Payload>(
  actionType: string,
): TypedAction<Payload> {
  return createAction<Payload>(actionType)
}

export function createAsyncActions<
  RequestPayload,
  SuccessPayload,
  FailurePayload = Error,
  CancelPayload = any
>(
  actionType: string,
  options: { cancelable: boolean } = { cancelable: false },
): AsyncTypedActions<
  RequestPayload,
  SuccessPayload,
  FailurePayload,
  CancelPayload
> {
  if (options.cancelable) {
    return {
      cancelable: true,
      request: createAction<RequestPayload>(`${actionType}_REQUEST`),
      success: createAction<SuccessPayload>(`${actionType}_SUCCESS`),
      failure: createAction<FailurePayload>(`${actionType}_FAILURE`),
      cancel: createAction<CancelPayload>(`${actionType}_CANCEL`),
    }
  }
  return {
    cancelable: false,
    request: createAction<RequestPayload>(`${actionType}_REQUEST`),
    success: createAction<SuccessPayload>(`${actionType}_SUCCESS`),
    failure: createAction<FailurePayload>(`${actionType}_FAILURE`),
  }
}

interface TypedActionHandler<State, Payload> {
  action: TypedAction<Payload>
  reducer: Reducer<State, Payload>
}

export function createTypedHandler<State, Payload>(
  action: TypedAction<Payload>,
  reducer: Reducer<State, Payload>,
) {
  return {
    action,
    reducer,
  }
}

export function handleTypedAction<State, Payload>(
  handler: TypedActionHandler<State, Payload>,
  defaultState: State,
): Reducer<State, Payload> {
  return handleAction<State, Payload>(
    handler.action.toString(),
    handler.reducer,
    defaultState,
  )
}

export function handleTypedActions<State>(
  handlers: TypedActionHandler<State, any>[],
  defaultState: State,
): Reducer<any, Action<any>> {
  // Create a reducer for each action handler
  const reducers: Reducer<State, any>[] = handlers.map(handler => {
    return handleTypedAction(handler, defaultState)
  })
  // Combine all reducers to reduce the same (state/action)
  return (state: State, action: Action<any>) => {
    return reducers.reduce((currentState, reducer) => {
      return reducer(currentState, action)
    }, state)
  }
}
