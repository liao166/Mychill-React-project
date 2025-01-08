import React, { useState } from 'react';

const LoginModal = ({ toggleModal }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        // Simulate login process here, e.g., calling an API
        localStorage.setItem('token', 'dummy-token'); // Store a mock token
        alert("登入成功!");
        toggleModal();
    };

    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" onClick={toggleModal} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id="form" onSubmit={handleLogin}>
                            <h3 className="mb-3 text-center">會員登入</h3>
                            <div className="mb-3">
                                <label htmlFor="inputAccount" className="col-form-label">帳號:</label>
                                <input type="email" className="form-control" id="inputAccount" value={email} onChange={(e) => setEmail(e.target.value)} required autofocus />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputPassword" className="col-form-label">密碼:</label>
                                <input type="password" className="form-control" id="inputPassword" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <div className="mb-3 text-center">
                                <button type="submit" className="btn signinbtn text-white me-3">登入</button>
                                <a href="register.html" className="btn registerbtn text-white">會員註冊</a>
                            </div>
                        </form>
                    </div>
                    <div className="mx-2 text-center fastlogin">
                        <div className="line"></div>
                        <div className="mx-1">快速登入或註冊</div>
                        <div className="line"></div>
                    </div>
                    <div className="modal-footer">
                        <div id="g_id_onload"
                            data-client_id="745588392722-ldt3hokig9ll3mk6nekm1qmj9apnipo5.apps.googleusercontent.com" data-callback="handleCallback"
                            data-auto_prompt="false">
                        </div>
                        <div className="g_id_signin" data-type="standard" data-size="medium" data-theme="filled_blue"
                            data-text="signin" data-shape="rectangular" data-logo_alignment="left" data-width="110">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
