import React, { useEffect, useRef, useState } from 'react';
import Header from '../common/Header';
import Visual from './Visual';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Btns from './Btns';
import Anime from '../../class/anim';

function Main() {
	const main = useRef(null);
	const pos = useRef([]);
	const [index, setIndex] = useState(0);

	//섹션들의 세로 위치값 반환함수
	const getPos = () => {
		pos.current = [];
		const secs = main.current.querySelectorAll('.myScroll');
		for (const sec of secs) pos.current.push(sec.offsetTop);
	};

	//버튼 활성화 함수
	const activation = () => {
		const base = -200;
		let scroll = window.scrollY;
		const btns = main.current.querySelectorAll('.btns li');

		pos.current.map((pos, idx) => {
			if (scroll >= pos + base) {
				for (const btn of btns) btn.classList.remove('on');
				btns[idx].classList.add('on');
			}
		});
	};

	//윈도우 이벤트 등록
	useEffect(() => {
		getPos();
		window.addEventListener('resize', getPos);
		window.addEventListener('scroll', activation);

		return () => {
			window.removeEventListener('resize', getPos);
			window.removeEventListener('scroll', activation);
		};
	}, []);

	//순서값에 따라 스크롤 모션
	useEffect(() => {
		new Anime(window, {
			prop: 'scroll',
			value: pos.current[index],
			duration: 500,
		});
	}, [index]);

	return (
		<>
			<main ref={main}>
				<Header type={'main'} />
				<Visual />
				<News />
				<Pics />
				<Vids />
				<Btns setIndex={setIndex} />
			</main>
		</>
	);
}

export default Main;
