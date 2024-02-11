import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SectionComponent from './SectionComponent';
import StudentInfoComponent from './StudentInfoComponent';
import CommentComponent from './CommentComponent';
import GraphComponent from './GraphComponent';
import './ReportPage.css'; // 이 파일에서 레이아웃 관련 CSS를 정의합니다.

const ReportPage = () => {
	const { studentId } = useParams(); // 현재 경로에서 studentId 파라미터를 추출합니다.
	
	const [studentInfo, setStudentInfo] = useState(null);
	const [homeworks, setHomeworks] = useState(null);
	const [solutions, setSolutions] = useState(null);
	const [selectedHwWeek, setSelectedHwWeek] = useState(''); // 드롭다운 선택 상태
	const [selectedSolWeek, setSelectedSolWeek] = useState(''); // 드롭다운 선택 상태
  const [selectedHwMonth, setSelectedHwMonth] = useState(''); // 드롭다운 선택 상태
	const [selectedSolMonth, setSelectedSolMonth] = useState(''); // 드롭다운 선택 상태
	
  useEffect(() => {
    const fetchStudent = async () => {
      try {
				// studentId를 URL에 포함시켜 API Gateway를 통해 Lambda 함수를 호출합니다.
				const response = await axios.get(`https://q0kstz9esk.execute-api.ap-northeast-2.amazonaws.com/get-std-info/student/${studentId}`);
				setStudentInfo(response.data[0]); // 응답 데이터를 저장합니다.
      } catch (error) {
        console.error('Fetching student data failed:', error);
        // 오류 처리
      }
		};
		fetchStudent();
  }, [studentId]); // studentId가 변경될 때마다 fetchStudentData 함수를 다시 실행합니다.

  useEffect(() => {
    const fetchHomework = async () => {
      try {
				// studentId를 URL에 포함시켜 API Gateway를 통해 Lambda 함수를 호출합니다.
				const response = await axios.get(`https://q0kstz9esk.execute-api.ap-northeast-2.amazonaws.com/get-std-info/homework/${studentId}`);
				setHomeworks(response.data); // 응답 데이터를 저장합니다.
      } catch (error) {
        console.error('Fetching homework data failed:', error);
        // 오류 처리
      }
		};
		fetchHomework();
	}, [studentId]); // studentId가 변경될 때마다 fetchStudentData 함수를 다시 실행합니다.
	
  useEffect(() => {
    const fetchSolution = async () => {
      try {
				// studentId를 URL에 포함시켜 API Gateway를 통해 Lambda 함수를 호출합니다.
				const response = await axios.get(`https://q0kstz9esk.execute-api.ap-northeast-2.amazonaws.com/get-std-info/solution/${studentId}`);
				setSolutions(response.data); // 응답 데이터를 저장합니다.
      } catch (error) {
        console.error('Fetching solution data failed:', error);
        // 오류 처리
      }
		};
		fetchSolution();
  }, [studentId]); // studentId가 변경될 때마다 fetchStudentData 함수를 다시 실행합니다.

  // 드롭다운 숙제 월간 변경 핸들러
  const handleHwMonthChange = (e) => {
		setSelectedHwMonth(e.target.value);
  };

  // 드롭다운 솔루션 월간 변경 핸들러
  const handleSolMonthChange = (e) => {
    setSelectedSolMonth(e.target.value);
	};
	
  // 드롭다운 숙제 주간 변경 핸들러
  const handleHwWeekChange = (e) => {
    setSelectedHwWeek(e.target.value);
	};

  // 드롭다운 솔루션 주간 변경 핸들러
  const handleSolWeekChange = (e) => {
    setSelectedSolWeek(e.target.value);
	};

  // 드롭다운 메뉴 컴포넌트
  const HwMonthDropdown = (
    <select value={selectedHwMonth} onChange={handleHwMonthChange}>
      <option value="">월 선택...</option>
			<option value="1">1월</option>
			<option value="2">2월</option>
			<option value="3">3월</option>
			<option value="4">4월</option>
			<option value="5">5월</option>
			<option value="6">6월</option>
			<option value="7">7월</option>
			<option value="8">8월</option>
			<option value="9">9월</option>
			<option value="10">10월</option>
			<option value="11">11월</option>
			<option value="12">12월</option>
    </select>
	);

  // 드롭다운 메뉴 컴포넌트
  const SolMonthDropdown = (
    <select value={selectedSolMonth} onChange={handleSolMonthChange}>
      <option value="">월 선택...</option>
			<option value="1">1월</option>
			<option value="2">2월</option>
			<option value="3">3월</option>
			<option value="4">4월</option>
			<option value="5">5월</option>
			<option value="6">6월</option>
			<option value="7">7월</option>
			<option value="8">8월</option>
			<option value="9">9월</option>
			<option value="10">10월</option>
			<option value="11">11월</option>
			<option value="12">12월</option>
    </select>
	);

  // 드롭다운 메뉴 컴포넌트
  const HwWeekDropdown = (
    <select value={selectedHwWeek} onChange={handleHwWeekChange}>
      <option value="">주차</option>
			<option value="1">1주차</option>
			<option value="2">2주차</option>
			<option value="3">3주차</option>
			<option value="4">4주차</option>
			<option value="5">5주차</option>
    </select>
	)
	
  // 드롭다운 메뉴 컴포넌트
  const SolWeekDropdown = (
    <select value={selectedSolWeek} onChange={handleSolWeekChange}>
      <option value="">주차</option>
			<option value="1">1주차</option>
			<option value="2">2주차</option>
			<option value="3">3주차</option>
			<option value="4">4주차</option>
			<option value="5">5주차</option>
    </select>
  )

	// 그래프 구성을 위한 데이터 정제
function sortDataByWeekAndMonth(data, selectedMonth) {
	// 데이터가 null이거나 undefined이면 빈 배열 반환
	if (!data) return [];

  // selectedMonth에 해당하는 데이터만 필터링
	const filteredData = data.filter(item => item.month === parseInt(selectedMonth));

	if (!filteredData) return [];

  // "week"와 "score"를 쌍으로 하는 새 배열 생성
  const weekScores = filteredData.map(item => ({
    week: item.week,
    score: item.score
  }));

  // "week"를 기준으로 오름차순 정렬
  weekScores.sort((a, b) => a.week - b.week);

  return weekScores;
}

	// score 정제 []
	const homeworkScores = sortDataByWeekAndMonth(homeworks, selectedHwMonth);
	const solutionScores = sortDataByWeekAndMonth(solutions, selectedSolMonth);

	// 코멘트 정제 [주차별]
	const hwComment = homeworks?.find(comment => comment.month === parseInt(selectedHwMonth) && comment.week === parseInt(selectedHwWeek))?.comment ?? "데이터가 없습니다.";
	const solComment = solutions?.find(comment => comment.month === parseInt(selectedSolMonth) && comment.week === parseInt(selectedSolWeek))?.comment ?? "데이터가 없습니다.";

  return (
    <div className="report-page">
			<SectionComponent header="[학생 REPORT]" content={<StudentInfoComponent studentData={studentInfo} />} />
      <SectionComponent header="[연간 과제 성취도]" content={<GraphComponent type="annual" />} />
      
			<SectionComponent
				header={
					<span>
						과제수행 코멘트
						{HwMonthDropdown}
					</span>
				}
				content={
					<>
						<span>
							{HwWeekDropdown}
						</span>
						<CommentComponent
							type="homework"
							comments={hwComment} />
					</>
				} 
				/>
			<SectionComponent header="[주간 과제 성취도]" content={<GraphComponent type="weekly" scores={homeworkScores} />} />
      
			<SectionComponent
				header={
					<span>
						솔루션S 코멘트x월
						{SolMonthDropdown}
					</span>
				}
				
				content={
					<>
						<span>
							{SolWeekDropdown}
						</span>
						<CommentComponent
							type="solution"
							comments={solComment} />
					</>
				} />
			<SectionComponent header="[솔루션S 참여도]" content={<GraphComponent type="weekly" scores={solutionScores}/>} />
    </div>
  );
};

export default ReportPage;