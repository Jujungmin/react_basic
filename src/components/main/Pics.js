import React, { useRef } from 'react';

function Pics() {
	const box = useRef(null);
	return (
		<section id='pics' className='myScroll'>
			<h1>Recent Gallery</h1>

			<div id='box' ref={box}></div>
		</section>
	);
}

export default Pics;
