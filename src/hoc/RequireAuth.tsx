import { ReactNode } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { toast } from 'react-toastify'

interface Props {
	children: ReactNode
}

export const RequireAuth = ({ children }: Props) => {
	const location = useLocation()
	const isAuth = useAuth()

	if (!isAuth) {
		toast.error('Please authorize')
		return <Navigate to='/login' state={{ from: location }} />
	}

	return children
}
