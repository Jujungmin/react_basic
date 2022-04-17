import {useState, useEffect, useRef } from 'react';
import Layout from '../common/Layout';

/*
	*crud
	Create(저장)
	Read(데이터 호출)
	Update(수정)
	Delete(삭제)
*/

function Community() {
  return (
	<Layout name={'Community'}>
		커뮤니티 페이지 입니다.
		
		<div className='inputBox'>
			<input type='text' placeholder='제목을 입력하세요' /><br/>
			<textarea cols='30' rows='10' placeholder='본문을 입력하세요'></textarea><br/>
			<button>cancel</button>
			<button>create</button>
		</div>

		<div className='showBox'></div>
	</Layout>
  )
}

export default Community