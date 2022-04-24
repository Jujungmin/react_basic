import Layout from '../common/Layout';
import {useState, useEffect, useRef } from 'react';

/*
	*crud
	Create(저장)
	Read(데이터 호출)
	Update(수정)
	Delete(삭제)
*/

function Community() {
	// input 실시간 값 구하기위해 useRef
	const input = useRef(null);
	const textarea = useRef(null);
	const editInput = useRef(null);
	const editTextarea = useRef(null);

	// 순서4 - 메인컴포넌트에서 로컬 저장된 데이터를 다시 state에 옮겨담음
	let data = localStorage.getItem('posts');
	data = JSON.parse(data);

	const [posts, setPosts] = useState(data);
	const [allowed, setAllowed] = useState(true);

	const resetPosts = () => {
		input.current.value = '';
		textarea.current.value = '';
	}
	const createPosts = () => {
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
			posts.filter((_, index) => index !== idx)
		);
	}
	// 수정모드 변경함수
	const enableUpdate = (index) => {
		// 수정모드 진입시 수정버튼 클릭 방지
		setAllowed(false);
		setPosts(
			posts.map((post, idx) => {
				if(idx === index) post.enableUpdate = true;
				return post;
			}
		));
	}
	// 출력모드 변경함수
	const disableUpdate = (index) => {
		// 수정 취소 시 다시 allowed true로 변경
		setAllowed(true);
		setPosts(
			posts.map((post, idx) => {
				if(idx === index) post.enableUpdate = false;
				return post;
			})
		)
	}

	// post 수정함수
	const updatePost = (index) => {
		if(!editInput.current.value.trim() || !editTextarea.current.value.trim()) {
			alert('수정할 제목과 본문을 입력하세요.');
			return;
		}
		// 수정완료시 다시 allowed true로 변경
		setAllowed(true);

		setPosts(
			posts.map((post,idx) => {
				if(idx === index) {
					post.title = editInput.current.value;
					post.content = editTextarea.current.value;
					post.enableUpdate = false;
				}
				return post;
			})
		)
	}

	useEffect(() => {
		console.log(posts);
		// posts값이 변경될때마다 해당 state
		localStorage.setItem('posts', JSON.stringify(posts));
	}, [posts]);

  return (
	<Layout name={'Community'}>
		<div className='inputBox'>
			<input type='text' placeholder='제목을 입력하세요' ref={input} />
			<br/>
			<textarea cols='30' rows='10' placeholder='본문을 입력하세요' ref={textarea}></textarea>
			<br/>
			<button onClick={resetPosts}>cancel</button>
			<button onClick={createPosts}>create</button>
		</div>

		<div className='showBox'>
			{posts.map((post, idx) => {
				// 반복도는 해당 state에 enableUpdate true면 수정화면 랜더링
				// 그렇지 않으면 출력화면 렌더링
				return (
					<article key={idx}>
						{post.enableUpdate ? (
							// 반복도는 해당 포스트의 enabledUpdate값이 true면 수정모드
							<>
								<input type='text' defaultValue={post.title} ref={editInput} />
								<br/>
								<textarea defaultValue={post.content} ref={editTextarea}></textarea>
								<br/>
								<button onClick={()=> disableUpdate(idx)}>cancel</button>
								<button onClick={()=>updatePost(idx)}>save</button>
							</>

						) : (
							<>
								<h2>{post.title}</h2>
								<p>{post.content}</p>

								<button onClick={()=> {
									// allowed값이 true일때에만 수정모드 변경가능
									if(allowed) enableUpdate(idx)
								}}>edit</button>
								{/* 삭제 클릭 시 deletePosts함수에 삭제할 순번을 전달하면서 호출 */}
								<button onClick={()=>deletePosts(idx)}>delete</button>
							</>
						)}

					</article>
				)
			})}
		</div>
	</Layout>
  );
}

export default Community;