import { IPersonalTable } from '../../types/personalTable'
import { apiSlice } from './apiSlice'

export const personalTableSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getTable: builder.query<IPersonalTable[], unknown>({
			query: () => 'users/get-expenses',
			keepUnusedDataFor: 5
		})
	})
})

export const { useGetTableQuery } = personalTableSlice
