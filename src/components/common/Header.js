import React from 'react'

import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Header(props) {
	// console.log(props.type);

	const active = {color: 'hotpink'};
	return (
		<header className={props.type}>
			<h1><NavLink activeStyle={active} exact to='/'>LOGO</NavLink></h1>

			<ul className='gnb'>
				<li>
					<NavLink activeStyle={active} to='/Department'>Department</NavLink>
				</li>
				<li>
					<NavLink activeStyle={active} to='/gallery'>Gallery</NavLink>
				</li>
				<li>
					<NavLink activeStyle={active} to='/youtube'>Youtube</NavLink>
				</li>
				<li>
					<NavLink activeStyle={active} to='/location'>Location</NavLink>
				</li>
			</ul>

			<p className='menu'>
				<FontAwesomeIcon icon={faBars} />
			</p>
		</header>
	)
}

export default Header;