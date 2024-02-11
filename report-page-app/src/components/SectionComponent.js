import React from 'react';

const SectionComponent = ({ header, content }) => {
  return (
    <div className="section">
      <div className="header">{header}</div>
      <div className="content">{content}</div>
    </div>
  );
};

export default SectionComponent;