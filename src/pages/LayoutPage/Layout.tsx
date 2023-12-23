import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import './layoutPage.scss'
import { useDispatch } from 'react-redux'
import { logOut } from '../../redux/auth/authSlice'
import { useNavigateCustom } from '../../hooks/useNavigateCustom'
import { Button } from '../../components/atoms/button/Button'

export const Layout = () => {
	const dispatch = useDispatch()

	const goLogin = useNavigateCustom('/login', '/budget')

	const logOutUser = () => {
		dispatch(logOut())
		goLogin()
	}

	return (
		<div className='layout'>
			<header className='header'>
				<div>LOGO</div>
				<nav className='nav-bar'>
					<NavLink to='personal'>Personal Table</NavLink>
					<NavLink to='family'>Family Table</NavLink>
				</nav>
				<Button className='header__button-logout' onClick={() => logOutUser()}>Log Out</Button>
			</header>

			<main>
				<Outlet />
			</main>

			<footer className='footer'>Family money</footer>
		</div>
	)
}
