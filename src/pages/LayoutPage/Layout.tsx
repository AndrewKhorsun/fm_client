import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { test } from '../../components/test'
import './layoutPage.scss'

export const Layout = () => {
	return (
		<div className='layout'>
			<header className='header'>
				<div>LOGO</div>
				<nav className='nav-bar'>
					<NavLink to='..'>Personal Table</NavLink>
					<NavLink to='family'>Family Table</NavLink>
				</nav>
				<button>Log Out</button>
			</header>

			<main>
				<Outlet />
			</main>

			<footer className='footer'>Family money</footer>
		</div>
	)
}
