import { createActions, handleActions } from "redux-actions";

const defaultState = {
  counter: 10,
  name: "geek"
};

const { increment, decrement } = createActions({
  INCREMENT: (amount = 1) => ({ amount: amount + 5 }),
  DECREMENT: (amount = 1) => ({ amount: -amount })
});

const reducer = handleActions(
  {
    [increment]: (state, { payload: { amount } }) => {
      return { ...state, counter: state.counter + amount };
    },
    [decrement]: (state, { payload: { amount } }) => {
      return { ...state, counter: state.counter + amount };
    }
  },
  defaultState
);

describe("pure actions", () => {
  it("handle pure actions", () => {
    expect(
      reducer({ counter: 5 }, { type: "INCREMENT", payload: { amount: 100 } })
    ).toEqual({ counter: 105 });
  });
});
