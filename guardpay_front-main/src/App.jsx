import React from 'react';

import SignupScreen from './features/auth/screens/SignupScreen';

function App() {
    return (
        // 다른 라우터나 컴포넌트 없이 SignupScreen만 렌더링
        <div className="App">
            <SignupScreen />
        </div>
    );
}

export default App;