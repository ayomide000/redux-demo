const configureStore = require("@reduxjs/toolkit").configureStore;
const reduxLogger = require("redux-logger");
const cakeReducer = require("./features/cake/cakeSlice");
const icecreamReducer = require("./features/icecream/icecreamSlice");

const logger = reduxLogger.createLogger(); // to use it, we specify middleware after reducer in configure store

const store = configureStore({
  reducer: {
    cake: cakeReducer,
    icecream: icecreamReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

module.exports = store;
