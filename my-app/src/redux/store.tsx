import reducers from "./Reducers/Index";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
export const store = createStore(reducers, {}, applyMiddleware(thunk));
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
