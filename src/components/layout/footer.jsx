import React from "react";


const Footer = () => {
  return (
    <div className="container-fluid text-light position-relative footerBox">
      <footer className="p-5">
        <div className="row w-100">
          <div className="col-6 col-md-4 mb-3 text-right">
            <h5 className="fs-6 fw-bold">七淘 chill around</h5>
            <ul className="nav flex-column" style={{ fontSize: "0.8rem" }}>
              <li className="nav-item mb-2">
                <a href="/" className="nav-link p-0 text-light">
                  首頁
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/profile" className="nav-link p-0 text-light">
                  會員資訊
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/about" className="nav-link p-0 text-light">
                  關於我們
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/faq" className="nav-link p-0 text-light">
                  常見問題
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/terms" className="nav-link p-0 text-light">
                  使用條款
                </a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-4 mb-3 text-center">
            <a href="/">
              <img
                src="/public/images/logo/chillAround_logo_02.png"
                alt="Logo"
                style={{ width: "180px" }}
              />
            </a>
          </div>

          <div className="col-md-4 offset-md-1 m-0">
            <form>
              <h5 className="fs-6 fw-bold">訂閱我們獲得更多旅遊資訊</h5>
              <p style={{ fontSize: "0.8rem" }}>
                Subscribe to us for more travel information.
              </p>
              <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                <label htmlFor="newsletter1" className="visually-hidden">
                  Email address
                </label>
                <input
                  id="newsletter1"
                  type="text"
                  className="form-control"
                  placeholder="Email address"
                />
                <button
                  type="button"
                  className="btn btn-warning btn-sm mx-2 text-light"
                  style={{
                    height: "37px",
                    width: "90px",
                    borderRadius: "50px",
                  }}
                >
                  訂閱
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="container-fluid  ">
          <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top fs-6 text-light">
            <p>&copy; 2024 Company, Inc. All rights reserved.</p>
            <ul className="list-unstyled d-flex">
              <li className="ms-3">
                <a className="link-dark text-light" href="#">
                  <i className="bi bi-twitter-x"></i>
                </a>
              </li>
              <li className="ms-3">
                <a className="link-dark text-light" href="#">
                  <i className="bi bi-instagram"></i>
                </a>
              </li>
              <li className="ms-3">
                <a className="link-dark text-light" href="#">
                  <i className="bi bi-facebook"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
