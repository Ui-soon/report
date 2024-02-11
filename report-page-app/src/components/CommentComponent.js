import React from 'react';

const CommentComponent = ({ type, comments }) => {
  
  return (
    <div className="comment-section">
      <p>{comments}</p>
    </div>
  );
};

export default CommentComponent;