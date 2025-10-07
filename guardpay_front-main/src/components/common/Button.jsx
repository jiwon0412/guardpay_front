// src/components/common/Button.jsx

import React from 'react';

const getButtonStyle = (type) => {
    const baseStyle = {
        padding: '10px 15px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '15px',
    };

    switch (type) {
        case 'primary': // "가입하기" 버튼 스타일
            return {
                ...baseStyle,
                backgroundColor: '#93C47D', // 연한 녹색
                color: 'white',
            };
        case 'confirm': // 작은 "확인" 버튼 스타일
            return {
                ...baseStyle,
                backgroundColor: '#93C47D',
                color: 'white',
                padding: '10px 15px', // 더 작게 설정
                whiteSpace: 'nowrap',
                height: '40px',
            };
        case 'outline': // "이메일로 인증코드 받기" 버튼 스타일
            return {
                ...baseStyle,
                backgroundColor: 'white',
                color: '#6AA84F',
                border: '1px solid #6AA84F',
            };
        default:
            return baseStyle;
    }
};

const Button = ({ children, type = 'primary', style, ...props }) => {
    const componentStyle = {
        ...getButtonStyle(type),
        ...style,
    };

    return (
        <button style={componentStyle} {...props}>
            {children}
        </button>
    );
};

export default Button;