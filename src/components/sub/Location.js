import React, { useRef, useEffect, useState } from 'react'


function Location() {
	const frame = useRef(null);
	const container = useRef(null);
	// 전역등록되어 있는 kakao객체를 읽지 못하는 문제 해결
	// 비구조할당으로 kakao객체값을 변수로 따로 뽑아냄
	const {kakao} = window;
	const [map, setMap] = useState(null);
	const [traffic, setTraffic] = useState(false);
	const path = process.env.PUBLIC_URL;
		
	useEffect(() => {
		frame.current.classList.add('on');
		
		// 지도 출력을 위한 옵션값 지정
		const options = {
			center: new kakao.maps.LatLng(37.51267850297629, 127.0606036644381),
			level: 3
		};

		// kakao api로 부터 인스턴스 복사 (지도가 출력될 프레임, 옵션)
		const mapInfo = new kakao.maps.Map(container.current, options);
		// 지역변수 map의 인스턴스 정보값을 setMap을 통해서 state map으로 옮겨담음.
		setMap(mapInfo);

		// 마커생성
		const markerPosition = new kakao.maps.LatLng(37.51267850297629, 127.0606036644381);

		// 마커이미지 정보 추가
		const imageSrc = `${path}/img/marker1.png`, 
			imageSize = new kakao.maps.Size(232, 99), // 마커이미지의 크기입니다
			imageOption = {offset: new kakao.maps.Point(110, 90)};

		// 마커 인스턴스 생성
		const markerImage = new kakao.maps.MarkerImage(
			imageSrc,
			imageSize,
			imageOption
		)
		const marker = new kakao.maps.Marker({
			position: markerPosition,
			image: markerImage,
		});

		marker.setMap(mapInfo);
	}, []);

	const handTraffic = () => {
		// 처음 컴포넌트가 생성시에는 아직 map state값이 비어있는 상태이기 때문에 map값을 읽을수없어서 오류가 뜸
		// 그래서 추후 traffic state값이 변경이 되고 map값이 생성되면 동작이 되도록
		// 아래 삼항 연선자를 map값이 있을때에만 실행하도록 조건문 처리
		if(map) {
			traffic ? map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
					: map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
		}
	}

	const setCenter = (lat, lng) => {
		const moveLatLon = new kakao.maps.LatLng(lat, lng);
		map.setCenter(moveLatLon);
	}

	useEffect(() => {
		// console.log(traffic)
		handTraffic();
	}, [traffic])

  return (
	  <section className='location' ref={frame}>
		  <div className='inner'>
			  <h1>Location</h1>

			  <div id='map' ref={container}></div>

			<button onClick={() => setTraffic(!traffic)}> {traffic ? 'traffic ON' : 'traffic OFF'}</button>

			<ul className='branch'>
				<li onClick={() => setCenter(37.51270099322895, 127.06067154788254)}>본점</li>
				<li onClick={() => setCenter(37.487626, 126.753045)}>지점1</li>
			</ul>
		  </div>
	  </section>
  )
}

export default Location;