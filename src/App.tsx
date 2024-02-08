import { Routes, Route, Navigate } from 'react-router-dom'
import { FC } from 'react'
import { Layout } from './pages/LayoutPage/Layout'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { RequireAuth } from './hoc/RequireAuth'
import { PersonalTablePage } from './pages/PersonalTable/PersonalTable'
import { ActivationPage } from './pages/ActivatePage/ActivationPage'
import './global.scss'

export const App: FC = () => {
	return (
		<Routes>
			<Route path='/login' element={<LoginPage />} />
			<Route path='/activate/:key' element={<ActivationPage />} />
			<Route
				path='/budget'
				element={
					<RequireAuth>
						<Layout />
					</RequireAuth>
				}
			>
				<Route index element={<Navigate to='personal' />} />
				<Route path='personal' element={<PersonalTablePage />} />
				<Route path='family' element={<h1>Family table still in development ...</h1>} />
			</Route>
			<Route path='*' element={<Navigate to='/login' />} />
		</Routes>
	)
}
