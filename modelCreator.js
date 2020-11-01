import { bindActionCreators } from "redux";
import { createActions, handleActions, createAction } from "redux-actions";
import { push } from "react-router-redux";
import { mapKeys, get } from "lodash";
import message from "./message";

let prefix = "@reffect";

const showLoading = dispatch => () => {
  dispatch(createAction("SET_GLOBAL_LOADING")(true));
};

const hideLoading = dispatch => () => {
  dispatch(createAction("SET_GLOBAL_LOADING")(false));
};

const commit = dispatch => (type, payload) => {
  dispatch(createAction(`${prefix}/${type}Success`)(payload));
};

function createEffectsContext(dispatch, getState, actions) {
  return {
    dispatch,
    getState,
    showLoading: showLoading(dispatch),
    hideLoading: hideLoading(dispatch),
    commit: commit(dispatch),
    ...message,
    push: (...params) => dispatch(push(...params)),
    ...bindActionCreators(getActionsWithReduxActions(actions), dispatch)
  };
}

function bindContextToActions(effects, reducers = {}) {
  const actions = {};

  Object.keys(effects).forEach(function(key) {
    const action = effects[key];
    //ui里调用的函数
    actions[key] = function(...args) {
      // middleware调用的函数
      return function(dispatch, getState) {
        const metaItem = args.find(
          x =>
            typeof x === "object" && get(x, ["meta", "trigger"]) !== undefined
        );

        let trigger = true;

        if (metaItem) {
          trigger = metaItem.meta.trigger;
        }

        if (!(key in reducers)) {
          //没有对应reducer，就不触发dispatch
          trigger = false;
        }

        return {
          trigger,
          ret: action.apply(
            createEffectsContext(dispatch, getState, actions),
            args
          )
        };
      };
    };
  });

  return actions;
}

function getActionsWithReduxActions(actions) {
  return createActions(actions, { prefix });
}

const modelCreator = ({
  effects,
  reducers,
  state: defaultState,
  name,
  key,
  mapStateToProps = state => ({}),
  mapDispatchToProps = dispatch => ({ dispatch })
}) => {
  let actions;

  if (typeof effects === "object") {
    actions = bindContextToActions(effects, reducers);
    actions = getActionsWithReduxActions(actions);
  }

  reducers = mapKeys(reducers, (value, key) => `${prefix}/${key}Success`);

  reducers = handleActions(reducers, defaultState);

  return {
    name,
    key,
    defaultState,
    effects: actions,
    reducers,
    mapStateToProps,
    mapDispatchToProps
  };
};

export default modelCreator;
