import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import './layoutPage.scss'
import { useDispatch } from 'react-redux'
import { logOut } from '../../redux/auth/authSlice'

export const Layout = () => {
	const dispatch = useDispatch()

	return (
		<div className='layout'>
			<header className='header'>
				<div>LOGO</div>
				<nav className='nav-bar'>
					<NavLink to='..'>Personal Table</NavLink>
					<NavLink to='family'>Family Table</NavLink>
				</nav>
				<button onClick={() => dispatch(logOut())}>Log Out</button>
			</header>

			<main>
				<Outlet />
			</main>

			<footer className='footer'>Family money</footer>
		</div>
	)
}
