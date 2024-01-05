import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import agentReducer from './agentSlice'
import CustomerReducer from './customerSlice'
import NotificatinReducer from './notificationsSlice';
import SocketReducer from './socket/socketslice'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};
const rootReducer = combineReducers({ auth: authReducer ,agent :agentReducer ,customer :CustomerReducer ,notification:NotificatinReducer ,socket:SocketReducer});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        //    serializableCheck: false,
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),


    devTools: process.env.NODE_ENV !== 'production',
});

export let persistor = persistStore(store);

