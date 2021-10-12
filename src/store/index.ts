import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import thunk from 'redux-thunk';
import reducers from './reducers';




const rootReducer = combineReducers(reducers)


declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }
  
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
// const store = createStore(rootReducer,composeEnhancers())

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)) )

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;