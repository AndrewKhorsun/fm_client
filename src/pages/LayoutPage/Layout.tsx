import { Outlet } from 'react-router-dom'
import './layoutPage.scss'
import { Navbar } from '../../components/organism/Navbar/Navbar'

export const Layout = () => {
	return (
		<main className='layout'>
			<aside className='layout__navbar'>
				<Navbar />
			</aside>
			<section className='layout__content'>
				<Outlet />
			</section>
		</main>
	)
}
