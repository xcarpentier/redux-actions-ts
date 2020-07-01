import {
  createAsyncActions,
  createTypedAction,
  createTypedHandler,
  handleTypedAction,
} from '../src'

describe('redux-actions-ts', () => {
  it('should create a typed actions', () => {
    expect(createTypedAction<string>('TEST')('payload')).toEqual({
      type: 'TEST',
      payload: 'payload',
    })
  })
  it('should create async typed actions', () => {
    const { request, success, failure } = createAsyncActions<string, string>(
      'TEST',
    )
    expect(request('payload')).toEqual({
      type: 'TEST_REQUEST',
      payload: 'payload',
    })
    expect(success('payload')).toEqual({
      type: 'TEST_SUCCESS',
      payload: 'payload',
    })
    expect(failure(new Error('error'))).toEqual({
      type: 'TEST_FAILURE',
      payload: new Error('error'),
      error: true,
    })
  })
  it('should create async typed cancelable actions ', () => {
    const actions = createAsyncActions<string, string>('TEST', {
      cancelable: true,
    })
    if (actions.cancelable) {
      const { request, failure, success } = actions
      const { cancel } = actions
      expect(request('payload')).toEqual({
        type: 'TEST_REQUEST',
        payload: 'payload',
      })
      expect(success('payload')).toEqual({
        type: 'TEST_SUCCESS',
        payload: 'payload',
      })
      expect(failure(new Error('error'))).toEqual({
        type: 'TEST_FAILURE',
        payload: new Error('error'),
        error: true,
      })
      expect(cancel(null)).toEqual({
        type: 'TEST_CANCEL',
        payload: null,
      })
    }
  })
  it('should create type handler', () => {
    const action = createTypedAction<string>('TEST')
    const handler = createTypedHandler<{}, string>(action, (state, action) => ({
      ...state,
      value: action.payload,
    }))
    expect(handler.action('test')).toEqual({ type: 'TEST', payload: 'test' })
    expect(handler.reducer({}, action('test2'))).toEqual({ value: 'test2' })
  })
  it('should handleTypedAction type action', () => {
    const action = createTypedAction<string>('TEST')
    const handler = createTypedHandler<{}, string>(action, (state, action) => ({
      ...state,
      value: action.payload,
    }))

    expect(handleTypedAction(handler, {})({}, action('toto'))).toEqual({
      value: 'toto',
    })
  })
})
