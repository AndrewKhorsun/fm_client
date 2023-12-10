/* eslint-disable @typescript-eslint/no-explicit-any */
import { isRejectedWithValue } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { Middleware } from 'redux'

export const rtkQueryErrorLogger: Middleware = () => next => action => {
	if (isRejectedWithValue(action)) {
		toast.error(action.payload.data.message)

		console.log(action)
	}
	return next(action)
}
