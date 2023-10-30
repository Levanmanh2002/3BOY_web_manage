import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import userSlice from './userSlice';
import roomSlice from './roomSlice';

const persistConfig = {
  key: 'rootReducerConfig',
  storage,
  whitelist: ['user', 'room'],
  stateReconciler: hardSet,
};

const rootReducer = combineReducers({
    user: userSlice,
    room: roomSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  }),
];

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

export const persistor = persistStore(store);

export default store;
