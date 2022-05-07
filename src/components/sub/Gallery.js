import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../common/Layout';
import Popup from '../common/Popup';

function Gallery() {
	const pop = useRef(null);
	const [index, setIndex] = useState(0);
	const flickr = useSelector((store) => store.flickrReducer.flickr);

	return (
		<>
			<Layout name={'Gallery'}>
				<ul>
					{flickr.map((item, idx) => {
						return (
							<li
								key={idx}
								onClick={() => {
									pop.current.open();
									setIndex(idx);
								}}>
								<img
									src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
								/>
								<h2>{item.title}</h2>
							</li>
						);
					})}
				</ul>
			</Layout>

			<Popup ref={pop}>
				{flickr.length !== 0 && (
					<>
						<div className='pic'>
							<img
								src={`https://live.staticflickr.com/${flickr[index].server}/${flickr[index].id}_${flickr[index].secret}_b.jpg`}
							/>
						</div>
						<p>{flickr[index].title}</p>
					</>
				)}
				<span onClick={() => pop.current.close()}>close</span>
			</Popup>
		</>
	);
}

export default Gallery;
