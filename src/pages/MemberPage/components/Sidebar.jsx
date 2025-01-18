import React from "react";
import { useLocation } from "react-router-dom";

function Sidebar() {
    const location = useLocation();
    const isProfilePage = location.pathname === "/profile";
    const isMytripPage = location.pathname === "/mytrip";
    const isMycollectionPage = location.pathname === "/mycollection";

    const handleLogout = () => {
        if (window.confirm('您確定要登出嗎？')) {
            localStorage.removeItem('token');
            window.location.href = '/';
        }
    };

    return (
        <>
            <div className="desktop">
                <div>
                    <a href="/">
                        <img src="/images/logo/chillAround_logo_01.png" />
                    </a>
                    <div className="sidebar text-start">
                        <div id="personaldata" className={`item ${isProfilePage ? 'active' : ''}`}>
                            <a href="/profile"><i className="fa-solid fa-user"></i>個人資訊</a>
                        </div>
                        <div id="mytrip" className={`item ${isMytripPage ? 'active' : ''}`}>
                            <a href="/mytrip"><i className="fa-solid fa-calendar-days"></i>我的行程</a>
                        </div>
                        <div id="mycollection" className={`item ${isMycollectionPage ? 'active' : ''}`}>
                            <a href="/mycollection"><i className="fa-solid fa-heart"></i>我的收藏行程</a>
                        </div>
                        {/* <div id="../pages/TaiwanEx.html" className="item">
                                <a href="#"><i className="fa-solid fa-map-location-dot"></i>台灣制縣地圖</a>
                            </div> */}
                    </div>
                </div>
                <div className="mb-3">
                    <button id="logoutbtn" onClick={handleLogout} type="button" className="btn btn-secondary text-white">
                        會員登出
                    </button>
                </div>
            </div>
            <div className="mobile">
                <nav className="navbar navbar-light fixed-top">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">
                            <img src="/images/logo/chillAround_logo_01.png" />
                        </a>
                        <button className="navbar-toggler text-primary" type="button" data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar"
                            aria-labelledby="offcanvasNavbarLabel">
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">選單</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas"
                                    aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a className="nav-link" href="../pages/member_personaldata.html"><i
                                            className="fa-solid fa-user"></i>個人資訊</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="../pages/member_mytrip.html"><i
                                            className="fa-solid fa-calendar-days"></i>我的行程</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="../pages/member_mycollection.html"><i
                                            className="fa-solid fa-heart"></i>我的收藏行程</a>
                                    </li>
                                </ul>
                                <button id="logoutbtn1" onClick={handleLogout} type="button" className="btn btn-secondary text-white mt-5">
                                    會員登出
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}

export default Sidebar;