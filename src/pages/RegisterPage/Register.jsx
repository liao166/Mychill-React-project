import React, { useState, useEffect } from "react";
import axios from 'axios';

function Register() {
    useEffect(() => {
        // 在組件掛載時為 body 添加 'register' class
        document.body.classList.add('register');

        // 在組件卸載時移除 'register' class
        return () => {
            document.body.classList.remove('register');
        };
    }, []);

    const [formData, setFormData] = useState({ uname: '', email: '', pw1: '', pw2: '' });

    // 會員註冊資料
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // 會員註冊
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8080/member/register', formData)
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem("emailid", response.data.emailid);
                    alert("註冊成功!請更新會員資料。");
                    window.location.href = '/profile';
                }
            })
            .catch(error => {
                console.error("註冊錯誤:", error);
                if (error.response && error.response.data) {
                    alert(error.response.data.message); // 顯示後端返回的錯誤消息
                } else {
                    alert('註冊失敗，請稍後再試。');
                }
            });
    }

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

    // Google 註冊會員
    const handleCallback = async (response) => {
        const data = await parseJwt(response.credential);
        await axios.post("http://localhost:8080/member/Googleregister", { data })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("emailid", response.data.emailid);
                    alert(response.data.message);
                    window.location.href = "/profile";
                }
            })
            .catch(error => {
                console.error("註冊失敗:", error);
                alert(error.response.data.message);
                window.location.href = "/register";
            });
    }

    // Line 登入
    const handleLineLogin = () => {
        const client_id = '2006514534';
        const redirect_uri = 'http://localhost:5173/register';
        let link = 'https://access.line.me/oauth2/v2.1/authorize?';
        link += 'response_type=code';
        link += '&client_id=' + client_id;
        link += '&redirect_uri=' + redirect_uri;
        link += '&state=login';
        link += '&scope=profile%20openid%20email';
        window.location.href = link;
    };

    // 接收 Line 的授權碼，將 Line 登入資料傳入後台註冊
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (code) {
            (async () => {
                try {
                    const response = await axios.post("http://localhost:8080/member/Lineregister", { code });
                    if (response.data) {
                        localStorage.setItem("token", response.data.token);
                        localStorage.setItem("emailid", response.data.emailid);
                        alert(response.data.message);
                        window.location.href = "/profile";
                    } else {
                        alert(response.data.message || "註冊失敗");
                    }
                } catch (error) {
                    console.error("註冊失敗:", error);
                    alert(error.response.data.message);
                    window.location.href = "/register";
                }
            })();
        }
    }, []);

    return (
        <div className="container-fluid">
            <div className="mycard">
                <div className="text-center mb-3">
                    <a href="/"><img src="/public/images/logo/chillAround_logo_01.png" /></a>
                </div>
                <form id="form" onSubmit={handleSubmit}>
                    <h3 className="title text-center">會員註冊</h3>
                    <label className="col-form-label">姓名:</label>
                    <input type="text" name="uname" id="uname" className="form-control" placeholder="請輸入姓名" required autofocus value={formData.uname} onChange={handleInputChange} />
                    <label className="col-form-label">帳號:</label>
                    <input type="email" name="email" id="email" className="form-control" placeholder="請輸入電子信箱" required value={formData.email} onChange={handleInputChange} />
                    <label className="col-form-label">密碼:</label>
                    <input type="password" name="pw1" id="pw1" className="form-control" placeholder="請輸入密碼" minlength="6"
                        required value={formData.pw1} onChange={handleInputChange} />
                    <label className="col-form-label">確認密碼:</label>
                    <input type="password" name="pw2" id="pw2" className="form-control" placeholder="請再次輸入密碼" minlength="6"
                        required value={formData.pw2} onChange={handleInputChange} />
                    <div className="text-center my-3">
                        <button type="submit" className="btn subbtn text-white">確認註冊</button>
                    </div>
                    <div className="mx-2 text-center fastregister">
                        <div className="line"></div>
                        <div className="mx-1">快速註冊</div>
                        <div className="line"></div>
                    </div>
                    <div className="fastregisterbtn mt-3">
                        <div id="googleSignInButton"></div>
                        <button className="btn lineloginbtn" onClick={handleLineLogin}></button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;