import React from 'react';

const StudentMentionComponent = ({ studentData }) => {
  // mention props 구조를 가정하여 작성합니다.
	if (!studentData || Object.keys(studentData).length === 0) {
    return <div>학생 정보를 불러오는 중...</div>;
  }
  return (
    <div className="student-mention">
      <p className="mention-content">{studentData.memo}</p>
    </div>
  );
};

export default StudentMentionComponent;