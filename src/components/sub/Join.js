import Layout from '../common/Layout';

function Join() {
	
  return (
	<Layout>
		<article>
			<form>
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
	</Layout>
  )
}

export default Join