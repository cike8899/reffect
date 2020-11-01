import { createActions, handleActions } from "redux-actions";

const options = { prefix: "@redux" };

const actions = createActions(
  {
    INCREMENT: (amount = 1) => ({ amount }),
    decrementGeek: async (amount = 1) => ({ amount: -amount })
  },
  options
);

const { increment, decrementGeek } = actions;

const reducer = handleActions(
  {
    [increment]: (state, { payload: { amount } }) => {
      return { ...state, counter: state.counter + amount };
    }, // 使用函数名 或者带有prefix的字符串
    "@redux/decrementGeek_SUCCESS": (state, { payload: { amount } }) => {
      return { ...state, counter: state.counter + amount };
    }
  },
  { counter: 0 }
);

describe("redux-actions", () => {
  it("createActions", () => {
    expect(increment()).toEqual({
      type: "@redux/INCREMENT",
      payload: { amount: 1 }
    });

    expect(decrementGeek()).toEqual({
      type: "@redux/decrementGeek",
      payload: new Promise(() => {})
    });
  });

  it("handle actions", () => {
    expect(
      reducer(
        { counter: 0 },
        {
          type: "@redux/INCREMENT",
          payload: { amount: 1 }
        }
      )
    ).toEqual({ counter: 1 });

    expect(
      reducer(
        { counter: 0 },
        {
          type: "@redux/decrementGeek_SUCCESS",
          payload: { amount: 1 }
        }
      )
    ).toEqual({ counter: 1 });
  });
});
