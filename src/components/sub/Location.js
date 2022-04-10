import React, { useRef, useEffect, useState } from 'react'


function Location() {
	// 전역등록되어 있는 kakao객체를 읽지 못하는 문제 해결
	// 비구조할당으로 kakao객체값을 변수로 따로 뽑아냄
	const {kakao} = window;
	const path = process.env.PUBLIC_URL;
	//각 지점별 정보값
	const info = [
		{
			title: '송내역',
			latlag: new kakao.maps.LatLng(37.487626, 126.753045),
			imgSrc: path + '/img/marker1.png',
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '강남 포스코 사거리',
			latlag: new kakao.maps.LatLng(37.506354, 127.055006),
			imgSrc: path + '/img/marker2.png',
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '청담역',
			latlag: new kakao.maps.LatLng(37.51912, 127.051937),
			imgSrc: path + '/img/marker3.png',
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
	];

	//useRef로 가상DOM참조
	const frame = useRef(null);
	const container = useRef(null);

	//렌더링에 관여하는 주요 state관리
	const [map, setMap] = useState(null);
	const [traffic, setTraffic] = useState(false);
	const [index, setIndex] = useState(0);
	const [mapInfo] = useState(info);

	// 트래픽활성 함수
	const handTraffic = () => {
		// 처음 컴포넌트가 생성시에는 아직 map state값이 비어있는 상태이기 때문에 map값을 읽을수없어서 오류가 뜸
		// 그래서 추후 traffic state값이 변경이 되고 map값이 생성되면 동작이 되도록
		// 아래 삼항 연선자를 map값이 있을때에만 실행하도록 조건문 처리
		if(map) {
			traffic ? map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
					: map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
		}
	}
	
	// 처음 컴포넌트 생성시 한번만 실행
	useEffect(() => {
		frame.current.classList.add('on');
	}, [])

	// index state가 변경될때마다 지도 다시그리고 마커 다시 출력
	useEffect(() => {
		// 문제점 : index state가 변경될따마다 #map안쪽에 계속해서 지도 인스턴스를 생성하면서 태그가 중첩되는 문제
		// 해결방법 : 기존의 #map안쪽의 DOM을 제거해서 초기화하고 다시 지도 생성
		container.current.innerHTML = '';
		
		// 맵 화면 출력
		const option = {
			center: mapInfo[index].latlag,
			level: 3
		};
		// 맵 인스턴스 생성해서 화면에 지도 출력
		const mapInstance = new kakao.maps.Map(container.current, option);
		
		//마커 출력
		new kakao.maps.Marker({
			map: mapInstance,
			position: mapInfo[index].latlag,
			title: mapInfo[index].title,
			image: new kakao.maps.MarkerImage(
				mapInfo[index].imgSrc,
				mapInfo[index].imgSize,
				mapInfo[index].imgPos
			),
		});

		// 지도 위치 가운데 이동 함수
		const mapInit = () => {
			// 문제점 : 다른 컴포넌트에서도 이벤트 발생
			console.log('mapInit')
			mapInstance.setCenter(mapInfo[index].latlag);
		};
		// 브라우저가 리사이즈 할때마다 mapInit함수를 계속 호출해서 화면 중앙값으로 갱신
		window.addEventListener('resize', mapInit);
		
		setMap(mapInstance);
		
		// 해당 컴포넌트가 사라질때 window객체에 등록했던 mapInit핸들러 함수를 다시 제거해서 불필요한 메모리 누수 방지
		// 해결 : useEffect cleanup함수사용해서 다른 컴포넌트에서 이벤트 발생시키지 않음
		return () => window.removeEventListener('resize', mapInit);

	}, [index]);

	// traffic state가 변경될따마다 실행 트래픽 오버레이 레이어 표시
	useEffect(() => {
		// console.log(traffic)
		handTraffic();
	}, [traffic])

// state값 변경에 따라 렌더링될 가상 DOM
  return (
	  <section className='location' ref={frame}>
		  <div className='inner'>
			  <h1>Location</h1>

			  <div id='map' ref={container}></div>

			<button onClick={() => setTraffic(!traffic)}> {traffic ? 'traffic ON' : 'traffic OFF'}</button>

			<ul>
				{mapInfo.map((data,idx) => {
					return (
						<li key={idx} onClick={() => setIndex(idx)}>{data.title}</li>
					)
				})}
			</ul>
		  </div>
	  </section>
  )
}

export default Location;