import { ReactNode } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

interface Props {
	children: ReactNode
}

export const RequireAuth = ({ children }: Props) => {
	const location = useLocation()
	const isAuth = useAuth()

	if (!isAuth) {
		return <Navigate to='/login' state={{ from: location }} />
	}

	return children
}
