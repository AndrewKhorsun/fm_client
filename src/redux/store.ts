import { configureStore } from '@reduxjs/toolkit'

import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistReducer
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { rootReducer } from './root-reducer'
import persistStore from 'redux-persist/es/persistStore'
import { rtkQueryErrorLogger } from './middlewares/error.middleware'
import { api } from './apiRTKQ/api'

const persistConfig = {
	key: 'accessToken',
	storage,
	whiteList: ['auth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		})
			.concat(api.middleware)
			.concat(rtkQueryErrorLogger)
})

export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch
export type TypeRootState = ReturnType<typeof rootReducer>
