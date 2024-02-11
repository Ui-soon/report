import React from 'react';
import { Link } from 'react-router-dom';

const IndexChoosePage = () => {
  return (
    <div>
      <h1>관리자 페이지</h1>
      <ul>
        <li><Link to="/admin/student">학생 추가</Link></li>
        <li><Link to="/admin/homework">숙제코멘트 작성</Link></li>
        <li><Link to="/admin/solution">솔루션코멘트 작성</Link></li>
      </ul>
    </div>
  );
};

export default IndexChoosePage;