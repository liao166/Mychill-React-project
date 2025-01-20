import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Login from './Login';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));

    // UseEffect to update login status based on token
    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [token]);

    // 清除 tag_id
    const cleanTagid = () => {
        localStorage.removeItem('tag_id');
    }

    // Handle logout
    const handleLogout = () => {
        if (isLoggedIn && window.confirm('您確定要登出嗎？')) {
            localStorage.removeItem('token');
            localStorage.removeItem('tag_id');
            setIsLoggedIn(false);
            setToken(null);
            alert("登出成功!");
            window.location.reload();
        }
    };

    // Render navigation links based on login status
    const renderNavLinks = () => {
        if (isLoggedIn) {
            return (
                <>
                    <li className="nav-item my-2">
                        <a href="/profile" className="nav-link" onClick={cleanTagid}>會員中心</a>
                    </li>
                    <li className="nav-item my-2">
                        <a href="/planList" className="nav-link" onClick={cleanTagid}>我的計畫</a>
                    </li>
                </>
            );
        }
        return null;
    };

    return (
        <>
            <header className="Trans container-fluid p-0">
                <nav className="searchNav navbar navbar-expand-md navbar-light ps-4 pe-4">
                    <a className="navbar-brand" href="/" onClick={cleanTagid}>
                        <img src="/public/images/logo/chillAround_logo_01.png" alt="Logo" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                        aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 id="offcanvasNavbarLabel" className="offcanvas-title">選單</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav nav-underline me-auto" style={{ fontSize: '0.8rem' }}>
                                <li className="nav-item my-2">
                                    <Link to="/" className="nav-link" onClick={cleanTagid}>首頁</Link>
                                </li>
                                <li className="nav-item my-2">
                                    <Link to="/schInfo" className="nav-link" onClick={cleanTagid}>行程推薦</Link>
                                </li>
                                <li className="nav-item my-2">
                                    <Link to="/searchSite" className="nav-link" onClick={cleanTagid}>景點推薦</Link>
                                </li>
                                <li className="nav-item my-2"><a href="test" className="nav-link">專屬旅程小測驗</a></li>
                                <li className="nav-item my-2">
                                    <Link to="/foodMap" className="nav-link" onClick={cleanTagid}>美食地圖</Link>
                                </li>
                                {renderNavLinks()}
                            </ul>
                            <ul id="searchNavBtn" className="navbar-nav d-flex align-items-center">
                                <li className="nav-item d-flex p-2">
                                    {isLoggedIn ? (
                                        <button id="logoutBtn" className="btn text-white" onClick={handleLogout}>會員登出</button>
                                    ) : (
                                        <button id="loginBtn" type="button" className="btn text-white loginbtn"
                                            data-bs-toggle="modal" data-bs-target="#loginModal" onClick={cleanTagid}>登入</button>
                                    )}
                                </li>
                                <li className="nav-item d-flex p-2">
                                    <a href="buildPlan" onClick={handleLogout}><i className="bi bi-plus-circle"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header >
            <Login />
        </>
    );
};

export default Header;
