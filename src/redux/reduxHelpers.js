export function getAsyncActionTypes (actionName) {
  return {
    START: actionName,
    REQUEST: `${actionName}_REQUEST`,
    SUCCESS: `${actionName}_SUCCESS`,
    FAILURE: `${actionName}_FAILURE`
  }
}
