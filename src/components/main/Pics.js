import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';
import Popup from '../common/Popup';

function Pics(props) {
	const { flickr } = useSelector((store) => store.flickrReducer);
	const [index, setIndex] = useState(0);
	const pop = useRef(null);

	// 현재 스크롤되는 거리값
	const scrolled = props.scrolled;
	// 해당 섹션의 세로 위치값
	const start = props.start;
	// 양수: 기준점을 위로 끌어올림, 음수: 기준점을 아래로 내림
	const base = 400;
	// scrolled값 적용시점에 위의 보정값 적용
	const position = scrolled - start + base;
	
	return (
		<>
			<section id='pics' className='myScroll'>
				<h1 style={
					position >= 0 ? {transform: `translateX(${position * 1.5}px)`} : null
				}>Recent Gallery</h1>

				<h2 style={
					position >= 0 ? {transform: `translateX(${position * 1}px)`} : null
				}>Gallery</h2>

				{flickr.map((pic, idx) => {
					if (idx < 5) {
						return (
							<li
								key={idx}
								onClick={() => {
									setIndex(idx);
									pop.current.open();
								}}>
								<img
									src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_s.jpg`}
								/>
							</li>
						);
					}
				})}
			</section>

			<Popup ref={pop}>
				{flickr.length !== 0 && (
					<>
						<img
							src={`https://live.staticflickr.com/${flickr[index].server}/${flickr[index].id}_${flickr[index].secret}_b.jpg`}
						/>
						<span className='close' onClick={() => pop.current.close()}>
							close
						</span>
					</>
				)}
			</Popup>
		</>
	);
}

export default Pics;