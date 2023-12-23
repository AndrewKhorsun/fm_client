/* eslint-disable @typescript-eslint/no-explicit-any */
import { isRejectedWithValue } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { Middleware } from 'redux'

export const rtkQueryErrorLogger: Middleware = () => next => action => {
	if (isRejectedWithValue(action)) {
		const errorsMessage = action.payload.data.message
		const errors = action.payload.data.errors
		if (Object.keys(errors).length !== 0) {
			for (const error in errors) {
				!!errors[error] && toast.error(errors[error])
			}
		} else {
			toast.error(errorsMessage)
		}

		console.debug(' MIDDLEWARE', action)
	}
	return next(action)
}
