import React from 'react';
import { Link } from 'react-router-dom';
import './IndexChoosePage.css';

const IndexChoosePage = () => {
  return (
    <div className="admin-choose">
      <h1>관리자 페이지</h1>
      <ul className="link-list">
        <li><Link to="/admin69/student">학생 추가</Link></li>
        <li><Link to="/admin69/homework">숙제코멘트 작성</Link></li>
        <li><Link to="/admin69/solution">솔루션코멘트 작성</Link></li>
      </ul>
    </div>
  );
};

export default IndexChoosePage;