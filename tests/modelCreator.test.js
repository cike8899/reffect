import modelCreator from "../modelCreator";
import model from "./mocks/model";

describe("modelCreator.test", () => {
  const modelWrap = modelCreator(model);
  it("get wrapped data", () => {
    expect(modelWrap).toEqual({
      name: "test",
      effects: { getAppList: () => {} },
      defaultState: { list: [] },
      reducers: () => {},
      mapStateToProps: () => {},
      mapDispatchToProps: () => {}
    });
  });

  it("reducer data", () => {
    expect(
      modelWrap.reducers(
        { list: [] },
        {
          type: "@reffect/getAppList_SUCCESS",
          payload: { list: ["geek"] }
        }
      )
    ).toEqual({ list: ["geek"] });
  });
});
