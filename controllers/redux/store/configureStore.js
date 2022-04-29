import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import { persistStore, persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
    return {
        getItem(_key) {
            return Promise.resolve(null);
        },
        setItem(_key, value) {
            return Promise.resolve(value);
        },
        removeItem(_key) {
            return Promise.resolve();
        },
    };
};
const storageReduxPersist =
  typeof window === "undefined" ? createNoopStorage() : createWebStorage();

const middleWare = [thunk]

const persistConfig = {
    key: 'root',
    storage: storageReduxPersist,
    stateReconciler: autoMergeLevel2
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

// user redux tools
let window = require('global/window');
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(...middleWare)))
const persistor = persistStore(store)

export { store, persistor }