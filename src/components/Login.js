import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal } from 'antd';

function Login({ onSuccess }) {

    const signinOnClick = () => {
        onSuccess();
    }

    return (
        <>
            <Button shape="round" type="primary" onClick={signinOnClick} style={{ marginRight: '20px' }}>
                Login</Button>
        </>
    )            

}

export default Login;