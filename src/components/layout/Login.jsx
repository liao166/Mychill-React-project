import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Login() {
    const [formData, setFormData] = useState({ inputAccount: '', inputPassword: '' });

    // 會員帳密
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // 一般會員登入
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/member/login", formData)
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('emailid', response.data.emailid);
                    alert("登入成功!");
                    window.location.reload();
                }
            })
            .catch(error => {
                console.error("登入失敗:", error);
                if (error.response && error.response.data) {
                    alert(error.response.data.message); // 顯示後端返回的錯誤消息
                } else {
                    alert("系統錯誤!");
                }
            });
    };

    // Google 按鈕
    useEffect(() => {
        window.onload = function () {
            google.accounts.id.initialize({
                client_id: "745588392722-ldt3hokig9ll3mk6nekm1qmj9apnipo5.apps.googleusercontent.com",
                callback: handleCallback
            });
            google.accounts.id.renderButton(
                document.getElementById("googleSignInButton"),
                { theme: 'filled_blue', size: 'medium', text: 'signin', width: "110" }
            );
            google.accounts.id.prompt();
        }
    }, []);

    // Google 登入解碼
    const parseJwt = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };

    // Google 登入
    const handleCallback = async (response) => {
        const data = await parseJwt(response.credential);
        await axios.post("http://localhost:8080/member/Googlelogin", { data })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("emailid", response.data.emailid);
                    alert(response.data.message);
                    window.location.href = "/";
                }
            })
            .catch(error => {
                console.error("Google 登入失敗:", error);
                alert(error.response.data.message);
            });
    };

    // Line 登入
    const handleLineLogin = () => {
        const client_id = '2006514534';
        const redirect_uri = 'http://localhost:5173';
        let link = 'https://access.line.me/oauth2/v2.1/authorize?';
        link += 'response_type=code';
        link += '&client_id=' + client_id;
        link += '&redirect_uri=' + redirect_uri;
        link += '&state=login';
        link += '&scope=profile%20openid%20email';
        window.location.href = link;
    };

    // 是否接收到 Line 的授權碼，將 Line 登入資料傳入後台
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (code) {
            (async () => {
                try {
                    const response = await axios.post("http://localhost:8080/member/Linelogin", { code });
                    if (response.data.token) {
                        localStorage.setItem("token", response.data.token);
                        localStorage.setItem("emailid", response.data.emailid);
                        alert(response.data.message);
                        window.location.href = "/";
                    }
                } catch (error) {
                    console.error("Line 登入失敗:", error);
                    alert(error.response.data.message);
                }
            })();
        }
    }, []);

    return (
        <div className="modal fade login" id="loginModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id="form" onSubmit={handleSubmit}>
                            <h3 className="mb-3 text-center">會員登入</h3>
                            <div className="mb-3">
                                <label htmlFor="inputAccount" className="col-form-label">帳號:</label>
                                <input type="email" className="form-control" id="inputAccount" name="inputAccount" required
                                    autoFocus value={formData.inputAccount} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputPassword" className="col-form-label">密碼:</label>
                                <input type="password" className="form-control" id="inputPassword" name="inputPassword" required
                                    value={formData.inputPassword} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3 text-center">
                                <button id="loginbtn" type="submit" className="btn signinbtn text-white me-3">登入</button>
                                <a href="/register" className="btn registerbtn text-white">會員註冊</a>
                            </div>
                        </form>
                    </div>
                    <div className="mx-2 text-center fastlogin">
                        <div className="line"></div>
                        <div className="mx-1">快速登入或註冊</div>
                        <div className="line"></div>
                    </div>
                    <div className="modal-footer">
                        <div id="googleSignInButton"></div>
                        <button className="btn lineloginbtn" onClick={handleLineLogin}></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;