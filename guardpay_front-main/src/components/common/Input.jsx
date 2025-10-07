// src/components/common/Input.jsx

import React from 'react';

const inputBaseStyle = {
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '15px',
    width: '100%',
    boxSizing: 'border-box',
};

const Input = ({ type = 'text', placeholder, style, ...props }) => {
    // 비밀번호 필드에만 아이콘 공간을 주기 위한 스타일 (간단화)
    const containerStyle = {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    };

    return (
        <div style={containerStyle}>
            <input
                type={type}
                placeholder={placeholder}
                style={{ ...inputBaseStyle, ...style }}
                {...props}
            />
            {/* 비밀번호 필드에만 아이콘이 있다고 가정하고 간단히 표시 */}
            {type === 'password' && (
                <span style={{
                    position: 'absolute',
                    right: '10px',
                    color: '#888',
                    cursor: 'pointer',
                    fontSize: '18px',
                }}>
                    👁️
                </span>
            )}
        </div>
    );
};

export default Input;