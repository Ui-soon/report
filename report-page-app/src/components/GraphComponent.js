import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import Explain from '../../src/Images/homework_explain.png'
import './GraphComponent.css';

const GraphComponent = ({ type, scores }) => {
  const scoreToYAxisValue = (score) => {
    return 5 - 'ABCDE'.indexOf(score.score);
  };

  const data = {
    labels: scores.map(score => `${score.week}주차`),
    datasets: [
      {
        label: '주차별 점수',
        data: scores.map(score => ({
          x: score.week,
          y: scoreToYAxisValue(score),
        })),
        fill: false,
        backgroundColor: 'rgb(231, 31, 25)',
        borderColor: 'rgba(231, 31, 25)',
        borderWidth: 2,
        pointRadius: 2,
        tension: 0,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          stepSize: 1,
          // 점수를 A부터 E까지의 문자로 변환합니다.
          callback: function (value) {
            return 'ABCDE'[5 - value];
          }
        },
        grid: {
          display: true, // y축 그리드 라인 제거
        },
        afterFit: (scale) => { // y축 패딩을 추가합니다.
          scale.paddingTop = 0;
          scale.paddingBottom = 0;
        }
      },
      x: {
        ticks: {
          color: 'rgba(18, 50, 94)',
          font: {
            size: 10,
            weight: 'bold'
          }
        },
        grid: {
          display: false, // y축 그리드 라인 제거
        },
      },
    },
    plugins: {
      legend: {
        display: false, // 범례를 표시하지 않습니다.
      },
    },
    responsive: true,
    maintainAspectRatio: false, // 부모 컨테이너에 맞게 크기를 조정합니다.
  };
  return (
    <div className="graph-section" style={{height: '120px'}}>
      {scores.length !== 0 ? (
        <Line data={data} options={options} />
      ) : (
        <div>점수 데이터가 없습니다.</div>
      )}
      {scores.length !== 0 ? (
        <img src={Explain} alt="숙제 평가 설명" className="explanation" />
      ) : <div/>}
      
    </div>
  );
};

export default GraphComponent;