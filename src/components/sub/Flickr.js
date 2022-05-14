import Layout from '../common/Layout';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-component';
const path = process.env.PUBLIC_URL;

function Flickr() {
	const frame = useRef(null);
	const [items, setItems] = useState([]);
	const [loading, setLoding] = useState(true);
	
	const masonryOptions = {
		transitionDuration: '0.5s',
	};

	const fetchFlickr = async (opt) => {
		const api_key = '8fba436cfe2e8ae7f3a3aafcf18574c6';
		const method_interest = 'flickr.interestingness.getList';

		const method_search = 'flickr.photos.search';
		let url = '';

		if (opt.type === 'interest') {
			url = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${api_key}&format=json&nojsoncallback=1&per_page=${opt.count}`;
		}
		if (opt.type === 'search') {
			url = `https://www.flickr.com/services/rest/?method=${method_search}&api_key=${api_key}&format=json&nojsoncallback=1&per_page=${opt.count}&tags=${opt.tag}`;
		}

		await axios.get(url).then((json) => {
			setItems(json.data.photos.photo);
		});

		setTimeout(() => {
			frame.current.classList.add('on');
			setLoding(false);
		}, 1000);
	};

	useEffect(() => {
		fetchFlickr({
			type: 'interest',
			count: 100,
		})
	}, []);

	return (
		<Layout name={'Flickr'}>
			<button onClick={() => {
				setLoding(true);
				frame.current.classList.remove('on');
				fetchFlickr({
					type: 'interest',
					count: 50,
				})
			}}>
			interest
			</button>

			<button onClick={() => {
				setLoding(true);
				frame.current.classList.remove('on');
				fetchFlickr({
					type: 'search',
					count: 50,
					tag: '바다',
				})
			}}>
			search
			</button>

			{loading ? (
				<img src={path + '/img/loading.gif'} className='loading' /> 
			) : null}

			<div className='frame' ref={frame}>
				<Masonry elementType={'div'} options={masonryOptions}>
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
				</Masonry>
			</div>
		</Layout>
		)
	}

export default Flickr;