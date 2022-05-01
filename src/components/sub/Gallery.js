import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Layout from '../common/Layout';
import Popup from '../common/Popup';

function Gallery() {
	const pop = useRef(null);
	const [items, setItems] = useState([]);
	const [index, setIndex] = useState(0);
	const [loading, setLoading] = useState(false);

	const api_key = '8fba436cfe2e8ae7f3a3aafcf18574c6';
	const method = 'flickr.interestingness.getList';
	const per_page = 5;
	const url = `https://www.flickr.com/services/rest/?method=${method}&api_key=${api_key}&format=json&nojsoncallback=1&per_page=${per_page}`;

	useEffect(() => {
		axios
			.get(url)
			.then((json) => {
				console.log(json.data.photos.photo);
				setItems(json.data.photos.photo);
				setLoading(true);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<>
			<Layout name={'Gallery'}>
				<ul>
					{items.map((item, idx) => {
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
				{loading && (
					<>
						<div className='pic'>
							<img
								src={`https://live.staticflickr.com/${items[index].server}/${items[index].id}_${items[index].secret}_b.jpg`}
							/>
						</div>
						<p>{items[index].title}</p>
					</>
				)}
				<span onClick={() => pop.current.close()}>close</span>
			</Popup>
		</>
	);
}

export default Gallery;
