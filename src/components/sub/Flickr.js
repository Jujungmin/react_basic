import Layout from '../common/Layout';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';


function Flickr() {
	const frame = useRef(null);
	const [items, setItems] = useState([]);

	const fetchFlickr = async (opt) => {
		const api_key = '8fba436cfe2e8ae7f3a3aafcf18574c6';
		const method_interest = 'flickr.interestingness.getList';

		const method_search = 'flickr.photos.search';
		let url = '';

		// 인수로 전달받은 객체의 type이 interest면 interest url반환
		if (opt.type === 'interest') {
			url = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${api_key}&format=json&nojsoncallback=1&per_page=${opt.count}`;
		}
		// 인수로 전달받은 객체의 type이 search면 search url반환
		if (opt.type === 'search') {
			url = `https://www.flickr.com/services/rest/?method=${method_search}&api_key=${api_key}&format=json&nojsoncallback=1&per_page=${opt.count}&tags=${opt.tag}`;
		}

		await axios.get(url).then((json) => {
			setItems(json.data.photos.photo);
		});
		// await 데이터 호출이 완료되면 frame보임 처리
		frame.current.classList.add('on');
	};

	useEffect(() => {
		fetchFlickr();
		fetchFlickr({
			type: 'search',
			count: 100,
			tag: '바다',
		})
		// fetchFlickr({
		// 	type: 'interest',
		// 	count: 50,
		// });
	}, []);

	return (
		<Layout name={'Flickr'}>
			<button onClick={() => {
				frame.current.classList.remove('on');
				fetchFlickr({
					type: 'interest',
					count: 50,
				})
			}}>
			interest
			</button>

			<button onClick={() => {
				frame.current.classList.remove('on');
				fetchFlickr({
					type: 'search',
					count: 50,
					tag: '바다',
				})
			}}>
			search
			</button>

			<div className='frame' ref={frame}>
				{items.map((item, idx) => {
					return (
						<article key={idx}>
							<div className='inner'>
								<div className='pic'>
									<img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} />
								</div>
								<h2>{item.title}</h2>
							</div>
						</article>
					)
				})}
			</div>
		</Layout>
		)
	}

export default Flickr;