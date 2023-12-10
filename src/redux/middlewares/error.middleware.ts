/* eslint-disable @typescript-eslint/no-explicit-any */
import { isRejectedWithValue } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { Middleware, Dispatch } from 'redux'
import { refresh } from '../auth/auth.actions'

export const rtkQueryErrorLogger: Middleware = api => next => action => {
	if (isRejectedWithValue(action) && action.payload.status === 401) {
		(api.dispatch as Dispatch<any>)(refresh())
		console.log(action)

		return next(action)
	} else if (action.error instanceof Error) {
		toast.error(action.error.massage)
	}

	return next(action)
}
