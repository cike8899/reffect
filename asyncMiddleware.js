import { isPromise } from "./helpers";

const asyncMiddleware = ({ dispatch, getState }) => next => action => {
  if (typeof action.payload === "function") {
    let { ret, trigger } = action.payload(dispatch, getState);

    if (isPromise(ret)) {
      return ret.then(
        result => {
          trigger &&
            dispatch({
              ...action,
              type: `${action.type}Success`,
              payload: result
            });
          return result;
        },
        error => {
          trigger &&
            dispatch({
              ...action,
              type: `${action.type}Failed`,
              payload: error,
              error: true
            });
          return Promise.reject(error);
        }
      );
    } else {
      trigger &&
        dispatch({ ...action, type: `${action.type}Success`, payload: ret });
      return ret;
    }
  } else {
    return next(action);
  }
};

export default asyncMiddleware;
