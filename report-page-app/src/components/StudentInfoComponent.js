import React from 'react';

const StudentInfoComponent = ({ studentData }) => {
  // studentData props 구조를 가정하여 작성합니다.
  if (!studentData || Object.keys(studentData).length === 0) {
    return <div>학생 정보를 불러오는 중...</div>;
  }
  return (
    <div className="student-info">
      <p>이름: {studentData.name}</p>
      <p>입원성적: {studentData.en_grade}</p>
      <p>입학날짜: {studentData.en_date}</p>
      <p>배정반: {studentData.solution_class}</p>
    </div>
  );
};

export default StudentInfoComponent;