import { useEffect, useRef } from 'react'


function Layout(props) {
	const frame = useRef(null);

	useEffect(() => {
		frame.current.classList.add('on');
	}, [])
	return (
		<section ref={frame} className={props.name}>
			<div className="inner">
				<h1>{props.name}</h1>
				{/* 해당 컴포넌트의 자삭요소를 호출 */}
				{props.children}
			</div>
		</section>
	)
}

export default Layout;