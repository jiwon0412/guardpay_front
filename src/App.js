import React, { useState } from 'react';
import './App.css';

function App() {
  // 폼 데이터를 관리할 상태 (state) 정의
  const [formData, setFormData] = useState({
    email: '',            // DTO의 email 필드와 일치
    password: '',         // DTO의 password 필드와 일치
    nickname: '',         // DTO의 nickname 필드와 일치
    confirmPassword: '',  // DTO의 confirmPassword 필드와 일치
  });

  // API 호출 상태 및 응답 메시지를 관리할 상태
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // 입력 필드가 변경될 때 상태를 업데이트하는 핸들러 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // 폼 제출(Submit) 시 API를 호출하는 핸들러 함수
  const handleSignup = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지
    setMessage('회원가입 요청 중...');
    setIsError(false);
    
    // ⚠️ 프론트엔드 유효성 검사: 비밀번호와 비밀번호 확인이 일치하는지 확인
    if (formData.password !== formData.confirmPassword) {
      setMessage('오류: 비밀번호와 비밀번호 확인 값이 일치하지 않습니다.');
      setIsError(true);
      return; // API 호출 중단
    }

    // 요청을 보낼 백엔드 URL (package.json의 proxy 설정에 따라 상대 경로 사용)
    const apiUrl = '/api/users/signup'; 
    
    // DTO와 일치하지 않는 필드를 API 호출 전에 제외할 수도 있습니다.
    // DTO에 정의된 4개 필드만 포함하는 객체를 생성합니다.
    const requestData = {
      email: formData.email,
      password: formData.password,
      nickname: formData.nickname,
      confirmPassword: formData.confirmPassword,
    };
    // 참고: 현재 DTO에는 confirmPassword도 포함되어 있으므로 formData를 그대로 써도 무방합니다.

    try {
      const response = await fetch(apiUrl, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        },
        // DTO 필드에 맞춘 requestData를 JSON 문자열로 전송합니다.
        body: JSON.stringify(requestData), 
      });
    

      const data = await response.json();

      if (response.ok) {
        // HTTP 상태 코드가 201(CREATED)일 경우 (성공)
        setMessage(data.message || '회원가입이 성공적으로 완료되었습니다.');
        setIsError(false);
        // 성공 시 폼 초기화
        setFormData({ email: '', password: '', nickname: '', confirmPassword: '' }); 
      } else {
        // 서버에서 보낸 에러 메시지 처리 (예: 중복 아이디, 유효성 검사 실패 등)
        const errorMessage = data.message || '회원가입 중 오류가 발생했습니다.';
        setMessage(`오류: ${errorMessage}`);
        setIsError(true);
      }
    } catch (error) {
      // 네트워크 오류 등 예외 발생 시
      console.error('Fetch error:', error);
      setMessage('네트워크 오류가 발생했습니다. 서버 상태를 확인해 주세요.');
      setIsError(true);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>회원가입</h1>
        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
          
          {/* Email 필드 (DTO: email) */}
          <input
            type="email" // email 타입으로 변경하여 기본적인 유효성 검사 지원
            name="email"
            placeholder="이메일 (아이디)"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />

          {/* Nickname 필드 (DTO: nickname) */}
          <input
            type="text"
            name="nickname"
            placeholder="닉네임"
            value={formData.nickname}
            onChange={handleChange}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          
          {/* Password 필드 (DTO: password) */}
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          
          {/* ConfirmPassword 필드 (DTO: confirmPassword) */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />

          <button 
            type="submit" 
            style={{ padding: '10px', backgroundColor: '#61dafb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            회원가입
          </button>
        </form>

        {/* API 호출 결과 메시지 표시 */}
        {message && (
          <p style={{ color: isError ? 'red' : 'lightgreen', marginTop: '20px' }}>
            {message}
          </p>
        )}
      </header>
    </div>
  );
}

export default App;