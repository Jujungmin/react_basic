import { useRef, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Menu from './Menu';

function Header(props) {
	let active = null;
	props.type === 'main'
		? (active = { color: '#fff' })
		: (active = { color: 'aqua' });

		const menu = useRef(null);
		const [toggle, setToggle] = useState(false);

		const handleResize = () => {
			const wid = window.innerWidth;
			if (wid >= 1180) setToggle(false);
		};

		useEffect(() => {
			window.addEventListener('resize', handleResize);
			return () => window.removeEventListener('resize', handleResize);
		}, []);

		useEffect(() => {
			toggle ? menu.current.open() : menu.current.close();
		}, [toggle]);

	return (
		<>
			<header className={props.type}>
				<h1>
					<NavLink activeStyle={active} exact to='/'>
						LOGO
					</NavLink>
				</h1>

				<ul className='gnb'>
					<li>
						<NavLink activeStyle={active} to='/department'>
							Department
						</NavLink>
					</li>
					<li>
						<NavLink activeStyle={active} to='/community'>
							Community
						</NavLink>
					</li>
					<li>
						<NavLink activeStyle={active} to='/flickr'>
							Flickr
						</NavLink>
					</li>
					<li>
						<NavLink activeStyle={active} to='/youtube'>
							Youtube
						</NavLink>
					</li>
					<li>
						<NavLink activeStyle={active} to='/location'>
							Location
						</NavLink>
					</li>
					<li>
						<NavLink activeStyle={active} to='/join'>
							Join
						</NavLink>
					</li>
				</ul>

				<p className='menu' onClick={() => {
					setToggle(!toggle);
				}}>
					<FontAwesomeIcon icon={faBars} />
				</p>
			</header>

			<Menu ref={menu} toggle={toggle} setToggle={setToggle} />
		</>
	);
}

export default Header;
