import React, { useRef, useEffect, useState } from 'react'


function Location() {
	const frame = useRef(null);
	const container = useRef(null);
	// 전역등록되어 있는 kakao객체를 읽지 못하는 문제 해결
	// 비구조할당으로 kakao객체값을 변수로 따로 뽑아냄
	const {kakao} = window;

	const [map, setMap] = useState(null);
		
	useEffect(() => {
		frame.current.classList.add('on');
		
		// 지도 출력을 위한 옵션값 지정
		const options = {
			center: new kakao.maps.LatLng(33.450701, 126.570667),
			level: 3
		};

		// kakao api로 부터 인스턴스 복사 (지도가 출력될 프레임, 옵션)
		const mapInfo = new kakao.maps.Map(container.current, options);

		// 지역변수 map의 인스턴스 정보값을 setMap을 통해서 state map으로 옮겨담음.
		setMap(mapInfo);

		// 교통정보 표시 메서드
		// map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, []);

  return (
	  <section className='location' ref={frame}>
		  <div className='inner'>
			  <h1>Location</h1>

			  <div id="map" ref={container}></div>

			{/* 버튼 클릭 시 state에 등록이 되어 있는 맵 인스턴스에서 프로토타입 메서드 호출 */}
			<button onClick={() => map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)}>Tracffic On</button>
			{/* 교통량 숨기기 버튼 클릭 시 state에 등록이 되어 있는 맵 인스턴스에서 프로토타입 메서드 호출 */}
			<button onClick={() => map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)}>Tracffic Off</button>
		  </div>
	  </section>
  )
}

export default Location;