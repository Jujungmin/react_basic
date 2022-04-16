import { useEffect, useRef } from 'react'


function Layout(props) {
	const frame = useRef(null);

	useEffect(() => {
		frame.current.classList.add('on');
	}, [])
	return (
		<section ref={frame}>
			<div className="inner">
				<h1>Title</h1>
				{props.children}
			</div>
		</section>
	)
}

export default Layout;