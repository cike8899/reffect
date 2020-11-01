import React from "react";
import { bindActionCreators } from "redux";
import ui from "redux-ui";
import hoistNonReactStatics from "hoist-non-react-statics";
import { connect } from "react-redux";
import { Form } from "antd";
import { getDisplayName } from "utils/componentHelper";
import * as globalActions from "actions/globalActions";

const create = Form.create({});

export default model => WrappedComponent => {
  const {
    mapStateToProps = state => ({}),
    mapDispatchToProps = dispatch => ({ dispatch }),
    key,
    effects,
    reducers: reducer,
    defaultState: state
  } = model;

  // const finalMapStateToProps = state => {
  //   return { [name]: state[name], ...mapStateToProps(state) };
  // };

  const finalMapDispatchToProps = dispatch => {
    return {
      ...bindActionCreators(
        { ...effects, ...globalActions, ...mapDispatchToProps(dispatch) },
        dispatch
      )
    };
  };

  // const WrapperComponent = connect(
  //   mapStateToProps,
  //   finalMapDispatchToProps
  // )(create(ui({ state, reducer })(WrappedComponent)));

  const WrapperComponent = create(
    ui({ key, state, reducer })(
      connect(
        mapStateToProps,
        finalMapDispatchToProps
      )(WrappedComponent)
    )
  );

  class ModelConnect extends React.Component {
    static displayName = `Model(${getDisplayName(WrappedComponent)})`;
    render() {
      return <WrapperComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(ModelConnect, WrappedComponent);
};
