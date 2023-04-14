const redux = require("redux");
const createStore = redux.createStore; // for creating the store
const bindActionCreators = redux.bindActionCreators; //helper function
const combineReducers = redux.combineReducers; // helps to combine multiple reducers
const applyMiddleware = redux.applyMiddleware; // To Apply middleware like redux-logger

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

function orderCake() {
  return {
    type: CAKE_ORDERED,
    quantity: 1,
  };
}

const restockCake = (qty = 1) => {
  return {
    type: CAKE_RESTOCKED,
    payload: qty, // payload is the convention used for any additional data or information in action
  };
};

const orderIceCream = (qty = 1) => {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
};
const restockIceCream = (qty = 1) => {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
};

// const initialState = {
//   numOfCakes: 10,
//   numOfIceCreams: 20,
// };

const initialCakeState = {
  numOfCakes: 10,
};

const initialIceCreamState = {
  numOfIceCreams: 20,
};

// ====REDUCER =====  (previousState, action) => newState

// CAKE REDUCER
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};
const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - action.payload,
      };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + action.payload,
      };
    default:
      return state;
  }
};

// ==== COMBINE REDUCER ====
// To use the combine reducer method, it must be created before the store. It accepts object, with  key-value pair, key as any name and value as each reducer

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

// ===== REDUX STORE =====
/* 
Allows access to state via getState()
Allows state to be updated via dispatch(action)
Registers listeners via subscribe(listener)... The subscribe method accepts function as its argument which is executed whenever the state in the store changes
Handles unregistering of listeners via the function returned by subscribe(listener)
*/

const store = createStore(rootReducer, applyMiddleware(logger)); // it accepts the reducer function as its parameter
console.log("Initial State", store.getState());

// const unsubscribe = store.subscribe(() =>
//   console.log("Update State", store.getState()),
// );

// ====LOGGER SUNSCRIBE ====
const unsubscribe = store.subscribe(() => {}); // logger middleware handles the subscription unlike the one commented above. It is used to keep track of state before and after action is dispatched

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(6));
const actions = bindActionCreators(
  { orderCake, restockCake, orderIceCream, restockIceCream },
  store.dispatch,
); // the first arguments are the actions, the second argument is what we want to bind it to

actions.orderCake();
actions.orderCake();
actions.restockCake(5);
actions.orderIceCream();
actions.orderIceCream(2);
actions.restockIceCream();
actions.restockIceCream(4);

unsubscribe();

/* Middleware: is the suggested way to extend Redux with custom functionality.
It provides a third-party extension point between duspatching an action, and the moment it reaches the reducer
Use middleware for logging, crash reporting, performing asynchronous tasks etc


How to use MiddleWare in Redux
Import ApplyMiddleware from redux
pass the apply middleware as argument to the store and pass the middleware installed such as redux-logger as logger as a parameter to the applyware method
const store = createStore(rootReducer, applyMiddleware(logger))
 */
