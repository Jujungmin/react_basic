import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Layout from '../common/Layout';

function Gallery() {
	const [items, setItems] = useState([]);
	const [isPop, setIsPop] = useState(false);
	const [index, setIndex] = useState(0);

	const api_key = '8fba436cfe2e8ae7f3a3aafcf18574c6';
	const method = 'flickr.interestingness.getList';
	const per_page = 5;
	const url = `https://www.flickr.com/services/rest/?method=${method}&api_key=${api_key}&format=json&nojsoncallback=1&per_page=${per_page}`;

	useEffect(() => {
		axios
			.get(url)
			.then((json) => {
				// console.log(json.data.photos.photo);
				setItems(json.data.photos.photo);
			})
			.catch((err) => {
				// console.log(err);
			});
	}, []);

	return (
		<Layout name={'Gallery'}>
			<ul>
				{items.map((item, idx) => {
					return (
						<li
							key={idx}
							onClick={() => {
								setIsPop(!isPop);
								setIndex(idx);
							}}
						>
							<img
								src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
								/>
								<h2>{item.title}</h2>
						</li>
					);
				})}
			</ul>
			{/* isPop이 true일 때 팝업출력 */}
		{isPop ? <Popup /> : null}
		</Layout>
	);

	function Popup() {
		useEffect(() => {
			document.body.style.overflow = 'hidden';
			return  () => document.body.style.ovlerflow = 'auto';
		}, []);

		return (
			<aside className='popup'>
				<div className='pic'>
					<img src={`https://live.staticflickr.com/${items[index].server}/${items[index].id}_${items[index].secret}_b.jpg`} />
				</div>
				<p>{items[index].title}</p>
				<span onClick={() => setIsPop(!isPop)}>close</span>
			</aside>
		)
	}
}

export default Gallery