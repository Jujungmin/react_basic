import Layout from '../common/Layout';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-component';
const path = process.env.PUBLIC_URL;

function Flickr() {
	const frame = useRef(null);
	const input = useRef(null);
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [enableClick, setEnableClick] = useState(true);
	
	const masonryOptions = {
		transitionDuration: '0.5s',
	};

	const fetchFlickr = async (opt) => {
		const api_key = '8fba436cfe2e8ae7f3a3aafcf18574c6';
		const method_interest = 'flickr.interestingness.getList';
		const method_search = 'flickr.photos.search';
		const method_user = 'flickr.people.getPhotos';
		let url = '';

		if (opt.type === 'interest') {
			url = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${api_key}&format=json&nojsoncallback=1&per_page=${opt.count}`;
		}
		if (opt.type === 'search') {
			url = `https://www.flickr.com/services/rest/?method=${method_search}&api_key=${api_key}&format=json&nojsoncallback=1&per_page=${opt.count}&tags=${opt.tag}`;
		}
		if (opt.type === 'user') {
			url = `https://www.flickr.com/services/rest/?method=${method_user}&api_key=${api_key}&format=json&nojsoncallback=1&per_page=${opt.count}&user_id=${opt.user}`;
		}

		await axios.get(url).then((json) => {
			if(json.data.photos.photo.length === 0) {
				alert('해당 검색어의 이미지가 없습니다');
				return;
			}
			setItems(json.data.photos.photo);
		});

		setTimeout(() => {
			frame.current.classList.add('on');
			setLoading(false);
			setTimeout(() => setEnableClick(true), 1000);
		}, 1000);
	};

	const showInterest = () => {
		if(enableClick) {
			setEnableClick(false);
			setLoading(true);
			frame.current.classList.remove('on');
			fetchFlickr({
				type: 'interest',
				count: 50,
			})
		}
	};

	const showSearch = () => {
		const tag = input.current.value.trim();
		if(!tag) {
			alert('검색어를 입력하세요');
			return;
		}
		input.current.value = '';

		if(enableClick) {
			setEnableClick(false);
			setLoading(true);
			frame.current.classList.remove('on');

			fetchFlickr({
				type: 'search',
				count: 50,
				tag: tag,
			})
		}
	};

	useEffect(() => {
		fetchFlickr({
			type: 'interest',
			count: 100,
		})
	}, []);

	return (
		<Layout name={'Flickr'}>
			<button onClick={showInterest}>interest</button>

			<div className='searchBox'>
				<input type='text' ref={input} onKeyUp={e => {
					// enter누르면 search버튼 누름
					if(e.key === 'Enter') showSearch();
				}} />
				<button onClick={showSearch}>search</button>
			</div>

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

									<div className='profile'>
										<img src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`} 
										onError={(e) => {
											e.target.setAttribute(
												'src',
												'https://www.flickr.com/images/buddyicon.gif'
											);
										}}
										/>
										<span onClick={(e) => {
											if(enableClick) {
												setEnableClick(false);
												setLoading(true);
												frame.current.classList.remove('on');
												fetchFlickr({
													type: 'user',
													count: 50,
													user: e.currentTarget.innerText,
												});
											}
										}}>{item.owner}</span>
									</div>
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

/*
keyDown : 키를 누르는 시점
keyUp : 키를 눌렀다 떼는 시점
keyPress : 키를 눌렀다 떼는 시점(한영변환 같은 특수키 적용 안됨)
*/