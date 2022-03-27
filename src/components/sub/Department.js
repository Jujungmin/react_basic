import React, { useState, useEffect, useRef } from 'react';

function Department() {
    let [index, setIndex] = useState(0);
    const frame = useRef(null);

    // 컴포넌트 생성시 처음 한번만 동작
    useEffect(() => {
        console.log('컴포넌트 생성');
        frame.current.classList.add('on');

        // clean up함수
        return () => {
            console.log('컴포넌트 소멸')
        };
    }, []);

    // index를 의존성으로 등록해서 해당 state가 변경될때마다 호출
    useEffect(() => {
        console.log('index값 변경')
    }, [index]);

  return (
      <section className='department' ref={frame}>
          <div className="inner">
            <h1>Department</h1>
            <button className='plus' onClick={() => setIndex(++index)}>더하기</button>
            <button className='minus' onClick={() => setIndex(--index)}>빼기</button>
            <h3>{index}</h3>
          </div>
      </section>
  )
}

export default Department;

/*
useEffect(() => {},[])
useEffect : 해당 컴포넌트의 생성, 상태값 변경, 소멸이라는 생명주기에 따라 특정 구문을 실행할 수 있는 hook
-- useEffect는 첫번째 인수로 콜백함수 등록
-- useEffect는 두번째 인수로 의존성 등록 (원하는 state를 의존성으로 등록)
-- useEffect의 두번째 인수로 빈 배열을 의존성으로 등록 : 해당 컴포넌트가 처음 생상될때 한번만 호출 가능
-- useEffect안쪽에서 함수를 리턴하면 해당함수는 컴포넌트가 소멸할때 호출됨
*/