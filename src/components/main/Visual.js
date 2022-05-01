import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';

function Visual() {
	return (
		<figure className='myScroll'>
			<Swiper
				loop={true}
				slidesPerView={3}
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
