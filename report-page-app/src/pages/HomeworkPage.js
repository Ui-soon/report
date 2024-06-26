import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomeworkPage = () => {
  const [students, setStudents] = useState([]);
  const [comments, setComments] = useState([]);
  const [homeworkInputs, setHomeworkInputs] = useState([]);

  const MAX_COMMENT_LENGTH = 50; // 코멘트 최대 표시 길이

  // 긴 텍스트를 줄여서 표시하는 함수
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };
  
  // 코멘트 셀을 렌더링하는 함수
  const renderCommentCell = (comment) => {
    return (
      <td
        className="comment-cell"
        title={comment} // 전체 코멘트를 툴팁으로 보여줌
      >
        {truncateText(comment, MAX_COMMENT_LENGTH)}
      </td>
    );
  };

  useEffect(() => {
    fetchStudents();
    fetchHomeworks();
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

  const fetchHomeworks = async () => {
    try {
      const response = await axios.get('https://q0kstz9esk.execute-api.ap-northeast-2.amazonaws.com/get-std-info/homework');
      const sortedComments = response.data.sort((a, b) => a.student_id - b.student_id);
      setComments(sortedComments);
    } catch (error) {
      console.error('코멘트 목록 가져오기 실패:', error);
    }
  };

  const handleInputChange = (index, e) => {
    const updatedHomeworks = [...homeworkInputs];
    updatedHomeworks[index][e.target.name] = e.target.value;
    setHomeworkInputs(updatedHomeworks);
  };

  const handleAddHomework = () => {
    setHomeworkInputs([...homeworkInputs, { student_id: '', month: '', week: '', score: '', comment: '' }]);
  };

  const handleRemoveHomework = (index) => {
    const updatedHomeworks = [...homeworkInputs];
    updatedHomeworks.splice(index, 1);
    setHomeworkInputs(updatedHomeworks);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://q0kstz9esk.execute-api.ap-northeast-2.amazonaws.com/get-std-info/homework', homeworkInputs);
      console.log('코멘트가 성공적으로 추가되었습니다.');
      fetchHomeworks(); // 코멘트 추가 후 목록 다시 가져오기
      setHomeworkInputs([]);
    } catch (error) {
      console.error('코멘트 추가 실패:', error);
    }
  };

  return (
    <div>
      <h1>과제 코멘트 추가</h1>
      <h3>학생 정보 리스트</h3>
      <table>
        <thead className='table-title'>
          <tr>
            <th>순번</th>
            <th>ID</th>
            <th>이름</th>
            <th>입원성적</th>
            <th>입학일</th>
            <th>솔루션 배정반</th>
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
            </tr>
          ))}
        </tbody>
      </table>
      <h2>과제 코멘트 입력</h2>
      <form onSubmit={handleFormSubmit}>
        <button type="button" onClick={handleAddHomework}>코멘트 작성폼 추가(열 추가)</button>
        {homeworkInputs.map((input, index) => (
          <div key={index} className='comment-input'>
            <select name="student_id" value={input.student_id} onChange={(e) => handleInputChange(index, e)} required>
              <option value="">학생 선택</option>
              {students.map((student) => (
                <option key={student.student_id} value={student.student_id}>{student.name} - {student.student_id}</option>
              ))}
            </select>
            <input type="text" name="month" value={input.month} onChange={(e) => handleInputChange(index, e)} placeholder="월" required />
            <input type="text" name="week" value={input.week} onChange={(e) => handleInputChange(index, e)} placeholder="주" required />
            <input type="text" name="score" value={input.score} onChange={(e) => handleInputChange(index, e)} placeholder="점수" required />
            <textarea name="comment" value={input.comment} onChange={(e) => handleInputChange(index, e)} placeholder="코멘트 내용" required></textarea>
            <button type="button" onClick={() => handleRemoveHomework(index)}>제거</button>
          </div>
        ))}
        <button type="submit">코멘트 추가(서버로 전송)</button>
      </form>

      <h2>코멘트 목록</h2>
      <table>
        <thead className='table-title'>
          <tr>
            <th>순번</th>
            <th>학생ID</th>
            <th>월</th>
            <th>주</th>
            <th>점수</th>
            <th>코멘트</th>
          </tr>
        </thead>
        <tbody className='content-table'>
          {comments.map((comment, index) => (
            <tr key={comment.id || index}>
              <td>{index + 1}</td>
              <td>{comment.student_id}</td>
              <td>{comment.month}</td>
              <td>{comment.week}</td>
              <td>{comment.score}</td>
              {renderCommentCell(comment.comment)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomeworkPage;