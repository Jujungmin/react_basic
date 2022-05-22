import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import { useEffect, useState } from 'react';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';

function Visual() {
	// 화면에 보일 swiper 패널 갯수를 관리할 state 추가
	const [num, setNum] = useState(3);

	// 브라우저 리사이즈시 실행할 함수
	const handleResize = () => {
		// 현재 브라우저 폭이 데스크탑 버전보다 작아지면
		// 패널 갯수를 1로, 그렇지 않으면 3으로 변경
		const wid = window.innerWidth;
		wid < 1180 ? setNum(1) : setNum(3);
	};

	useEffect(() => {
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<figure className='myScroll'>
			<Swiper
				loop={true}
				// num state값 연동
				slidesPerView={num}
				spaceBetween={50}
				grabCursor={true}
				centeredSlides={true}
				pagination={{ clickable: true }}
				navigation={true}
				modules={[Pagination, Navigation]}
				className='swiper'>
				<SwiperSlide>1</SwiperSlide>
				<SwiperSlide>2</SwiperSlide>
				<SwiperSlide>3</SwiperSlide>
				<SwiperSlide>4</SwiperSlide>
				<SwiperSlide>5</SwiperSlide>
			</Swiper>
		</figure>
	);
}

export default Visual;
