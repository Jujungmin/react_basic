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

	// useRef는 가상돔을 참조할때도 쓰이지만
	// 특정 값을 컴포넌트가 재 랜더링되더라도 값을 유지시켜야 될 때,
	// 특정 값이 변경이 되더라도 컴포넌트를 다시 재 렌더링 시키면 안될 때 사용.

	// 섹션들의 세로위치값 반환함수
	const getPos = () => {
		pos.current = [];
		const secs = main.current.querySelectorAll('.myScroll');
		for (const sec of secs) pos.current.push(sec.offsetTop);
		// console.log(pos.current);
	}

	// 버튼 활성화 함수
	const activation = () => {
		const base = -200;
		let scroll = window.scrollY;
		const btns = main.current.querySelectorAll('.btns li');

		pos.current.map((pos, idx) => {
			if(scroll >= pos + base) {
				for(const btn of btns) btn.classList.remove('on');
				btns[idx].classList.add('on');
			}
		})
	}

	// 윈도우 이벤트 등록
	useEffect(() => {
		// 처음 로딩시 세로 위치값 반환
		getPos();

		// 브라우저 리사이즈시 갱신된 세로 위치값 변환
		window.addEventListener('resize', getPos);

		window.addEventListener('scroll', activation);

		return () => {
			// 해당 컴퍼넌트가 unmount시 window 전역에 등록된 getPos함수 제거
				window.removeEventListener('resize', getPos);
				window.removeEventListener('scroll', activation);
			}
	}, []);

	// 순서값에 따라 스크롤 모션
	useEffect(() => {
		// btns 클릭 시 순서.
		// console.log(index);
		new Anime(window, {
			prop: 'scroll',
			value: pos.current[index],
			duration: 500
		})
	}, [index])
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
  )
}

export default Main;