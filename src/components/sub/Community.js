import Layout from '../common/Layout';
import { useState, useEffect, useRef } from 'react';

function Community() {
	const input = useRef(null);
	const textarea = useRef(null);
	const editInput = useRef(null);
	const editTextarea = useRef(null);

	let data = localStorage.getItem('posts');
	data = JSON.parse(data);

	const [posts, setPosts] = useState(data);
	const [allowed, setAllowed] = useState(true);

	const resetPosts = () => {
		input.current.value = '';
		textarea.current.value = '';
	};

	const createPosts = () => {
		const inputVal = input.current.value.trim();
		const textareaVal = textarea.current.value.trim();
		resetPosts();

		if (!inputVal || !textareaVal) {
			alert('제목과 본문을 모두 입력하세요');
			return;
		}

		setPosts([{ title: inputVal, content: textareaVal }, ...posts]);
	};

	const deleletPosts = (idx) => {
		setPosts(posts.filter((_, index) => index !== idx));
	};

	const enableUpdate = (index) => {
		setAllowed(false);
		setPosts(
			posts.map((post, idx) => {
				if (idx === index) post.enableUpdate = true;
				return post;
			})
		);
	};

	const diableUpdate = (index) => {
		setAllowed(true);
		setPosts(
			posts.map((post, idx) => {
				if (idx === index) post.enableUpdate = false;
				return post;
			})
		);
	};

	const updatePost = (index) => {
		if (!editInput.current.value.trim() || !editTextarea.current.value.trim()) {
			alert('수정할 제목과 본문을 입력하세요.');
			return;
		}
		setAllowed(true);

		setPosts(
			posts.map((post, idx) => {
				if (idx === index) {
					post.title = editInput.current.value;
					post.content = editTextarea.current.value;
					post.enableUpdate = false;
				}
				return post;
			})
		);
	};

	useEffect(() => {
		localStorage.setItem('posts', JSON.stringify(posts));
	}, [posts]);

	return (
		<Layout name={'Community'}>
			<div className='inputBox'>
				<input type='text' placeholder='제목을 입력하세요' ref={input} />
				<br />
				<textarea
					cols='30'
					rows='10'
					placeholder='본문을 입력하세요'
					ref={textarea}></textarea>
				<br />
				<button onClick={resetPosts}>cancel</button>
				<button onClick={createPosts}>create</button>
			</div>

			<div className='showBox'>
				{posts.map((post, idx) => {
					return (
						<article key={idx}>
							{post.enableUpdate ? (
								<>
									<input
										type='text'
										defaultValue={post.title}
										ref={editInput}
									/>
									<br />
									<textarea
										defaultValue={post.content}
										ref={editTextarea}></textarea>
									<br />

									<button onClick={() => diableUpdate(idx)}>cancel</button>
									<button onClick={() => updatePost(idx)}>save</button>
								</>
							) : (
								<>
									<h2>{post.title}</h2>
									<p>{post.content}</p>

									<button
										onClick={() => {
											if (allowed) enableUpdate(idx);
										}}>
										edit
									</button>
									<button onClick={() => deleletPosts(idx)}>delete</button>
								</>
							)}
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Community;
