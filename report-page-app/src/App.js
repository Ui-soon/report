import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReportPage from './components/ReportPage';
import IndexChoosePage from './pages/IndexChoosePage';
import StudentPage from './pages/StudentPage';
import HomeworkPage from './pages/HomeworkPage';
import SolutionPage from './pages/SolutionPage';
import './App.css'; // 여기서 CSS 스타일을 정의합니다.

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/admin" Component={IndexChoosePage} />
          <Route path="/admin/student" Component={StudentPage} />
          <Route path="/admin/homework" Component={HomeworkPage} />
          <Route path="/admin/solution" Component={SolutionPage} />
          <Route exact path="/:studentId" Component={ReportPage} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;