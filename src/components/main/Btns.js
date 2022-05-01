import React from 'react';

function Btns({ setIndex }) {
	return (
		<ul className='btns'>
			<li className='on' onClick={() => setIndex(0)}></li>
			<li onClick={() => setIndex(1)}></li>
			<li onClick={() => setIndex(2)}></li>
			<li onClick={() => setIndex(3)}></li>
		</ul>
	);
}

export default Btns;
