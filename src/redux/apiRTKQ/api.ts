import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { BASE_URL } from '../../api/axios'
import { TypeRootState } from '../store'
import { IPersonalTable } from '../../types/personalTable'
import { getRefreshTokenFromCookie } from '../../services/getCookieValue'

export const api = createApi({
	reducerPath: 'api',
	tagTypes: ['Personal'],
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		credentials: 'include',
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as TypeRootState).auth.accessToken
			const refreshToken = getRefreshTokenFromCookie('refreshToken')
			if (token) headers.set('Authorization', `Bearer ${token}`)
			console.log('tokenR', refreshToken)
			if (refreshToken) headers.set('Refresh-Token', refreshToken)
			return headers
		}
	}),
	endpoints: builder => ({
		getTable: builder.query<IPersonalTable[], unknown>({
			query: () => `users/get-expenses`,
		}),
		
	})
})

export const { useGetTableQuery} = api
