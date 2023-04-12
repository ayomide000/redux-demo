const redux = require("redux");
const produce = require("immer").produce;

const initialState = {
  name: "Gbolahan",
  address: {
    street: "123 Main St",
    city: "Boston",
    state: "MA",
  },
};

const STREET_UPDATED = "STREET_UPDATED";
const updateStreet = (street) => {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      //   return {
      //     ...state,
      //     address: {
      //       ...state.address,
      //       street: action.payload,
      //     },
      //   };

      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });
    // produce accepts two arguments. The first argument is the state and the second argument is a function which receives a draft copy of the state
    // Immer allows us to update state as if it is mutable (i.e can be changed)

    default: {
      return state;
    }
  }
};

const store = redux.createStore(reducer);
console.log("Initial State ", store.getState());

const unsubscribe = store.subscribe(() => {
  console.log("Updated State ", store.getState());
});

store.dispatch(updateStreet("456 Main St"));
unsubscribe();
