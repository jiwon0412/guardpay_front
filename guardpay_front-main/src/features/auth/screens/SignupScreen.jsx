import React, { useState } from 'react';
import axios from 'axios';
// ⚠️ 경로는 프로젝트 구조에 맞게 다시 확인하세요!
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';

function SignupScreen() {

    // 1. 폼 데이터 상태 관리
    const [formData, setFormData] = useState({
        email: '',
        authCode: '',
        password: '',
        passwordConfirm: '',
        nickname: '',
        termsAgreed: false,
    });

    // 이메일 확인 여부를 저장할 상태 추가
    const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);

    // 2. 입력값 변경 시 상태 업데이트를 위한 핸들러
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // 3. 이메일 '확인' 버튼을 눌렀을 때 실행될 함수
    const handleEmailConfirm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            alert('올바른 이메일 주소를 입력해주세요.');
            return;
        }

        console.log('이메일 확인 완료:', formData.email);
        setIsEmailConfirmed(true); // 이메일 확인 상태를 true로 변경
    };

    // 4. '가입하기' 버튼 클릭 시 실행될 핸들러
    const handleSubmit = async () => {
        // 간단한 유효성 검사
        if (!formData.email || !formData.password || !formData.nickname) {
            alert('필수 항목(*)을 모두 입력해주세요.');
            return;
        }
        if (formData.password !== formData.passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        if (!formData.termsAgreed) {
            alert('약관에 동의해주세요.');
            return;
        }

        // 백엔드 개발자와 약속한 API 주소
        const API_URL = 'http://localhost:8080/api/users/signup';

        // 서버에 보낼 데이터 (authCode 제거)
        const signupData = {
            email: formData.email,
            password: formData.password,
            nickname: formData.nickname,
        };

        try {
            // axios를 사용해 서버에 POST 방식으로 데이터를 전송합니다.
            const response = await axios.post(API_URL, signupData);

            console.log('가입 성공 응답:', response.data);
            alert('회원가입이 완료되었습니다!');
            // 여기서 로그인 화면으로 이동하는 로직을 추가할 수 있습니다.

        } catch (error) {
            console.error('가입 요청 실패:', error);
            const errorMessage = error.response?.data?.message || '가입에 실패했습니다. 입력 정보를 확인해주세요.';
            alert(errorMessage);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.contentBox}>

                <h2 style={styles.logo}>
                    GuardPay
                </h2>

                {/* 1. 이메일 입력 그룹 */}
                <div style={styles.inputGroup}>
                    <label style={styles.label}>이메일 <span style={styles.required}>*</span></label>
                    <div style={styles.inputWithButton}>
                        {/* --- 기능 연결 --- */}
                        <Input
                            placeholder="이메일"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={{ flexGrow: 1 }}
                        />
                        {/* --- 기능 연결 --- */}
                        <Button type="confirm" onClick={handleEmailConfirm}>
                            확인
                        </Button>
                    </div>
                </div>

                {/* 2. 인증 코드 받기 버튼 및 입력 */}
                <Button type="outline" style={styles.authCodeButton}>이메일로 인증코드 받기</Button>
                <div style={styles.inputGroup}>
                    <div style={styles.inputWithButton}>
                        {/* --- 기능 연결 --- */}
                        <Input
                            placeholder="인증코드"
                            name="authCode"
                            value={formData.authCode}
                            onChange={handleChange}
                            style={{ flexGrow: 1 }}
                        />
                        <Button type="confirm">확인</Button>
                    </div>
                </div>

                {/* 3. 비밀번호 섹션 */}
                <div style={styles.inputGroup}>
                    <label style={styles.label}>비밀번호 <span style={styles.required}>*</span></label>
                    {/* --- 기능 연결 --- */}
                    <Input
                        placeholder="비밀번호"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <div style={{ height: 10 }}></div>
                    {/* --- 기능 연결 --- */}
                    <Input
                        placeholder="비밀번호 재입력"
                        type="password"
                        name="passwordConfirm"
                        value={formData.passwordConfirm}
                        onChange={handleChange}
                    />
                </div>

                {/* 4. 닉네임 섹션 */}
                <div style={styles.inputGroup}>
                    <label style={styles.label}>닉네임 <span style={styles.required}>*</span></label>
                    {/* --- 기능 연결 --- */}
                    <Input
                        placeholder="닉네임"
                        name="nickname"
                        value={formData.nickname}
                        onChange={handleChange}
                    />
                </div>

                {/* 5. 약관 동의 영역 */}
                <div style={styles.termsGroup}>
                    <label style={styles.termsLabel}>
                        {/* --- 기능 연결 --- */}
                        <input
                            type="checkbox"
                            name="termsAgreed"
                            checked={formData.termsAgreed}
                            onChange={handleChange}
                            style={styles.checkbox}
                        />
                        약관 전체 동의
                    </label>
                    <div style={styles.termsBox}>
                        <p style={{fontSize: '12px', color: '#888'}}>여기에 약관 내용이 들어갑니다...</p>
                    </div>
                </div>

                {/* 6. 가입하기 버튼 */}
                {/* --- 기능 연결 --- */}
                <Button
                    type="primary"
                    style={styles.signupButton}
                    onClick={handleSubmit}
                >
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