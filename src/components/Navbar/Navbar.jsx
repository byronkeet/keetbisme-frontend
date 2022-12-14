import React, { useState } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';

import logo from '../../assets/logo.png';
import './Navbar.scss';

const menuItems = ['home', 'about', 'work', 'skills', 'contact'];

const Navbar = () => {
	const [mobileMenu, setMobileMenu] = useState(false);

	return (
		<nav className='app__navbar'>
			<div className='app__navbar-logo'>
				<img src={logo} alt='logo' />
			</div>
			<ul className='app__navbar-links'>
				{menuItems.map((item) => (
					<li className='app__flex p-text' key={`link-${item}`}>
						<div />
						<a href={`#${item}`}>{item}</a>
					</li>
				))}
			</ul>

			<div className='app__navbar-mobile-menu'>
				<HiMenuAlt4 onClick={() => setMobileMenu(true)} />
				{mobileMenu && (
					<motion.div
						whileInView={{ x: [300, 0] }}
						transition={{ duration: 0.85, ease: 'easeOut' }}
					>
						<HiX onClick={() => setMobileMenu(false)} />
						<ul>
							{menuItems.map((item) => (
								<li key={item}>
									<a href={`#${item}`} onClick={() => setMobileMenu(false)}>{item}</a>
								</li>
							))}
						</ul>
					</motion.div>
				)}
			</div>
		</nav>
	)
}

export default Navbar;