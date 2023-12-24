import { NavLink } from 'react-router-dom'
import './navbar.scss'
import { Button } from '../../atoms/button/Button'
import { logOut } from '../../../redux/auth/authSlice'
import { useNavigateCustom } from '../../../hooks/useNavigateCustom'
import { useDispatch } from 'react-redux'

export const Navbar = () => {
	const dispatch = useDispatch()

	const goLogin = useNavigateCustom('/login', '/budget')

	const logOutUser = () => {
		dispatch(logOut())
		goLogin()
	}
	return (
		<nav className='navbar'>
			<div className='navbar__links'>
				<NavLink className='navbar__link' to='personal'>Personal Table</NavLink>
				<NavLink className='navbar__link' to='family'>Family Table</NavLink>
			</div>
			<Button className='navbar__button-logout' onClick={() => logOutUser()}>
				Log Out
			</Button>
		</nav>
	)
}
