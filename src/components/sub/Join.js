import React, { useEffect , useRef , useState } from 'react'

function Join() {
	const frame = useRef(null);
	
	// state로 관리할 초기 value
	const initVal = {
		userid: '',
	}
	// state에 초기 value값 저장
	const [val, setVal] = useState(initVal);

	// input요소의 인증실패시 출력될 error메세지를 담을 state생성
	const [err, setErr] = useState({});

	// input 상태값이 변경될때마다 실행할 함수
	const handleChange = (e) => {
		// name은 value값, value는 현재 내가 쓰고 있는 값. name은 userid
		const {name, value} = e.target;
		// console.log(`name: ${name}, value: ${value}`);
		// onChange발생시 기존 val state값을 현재 사용자가 입력하고 있는 값으로 갱신
		
		// [name]을 대괄호로 묶은이유? 'usrid' === [name] / 연관배열
		setVal({...val, [name]: value });
		// console.log(val);
	}

	// 전송이벤트 발생시 호출될 함수
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('전송이벤트발생')
	}

	useEffect(() => {
		frame.current.classList.add('on');
	}, []);

  return (
	<section className='join' ref={frame}>
		<div className='inner'>
			<h1>MemberShip</h1>
			<article>
				<form onSubmit={handleSubmit}>
					<fieldset>
						<legend>회원가입 폼 양식</legend>
						<table border='1'>
							<caption>회원가입</caption>
							<tbody>
								<tr>
									<th scope='row'>
										<label htmlFor='userid'>USER ID</label>
									</th>
									<td>
										<input type='text'
										id='userid' name='userid'
										placeholder='아이디를 입력하세요'
										value={val.userid}
										onChange={handleChange}
										/>
									</td>
								</tr>
								<tr>
									<th colSpan='2'>
										<input type='reset' value='cancel' />
										<input type='submit' value='send' />
									</th>
								</tr>
							</tbody>
						</table>
					</fieldset>
				</form>
			</article>
		</div>
	</section>
  )
}

export default Join