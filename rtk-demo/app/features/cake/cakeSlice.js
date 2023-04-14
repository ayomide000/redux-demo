const createSlice = require("@reduxjs/toolkit").createSlice;

const initialState = {
  numOfCakes: 10,
};

const cakeSlice = createSlice({
  name: "cake",
  initialState, // using only one initialState but it has the same key-value name
  reducers: {
    ordered: (state) => {
      state.numOfCakes--;
    }, // ordered(key) is a function which receives state and action as argument
    restocked: (state, action) => {
      state.numOfCakes += action.payload;
    },
  },
}); //create slice accept object as an argument, and it specifies three properties

module.exports = cakeSlice.reducer;
module.exports.cakeActions = cakeSlice.actions;
