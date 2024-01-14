import { IPersonalTable, IUpdateTable } from '../../types/personalTable'
import { apiSlice } from './apiSlice'

export const personalTableSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getTable: builder.query<IPersonalTable[], unknown>({
			query: (startDate: string) => {
				console.log('QUERY', startDate)

				return `users/get-expenses/?startDate=${startDate}`
			},
			keepUnusedDataFor: 5
		}),
		updateTable: builder.mutation<IUpdateTable, unknown>({
			query: credentials => ({
				url: 'users/update-expenses',
				method: 'POST',
				body: credentials
			})
		})
	})
})

export const { useGetTableQuery, useUpdateTableMutation } = personalTableSlice
