import React from 'react';
// ⚠️ 경로는 프로젝트 구조에 맞게 다시 확인하세요!
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';

function SignupScreen() {
    return (
        // 🚨 최상위 div에 새로운 스타일을 적용합니다.
        <div style={styles.container}>

            {/* 폼 콘텐츠를 담을 내부 박스 (디자인 상의 흰색 박스 영역) */}
            <div style={styles.contentBox}>

                <h1 style={styles.pageTitle}>회원가입</h1>

                <h2 style={styles.logo}>
                    GuardPay
                </h2>

                {/* 폼 요소들을 여기에 배치합니다. */}

                {/* 1. 이메일 입력 그룹 */}
                <div style={styles.inputGroup}>
                    <label style={styles.label}>이메일 <span style={styles.required}>*</span></label>
                    <div style={styles.inputWithButton}>
                        <Input placeholder="이메일" style={{ flexGrow: 1 }} />
                        <Button type="confirm">확인</Button>
                    </div>
                </div>

                {/* 2. 인증 코드 받기 버튼 및 입력 */}
                <Button type="outline" style={styles.authCodeButton}>이메일로 인증코드 받기</Button>

                <div style={styles.inputGroup}>
                    <div style={styles.inputWithButton}>
                        <Input placeholder="인증코드" style={{ flexGrow: 1 }} />
                        <Button type="confirm">확인</Button>
                    </div>
                </div>

                {/* 3. 비밀번호 섹션 */}
                <div style={styles.inputGroup}>
                    <label style={styles.label}>비밀번호 <span style={styles.required}>*</span></label>
                    <Input placeholder="비밀번호" type="password" />
                    <div style={{ height: 10 }}></div>
                    <Input placeholder="비밀번호 재입력" type="password" />
                </div>

                {/* 4. 닉네임 섹션 */}
                <div style={styles.inputGroup}>
                    <label style={styles.label}>닉네임 <span style={styles.required}>*</span></label>
                    <Input placeholder="닉네임" />
                </div>

                {/* 5. 약관 동의 영역 (체크박스 및 박스) */}
                <div style={styles.termsGroup}>
                    <label style={styles.termsLabel}>
                        <input type="checkbox" style={styles.checkbox} />
                        약관 전체 동의
                    </label>
                    <div style={styles.termsBox}>
                        <p style={{fontSize: '12px', color: '#888'}}>여기에 약관 내용이 들어갑니다...</p>
                    </div>
                </div>

                {/* 6. 가입하기 버튼 */}
                <Button type="primary" style={styles.signupButton}>
                    가입하기
                </Button>

            </div>
        </div>
    );
}

// ----------------------------------------------------
// 스타일 정의: 요청하신 크기와 배경색을 반영했습니다.
// ----------------------------------------------------
const styles = {
    // 🚨 1. 전체 배경 및 크기 설정 (요청하신 스타일)
    container: {
        // position: 'relative'는 React 인라인에서 기본적으로 필요하지 않아 생략
        width: '412px',      // 요청하신 너비
        height: '917px',     // 요청하신 높이
        background: '#F9F5EC', // 요청하신 베이지색 배경

        // 폼을 중앙에 위치시키기 위해 Flexbox를 사용합니다.
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start', // 상단에 배치
        margin: '0 auto', // 화면 중앙 정렬을 위한 마진 (필요시)
        paddingTop: '20px',
    },

    // 3. 제목 및 로고 스타일
    pageTitle: {
        fontSize: '14px',
        color: '#888',
        textAlign: 'left',
        margin: '0 0 10px 0',
        fontWeight: '400'
    },
    logo: {
        color: '#6AA84F', // GuardPay 초록색
        fontSize: '36px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '30px',
    },

    // 4. 폼 그룹 및 레이아웃 스타일
    inputGroup: {
        marginBottom: '15px',
        marginTop: '15px'
    },
    label: {
        display: 'block',
        fontSize: '14px',
        fontWeight: '600',
        marginBottom: '5px',
        textAlign: 'left',
    },
    required: {
        color: 'red',
        marginLeft: '2px'
    },
    inputWithButton: {
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
    },
    authCodeButton: {
        width: '100%',
        marginTop: '-10px',
        marginBottom: '15px',
        padding: '10px',
    },

    // 5. 약관 동의 영역 스타일
    termsGroup: {
        marginTop: '25px',
        marginBottom: '20px',
    },
    termsLabel: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '14px',
        marginBottom: '10px',
        cursor: 'pointer',
    },
    checkbox: {
        marginRight: '8px',
        transform: 'scale(1.2)',
    },
    termsBox: {
        border: '1px solid #ddd',
        height: '80px',
        padding: '10px',
        borderRadius: '5px',
        overflowY: 'scroll',
    },

    // 6. 최종 '가입하기' 버튼 스타일
    signupButton: {
        width: '100%',
        padding: '12px',
        fontSize: '16px',
        marginTop: '10px',
    }
};

export default SignupScreen;