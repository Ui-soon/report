import React from 'react';

const StudentInfoComponent = ({ studentData }) => {
  // studentData props 구조를 가정하여 작성합니다.
  if (!studentData || Object.keys(studentData).length === 0) {
    return <div>학생 정보를 불러오는 중...</div>;
  }
  return (
    <div className="student-info">
      <div className="student-info-line">
        <span className="label">이름 /</span><span className="student-info-data">{studentData.name}</span>
      </div>
      <div className="student-info-line">
        <span className="label">입원성적 /</span> <span className="student-info-data">{studentData.en_grade}</span>
      </div>
      <div className="student-info-line">
        <span className="label">입학날짜 /</span> <span className="student-info-data">{studentData.en_date}</span>
      </div>
      <div className="student-info-line">
        <span className="label">솔루션 배정반 /</span> <span className="student-info-data">{studentData.solution_class}반</span>
      </div>
    </div>
  );
};

export default StudentInfoComponent;