import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentPage.css';

const StudentPage = () => {
	const [students, setStudents] = useState([]);
	const [studentInputs, setStudentInputs] = useState([]);

	useEffect(() => {
		fetchStudents();
	}, []);

	const fetchStudents = async () => {
		try {
			const response = await axios.get('https://q0kstz9esk.execute-api.ap-northeast-2.amazonaws.com/get-std-info/student');
      const sortedStudents = response.data.sort((a, b) => {
        // 'name' 필드를 기준으로 문자열 비교를 통해 오름차순으로 정렬합니다.
        return a.name.localeCompare(b.name);
      });
			setStudents(sortedStudents);
		} catch (error) {
			console.error('학생 목록 가져오기 실패:', error);
		}
	};

  const MAX_MEMO_LENGTH = 50; // 코멘트 최대 표시 길이

  // 긴 텍스트를 줄여서 표시하는 함수
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const renderMemoCell = (memo) => {
    return (
      <td
        className="memo-cell"
        title={memo} // 전체 코멘트를 툴팁으로 보여줌
      >
        {truncateText(memo, MAX_MEMO_LENGTH)}
      </td>
    );
  };

	const handleInputChange = (index, e) => {
		const updatedStudents = [...studentInputs];
		updatedStudents[index][e.target.name] = e.target.value;
		setStudentInputs(updatedStudents);
	};

	const handleAddStudent = () => {
		setStudentInputs([...studentInputs, { name: '', en_grade: '', en_date: '', solution_class: '', memo: '' }]);
	};

	const handleRemoveStudent = (index) => {
		const updatedStudents = [...studentInputs];
		updatedStudents.splice(index, 1);
		setStudentInputs(updatedStudents);
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		try {
			// 각 입력값을 정수로 변환
			const formattedInputs = studentInputs.map(input => ({
					...input,
					en_grade: parseInt(input.en_grade)
			}));
			console.log(studentInputs)
			// await axios.post('https://q0kstz9esk.execute-api.ap-northeast-2.amazonaws.com/get-std-info/student', formattedInputs);
			await axios.post('https://q0kstz9esk.execute-api.ap-northeast-2.amazonaws.com/get-std-info/student', formattedInputs);
			console.log('학생 정보가 성공적으로 전송되었습니다.');
			fetchStudents(); // 학생 정보 전송 후 목록 다시 가져오기
			setStudentInputs([]);
		} catch (error) {
			console.error('학생 정보 전송에 실패했습니다.', error);
		}
	};

	return (
		<div>
			<h1>학생 정보 입력</h1>
			<form onSubmit={handleFormSubmit}>
				<button type="button" onClick={handleAddStudent}>학생 추가(열 추가)</button>
				{studentInputs.map((input, index) => (
					<div key={index}>
						<input type="text" name="name" value={input.name} onChange={(e) => handleInputChange(index, e)} placeholder="이름" required />
						<input type="text" name="en_grade" value={input.en_grade} onChange={(e) => handleInputChange(index, e)} placeholder="입원성적" required />
						<input type="text" name="en_date" value={input.en_date} onChange={(e) => handleInputChange(index, e)} placeholder="YYYY-MM-DD" required />
						<textarea name="memo" value={input.memo} onChange={(e) => handleInputChange(index, e)} placeholder="학생 포부" required></textarea>
						<input type="text" name="solution_class" value={input.solution_class} onChange={(e) => handleInputChange(index, e)} placeholder="솔루션 배정반" required />
						<button type="button" onClick={() => handleRemoveStudent(index)}>제거</button>
					</div>
				))}
				<button type="submit">서버에 전송</button>
			</form>

			<div>
				<h2>학생 정보</h2>
				<table>
					<thead className='table-title'>
						<tr>
							<th>순번</th>
							<th>ID</th>
							<th>이름</th>
							<th>입원성적</th>
							<th>입학일</th>
							<th>솔루션배정반</th>
							<th>학생 다짐</th>
						</tr>
					</thead>
					<tbody className='content-table'>
						{students.map((student, index) => (
							<tr key={student.id || index}>
								<td>{index + 1}</td>
								<td>{student.student_id}</td>
								<td>{student.name}</td>
								<td>{student.en_grade}</td>
								<td>{student.en_date}</td>
								<td>{student.solution_class}</td>
								{renderMemoCell(student.memo)}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default StudentPage;