import Layout from '../common/Layout';
import { useEffect, useState  } from 'react';
import { faCheckToSlot } from '@fortawesome/free-solid-svg-icons';

function Join() {

	const initVal = {
		userid: '',
		pwd1: '',
		pwd2: '',
		comments: '',
		email: '',
		gender: null, // boolean이므로 null값준다.
		interests: null,
	}
	const [val,setVal] = useState(initVal);
	const [err,setErr] = useState({});
	
	// 인수로 현재 val의 정보값을 전달
	const check = (arg) => {
		const errs = {};
		const eng = /[a-zA-Z]/;
		const num = /[0-9]/;
		const spc = /[~!@#$%^&*()_+\]]/;
		// 입력된 아이디값이 5글자 이하면 에러메세지를 담아서 객체리턴
		// 입력된 아이디값이 5글자 이상이면 빈 에러객체를 리턴
		if(arg.userid.length < 5) {
			errs.userid = '아이디를 5글자 이상 입력하세요';
		}
		if(arg.pwd1.length < 5 || !eng.test(arg.pwd1) || !num.test(arg.pwd1) || !spc.test(arg.pwd1)) {
			errs.pwd1 = '비밀번호는 영문,숫자,특수문자를 포함한 5글자이상으로 입력하세요';
		}
		if(arg.pwd1 !== arg.pwd2 || !arg.pwd2) {
			errs.pwd2 = '두개의 비밀번호를 동일하게 입력하세요';
		}
		if(arg.email.length < 5 || !/@./.test(arg.email)) {
			errs.email = '이메일주소는 5글자이상, @ .을 포함해주세요';
		}
		if(arg.comments.length < 10) {
			errs.comments = '남기는말은 10글자 이상 입력하세요';
		}
		if(!arg.gender) {
			errs.gender = '성별을 선택하세요';
		}
		if(!arg.interests) {
			errs.interests = '관심사를 하나이상 출력하세요';
		}
		return errs;
	}
	
	const handleReset = () => {
		setVal(initVal);
		setErr({});
	}

	const handleChange = (e) => {
		// const name = e.target.name, const value = e.target.value
		const {name,value} = e.target;
		console.log({name,value})
		// setVal({...val, 'userid': value})
		// [name] : ES6 연관배열
		setVal({...val, [name]: value})
	}

	const handleRadio = (e) => {
		const name = e.target;
		const isCheck = e.target.checked;
		setVal({...val, [name]: isCheck});
	}

	const handleCheck = (e) => {
		let isCheck = false;
		const {name} = e.target; 
		const inputs = e.target.parentElement.querySelectorAll('input');
		
		// 유사배열로 묶어서 하나로 체크해야됨
		inputs.forEach((el) => {
			if(el.checked) isCheck = true;
		})
		setVal({...val, [name]: isCheck});
	}

	const handleSubmit = e => {
		e.preventDefault();
		// 전송 이벤트 발생 시 check함수로 반환된 에러객체가 err 스테이트에 저장
		setErr(check(val));
	}
	
	// 미션1 - 인증이 통과되면 화면에 변화없음, 인증실패 시 인풋옆에 에러메세지 출력
	useEffect(() => {
		console.log(err);
	},[err])


  return (
	  // 공통의 UI인 Layout컴포넌트로 Join전용 컨텐츠를 wrapping
	<Layout name={'Join'}>
		<article>
			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend>회원가입 폼 양식</legend>
					<table border='1'>
						<caption>회원가입</caption>
						<tbody>
							{/* 아이디 */}
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
									<span className='err'>{err.userid}</span>
								</td>
							</tr>
							{/* 비밀번호 */}
							<tr>
								<th scope='row'>
									<label htmlFor='pwd1'>PASSWORD</label>
								</th>
								<td>
									<input type='password' name='pwd1' id='pwd1' placeholder='비밀번호를 입력하세요'
									value={val.pwd1}
									onChange={handleChange}
									/>
									<span className='err'>{err.pwd1}</span>
								</td>
							</tr>
							{/* 비밀번호재입력 */}
							<tr>
								<th scope='row'>
									<label htmlFor='pwd2'>RE-PASSWORD</label>
								</th>
								<td>
									<input type='password' name='pwd2' id='pwd2' placeholder='비밀번호를 재입력하세요'
									value={val.pwd2}
									onChange={handleChange}
									/>
									<span className='err'>{err.pwd2}</span>
								</td>
							</tr>
							{/* 이메일 */}
							<tr>
								<th scope='row'>
									<label htmlFor='email'>E-MAIL</label>
								</th>
								<td>
									<input type='text' name='email' id='email' placeholder='이메일을 입력하세요'
									value={val.email}
									onChange={handleChange}
									/>
									<span className='err'>{err.email}</span>
								</td>
							</tr>
							{/* 성별 */}
							<tr>
								<th scope='row'>
									GENDER
								</th>
								<td>
									<label htmlFor='male'>Male</label>
									<input type='radio' name='gender' value='male' onChange={handleRadio} />

									<label htmlFor='female'>FeMale</label>
									<input type='radio' name='gender' value='female' onChange={handleRadio} />
									<span className='err'>{err.gender}</span>
								</td>
							</tr>
							{/* 취미 */}
							<tr>
								<th scope='row'>
									INTEREST
								</th>
								<td>
									<label htmlFor='sports'>Sports</label>
									<input type='checkbox' name='interests' id='sports' value='sports' onChange={handleCheck} />
									<label htmlFor='music'>Music</label>
									<input type='checkbox' name='interests' id='music' value='music' onChange={handleCheck} />
									<label htmlFor='game'>Game</label>
									<input type='checkbox' name='interests' id='game' value='game' onChange={handleCheck} />
									<span className='err'>{err.interests}</span>
								</td>
							</tr>
							{/* 코멘트 */}
							<tr>
								<th scope='row'>
									<label htmlFor='comments'>COMMENTS</label>
								</th>
								<td>
									<textarea
									name='comments'
									id='comments'
									cols='30'
									rows='10'
									placeholder='남기는말을 입력하세요'
									value={val.comments}
									onChange={handleChange}>
									</textarea>
									<span className='err'>{err.comments}</span>
								</td>
							</tr>
							{/* 버튼 */}
							<tr>
								<th colSpan='2'>
									<input type='reset' value='cancel' onClick={handleReset} />
									<input type='submit' value='send' />
								</th>
							</tr>
						</tbody>
					</table>
				</fieldset>
			</form>
		</article>
	</Layout>
  )
}

export default Join