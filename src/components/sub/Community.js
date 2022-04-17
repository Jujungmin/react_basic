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
	const input = useRef(null);
	const textarea = useRef(null);
	const dummyPosts = [
		{title: 'Hello6', content: 'Here comes description in detail.'},
		{title: 'Hello5', content: 'Here comes description in detail.'},
		{title: 'Hello4', content: 'Here comes description in detail.'},
		{title: 'Hello3', content: 'Here comes description in detail.'},
		{title: 'Hello2', content: 'Here comes description in detail.'},
		{title: 'Hello1', content: 'Here comes description in detail.'},
	]
	const [posts, setPosts] = useState(dummyPosts);
	
	const resetPosts = () => {
		input.current.value = '';
		textarea.current.value = '';
	}
	const createPost = () => {
		const inputVal = input.current.value.trim();
		const textareaVal = textarea.current.value.trim();

		if(!inputVal || !textareaVal) {
			alert('제목과 본문을 모두 입력하세요');
			return;
		}
		setPosts([
			{title: inputVal, content: textareaVal}, ...posts
		])
	}
	const deletePosts = (idx) => {
		// console.log('삭제할 요소 순서', idx);
		// 인수로 전달받은 삭제할 요소 순번과 현재반복도는 요소의 순번이 같으면 해당 값을 반환
		setPosts(
			posts.filter((post,index) => index !== idx)
		);
	}
  return (
	<Layout name={'Community'}>
		커뮤니티 페이지 입니다.
		
		<div className='inputBox'>
			<input type='text' placeholder='제목을 입력하세요' ref={input} /><br/>
			<textarea cols='30' rows='10' placeholder='본문을 입력하세요' ref={textarea}></textarea><br/>
			<button onClick={resetPosts}>cancel</button>
			<button onClick={createPost}>create</button>
		</div>

		<div className='showBox'>
			{posts.map((post, idx) => {
				return (
					<article key={idx}>
						<h2>{post.title}</h2>
						<p>{post.content}</p>

						<button>edit</button>
						{/* 삭제 클릭 시 deletePosts함수에 삭제할 순번을 전달하면서 호출 */}
						<button onClick={()=>deletePosts(idx)}>delete</button>
					</article>
				)
			})}
		</div>
	</Layout>
  )
}

export default Community