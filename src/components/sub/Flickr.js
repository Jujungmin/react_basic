import Layout from '../common/Layout';
import Popup from '../common/Popup';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Masonry from 'react-masonry-component';
const path = process.env.PUBLIC_URL;

function Flickr() {
	const { flickr } = useSelector((store) => store.flickrReducer);
	const dispatch = useDispatch();
	const [opt, setOpt] = useState({type: 'interest', count: 50});

	const frame = useRef(null);
	const input = useRef(null);
	const pop = useRef(null);
	const [loading, setLoading] = useState(true);
	const [index, setIndex] = useState(0);
	const [enableClick, setEnableClick] = useState(true);
	
	const masonryOptions = {
		transitionDuration: '0.5s',
	};

	const endLoading = () => {
		setTimeout(() => {
			frame.current.classList.add('on');
			setLoading(false);
			setTimeout(() => setEnableClick(true), 1000);
		}, 1000);
	}

	const showInterest = () => {
		if(enableClick) {
			setEnableClick(false);
			setLoading(true);
			frame.current.classList.remove('on');

			setOpt({type: 'interest', count: 50});
			endLoading();
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

			setOpt({type: 'search', count: 50});
			endLoading();
		}
	};

	useEffect(() => {
		// action객체를 saga.js로 전달
		dispatch({type: 'FLICKR_START', opt});
		endLoading();
	}, [opt]);

	return (
		<>
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
						{flickr.map((item, idx) => {
							return (
								<article key={idx}>
									<div className='inner'>
										<div className='pic' onClick={() => {
											pop.current.open();
											setIndex(idx)
										}}>
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
													
													setOpt({type: 'user', count: 50, user: e.currentTarget.innerText})
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

			<Popup ref={pop}>
				{flickr.length !== 0 ? <img src={`https://live.staticflickr.com/${flickr[index].server}/${flickr[index].id}_${flickr[index].secret}_b.jpg`} /> : null}
				
				<span className='close' onClick={() => pop.current.close()}>close</span>
			</Popup>
		</>
		)
	}

export default Flickr;

/*
기존 redux 작업방식
- 컴포넌트 함수에 axios요청을 해서 반환받은 데이터를 action생성함수를 통해서 action객체로 반환
- 변환받은 action객체를 컴포넌트 마운트시 바로 reducer에 전달

redux-saga 작업방식
- reducer가 바로 store에 데이터를 저장하는 것이 아닌 reducer에 saga를 미들웨어로 추가
- 컴포넌트 함수에서 action객체로 요청을 보냄
- reducer가 바로 요청을 받는게 아닌 redux-saga가 요청을 받음
- 미리 외부 파일로 api요청 함수를 정의해두고 redux-saga에 액션요청이 들어오면 api함수 호출
- api 요청 완료된 반환값을 redux-saga를 통해서 reducer에 전달

*/