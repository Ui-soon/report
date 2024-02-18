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
          <Route exact path="/admin69" Component={IndexChoosePage} />
          <Route path="/admin69/student" Component={StudentPage} />
          <Route path="/admin69/homework" Component={HomeworkPage} />
          <Route path="/admin69/solution" Component={SolutionPage} />
          <Route exact path="/:studentId" Component={ReportPage} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;