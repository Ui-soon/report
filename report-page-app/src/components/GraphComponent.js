import React from 'react';

const GraphComponent = ({ type, scores }) => {
  // 여기에 그래프 렌더링 로직이 들어갑니다. 예를 들어, Chart.js 또는 D3.js 같은 라이브러리를 사용할 수 있습니다.
  return (
    <div className="graph-section">
      {scores ? (
        <ul>
          {scores.map((score, index) => (
            <li key={index}> {score.week}주차: {score.score}</li>
          ))}
        </ul>
      ) : (
        <div>점수 데이터가 없습니다.</div>
      )}
      {/* 그래프 컴포넌트 또는 SVG/Canvas 렌더링 */}
    </div>
  );
};

export default GraphComponent;