import { Routes, Route } from 'react-router-dom'
import { FC } from 'react'
import { Layout } from './pages/LayoutPage/Layout'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { RequireAuth } from './hoc/RequireAuth'
import { PersonalTablePage } from './pages/PersonalTable/PersonalTable'

export const App: FC = () => {
	return (
		<Routes>
			<Route path='/login' element={<LoginPage />} />
			<Route
				path='/'
				element={
					<RequireAuth>
						<Layout />
					</RequireAuth>
				}
			>
				<Route index element={<PersonalTablePage />} />
				<Route path='family' element={<h1>Family</h1>} />
				<Route path='*' element={<h1>NOT FOUND</h1>} />
			</Route>
		</Routes>
	)
}
