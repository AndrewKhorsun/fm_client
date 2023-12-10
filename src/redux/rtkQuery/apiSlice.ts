/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	BaseQueryApi,
	FetchArgs,
	createApi,
	fetchBaseQuery
} from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../auth/authSlice'
import { TypeRootState } from '../store'

export interface CustomBaseQueryApi extends Omit<BaseQueryApi, 'getState'> {
	getState: () => TypeRootState
}

export const BASE_URL = import.meta.env.VITE_APP_API_URL

const baseQuery = fetchBaseQuery({
	baseUrl: BASE_URL,
	credentials: 'include',
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as TypeRootState).auth.accessToken
		if (token) {
			headers.set('authorization', `Bearer ${token}`)
		}
		return headers
	}
})

const baseQueryWithReauth = async (
	args: string | FetchArgs,
	api: BaseQueryApi,
	extraOptions: object
) => {
	let result = await baseQuery(args, api, extraOptions)

	if (result?.error?.status === 401) {
		console.log('sending refresh token')

		const refreshResult = await baseQuery('/refresh', api, extraOptions)
		console.log(refreshResult)
		if (refreshResult?.data) {
			const getState = api.getState() as TypeRootState
			const user = getState.auth.user

			api.dispatch(setCredentials({ ...refreshResult.data, user }))

			result = await baseQuery(args, api, extraOptions)
		} else {
			api.dispatch(logOut())
		}
	}

	return result
}

export const apiSlice = createApi({
	baseQuery: baseQueryWithReauth,
	endpoints: builder => ({})
})
