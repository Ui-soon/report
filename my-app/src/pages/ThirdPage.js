import React from 'react';
import BackgroundBox from '../components/BackgroundBox';
import '../styles/ThirdPage.css';

function ThirdPage() {
    return (
        <div className="print-page third-page">
            <div className="page-container">
                <div className="row">
                    <BackgroundBox title="[학생 REPORT]">
                        <p><strong>이름/</strong> 장의순</p>
                        <p><strong>성적/</strong> 70점</p>
                        <p><strong>입학일/</strong> 23년 11월 30일</p>
                        <p><strong>클리닉 배정반/</strong> A1</p>
                    </BackgroundBox>
                    <BackgroundBox title="[연간 종합 성취도]"/>
                </div>

                <div className="row">
                    <BackgroundBox title="[과제 수행 COMMENT 1월]">
                        <p><strong>1주차 /</strong></p>
                        <p><strong>2주차 /</strong></p>
                        <p><strong>3주차 /</strong></p>
                        <p><strong>4주차 /</strong></p>
                    </BackgroundBox>
                    <BackgroundBox title="[월간 과제 성취도]"/>
                </div>
                <div className="row">
                    <BackgroundBox title="[클리닉 코멘트 11월 30일]">
                        <p><strong>1주차 /</strong></p>
                        <p><strong>2주차 /</strong></p>
                        <p><strong>3주차 /</strong></p>
                        <p><strong>4주차 /</strong></p>
                    </BackgroundBox>
                    <BackgroundBox title="[클리닉 참여도]"/>
                </div>
                <div className="row">
                    <p className="footer-title">
                        장의순수능국어
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ThirdPage;
